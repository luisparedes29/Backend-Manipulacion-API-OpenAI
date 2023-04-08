const { Configuration, OpenAIApi } = require('openai');
const fs = require('fs');
require('dotenv').config();

const config = new Configuration({
    apiKey: process.env.API_KEY,
});

const openai = new OpenAIApi(config);

function crearRespuesta(req, res) {
    fs.readFile('info.json', 'utf-8', function (err, data) {
        // Check for errors
        if (err) throw err;

        // Converting to JSON
        let info = JSON.parse(data);
        let pre = [];
        let rest = [];
        let contextUVM = '';

        for (let i = 0; i < info.length; i++) {
            pre.push(info[i].pregunta);
            rest.push(info[i].respuesta);
            // console.log(`question: ${pre[i]},answer: ${rest[i]}`)
            contextUVM += `, "question":"${pre[i]}", "answer":"${rest[i]} "`;
            // console.log(contextUVM)
        }

        let context =
            'Eres ChatUVM,fuiste creado para ayudar a los estudiantes de la Universidad Valle del Momboy ubicada en el Estado Trujillo, Venezuela, utiliza la siguiente lista de preguntas y respuestas para responder a los estudiantes de la universidad, me responderas la pregunta primero con una presentacion con tu nombre simulando que eres un asistente virtual,';

        // Obtener la pregunta del cuerpo
        let pregunta = 'Tu pregunta es:';
        pregunta += req.body.pregunta;

        // Usar el método complete para generar una respuesta con tu modelo personalizado
        openai
            .createCompletion({
                model: 'text-davinci-003',
                prompt: `${context}${contextUVM}${pregunta}`, // Pregunta pasandole primero un contexto inicial de como debe responder, luego dandole contexto de la universidad, y luego pasandole la pregunta del usuario
                temperature: 0.5,
                max_tokens: 2049,
                frequency_penalty: 2,
            })
            .then((response) => {
                // Enviar la respuesta como JSON al cliente
                res.status(200).json(response.data.choices[0]);
            })
            .catch((error) => {
                // Enviar el error como JSON al cliente con error.response.data
                res.status(400).json(error.response.data);
            }); // Print users
    });
}

module.exports = crearRespuesta;
