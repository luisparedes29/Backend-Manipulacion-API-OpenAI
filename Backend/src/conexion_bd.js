const mysql = require('mysql2/promise');
const { name_database, sequelize } = require('./dbconfig');
const { usuario } = require('./models/user');


function conexionDb() {
    mysql.createConnection({
        host: 'localhost',
        user: 'root',
    })
    .then((connection) => {  // Creando la base de datos
        connection.query(`CREATE DATABASE IF NOT EXISTS ${name_database}`).then(() => {
            console.log('Base de datos creada exitosamente');                
        })
    })
    .then( () => { // Creando la conexion a la base de datos
        sequelize.authenticate().then( () => {
            console.log('La conexion a la base de datos se ha realizado exitosamente');
        })
    })
    .then( () => { // Se crea la tabla 'usuarios'
        usuario.sync({ force: false })
        .then(() => console.log('Tabla de usuarios creada en la BD'))
    } )
    .catch( (error) => {
        console.log('Incapaz de conectar a la base de datos: ', error.message);
    });
}

conexionDb();




