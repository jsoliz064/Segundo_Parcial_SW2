const User = require("../models").user;
const Role = require("../models").role;
const Posts = require("../models").posts;
const Payments = require("../models").payments;
const bcryptjs = require('bcryptjs');
const { Op } = require("sequelize");
// Create and Save a new User
exports.create = (req, res ) => {
    
    const { name, email, password, role_id } = req.body
    
    // Create a User
    const user = {
        name: name,
        email: email,
        password: bcryptjs.hashSync(password, bcryptjs.genSaltSync()),
        role_id: role_id,
    };

    // Save User in the database
    User.create(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

    User.findAll({ include: [{ model: Role }] ,order:[['id','ASC']]})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        });
};
exports.profile = async(req, res) => {
    const {user_id} = req.query;
    const user = await User.findByPk(user_id,{ include: Posts })
    if (!user){
        return res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving users."
        });
    }
    res.send(user)
};
exports.payments = async(req, res) => {
    const { usuario } = req;

    const payments = await Payments.findAll({ where: {user_id: usuario.id}, order: [['id', 'ASC']] })
    if (!payments){
        return res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving users."
        });
    }
    res.send(payments)
};
// Find a single User with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    User.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find User with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving User with id=" + id
            });
        });
};

// Update a User by the id in the request
exports.update = async (req, res) => {
    const id = req.params.id
    const { name, email, password, newpassword, role_id } = req.body

    /* const user = await User.findByPk(id)
    const validPassword = bcryptjs.compareSync(password, user.password)
    if (!validPassword) {
        return res.status(400).send({
            msg: 'Usuario / Password no son correctos - correo'
        });
    } */

    let data = {
        name: name,
        email: email,
        role_id: role_id
    };

    if (password){
        data = {
            name: name,
            email: email,
            password: bcryptjs.hashSync(password, bcryptjs.genSaltSync()),
            role_id: role_id
        };
    }

    User.update(data, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was updated successfully.",
                    data
                });
            } else {
                res.send({
                    message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User with id=" + id
            });
        });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    User.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete User with id=${id}. Maybe User was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
    User.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Users were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Users."
            });
        });
};

// Find all published Users
exports.findAllPublished = (req, res) => {
    User.findAll({ where: { name: req.body.name, } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        });
};