var { Sequelize } = require('sequelize')

const sequelize = new Sequelize('datos_usuarios', 'root', '', {
    dialect: 'mysql',
    host: 'localhost',
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
