const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');

const { validarCampos, validarJWT, validarArchivoSubir } = require('../middlewares');
const { postsController } = require("../controllers");


router.get("/", postsController.findAll);

router.get("/:id", postsController.findOne);

router.post("/", [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('description', 'La descripcion es obligatorio').not().isEmpty(),
    check('category_id', 'La Categoria es obligatorio').not().isEmpty(),
    validarArchivoSubir,
    validarJWT,
    validarCampos
], postsController.create);

router.put("/:id", [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('description', 'La descripcion es obligatorio').not().isEmpty(),
    check('category_id', 'La Categoria es obligatorio').not().isEmpty(),
    validarJWT,
    validarCampos
], postsController.update);

router.delete("/:id", [
    check('id', 'El Parametro ID es obligatorio').not().isEmpty(),
    validarJWT,
    validarCampos
], postsController.delete);

/* CREAR COMENTARIO */
router.post("/:id", [
    check('comment', 'El Comentario es obligatorio').not().isEmpty(),
    validarJWT,
    validarCampos
], postsController.createComment);

/* ELIMINAR COMENTARIO */
router.delete("/:id/:commentId", [validarJWT], postsController.deleteComment);



module.exports = router;