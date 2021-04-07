//importar o módulo do framework express
var express = require('express');

//importar o módulo do consign
var consign = require('consign');

//importar o body-parser
var bodyParser = require('body-parser');

//importar o express validator
var expressValidator = require('express-validator');

//iniciar o objeto express
var app = express();

//setar as variáveis "view engine" e "view"
app.set('view engine','ejs');
app.set('views','./app/views');

//configurar o middleware express.static
app.use(express.static('./app/public'));

//configurar o middleware body-parser
app.use(bodyParser.urlencoded({extended: true}));

//configurar o middleware express.validator
app.use(expressValidator());

consign()
    .include('app/routes')
    .then('app/models')
    .then('app/controllers')
    .into(app);

//exportando o objeto app
module.exports = app;