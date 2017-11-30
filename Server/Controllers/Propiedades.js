//Dependencias
var Routing = require('../routes/index.js')
var claseP = require('../model/propiedad.js')
var Enumerable = require('linq');
var fs = require('fs');
var path = require('path');

var directorio = path.join(__dirname,'../model/data.json')
var data = file = JSON.parse(fs.readFileSync(directorio, 'utf8'));
//GET - Retornar todas la propiedades
exports.findAll = function(req, res) {

  console.log('GET /propiedades')
  res.status(200).jsonp(data);
  //return propiedades;
};


//GET - Retornar tipos de propiedades
exports.findTypes = function(req, res) {
  //var data = file = JSON.parse(fs.readFileSync('./Server/model/data.json', 'utf8'));
  var tipos = Enumerable.from(data)
  .select('x=> x.Tipo')
  .distinct()
  .toArray();
  console.log('GET /tipos')
  res.status(200).jsonp(tipos);
  //return tipos;
};


//GET - Retornar Ciudades de propiedades
exports.findCity = function(req, res) {
  var ciudades = Enumerable.from(data)
  .select('x=> x.Ciudad')
  .distinct()
  .toArray();
  console.log('GET /ciudades');
  res.status(200).jsonp(ciudades);

};
//
//
//GET - Retornar todas la propiedades
exports.findByParameters = function(req, res) {
  var parametros = Enumerable.from(data)
  .where(x => x.Ciudad == req.params.ciudad
              &&
              x.Tipo == req.params.tipo
              &&
              x.Precio >= req.params.precioMin &&
              x.Precio <= req.params.precioMax
            )
  .distinct()
  .toArray();
  console.log('GET /propiedades/parametros');
  res.status(200).jsonp(parametros);
};
