const userValidator = require('./userValidators');
const subirArchivo = require('./subir-archivo');

module.exports = {
    userValidator,
    ...subirArchivo,
}