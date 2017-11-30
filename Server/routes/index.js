var express = require('express')
var path = require('path')
var Router = express.Router()

//var viewPath = path.join(__dirname,'../') + 'public/'

Router.get('/',function(req,res){
  res.sendFile(path.join(__dirname, '../../public', 'index.html'));
  res.end()
})

Router.get('/admin',function(req,res){
  res.send('usuarios')
  res.end()
})

module.exports = Router
