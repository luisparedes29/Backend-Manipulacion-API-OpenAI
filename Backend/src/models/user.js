var { DataTypes } = require("sequelize");
var { sequelize } = require("../dbconfig");

const usuario = sequelize.define('usuarios', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    nombre: DataTypes.STRING,
    correo: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING

})


exports.usuario = usuario;