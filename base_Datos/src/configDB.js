const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  database : 'chatbot'
});

connection.connect();

module.exports = { connection }