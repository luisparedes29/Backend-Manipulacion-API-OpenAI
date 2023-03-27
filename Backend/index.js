const express = require('express')
const cors = require('cors');
require('dotenv').config()

const rutas = require('./routes/loginRoutes')
const app = express()


app.use(cors())
app.use(express.json())
app.use('/', rutas)


//para crear la base de datos
//init()


app.listen(3000, () => {
    console.log('Servidor Corriendo')
})
