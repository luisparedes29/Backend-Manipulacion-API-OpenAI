const bcrypt = require('bcrypt');
const { usuario } = require('../../models/user');
const { usuarioController } = require('./usuarioController');
const { JWTController } = require('./JWTController');
const { resError, resSuccess, resSuccessToken } = require('../../../statusResponse/res');

let token = '';

module.exports.registroController = {
    async registrarUsuario(req, res) {
        try {
            const { correo, username, password} = req.body; // Propiedades que llegan del frontend.
            const usuarioExistente = await usuarioController.getUsuarioByCorreo(correo);
            const usuarioExistentePorNombreUsuario = await usuarioController.getUsuarioByUsername(username);
            if (usuarioExistente) {
                if (usuarioExistente.correo === correo) {
                    return resError(req, res, 'Ya existe una cuenta con este correo dentro de nuestra base de datos. Por favor utiliza un correo diferente.', 409)
                }
            }
            if (usuarioExistentePorNombreUsuario) {
                return resError(res, res, 'Ya existe un usuario con este mismo usuario. Por favor elige un nombre de usuario diferente.', 409)
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const nuevoUsuario = await usuario.create({
                correo: correo,
                username: username,
                password: hashedPassword,
                fotoPerfil: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
                estilosPref: 1,
                sonidoPref: 1,
                // secure_url: secure_url
            });
            token = JWTController.createToken({ correo: nuevoUsuario.correo });
            res.set('Authorization', `Bearer ${token}`);
            return resSuccessToken(req, res, token, 'La cuenta se ha creado exitosamente.', 201)
        } catch (error) {
            return resError(req, res, 'Ocurrió un error al registrar al usuario.', 500)
        }
    },

    async inicioSesion(req, res) {
        try {
            const usuarioExistente = await usuarioController.getUsuarioByCorreo(req.body.correo);
            if (!usuarioExistente) {
                return resError(req, res, 'El usuario no está registrado. Por favor, regístrese para poder acceder.', 401);
            };
            if (await bcrypt.compare(req.body.password, usuarioExistente.password)) {
                token = JWTController.createToken({ correo: usuarioExistente.correo });
                res.set('Authorization', `Bearer ${token}`);
                return resSuccessToken(req, res, token, `El inicio de sesión ha sido exitoso. Bienvenido ${usuarioExistente.username}`, 200);
            } else {
                return resError(req, res, 'La contraseña es incorrecta. Por favor inténtelo de nuevo', 401);
            }
        } catch (error) {
            return resError(req, res, 'Ha ocurrido un error en el inicio de sesión. Por favor inténtelo de nuevo más tarde. ', 500);
        }
    }
    ,

    async cerrarSesion(req, res) {
        try {
            if (!token) {
                return resError(req, res, 'No se puede cerrar sesión porque no hay un usuario con sesión iniciada.', 400);
            }
            token = ''
            return resSuccess(req, res, 'La sesión se ha cerrado exitosamente.', 200);
        } catch (error) {
            return resError(req, res, 'Ocurrió un error al cerrar la sesión.', 500);
        }
    }
}

