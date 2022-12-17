const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');

const { validarCampos, validarJWT,Subscription } = require('../middlewares');
const { login, renovarToken,checkLogin } = require('../controllers/auth');

router.post('/login',[
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
],login );

router.post('/checkLogin',[
    validarJWT,
    Subscription,
    validarCampos
],checkLogin );

router.get('/', validarJWT, renovarToken );



module.exports = router;