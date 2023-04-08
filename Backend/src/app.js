var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
require('dotenv').config()


//para crear la base de datos
//init()

// var indexRouter = require('./routes/index');
var resp = require('./routes/respuesta')


var app = express();

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
