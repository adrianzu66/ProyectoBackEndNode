var fs = require('fs');

class Propiedad{
  constructor(id, direccion, ciudad, telefono, codigo_Postal, tipo, precio){
    this._id = id;
    this._direccion = direccion;
    this._ciudad = ciudad;
    this._telefono = telefono;
    this._codigo_Postal = codigo_Postal;
    this._tipo = tipo;
    this._precio = precio;
  }

  GetAllData(){
    var propiedadLista = [];
    var file;
    // fs.readFile('data.json', 'utf8', function (err, data) {
    //     if (err) throw err;
    //     file = JSON.parse(data);
    //   });

    file = JSON.parse(fs.readFileSync('./Server/model/data.json', 'utf8'));

      file.forEach((item)=>{
        propiedadLista.push(new Propiedad(item.Id, item.Direccion, item.Telefono,
                                          item.Codigo_Postal, item.Tipo, item.Precio));
      })


    return propiedadLista;
  }
}
module.exports = Propiedad;
