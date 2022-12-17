const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');

const { validarCampos,validarJWT} = require('../middlewares');
const { userController } = require("../controllers");
const { userValidator } = require('../helpers');

router.post("/", [
    check('name', 'El name es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 4 letras').isLength({ min: 4 }),
    check('email', 'El email no es válido').isEmail(),
    check('role_id', 'El role_id es obligatorio').not().isEmpty(),
    check('email').custom(userValidator.emailExiste),
    check('role_id').custom(userValidator.esRoleValido),
    validarCampos
], userController.create);

router.get("/",userController.findAll);

router.get("/profile", [
    check('user_id', 'El User ID es obligatorio').not().isEmpty(),
    validarCampos
], userController.profile);


router.get("/payments", [
    validarJWT,
    validarCampos
], userController.payments);

router.get("/published", userController.findAllPublished);

router.get("/:id", [
    check('id', 'El Parametro ID es obligatorio').not().isEmpty(),
    validarCampos
], userController.findOne);

router.put("/:id", [
    check('id', 'El Parametro ID es obligatorio').not().isEmpty(),
    check('name', 'El name es obligatorio').not().isEmpty(),
    check('email', 'El email no es válido').isEmail(),
    check('role_id', 'El role_id es obligatorio').not().isEmpty(),
    check('role_id').custom(userValidator.esRoleValido),
    userValidator.emailUpdate,
    validarCampos
], userController.update);

router.delete("/:id", [
    check('id', 'El Parametro ID es obligatorio').not().isEmpty(),
    validarCampos
], userController.delete);

router.delete("/", userController.deleteAll);

module.exports = router;

