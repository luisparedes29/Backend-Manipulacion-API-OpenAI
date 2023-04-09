const { DataTypes } = require("sequelize");
const { sequelize } = require("../dbconfig");

const usuario = sequelize.define('usuarios', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    correo: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    fotoPerfil: DataTypes.STRING,
    estilosPref: DataTypes.INTEGER,
    sonidoPref: DataTypes.INTEGER
});

usuario.sync({ force: false })
    .then(() => {
    })
    .catch((error) => {
        console.error('Error al crear la tabla de usuarios', error);
    });

exports.usuario = usuario;