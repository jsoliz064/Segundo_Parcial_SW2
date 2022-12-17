const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const { validarCampos, validarJWT } = require('../middlewares');
const { paypalController } = require("../controllers");
/**
 * 2️⃣ Creamos Ruta para generar pagina de CHECKOUT
 */

//    http://localhost:3000/create-payment [POST]
router.post(`/create-payment`, [
    check('subscription_id', 'El name es obligatorio').not().isEmpty(),
    validarJWT,
    validarCampos
], paypalController.createPayment)

/**
 * 3️⃣ Creamos Ruta para luego que el cliente completa el checkout 
 * debemos de capturar el dinero!
 */

router.get(`/execute-payment`,[],paypalController.executePayment)


//--------------------------------- SUBSCRIPCIONES --------------------------------------

/**
 * ⚡ Crear producto en PAYPAL
 */

router.post(`/create-product`, paypalController.createProduct)

/**
 * ⚡ Crear plan en PAYPAL
 */

router.post(`/create-plan`, paypalController.createPlan)

/**
 * ⚡ Crear subscripcion en PAYPAL
 */

router.post(`/generate-subscription`, paypalController.generateSubscription)

module.exports = router;