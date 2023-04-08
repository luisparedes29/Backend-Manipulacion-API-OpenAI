const jwt = require('jsonwebtoken');


module.exports.JWTController = {
    createToken(payload) {
        const expirationTime = new Date(Date.now() + (10 * 60 * 1000)); // La duracion es de 10 minutos en milisegundos
        console.log("Creando el token...");
        const accessToken = jwt.sign({
            exp: Math.floor(expirationTime / 1000), // Aqui los milisegundos se transforman a 10 minutos al dividirlos entre 1000
            data: payload
        }, process.env.secret);
        console.log("Token creado:", accessToken);
    },
}