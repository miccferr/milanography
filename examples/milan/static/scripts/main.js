

/*--------------------------------------------------------
GENERAL MAP SETUP
--------------------------------------------------------*/
var NE = L.latLng(45.579685412192674,9.4647216796875);
var SW = L.latLng(45.33887388364058,8.888969421386719);
var boundaries = L.latLngBounds(SW,NE);
var map = L.map('map', {maxBounds: boundaries}).setView([45.4691000386715, 9.196672439575195], 14);

// BaseLayer 
// inizializzo ed assengno toner map
var layerToner = new L.StamenTileLayer("toner");

var layerDarkMatter = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png',{
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
});

map.addLayer(layerDarkMatter);

// Attribution Link
var mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
// OSM LAYER
var OSM = L.tileLayer(
    'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; ' + mapLink + ' Contributors',
        maxZoom: 18,
    });

var levels = {
    'OSM': OSM,
    'Toner': layerToner,
    'DarkMatter': layerDarkMatter
}
L.control.layers(null,levels, { position: 'topleft' }).addTo(map);
// L.control.layers({ position: 'topleft' });
map.scrollWheelZoom.disable();
// // mio token mapbox
// nota che se uso questo costruttore per qualche motivo perdo i tooltips del puntatore con scritto "clicca per editare ecc"
// L.mapbox.accessToken = 'your aPI';
// // map declaration
// var map = L.mapbox.map('map');
// // baseLayer declaration % initialization
// var stamenLayer = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {
//   attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
// }).addTo(map);
// // let's go!
// map.setView([45.468874, 9.187517], 12);


// Overlay Layers for each polygon Neighborhood
var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);
// Initialize the draw control and pass it the FeatureGroup of editable layers
// but do not add it to the map yet
var drawControl = new L.Control.Draw({
    edit: {
        featureGroup: drawnItems
    }
});
// Editing object initialization
var editor = new L.EditToolbar.Edit(map, {
    featureGroup: drawnItems,
    selectedPathOptions: drawControl.options.edit.selectedPathOptions
});
// Remover object initialization
var remover = new L.EditToolbar.Delete(map, {
    featureGroup: drawnItems,
});

/*--------------------------------------------------------
UTILITIES FUNCTIONS
--------------------------------------------------------*/

$(window).load(function(){
    $('.btn-quartieri').each(function(index, el) {
       var opt = $(this).data('opt');
     // console.log(opt);
     $(this).css('background',optionsSS[opt].shapeOptions.color);  

 })
})


/*--------------------------------------------------------
UTILITIES FUNCTIONS
--------------------------------------------------------*/

/**
 * [stampoSuFile Trasforma un'input JSON in txt semplice]
 * @param  {[type]} a [JSON in input]
 * @return {[type]}   [un oggetto Blob (txt in questo caso)]
 */
 function stampoSuFile(a) {
    // var a = drawnItems.toGeoJSON();
    shape_to_txt = JSON.stringify(a, null, '\t')
    var blob = new Blob([shape_to_txt], {
        type: "text/plain;charset=utf-8"
    });
    return blob;
};
/**
 * [isInArray Controlla se un valore è presente in un array]
 * @param  {qualisasi}  value valore da controllare
 * @param  {array}  array l'array in cui controllare la presenza del valore
 * @return {Boolean}       the function returns a boolean in case of absence/presence of a value.
 * function from https://stackoverflow.com/users/304588/richard-neil-ilagan
 */
 function isInArray(value, array) {
  return array.indexOf(value) > -1;
}

/*--------------------------------------------------------
NEIGHBORHOODS SETUP
--------------------------------------------------------*/
function neighborhoodsColorOption (name, color) {
    this.showArea = true;
    this.shapeOptions = {
        name : name,
        stroke: true,
        color: color,
        weight: 2,
        opacity: 0.8,
        fill: true,
        /*fillColor: null, //same as color by default*/
        fillColor: color, //same as color by default
        fillOpacity: 0.2,
        clickable: true

    };
}

// #d9dc94 #74c399 #7bca9f #cd90bb #cadd95

