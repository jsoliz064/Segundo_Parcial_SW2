const { response } = require('express')
const bcryptjs = require('bcryptjs')
const Usuario = require("../models").user
const Payments = require('../models').payments
const { generarJWT } = require('../helpers/generar-jwt');
const { Op } = require("sequelize");

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        // Verificar si el email existe
        const usuario = await Usuario.findOne({ where: { email: email } });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / Email no son correctos - email'
            });
        }

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            });
        }

        // Generar el JWT
        const token = await generarJWT(usuario.id);
        const payments= await Payments.count({
            where: {
                [Op.and]: [
                    { user_id: usuario.id },
                    { state: true }
                ]
            }
        })

        res.json({
            usuario,
            'subscription':payments>0?true:false,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

}

const renovarToken = async (req, res = response) => {

    const { usuario } = req;

    // Generar el JWT
    const token = await generarJWT(usuario.id);

    res.json({
        usuario,
        
        token
    })
}


const checkLogin = async (req, res = response) => {
    const token = req.header('x-token');
    const { usuario } = req;
    const payments= await Payments.count({
        where: {
            [Op.and]: [
                { user_id: usuario.id },
                { state: true }
            ]
        }
    })
    try {
        res.json({
            usuario,
            'subscription':payments>0?true:false,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

}

module.exports = {
    login,
    renovarToken,
    checkLogin
}
