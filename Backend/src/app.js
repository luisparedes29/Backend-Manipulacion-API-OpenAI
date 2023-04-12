const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()


//para crear la base de datos
//init()

//Swagger Info de Metadatos del API
const swaggerUI = require("swagger-ui-express")
const swaggerJsDoc = require("swagger-jsdoc")
const swaggerSpec = {
    definition: {
        openapi: "3.0.0",
        info: { 
            title : 'OpenAIApi', 
            description: 'Esta API se encarga de manejar la informacion y peticiones de la base de datos de ChatGPTUVM.',
            version: '1.0.0'
        },
        servers: [
         {
            url:"http://localhost:3000"
         }
        ]
    },
    apis: [`${path.join(__dirname, "./routes/*.js")}`],
};


// var indexRouter = require('./routes/index');
const resp = require('./routes/respuesta')


const app = express();

//Middlewares
app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)))
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

app.use('/', resp);
app.use('/respuesta', resp);


module.exports = app;