var optionsSS = {};
optionsSS.CentroStorico = new neighborhoodsColorOption('Centro storico', '#8AA9D5')
optionsSS.StazioneCentrale = new neighborhoodsColorOption('Stazione Centrale', '#8d95d8')
optionsSS.Gorla = new neighborhoodsColorOption('Gorla', '#9f90da')
optionsSS.Turro = new neighborhoodsColorOption('Turro', '#b793dc')
optionsSS.Greco = new neighborhoodsColorOption('Greco', '#cf96de')
optionsSS.Crescenzago = new neighborhoodsColorOption('Crescenzago', '#b1dce2')
optionsSS.CittaStudi = new neighborhoodsColorOption('Città Studi', '#FAD2DB')
optionsSS.Lambrate = new neighborhoodsColorOption('Lambrate', '#D6C7DE')
optionsSS.Venezia = new neighborhoodsColorOption('Venezia', '#7FE4D6')
optionsSS.Vittoria = new neighborhoodsColorOption('Vittoria', '#4ACCF0')
optionsSS.Forlanini = new neighborhoodsColorOption('Forlanini', '#FB8EC3')
optionsSS.Vigentino = new neighborhoodsColorOption('Vigentino', '#FFC0A8')
optionsSS.Chiaravalle = new neighborhoodsColorOption('Chiaravalle', '#C2D1E9')
optionsSS.Gratosoglio = new neighborhoodsColorOption('Gratosoglio', '#82cfa6')
optionsSS.Barona  = new neighborhoodsColorOption('Barona ', '#d9aa8f')
optionsSS.Lorenteggio = new neighborhoodsColorOption('Lorenteggio', '#d297c2')
optionsSS.Baggio = new neighborhoodsColorOption('Baggio', '#A0E9C3')
optionsSS.DeAngeli = new neighborhoodsColorOption('De Angeli', '#EFED8F')
optionsSS.SanSiro = new neighborhoodsColorOption('San Siro', '#FFA188')
optionsSS.Fiera = new neighborhoodsColorOption('Fiera', '#5FC7B4')
optionsSS.Gallaratese = new neighborhoodsColorOption('Gallaratese', '#bbde97')
optionsSS.SanLeonardo = new neighborhoodsColorOption('San Leonardo', '#6ebd93')
optionsSS.QuartoOggiaro = new neighborhoodsColorOption('Quarto Oggiaro', '#d89ec8')
optionsSS.StazioneGaribaldi = new neighborhoodsColorOption('Stazione Garibaldi', '#78C6E1')
optionsSS.Niguarda = new neighborhoodsColorOption('Niguarda', '#c6e5ec')



/*-----------------------------------------------------------------------------
                                       EVENT HANDLERS
                                       -----------------------------------------------------------------------------*/
// ADD SLIDEDOWN ANIMATION TO DROPDOWN //
  // $('#redraw').on('show.bs.dropdown', function(e){
  //   $(this).find('.dropdown-menu').first().stop(true, true).slideDown();
  // });

  // // ADD SLIDEUP ANIMATION TO DROPDOWN //
  // $('.dropdown').on('hide.bs.dropdown', function(e){
  //   $(this).find('.dropdown-menu').first().stop(true, true).slideUp();
  // });

// Event Handlers per disegnare poligoni cliccando sui corrispondenti nomi dei quartieri nel menù 


// var polyDrawer;
var polyDrawer = new L.Draw.Polygon(map);
$('.btn-quartieri').click(function(){
    if($(this).hasClass('selected'))
      {$(this).removeClass('selected'); 
  console.log('disattivo');
           //if there is a code for disabling current crayon add it here
           polyDrawer.disable();
       }
       else{
          $('.btn-quartieri').removeClass('selected');
          polyDrawer.disable();
          console.log('attivo');
          $(this).addClass('selected');
          //if there is a code for selecting or disabling crayon add here
          var opt = $(this).data('opt');
          polyDrawer.setOptions(optionsSS[opt]);
          polyDrawer.enable();
      }
  });



