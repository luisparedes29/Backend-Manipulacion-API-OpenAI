const { registroController } = require("../controllers/registroController");
const { loginValidator } = require("../validators/loginValidator");
const { registroValidator } = require("../validators/registroValidator");

const router = require("express").Router();


router.post('/registrar_usuario', registroValidator, registroController.registrarUsuario);
router.post('/login', loginValidator, registroController.inicioSesion);


module.exports = router;