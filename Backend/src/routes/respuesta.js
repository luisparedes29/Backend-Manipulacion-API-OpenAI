var express = require("express");
var router = express.Router();
var crearRespuesta = require("./controllers/rest-controller");
var { registroController } = require("./controllers/registroController");
var { loginValidator } = require("../validators/loginValidator");
var { registroValidator } = require("../validators/registroValidator");



// Crear una ruta POST que recibe una pregunta en el cuerpo y genera una respuesta con tu modelo personalizado
router.post("/", async  (req, res) => {
    await crearRespuesta(req, res);
});

router.post('/registrar_usuario', registroValidator, registroController.registrarUsuario);
router.post('/login', loginValidator, registroController.inicioSesion);

module.exports = router;
