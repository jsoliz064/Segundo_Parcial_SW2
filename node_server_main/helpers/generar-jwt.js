const jwt = require('jsonwebtoken');
const Usuario = require("../models").user;


const generarJWT = ( uid = '' ) => {

    return new Promise( (resolve, reject) => {

        const payload = { uid };

        jwt.sign( payload, process.env.KEY_JWT, {
            expiresIn: '24h'
        }, ( err, token ) => {

            if ( err ) {
                console.log(err);
                reject( 'No se pudo generar el token' )
            } else {
                resolve( token );
            }
        })

    })
}

const comprobarJWT = async( token = '') => {

    try {
        
        if(  token.length < 10 ) {
            return null;
        }

        const { uid } = jwt.verify( token, process.env.KEY_JWT );
        const usuario = await Usuario.findByPk( uid );

        if ( usuario ) {
            if ( usuario.estado ) {
                return usuario;
            } else {
                return null;
            }
        } else {
            return null;
        }

    } catch (error) {
        return null;
    }

}

module.exports = {
    generarJWT,
    comprobarJWT
}

