const PORT = 3000;

const express = require('express');
const { connection } = require('./configDB');


const app = express();
app.use(express.json());

app.post('/registro', (req, res) => {
    const { username, nombre, apellido, email, color_tema } = req.body;
    connection.query(`INSERT INTO usuarios(username, nombre, apellido, email, color_tema) 
        VALUES ("${username}", "${nombre}", "${apellido}", "${email}", "${color_tema}")`, 
        function (error, results, fields) {
            if (error) throw error;
            console.log('Registro exitoso');
        }
    );
    
    res.send('Registro exitoso')
})

app.put('/cambiar-tema', (req, res) => {
    const { idUsuario, color_tema } = req.body;
    connection.query(`UPDATE usuarios SET color_tema = "${color_tema}" WHERE id = ${idUsuario}`, 
        function (error, results, fields) {
            if (error) throw error.message;
            console.log('El tema ha sido cambiado exitosamente');
        }
    );

    res.send('El tema ha sido cambiado exitosamente')
})


app.listen(PORT, () => console.log(`Server corriendo en el puerto ${PORT}`));