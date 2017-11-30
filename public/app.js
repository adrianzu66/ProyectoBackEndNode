//Inicializador del elemento Slider
$("#rangoPrecio").ionRangeSlider({
  type: "double",
  grid: false,
  min: 0,
  max: 100000,
  from: 1000,
  to: 20000,
  prefix: "$"
})

function setSearch() {
  let busqueda = $('#checkPersonalizada')
  busqueda.on('change', (e) => {
    if (this.customSearch == false) {
      this.customSearch = true
    } else {
      this.customSearch = false
    }
    $('#personalizada').toggleClass('invisible')

  })
  //cargar combos
  var urlCiudades = "http://localhost:8082/api/ciudades";
  $.get(urlCiudades,function(response){
      appendCiudades(response);
  })

  var urlTipos = "http://localhost:8082/api/tipos";
  $.get(urlTipos,function(response){
      appendTipos(response);
  })

  let btnBuscar = $('#buscar');
  btnBuscar.on('click', (e) => {
    var estado = document.getElementById("checkPersonalizada");//$('#checkPersonalizada');
    if (estado.checked == false){
      var urlPropiedades = "http://localhost:8082/api/propiedades";
      $.get(urlPropiedades,function(response){
          appendPropiedades(response);
        })
    }
    else{
      var ciudad = $('#ciudad').val();
      var tipo = $('#tipo').val();
      var valores = $('#rangoPrecio').val().split(';');
      var valMin = '$'+valores[0];
      var valMax = '$'+valores[1];

      var urlParametros = 'http://localhost:8082/api/parametros/'+ ciudad +'/'+ tipo +'/'+ valMin +'/' + valMax;
      $.get(urlParametros,function(response){
          appendPropiedades(response);
        })
    }
  })
}

setSearch()

//cargar combobox
function appendCiudades(response){
  response.forEach((item) =>{
    $('#ciudad').append("<option value='"+item+"'>"+item+"</option>");
  })
}

function appendTipos(response){
  response.forEach((item) =>{
     $('#tipo').append("<option value='"+item+"'>"+item+"</option>");
  })
}

//traer todos los datos
function appendPropiedades(response){

  $('.lista').empty();

  response.forEach((item) =>{
    var appendPropiedad = '<div class="card horizontal">'+
      '<div class="card-image">'+
        '<img src="img/home.jpg">'+
      '</div>'+
      '<div class="card-stacked">'+
        '<div class="card-content">'+
          '<div>'+
            '<b>Direccion: '+ item.Direccion +' </b><p></p>'+
          '</div>'+
          '<div>'+
            '<b>Ciudad: '+ item.Ciudad +'</b><p></p>'+
          '</div>'+
          '<div>'+
            '<b>Telefono: '+ item.Telefono +'</b><p></p>'+
          '</div>'+
          '<div>'+
            '<b>Código postal: ' + item.Codigo_Postal +'</b><p></p>'+
          '</div>'+
          '<div>'+
            '<b>Precio: '+ item.Precio +'</b><p></p>'+
          '</div>'+
          '<div>'+
            '<b>Tipo: '+ item.Tipo +'</b><p></p>'+
          '</div>'+
        '</div>'+
        '<div class="card-action right-align">'+
          '<a href="#">Ver más</a>'+
        '</div>'+
      '</div>'+
    '</div>';

    $('.lista').append(appendPropiedad);
  })
}
