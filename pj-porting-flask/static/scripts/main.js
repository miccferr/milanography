// Dichiaro ed assegno la mappa + opzioni
var map = L.map('map').setView([-41.2858, 174.78682], 14);
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
// var drawnItemsBarona = new L.FeatureGroup();
// map.addLayer(drawnItemsBarona);

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

// --------------------------------------------------------------------------------
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
// --------------------------------------------------------------------------------

// OPZIONI QUARTIERI
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


// lettere = "abcdefghilmnopqrstuvz"
// parola= "Quel fez sghembo copre davanti".lower().replace(' ','')
// trovate = []
// for x in parola:
//     if x not in trovate: #così elimino i doppioni, perchè prendo solo quelle lettere che non ci sono di già
//         trovate.append(x)
// print sorted(trovate) == list(lettere) #confronto quindi con il mio array delle lettere dell'alfabeto italiano, convertendo però tutto in liste
// print ''.join(sorted(trovate)) == lettere #alternativamente potevo convertire tutti gli elementi di "trovate" in stringa e poi compararlo con lettere
// 
// 
// // NomiQuartieri = "abcdefghilmnopqrstuvz"
// parola= "Quel fez sghembo copre davanti".lower().replace(' ','')


// DOVREBBE FUNZIONARE SEGUENDO LO SCHEMA DI QUESTO PSEUDO-CODICE
// disegnati = []
// for x in drawnItems().getLayers().options.name
//     if x not in disegnati
//         disegnati.push(x)
//         drawnItems.addLayer(layer);
//      else
//          drawnItems.clearLayers(x);

// Event Handlers per disegnare poligoni cliccando sui corrispondenti nomi dei quartieri nel menù 
$('#Lambrate').on('click', function  () {
    var polyDrawerLambrate = new L.Draw.Polygon(map, optionsLambrate).enable()
    // console.log("Lambrate");
    // // var drawnItems = new L.FeatureGroup();
    // map.addLayer(drawnItems);
    // var elencoNomi = [];
});
 
 $('#Barona').on('click', function  () {
    var polyDrawerBarona = new L.Draw.Polygon(map, optionsBarona).enable()
    // console.log("Barona");   
    // var drawnItems = new L.FeatureGroup();
    // map.addLayer(drawnItems);
    // var elencoNomi = [];      
});
 
map.on('draw:created' , function(e) {
    var type = e.layerType;
    var layer = e.layer;
    var nome = layer.options.name
    console.log(nome);
    // elencoNomi.push(nome);    
    // var elencoNomiUnici = $.unique(elencoNomi);
    drawnItems.addLayer(layer);
    if(drawnItems && drawnItems.getLayers().length !== 0){
    drawnItems.clearLayers();
};
});

// map.on('draw:created' , function(e) {
//     var type = e.layerType;
//     var layer = e.layer;
//     var nome = layer.options.name
//     elencoNomi.push(nome);    
//     var elencoNomiUnici = $.unique(elencoNomi);
//     drawnItems.addLayer(layer);
//     if(drawnItems && drawnItems.getLayers().length!==1){
//     drawnItems.clearLayers();
// };
// });

    // jQuery.each(drawnItems.getLayers()[i].options, function(i, val) {
    //     console.log(val);
        // console.log(drawnItems.getLayers()[i].options.name);
        // console.log(i);
        // console.log(val.options.name);
        // $.each($.unique(val.options.name), function(index, val) {
        //       if val.length> 1
        //         console.log("asda");
        //  }); 
        
            // if (drawnItems.getLayers()[i].options.name > 1)
            //     console.log("più di uno");
        

        // count = 0;
        // for // var lung = drawnItems.getLayers()[i].length
        // if (drawnItems.getLayers()[i].length > 0 )
        //     console.log("più di uno");
    // });
    // elementi = [];
    // var elementi = drawnItems.getLayers() 
    // console.log(elementi);
    // for (var i=0; i<elementi.length; i++)
    //     console.log(elementi[i]);
    
    // for (nomeUnico in elencoNomiUnici)
    //     for (elemento in elementi)
    //         if (elementi[elemento].options.name===elencoNomiUnici[nomeUnico].length!==1)
    //             drawnItems.clearLayers(elementi[elemento].options.name===elencoNomiUnici[nomeUnico]);
    
       // if(drawnItems && elemento [name].length)!==0){

       // }
    // for (var i=0; i<elencoNomiUnici.length; i++){
    //     console.log(elencoNomiUnici[i]);
    //     if(drawnItems && drawnItems.getLayers(elencoNomiUnici[i].length)!==0){
    //         // console.log(drawnItems.getLayers(name));
    //         drawnItems.clearLayers(elencoNomiUnici[i].layer);
    //     };   
    // }


// map.on('#Barona' && 'draw:created' , function(e) {
//     console.log("Barona");
//     var type = e.layerType;
//     layer = e.layer;
//     drawnItemsBarona.addLayer(layer);
//     if(drawnItemsBarona && drawnItemsBarona.getLayers().length!==0){
//         drawnItemsBarona.clearLayers();
//     };
// });

// Quando il poligono è stato disegnato allora tramite CSS impedisco che se ne possa disegnare un successivo.
// TO DO: Da implementare la possibilità di disegnare solo uno per quartiere ma più di uno per tutta la mappa (infatti uno per ogni quartiere per 10 quartieri totali)
// map.on('draw:created' , function(e) {    
//     // Cancello i valori precedenti nell'area di testo
//     $('#data').val(' ');
//     var type = e.layerType;
//     layer = e.layer;   
//     // cancello la vecchia forma se ne disegno una nuova
//     // in modo da averne sempre una e solo una per ogni quartiere
//     // è un metodo scemo ma per ora uso questo.
//     // il top sarebbe riuscire a fissare il limite ad 1 e poi dare la possibilità di editare
   
//     // Questo è il passaggio in cui i poligoni disegnati vengono aggiunti al layer di overlay.
//     // Bisgona implementare un modo per avere totlayer= totquartieri
//     // E visto che poi è un casino lavorare con un numero da 0 ad x di layer bisogna trovare il modo di unirli tutti in un unico GroupLayer e stampare/salvare su db solo quello
    
    

//     // Fin qui i comandi per disegnare su mappa
//     // Qui sotto invece i passaggi per stampare a video/su txt
//     // Converto ogni layer in geoJSON
//     var shape = layer.toGeoJSON()
//     // Preparo l'oggtto per la stampa a video
//     var shape_to_print = drawnItems.toGeoJSON();
//     // Stampo nell'area di testo gli oggetti correntemente generati 
//     $('#data').val(JSON.stringify(shape_to_print, null, '\t'));
//     // a = drawnItems.toGeoJSON();
//     stampoSuFile(drawnItems.toGeoJSON());
// });

// Preparo l'oggetto per la stampa su file
// stampoSuFile(drawnItems.toGeoJSON());

// Preparo l'oggetto per il db
// TODO: mi sembra che questa parte sia stata fatta con FLask. Da controllare. Sicuramente è da implementare con Postgres e non SQLite
