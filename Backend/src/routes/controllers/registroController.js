const bcrypt = require('bcrypt');
const { usuario } = require('../../models/user');
const { conexionDb } = require("../../dbconfig");
const { usuarioController } = require('./usuarioController');
const { JWTController } = require('./JWTController');
const { resError, resSuccess } = require('../../../statusResponse/res')




module.exports.registroController = {
    async registrarUsuario(req, res) {
        try {
            await conexionDb();
            const usuarioExistente = await usuarioController.getUsuarioByCorreo(req.body.correo);
            const usuarioExistentePorNombreUsuario = await usuarioController.getUsuarioByUsername(req.body.username);
            if (usuarioExistente) {
                if (usuarioExistente.correo === req.body.correo) {
                    return resError(req, res, 'Ya existe una cuenta con este correo.', 409)
                }
            }
            if (usuarioExistentePorNombreUsuario) {
                return resError(res, res, 'Ya existe un usuario con este mismo user.', 409)
            }
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const nuevoUsuario = await usuario.create({
                correo: req.body.correo,
                username: req.body.username,
                password: hashedPassword,
                fotoPerfil: 'https://i.pinimg.com/564x/fc/a3/da/fca3dae7dcd86c63e25458b30742f709.jpg',
                estilosPref: 1,
                sonidoPref: 1
            });
            const token = JWTController.createToken({ correo: nuevoUsuario.correo });
            console.log(nuevoUsuario)
            console.log('Hola, aqui esta el token:', token)
            return resSuccess(req, res, 'La cuenta se ha creado exitosamente.', 201)
        } catch (error) {
            return resError(req, res, 'Ocurrió un error al registrar al usuario.', 500)
        }
    },

    async inicioSesion(req, res) {
        try {
            await conexionDb();
            const usuarioExistente = await usuarioController.getUsuarioByCorreo(req.body.correo);
            if (!usuarioExistente) {
                return resError(req, res, 'El usuario no está registrado. Por favor, regístrese para poder acceder.', 401);
            };
            if (await bcrypt.compare(req.body.password, usuarioExistente.password)) {
                const token = JWTController.createToken({ correo: usuarioExistente.correo });
                console.log('Hola, aqui esta el token:', token)
                return resSuccess(req, res, `El inicio de sesión ha sido exitoso. Bienvenido ${usuarioExistente.username}`, 200);
            }
            else {
                return resError(req, res, 'La contraseña es incorrecta. Por favor inténtelo de nuevo', 401);
            }
        } catch (error) {
            return resError(req, res, 'Ha ocurrido un error en el inicio de sesión. Por favor inténtelo de nuevo más tarde.', 500);
        }
    }
}