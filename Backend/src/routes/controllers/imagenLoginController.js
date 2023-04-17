const jwt = require('jsonwebtoken');
const { resSuccess, resError } = require("../../../statusResponse/res");
const { usuario } = require("../../models/user");

module.exports = {
    async imageFromLogin (req, res) {
        try {
            const authHeader = req.headers['authorization']
            const token = authHeader && authHeader.split(" ")[1]; // descomposición del bearer token
            console.log(token)
            const payload = jwt.verify(token, process.env.secret); // se decodifica el token
            const correo = payload.data.correo; // saco el correo del payload pa saber que usuario esta logeado
            console.log(correo) // lo pongo aqui opara saber que estoy imprimiendo el correo correcto xd


            const usuarioExistente = await usuario.findOne({ where: { correo: correo } });
            const fotoPerfilUsuario = usuarioExistente.fotoPerfil

            console.log(fotoPerfilUsuario)

            return resSuccess(req, res, fotoPerfilUsuario, 200);
        } catch (error) {
            console.log(error);
            return resError(req, res, 'La imagen del usuario no se pudo localizar', 500);
        }
    }
}