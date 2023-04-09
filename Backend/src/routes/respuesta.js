const express = require("express");
const router = express.Router();
const crearRespuesta = require("./controllers/rest-controller");
const { registroController } = require("./controllers/registroController");
const { loginValidator } = require("../validators/loginValidator");
const { registroValidator } = require("../validators/registroValidator");



// Crear una ruta POST que recibe una pregunta en el cuerpo y genera una respuesta con tu modelo personalizado
router.post("/", async  (req, res) => {
    await crearRespuesta(req, res);
});

router.post('/registrar_usuario', registroValidator, registroController.registrarUsuario);
router.post('/login', loginValidator, registroController.inicioSesion);
router.post('/logout', registroController.cerrarSesion);

module.exports = router;
