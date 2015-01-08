/*--------------------------------------------------------
GENERAL MAP SETUP
--------------------------------------------------------*/

// Dichiaro ed assegno la mappa + opzioni
var map = L.map('map').setView([45.468874, 9.187517], 14);
// Attribution Link
mapLink =
'<a href="http://openstreetmap.org">OpenStreetMap</a>';
// BaseLayer 
L.tileLayer(
    'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; ' + mapLink + ' Contributors',
        maxZoom: 18,
    }).addTo(map);

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
var optionsLambrate = {
    showArea: true,
    shapeOptions: {
        name: "lambrate",
        stroke: true,
        color: '#000000',
        weight: 2,
        opacity: 0.8,
        fill: true,
        fillColor: null, //same as color by default
        fillOpacity: 0.2,
        clickable: true
    }
};
var optionsBarona = {    
    showArea: true,
    shapeOptions: {
        name: "barona",
        stroke: true,
        color: 'yellow',
        weight: 2,
        opacity: 0.8,
        fill: true,
        fillColor: null, //same as color by default
        fillOpacity: 0.2,
        clickable: true

    }
};


/*-----------------------------------------------------------------------------
                                       EVENT HANDLERS
-----------------------------------------------------------------------------*/
// Event Handlers per disegnare poligoni cliccando sui corrispondenti nomi dei quartieri nel menù 
$('#Lambrate').on('click', function  () {
    var polyDrawerLambrate = new L.Draw.Polygon(map, optionsLambrate).enable()    
});
$('#Barona').on('click', function  () {
    var polyDrawerBarona = new L.Draw.Polygon(map, optionsBarona).enable()   
});

// Event Handler for re-drawing the shapes
$('#redraw').click(function(){
    // var $this = $(this);    
    var $this = $(this);
    // $this.addClass('attivo');
    if(!$this.hasClass('attivo')){
        // redraw functionality enabled
        editor.enable();
        // chenges confirmation button down
        // $('#redraw-done').slideDown('fast');
        $('#redraw-done').toggleClass('expanded');
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
    $('#redraw-done').toggleClass('expanded');
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
    // Questo è il passaggio in cui i poligoni disegnati vengono aggiunti al layer di overlay.
    drawnItems.addLayer(layer);
    // Fin qui i comandi per disegnare su mappa
    // Qui sotto invece i passaggi per stampare a video/su txt
    // Converto ogni layer in geoJSON
    var shape = layer.toGeoJSON()
    // Preparo l'oggtto per la stampa a video
    var shape_to_print = drawnItems.toGeoJSON();
    // Stampo nell'area di testo gli oggetti correntemente generati 
    $('#data').val(JSON.stringify(shape_to_print, null, '\t'));
    // a = drawnItems.toGeoJSON();
    // Preparo l'oggetto per la stampa su file
    stampoSuFile(drawnItems.toGeoJSON());
});


// Preparo l'oggetto per il db
// TODO: mi sembra che questa parte sia stata fatta con FLask. Da controllare. Sicuramente è da implementare con Postgres e non SQLite
