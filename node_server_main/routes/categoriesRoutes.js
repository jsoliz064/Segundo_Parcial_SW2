const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');

const { validarCampos,validarJWT} = require('../middlewares');
const { categoriesController } = require("../controllers");


router.get("/",categoriesController.findAll);


module.exports = router;