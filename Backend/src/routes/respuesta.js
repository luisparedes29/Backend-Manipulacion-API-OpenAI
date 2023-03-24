var express = require("express");
var router = express.Router();
const {Configuration,OpenAIApi} = require('openai');
const  crearRespuesta  = require("./controllers/rest-controller");

const config= new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})

const openai= new OpenAIApi(config);

// Crear una ruta POST que recibe una pregunta en el cuerpo y genera una respuesta con tu modelo personalizado
router.post("/", (req, res) => {
    crearRespuesta(req,res);
});
module.exports = router;
