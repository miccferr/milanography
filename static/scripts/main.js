/*--------------------------------------------------------
GENERAL MAP SETUP
--------------------------------------------------------*/
// vecchie opzioni
// inizializzo ed assengno toner map
var layerToner = new L.StamenTileLayer("toner");
// // Dichiaro ed assegno la mappa + opzioni
var map = L.map('map').setView([45.4691000386715, 9.196672439575195], 14);
// Attribution Link
var mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
// BaseLayer 
var OSM = L.tileLayer(
    'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; ' + mapLink + ' Contributors',
        maxZoom: 18,
    }).addTo(map);

L.control.layers({
    'OSM': OSM,
    'Toner': layerToner
}).addTo(map);

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



var optionsSS = {};
optionsSS.CentroStorico = new neighborhoodsColorOption('Centro storico', '#9bcbd2')
optionsSS.StazioneCentrale = new neighborhoodsColorOption('Stazione Centrale', '#a2d1d7')
optionsSS.Gorla = new neighborhoodsColorOption('Gorla', '#aad7dd')
optionsSS.Turro = new neighborhoodsColorOption('Turro', '#b1dce2')
optionsSS.Greco = new neighborhoodsColorOption('Greco', '#f3f3db')
optionsSS.Crescenzago = new neighborhoodsColorOption('Crescenzago', '#eef4dd')
optionsSS.CittaStudi = new neighborhoodsColorOption('Città Studi', '#eaf4df')
optionsSS.Lambrate = new neighborhoodsColorOption('Lambrate', '#e7f5e1')
optionsSS.Venezia = new neighborhoodsColorOption('Venezia', '#e4f6e3')
optionsSS.Vittoria = new neighborhoodsColorOption('Vittoria', '#e4f7e7')
optionsSS.Forlanini = new neighborhoodsColorOption('Forlanini', '#6ebd93')
optionsSS.Vigentino = new neighborhoodsColorOption('Vigentino', '#74c399')
optionsSS.Chiaravalle = new neighborhoodsColorOption('Chiaravalle', '#7bca9f')
optionsSS.Gratosoglio = new neighborhoodsColorOption('Gratosoglio', '#82cfa6')
optionsSS.Barona  = new neighborhoodsColorOption('Barona ', '#d9aa8f')
optionsSS.Lorenteggio = new neighborhoodsColorOption('Lorenteggio', '#dabc90')
optionsSS.Baggio = new neighborhoodsColorOption('Baggio', '#dbce92')
optionsSS.DeAngeli = new neighborhoodsColorOption('De Angeli', '#d9dc94')
optionsSS.SanSiro = new neighborhoodsColorOption('San Siro', '#cadd95')
optionsSS.Fiera = new neighborhoodsColorOption('Fiera', '#bbde97')
optionsSS.Gallaratese = new neighborhoodsColorOption('Gallaratese', '#cd90bb')
optionsSS.SanLeonardo = new neighborhoodsColorOption('San Leonardo', '#d297c2')
optionsSS.QuartoOggiaro = new neighborhoodsColorOption('Quarto Oggiaro', '#d89ec8')
optionsSS.StazioneGaribaldi = new neighborhoodsColorOption('Stazione Garibaldi', '#dda6cd')
optionsSS.Niguarda = new neighborhoodsColorOption('Niguarda', '#c6e5ec')



/*-----------------------------------------------------------------------------
                                       EVENT HANDLERS
-----------------------------------------------------------------------------*/
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
        $('#redraw-done').slideDown('fast');
        // change button class
        $this.addClass('attivo')
    };
});
$('#redraw-done').click(function() {
    var $this = $(this);
    // redraw functionality disabled
    editor.disable();
    // changes confirmation button up
    $this.slideUp('fast');
    // change button class
    $('#redraw').removeClass('attivo');

    
});

// $("#editButton").click(function()
// {
//     $('div').toggleClass('expanded');
// });


// Event Handler for deleting the shapes
$('#delete').click(function(){
    // var $this = $(this);    
    var $this = $(this);
    // $this.addClass('attivo');
    if(!$this.hasClass('attivo')){
        // redraw functionality enabled
        remover.enable();
        // chenges confirmation button down
        $('#delete-done').slideDown('fast');
        // change button class
        $this.addClass('attivo');
    };
});
$('#delete-done').click(function() {
    var $this = $(this);
    // redraw functionality disabled
    remover.disable();
    // changes confirmation button up
    $this.slideUp('fast');
    // change button class
    $('#delete').removeClass('attivo');
    
});

// array storing the names of already drawn neighborhoods
disegnati = [];


// Vecchio codice
// map.on('draw:created' , function(e) {
//     var type = e.layerType;
//     var layer = e.layer;
//     nomeQuartiere = layer.options.name    
//     if ( !isInArray(nomeQuartiere,disegnati)){
//         disegnati.push(nomeQuartiere);            
//     }else{
//         for (var obj in drawnItems._layers){
//             if (drawnItems._layers[obj].options.name === nomeQuartiere){
//                 drawnItems.removeLayer(drawnItems._layers[obj])
//             }
//         }
//     }
// console.log("ddd");
// drawnItems.addLayer(layer);
// }); 


map.on('draw:created' , function(e) {
    $('.btn-quartieri').removeClass('selected');     
    // Cancello i valori precedenti nell'area di testo
    $('#data').val(' ');
    var type = e.layerType;
    layer = e.layer;
    // assegno il nome del quartiere
    nomeQuartiere = layer.options.name       
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
    var shape = layer.toGeoJSON()
    // Preparo l'oggtto per la stampa a video
    var shape_to_print = drawnItems.toGeoJSON();
    
    // Stampo nell'area di testo gli oggetti correntemente generati 
    $('#data').val(JSON.stringify(shape_to_print, null, '\t'));
    
    // Preparo l'oggetto per la stampa su file
    // stampoSuFile(drawnItems.toGeoJSON());
});

$('#save-drawing').click(function(){
    var dati = JSON.stringify(drawnItems.toGeoJSON());
    $.ajax("/cicci", {
    data: dati,
    contentType : "application/json",
    type : "POST"
    })
});

// Preparo l'oggetto per il db
// TODO: mi sembra che questa parte sia stata fatta con FLask. Da controllare. Sicuramente è da implementare con Postgres e non SQLite
