var express = require("express");
var router = express.Router();
const crearRespuesta = require("./controllers/rest-controller");



// Crear una ruta POST que recibe una pregunta en el cuerpo y genera una respuesta con tu modelo personalizado
router.post("/", async  (req, res) => {
    await crearRespuesta(req, res);
});
module.exports = router;
