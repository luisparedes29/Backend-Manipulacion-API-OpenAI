var express = require("express");
var router = express.Router();
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const config = new Configuration({
    apiKey: process.env.API_KEY
})

const openai = new OpenAIApi(config);

function crearRespuesta(req, res) {
    console.log("Hola");
    // Obtener la pregunta del cuerpo
    const pregunta = req.body.pregunta;
    // Usar el método complete para generar una respuesta con tu modelo personalizado
    openai.createCompletion({
        model: 'text-davinci-003',
        prompt: pregunta, // Pregunta obtenida del cuerpo
        temperature: 0.5,
        max_tokens: 2049,
    })
        .then((response) => {
            // Enviar la respuesta como JSON al cliente
            res.json(response.data.choices[0].text);
        })
        .catch((error) => {
            // Enviar el error como JSON al cliente con error.response.data
            console.log(error)
            res.status(400).json(error.response.data);
        });
}

module.exports = crearRespuesta;


