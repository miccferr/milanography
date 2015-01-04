// Dichiaro ed assegno la mappa + opzioni
var map = L.map('map').setView([-41.2858, 174.78682], 14);
// Attribution
mapLink =
'<a href="http://openstreetmap.org">OpenStreetMap</a>';
// BaseLayer
L.tileLayer(
    'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; ' + mapLink + ' Contributors',
        maxZoom: 18,
    }).addTo(map);

// Layer oggetti disegnati
var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

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

/* QUesta parte in cui creo i controlli non mi serve più:
1- perchè non ho più i controlli
2- perchè le opzioni che racchiudevano le ho ora spostate negli oggetti opzioniNOME-QUARTIERE
*/
// var drawControl = new L.Control.Draw({
//     position: 'topleft',
//     draw: {
//         polygon:{
//             shapeOptions: {
//                 color: 'blue'                    
//             },
//         },

//         polyline:false,
//         rectangle: false,
//         circle: false,
//         marker: false
//     }
// });
// map.addControl(drawControl); 

// var drawControl2 = new L.Control.Draw({
//     position: 'topleft',
//     draw: {
//         polygon: {
//             shapeOptions: {
//                 color: 'yellow'                        
//             },
//         },
//         polyline:false,
//         rectangle: false,
//         circle: false,
//         marker: false
//     }
// });
// map.addControl(drawControl2);


// OPZIONI QUARTIERI
var optionsLambrate = {
    showArea: true,
    shapeOptions: {
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

// 
$('#Lambrate').on('click', function  () {
    console.log(drawControl.options.draw.polygon.shapeOptions.color);
    var polyDrawer = new L.Draw.Polygon(map, optionsLambrate).enable()
    
    console.log("Lambrate");
});

$('#Barona').on('click', function  () {
    console.log(drawControl2.options.draw.polygon.shapeOptions.color);
    new L.Draw.Polygon(map, drawControl2.options.polygon).enable()
    
    console.log("Barona");
});

// var oggetti = [];
map.on('draw:created', function(e) {
    // Cancello i valori precedenti nell'area di testo
    $('#data').val(' ');
    var type = e.layerType;
    layer = e.layer;   
    // cancello la vecchia forma se ne disegno una nuova
    // in modo da averne sempre una e solo una per ogni quartiere
    // è un metodo scemo ma per ora uso questo.
    // il top sarebbe riuscire a fissare il limite ad 1 e poi dare la possibilità di editare
    if(drawnItems && drawnItems.getLayers().length!==0){
        drawnItems.clearLayers();
    }
    drawnItems.addLayer(layer);
    // Converto ogni layer in geoJSON
    var shape = layer.toGeoJSON()
    // Preparo l'oggtto per la stampa a video
    var shape_to_print = drawnItems.toGeoJSON();
    // Stampo nell'area di testo gli oggetti correntemente generati 
    $('#data').val(JSON.stringify(shape_to_print, null, '\t'));
    // a = drawnItems.toGeoJSON();
    stampoSuFile(drawnItems.toGeoJSON());
    

});



// Preparo l'oggetto per la stampa su file     
// console.log(drawnItems);    
stampoSuFile(drawnItems.toGeoJSON());





// Preparo l'oggetto per il db
// TODO
