const Posts = require("../models").posts;
const Categories = require("../models").categories;
const User = require("../models").user;
const Comments = require("../models").comment;
const { Op } = require("sequelize");
const FormData = require('form-data');
const request = require('request');
const { body } = require("express-validator");

const URL_SERVER_FILE=process.env.URL_SERVER_FILE

exports.findAll = (req, res) => {
    const title = req.query.title
    var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null

    Posts.findAll({ where: condition, include: [Categories, User, Comments], order: [['id', 'ASC']] })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        });
};

exports.findOne = async (req, res) => {
    const { id } = req.params;
    Posts.findByPk(id, { include: [Categories, User, Comments] })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Post with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving post."
            });
        });
};

exports.create = async (req, res) => {
    const { title, description, category_id } = req.body
    const { archivo } = req.files
    const { usuario } = req
    const result = await UploadFile(usuario.id, archivo)

    if (!result) {
        return res.status(500).send({
            message: "Error al subir el archivo"
        });
    }
    const { _id, path } = result;

    const posts = {
        title: title,
        description: description,
        category_id: category_id,
        file_path: path,
        file_id: _id,
        user_id: usuario.id
    };

    Posts.create(posts)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Post."
            });
        });
};

exports.update = async (req, res) => {
    const id = req.params.id
    const { usuario } = req
    const { title, description, category_id } = req.body;

    const posts = {
        title: title,
        description: description,
        category_id: category_id,
    };

    Posts.update(posts, {
        where: {
            [Op.and]: [
                { id: id },
                { user_id: usuario.id }
            ]
        }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Post was updated successfully.",
                    posts
                });
            } else {
                res.send({
                    message: `Cannot update Post with id=${id}. Maybe Post was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Post with id=" + id
            });
        });
};

exports.delete = async (req, res) => {
    const id = req.params.id;
    const posts = await Posts.findByPk(id);
    if (!posts) {
        return res.status(500).send({
            message: `Post was not found id:${id}`
        });
    }
    const { file_id } = posts
    const result = await DeleteFile(file_id)
    console.log(result)
    if (!result) {
        return res.status(500).send({
            message: "Error al eliminar el archivo"
        });
    }
    Posts.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Post was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Post with id=${id}. Maybe Post was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Post with id=" + id
            });
        });
};

exports.createComment = async (req, res) => {
    const { id } = req.params
    const { comment } = req.body
    const user_id = req.usuario.id

    const comments = {
        comment: comment,
        user_id: user_id,
        post_id: id
    }

    Posts.findByPk(id, { include: [Categories, User, Comments] })
        .then(data => {
            if (data) {
                Comments.create(comments)
                    .then(tupla => {
                        res.send(tupla);
                    })
                    .catch(err => {
                        res.status(500).send({
                            message:
                                err.message || "Some error occurred while creating the Comment."
                        });
                    });
            } else {
                res.status(404).send({
                    message: `Cannot find Post with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving post."
            });
        });
};

exports.deleteComment = async (req, res) => {
    const { id, commentId } = req.params
    const user_id = req.usuario.id

    const comment = {
        id: commentId,
        user_id: user_id,
        post_id: id
    }

    Posts.findByPk(id)
        .then(data => {
            if (data) {
                Comments.destroy({
                    where: {
                        [Op.and]: [
                            { id: comment.id },
                            { user_id: comment.user_id },
                            { post_id: comment.post_id }
                        ]
                    }
                })
                    .then(num => {
                        if (num == 1) {
                            res.send({
                                message: "Comment was deleted successfully!"
                            });
                        } else {
                            res.send({
                                message: `Cannot delete Comment with id=${comment.id}. Permission Denied or Maybe Comment was not found!`
                            });
                        }
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: "Could not delete Comment with id=" + comment.id
                        });
                    });
            } else {
                res.status(404).send({
                    message: `Cannot find Post with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving post."
            });
        });
};

const UploadFile = async (userId, archivo) => {
    return await UploadFileServer(userId, archivo)
        .then((body) => { return body })
        .catch((error) => { return null })
}

const DeleteFile = async (file_id) => {

    return await DeleteFileServer(file_id)
        .then((body) => { return body })
        .catch((error) => { return null })
}

const UploadFileServer = async (userId, archivo) => {
    return await new Promise((resolve, reject) => {
        try {
            const buffer = toBuffer(archivo.data.buffer);
            const fileNameLarge = archivo.name;
            const fileNameShort = archivo.name.split('.');
            const fileExtension = fileNameShort[fileNameShort.length - 1];

            let options = {
                url: `${URL_SERVER_FILE}/api/files/store`,
                // headers: { 'userId': userId },
            };

            let req = request.post(options, function (err, resp, body) {
                if (err) {
                    console.log('function UploadFileServer err')
                    reject(null)
                } else if (resp.statusCode === 200) {
                    console.log('function UploadFileServer OK')
                    resolve(JSON.parse(body))
                } else {
                    console.log('function UploadFileServer status!=200')
                    reject(null)
                }
            });
            let form = req.form();
            form.append('user_id', userId);
            form.append('archivo', buffer, { filename: fileNameLarge, contentType: fileExtension });
        } catch (error) {
            console.log('function UploadFileServer catch')
            reject(null)
        }
    });
}

const UploadFileServer2 = async (userId, archivo) => {
    try {
        const buffer = toBuffer(archivo.data.buffer);

        let form = new FormData();
        form.append('user_id', userId)
        form.append('archivo', buffer, { filename: 'face.png', contentType: 'png' });
        form.submit('http://127.0.0.1:8000/api/files/store', function (err, resp, body) {
            if (err) { console.log(err) }
            console.log(body)
        });
        console.log('UploadFileServer completed')
    } catch (error) {
        console.log('UploadFileServer catch')
    }
}

const UploadFileServer3 = async (userId, archivo) => {
    return await new Promise((resolve, reject) => {
        try {
            const buffer = toBuffer(archivo.data.buffer);

            var form = new FormData();
            form.append('archivo', buffer);
            form.append('user_id', userId)
            const options = {
                url: 'http://127.0.0.1:8000/api/files/store',
                body: form
            };
            console.log(options);
            request.post(options, function (err, resp, body) {
                if (err) reject(null)
                console.log("todo ok")
                resolve(body)
            });
        } catch (error) {
            reject(null)
        }
    });
}

const DeleteFileServer = async (file_id) => {
    return await new Promise((resolve, reject) => {
        try {
            const data = { 'file_id': file_id }
            let options = {
                url: `${URL_SERVER_FILE}/api/files/delete`,
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            };

            request.delete(options, function (err, resp, body) {
                if (err) {
                    console.log('function DeleteFileServer err')
                    reject(null)
                } else if (resp.statusCode === 200) {
                    console.log('function DeleteFileServer OK')
                    resolve(JSON.parse(body))
                } else {
                    console.log('function DeleteFileServer status!=200')
                    console.log(body)
                    reject(null)
                }
            });
            // let form = req.form();
            // form.append('file_id', file_id);
        } catch (error) {
            console.log('function DeleteFileServer catch')
            reject(null)
        }
    });
}

const toBuffer = (arrayBuffer) => {
    let buffer = new Buffer.alloc(arrayBuffer.byteLength);
    const view = new Uint8Array(arrayBuffer);
    for (var i = 0; i < buffer.length; ++i) {
        buffer[i] = view[i];
    }
    return buffer;
}