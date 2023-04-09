const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    dialect: 'mysql',
    host: process.env.DB_HOST,
    createDatabaseIfNotExists: true
});

async function conexionDb() {
    try {
        await sequelize.authenticate();
        console.log('La conexion a la base de datos se ha realizado exitosamente');
    } catch (error) {
        console.error('Incapaz de conectar a la base de datos: ', error);
    }
}


module.exports = {
    conexionDb,
    sequelize
}


const { Usuario } = require('./models/user');
