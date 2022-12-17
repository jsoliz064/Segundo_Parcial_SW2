const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');

const { validarCampos,validarJWT} = require('../middlewares');
const { subscriptionsController } = require("../controllers");


router.get("/",subscriptionsController.findAll);


module.exports = router;