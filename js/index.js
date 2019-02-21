
  /*
    Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
  */
  $.fn.scrollEnd = function(callback, timeout) {
    $(this).scroll(function(){
      var $this = $(this);
      if ($this.data('scrollTimeout')) {
        clearTimeout($this.data('scrollTimeout'));
      }
      $this.data('scrollTimeout', setTimeout(callback,timeout));
    });
  };
  /*
    Función que inicializa el elemento Slider
  */

  function inicializarSlider(){
    $("#rangoPrecio").ionRangeSlider({
      type: "double",
      grid: false,
      min: 0,
      max: 100000,
      from: 200,
      to: 80000,
      prefix: "$",
      onChange: function (data) {
          let max = data.to;
          let min = data.from;
          console.log(min,max);
        }
    });
  }
  /*
    Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
  */
  /*function playVideoOnScroll(){
    var ultimoScroll = 0,
        intervalRewind;
    var video = document.getElementById('vidFondo');
    $(window)
      .scroll((event)=>{
        var scrollActual = $(window).scrollTop();
        if (scrollActual > ultimoScroll){
         video.play();
       } else {
          //this.rewind(1.0, video, intervalRewind);
          video.play();
       }
       ultimoScroll = scrollActual;
      })
      .scrollEnd(()=>{
        video.pause();
      }, 10)
  }*/

  inicializarSlider();
  //playVideoOnScroll();

//Leer JSON y desplegar información en tarjetas
  //console.log('Correcto!!');
  document.querySelector('#mostrarTodos').addEventListener('click',leerJSON);

  function leerJSON(){
    //console.log('Dentro de la función');

    const xhttp = new XMLHttpRequest();

    xhttp.open('GET','data-1.json',true);
    xhttp.send();
    xhttp.onreadystatechange = function(){
      if(this.readyState == 4 && this.status == 200){
        //console.log(this.responseText);
        let datos = JSON.parse(this.responseText);
        //console.log(datos);
        let res = document.querySelector('#datos');
        res.innerHTML = '';

        for (let item of datos) {
          /*console.log(item);*/
          res.innerHTML += `
            <div class="col s3 m3">
              <div class="card horizontal">
                <div class="card-image" >
                  <img src="img/home.jpg">
                </div>
                <div class="card-stacked">
                  <div class="card-content">
                    <p><strong>Dirección:</strong> ${item.Direccion}</p>
                    <p><strong>Ciudad:</strong> ${item.Ciudad}</p>
                    <p><strong>Telefono:</strong> ${item.Telefono}</p>
                    <p><strong>Códigp Postal:</strong> ${item.Codigo_Postal}</p>
                    <p><strong>Tipo:</strong> ${item.Tipo}</p>
                    <p><strong>Precio:</strong> ${item.Precio}</p>
                  </div>
                  <div class="card-action">
                    <a href="#">Ver Mas</a>
                  </div>
                </div>
              </div>
            </div>
          `
        }
      }
    }
  }

//Llenar Select con Ciudades
  document.querySelector('#selectCiudad').addEventListener('onclick',llenarCombos);

  function llenarCombos(){
    //console.log('Dentro de la función llenarCiudad()');

    const xhttp = new XMLHttpRequest();

    xhttp.open('GET','data-1.json',true);
    xhttp.send();
    xhttp.onreadystatechange = function(){
      if(this.readyState == 4 && this.status == 200){
        //console.log(this.responseText);
        let datos = JSON.parse(this.responseText);
        //console.log(datos);
        let resCiudad = document.querySelector('#selectCiudad');
        let resTipo = document.querySelector('#selectTipo');
        resCiudad.innerHTML = '';
        resTipo.innerHTML = '';
        resCiudad.innerHTML = '<option value="" selected>Seleccione una Ciudad</option>';
        resTipo.innerHTML = '<option value="" selected>Seleccione un Tipo</option>';

        function onlyUnique(value, index, self) { 
          return self.indexOf(value) === index;
        }

        const result = [];
        const map = new Map();
        for (const item of datos) {
        if(!map.has(item.Ciudad)){
        map.set(item.Ciudad, true); 
        result.push({
        Ciudad: item.Ciudad
        });
        }
        }
        //console.log(result)

        result.forEach(element => {
        //console.log(element.Ciudad);
          resCiudad.innerHTML += `
            <option value="${element.Ciudad}">${element.Ciudad}</option>
          `
          
        });

        const resultT = [];
        const mapT = new Map();
        for (const item of datos) {
        if(!mapT.has(item.Tipo)){
        mapT.set(item.Tipo, true); 
        resultT.push({
        Tipo: item.Tipo
        });
        }
        }
        //console.log(resultT)

        resultT.forEach(element => {
        //console.log(element.Tipo);
          resTipo.innerHTML += `
            <option value="${element.Tipo}">${element.Tipo}</option>
          `
          
        });
      }
    }
  }
 
llenarCombos();

//Boton buscar por precio, ciudad o tipo
document.querySelector('#submitButton').addEventListener('onclick',buscar);


function buscar(){
    //console.log('Dentro de la función');
    var precio = document.querySelector('#rangoPrecio').value;
    var ciudadJSON = document.querySelector('#selectCiudad').value;
    var tipoJSON = document.querySelector('#selectTipo').value;
    var ran = precio.split(";",2)
    console.log(ran[0],ran[1],ciudadJSON,tipoJSON);

    ciudad = ciudadJSON;
    tipo = tipoJSON;
    const xhttp2 = new XMLHttpRequest();

    xhttp2.open('GET','data-1.json',true);
    xhttp2.send();
    xhttp2.onreadystatechange = function(){
      if(this.readyState == 4 && this.status == 200){
        //console.log(this.responseText);
        let datos2 = JSON.parse(this.responseText);
        //console.log(datos2);

        
        
          var prueba = datos2.filter(function(index) {
            //index equivalente a cada elemento del objeto datos2
            return index.Ciudad === ciudadJSON && index.Tipo === tipoJSON && index.Precio >= ran;
            console.log(prueba);
          });
        

        

        let res2 = document.querySelector('#datos');
        res2.innerHTML = '';

        for (let item2 of prueba) {
          /*console.log(item);*/
          res2.innerHTML += `
            <div class="col s3 m3">
              <div class="card horizontal">
                <div class="card-image" >
                  <img src="img/home.jpg">
                </div>
                <div class="card-stacked">
                  <div class="card-content">
                    <p><strong>Dirección:</strong> ${item2.Direccion}</p>
                    <p><strong>Ciudad:</strong> ${item2.Ciudad}</p>
                    <p><strong>Telefono:</strong> ${item2.Telefono}</p>
                    <p><strong>Códigp Postal:</strong> ${item2.Codigo_Postal}</p>
                    <p><strong>Tipo:</strong> ${item2.Tipo}</p>
                    <p><strong>Precio:</strong> ${item2.Precio}</p>
                  </div>
                  <div class="card-action">
                    <a href="#">Ver Mas</a>
                  </div>
                </div>
              </div>
            </div>
          `
        }
      }
    }
  }
