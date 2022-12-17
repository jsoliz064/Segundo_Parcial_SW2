const { response, request } = require('express');
const { Op } = require("sequelize");
const jwt = require('jsonwebtoken');

const Usuario = require("../models").user;
const Payments = require("../models").payments;



const validarJWT = async (req = request, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.KEY_JWT);

        // leer el usuario que corresponde al uid
        const usuario = await Usuario.findByPk(uid);

        if (!usuario) {
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe DB'
            })
        }

        req.usuario = usuario;
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }

}

const Subscription = async (req = request, res = response, next) => {
    const { usuario } = req
    Payments.findOne({
        where: {
            [Op.and]: [
                { user_id: usuario.id },
                { state: true }
            ]
        },
        order: [['id', 'DESC']]
    })
        .then(data => {
            const hoy = new Date()
            const end = new Date(data.end)
            if (hoy.getTime() > end.getTime()) {
                data.update({ state:false})
            } 
            next();
        })
        .catch(err => {
            next();
        });
}




module.exports = {
    validarJWT,
    Subscription
}