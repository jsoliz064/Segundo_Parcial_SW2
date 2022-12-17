const User = require("../models").user;
const Role = require("../models").role;
const { response, request } = require('express');

exports.esRoleValido = async (role_id = '') => {
    const existeRol = await Role.findOne({ where: { id: role_id } });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la BD`);
    }
}

exports.emailExiste = async (email = '') => {
    // Verificar si el correo existe
    const existeEmail = await User.findOne({ where: { email: email } });
    if (existeEmail) {
        throw new Error(`El correo: ${email}, ya está registrado`);
    }
}

exports.emailUpdate = async (req = request, res = response, next) => {
    const id = req.params.id
    const { email } = req.body
    const user = await User.findByPk(id)

    if (!user) {
        return res.status(401).json({
            msg: `ID: ${id} de usuario no existe`
        })
    }

    if (user.email !== email) {
        const existeEmail = await User.findOne({ where: { email: email } });
        if (existeEmail) {
            return res.status(401).json({
                msg: `Email: ${email} ya registrado`
            })
        }
    }
    next();
}

exports.passwordUpdate = async (req = request, res = response, next) => {
    const id = req.params.id
    const { password } = req.body
    const user = await User.findByPk(id)

    if (!user) {
        return res.status(401).json({
            msg: `ID: ${id} de usuario no existe`
        })
    }
    if (password) {
        const validPassword = bcryptjs.compareSync(password, user.password)
        if (!validPassword) {
            return res.status(401).json({
                msg: 'Password Incorrecto'
            });
        }
    }
    next();
}

exports.existeUsuarioPorId = async (id) => {
    // Verificar si el correo existe
    const existeUsuario = await User.findById(id);
    if (!existeUsuario) {
        throw new Error(`El id no existe ${id}`);
    }
}

exports.coleccionesPermitidas = (coleccion = '', colecciones = []) => {

    const incluida = colecciones.includes(coleccion);
    if (!incluida) {
        throw new Error(`La colección ${coleccion} no es permitida, ${colecciones}`);
    }
    return true;
}


