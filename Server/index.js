/*
* Dependencias
*/

var http = require('http');
var express = require('express');
var path = require('path');
//var Routing = require('./routes/index.js')
var bodyParser = require('body-parser');
var methodOverride = require("method-override");
//modelos y controladores
var PropiedadCtrl = require('./controllers/Propiedades.js');
//var socketio = require('socket.io')

var port = 8082
var app = express()

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());


//rutas index

var router = express.Router();

// Index - Route

app.use(express.static('public'));


//api rutas
var api = express.Router();
api.route('/propiedades')
.get(PropiedadCtrl.findAll);


api.route('/tipos')
.get(PropiedadCtrl.findTypes);

api.route('/ciudades')
.get(PropiedadCtrl.findCity);

api.route('/parametros/:ciudad/:tipo/:precioMin/:precioMax')
.get(PropiedadCtrl.findByParameters);

app.use('/api', api);


//app.use('/',Routing)
var Server = http.createServer(app)

Server.listen(port, function () {
    console.log('Buscador listo en puerto: '+port)
})
