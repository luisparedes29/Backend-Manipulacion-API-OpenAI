const { usuario } = require('../../models/user');

module.exports.usuarioController = {
    async getUsuarioByCorreo(correo) {
        const usuarioExistente = await usuario.findOne(
            {
                where:
                    { correo: correo }
            })
        return usuarioExistente
    },

    async getUsuarioByUsername(username) {
        const usuarioExistente = await usuario.findOne(
            {
                where:
                    { username: username }
            })
        return usuarioExistente
    }
}