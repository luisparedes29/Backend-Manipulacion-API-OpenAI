const jwt = require('jsonwebtoken');
const { resError } = require('../../../statusResponse/res');


const authToken = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]; // descomposición del bearer token

    if (!token) {
        resError(req, res, 'No existe un token de autenticación', 401)
        return
    }
    try {
        const usuarioExistente = await jwt.verify(token, process.env.secret);
        req.usuarioExistente = usuarioExistente.email;
        next();
    } catch (error) {
        resError(req, res, 'El token no es válido', 403)
        return
    }
};

module.exports = authToken