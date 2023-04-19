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
    // secure_url: DataTypes.STRING
});


module.exports = { usuario };