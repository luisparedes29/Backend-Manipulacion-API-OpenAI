const { Sequelize } = require('sequelize');

const name_database = 'datos_usuarios';
const sequelize = new Sequelize(name_database, 'root', 'root', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = {
    sequelize,
    name_database
}