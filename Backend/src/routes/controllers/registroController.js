var bcrypt = require('bcrypt');
var { usuario } = require('../../models/user');
var { conexionDb } = require("../../dbconfig");
var { usuarioController } = require('./usuarioController');
var { JWTController } = require('./JWTController');

module.exports.registroController = {
    async registrarUsuario(req, res) {
        try {
            await conexionDb();
            const usuarioExistente = await usuarioController.getUsuarioByCorreo(req.body.correo);
            const usuarioExistentePorNombreUsuario = await usuarioController.getUsuarioByUsername(req.body.username);
            if (usuarioExistente) {
                let mensaje = '';
                if (usuarioExistente.correo === req.body.correo) {
                    mensaje += 'Ya existe una cuenta con este correo. ';
                }
                return res.status(400).json({ errors: { message: mensaje } });
            }
            if (usuarioExistentePorNombreUsuario) {
                let mensaje = 'Ya existe una cuenta con este nombre de usuario.';
                return res.status(400).json({ errors: { message: mensaje } });
            }
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const nuevoUsuario = await usuario.create({
                nombre: req.body.nombre,
                correo: req.body.correo,
                username: req.body.username,
                password: hashedPassword,
            });
            const token = JWTController.createToken({ correo: nuevoUsuario.correo });
            return res.status(201).json({ usuario: nuevoUsuario, token: token, message: 'La cuenta se ha creado exitosamente' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ errors: { message: 'Ocurrió un error al registrar al usuario' } });
        }
    },

    async inicioSesion(req, res) {
        await conexionDb();
        const usuarioExistente = await usuarioController.getUsuarioByCorreo(req.body.correo);
        if (!usuarioExistente) {
            let mensaje = 'El usuario no está registrado. Por favor, regístrese para poder acceder.'
            return res.status(200).json(mensaje)
        };

        if (await bcrypt.compare(req.body.password, usuarioExistente.password)) {
            const token = JWTController.createToken({ correo: usuarioExistente.correo })
            res.json({ usuarioExistente, token });
        }
        else
            res.status(401).json({ errors: { message: 'Datos incorrectos. Verifique' } })
    }
}