// Event Handler for re-drawing the shapes
// $(".menu-ui a").slideUp();
//slide down the link list below the h3 clicked - only if its closed
$('#redraw').click(function(){
    // var $this = $(this);    
    var $this = $(this);
    // $this.addClass('attivo');
    if(!$this.hasClass('attivo')){
        // redraw functionality enabled
        editor.enable();
        // changes confirmation button down
        // $('#redraw-done').slideDown('fast');
        // change button class
        $this.addClass('attivo')
    };
});
$('#redraw-done').click(function() {
    var $this = $(this);
    // redraw functionality disabled
    editor.disable();
    // changes confirmation button up
    // $this.slideUp('fast');
    // change button class
    $('#redraw').removeClass('attivo');

    
});

// Event Handler for deleting the shapes
$('#delete').click(function(){
    // var $this = $(this);    
    var $this = $(this);
    console.log($(this));
    // $this.addClass('attivo');
    if(!$this.hasClass('attivo')){
        // redraw functionality enabled
        remover.enable();
        // chenges confirmation button down
        // $('#delete-done').slideDown('fast');
        // change button class
        $this.addClass('attivo');
    };
});
$('#delete-done').click(function(e) {

    var $this = $(this);
    // redraw functionality disabled
    remover.disable();
    // changes confirmation button up
    $this.slideUp('fast');
    // change button class
    // $('#delete').removeClass('attivo');
    // empty the drawn array
    disegnati.length = 0;    
    
});

// array storing the names of already drawn neighborhoods
disegnati = [];

map.on('draw:created' , function(e) {
    $('.btn-quartieri').removeClass('selected');     
    // Cancello i valori precedenti nell'area di testo
    $('#data').val(' ');
    var type = e.layerType;
    layer = e.layer;
    // assegno il nome del quartiere
    nomeQuartiere = layer.options.name       
    layer.bindPopup(nomeQuartiere);
    // cancello la vecchia forma se ne disegno una nuova
    // in modo da averne sempre una e solo una per ogni quartiere
    if ( !isInArray(nomeQuartiere,disegnati)){
        disegnati.push(nomeQuartiere);            
    }else{
        for (var obj in drawnItems._layers){
            if (drawnItems._layers[obj].options.name === nomeQuartiere){
                drawnItems.removeLayer(drawnItems._layers[obj])
            }
        }
    }
    drawnItems.addLayer(layer);

    // var shape = layer.toGeoJSON()
    // // toGeoJSON doesn't take into account the ShapeOptions properties, so I'm gonna do it myself!
    // // saving the neighborhood's name
    // shape.properties.name = nomeQuartiere;
    // // saving the neighborhood's color
    // coloreQuartiere = layer.options.color
    // shape.properties.color = coloreQuartiere;
    // var shape_for_db = JSON.stringify(shape);
    // console.log(shape_for_db);
});




$('#save-drawing').click(function(){
    if (drawnItems.toGeoJSON().features.length !== 0){
        var obj = drawnItems._layers
        var j = drawnItems.toGeoJSON();
        // Since toGeoJSON doesn't take into account the ShapeOptions properties, so I'm gonna do it myself!
        function exportGeoJSON () {
            var count = 0;
            Object.keys(obj).forEach(function(key) {
                // saving the neighborhood's name
                var nomeQuartiere = obj[key].options.name;
                // saving the neighborhood's color
                var coloreQuartiere = obj[key].options.color;
                j.features[count].properties['name'] = nomeQuartiere;
                j.features[count].properties['color'] = coloreQuartiere;
                count += 1 ;
            });
            return j;
        }
        exportGeoJSON();
        // var dati = JSON.stringify(drawnItems.toGeoJSON());
        var dati = JSON.stringify(j);
        console.log(dati);
        $.ajax("/save_json", {
            data: dati,
            contentType : "application/json",
            type : "POST"
        })    
    }
});




// $.when(drawnItems.toGeoJSON().features.length !== 0).done(console.log('DESIGNATO'));
// if (drawnItems.toGeoJSON().features.length !== 0){
//     console.log('DESIGNATO');
//     $('#save-drawing').removeClass('soft-color');
// }
function exportGeoJSON () {
    var obj = drawnItems._layers
    var count = 0;
    var j = drawnItems.toGeoJSON();
    Object.keys(obj).forEach(function(key) {
        var nomeQuartiere = obj[key].options.name;
        j.features[count].properties['name'] = nomeQuartiere
        count += 1 ;
        
    });
    return j;
}