        var map = L.map('map').setView([-41.2858, 174.78682], 14);
        mapLink =
        '<a href="http://openstreetmap.org">OpenStreetMap</a>';
        L.tileLayer(
            'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; ' + mapLink + ' Contributors',
                maxZoom: 18,
            }).addTo(map);

        var drawnItems = new L.FeatureGroup();
        map.addLayer(drawnItems);

        var drawControl = new L.Control.Draw({
            position: 'topright',
            draw: {
                polygon:{

                    name :'lambrate',
                    shapeOptions: {
                        color: 'red'                    
                    },
                },

                polyline:false,
                rectangle: false,
                circle: false,
                marker: false
            }
        });
        map.addControl(drawControl);
        

        var drawControl2 = new L.Control.Draw({
            position: 'topright',
            draw: {
                polygon: {
                    shapeOptions: {
                        color: 'yellow'                        
                    },
                },
                polyline:false,
                rectangle: false,
                circle: false,
                marker: false
            }
            // ,
            // edit: {
            //     featureGroup: drawnItems,
            //     // edit:false
            // }
        });
        map.addControl(drawControl2);

        function stampoSuFile(a) {
            // var a = drawnItems.toGeoJSON();
            shape_to_txt = JSON.stringify(a, null, '\t')
            var blob = new Blob([shape_to_txt], {
                type: "text/plain;charset=utf-8"
            });
            return blob;
        };

        // var oggetti = [];
        map.on('draw:created', function(e) {
            // Cancello i valori precedenti nell'area di testo
            $('#data').val(' ');
            console.log(e);
            var type = e.layerType,
            layer = e.layer;
            // console.log(layer);
            // console.log('layer e: ' + layer);   
            // cancello la vecchia forma se ne disegno una nuova
            // in modo da averne sempre una se solo una per ogni quartiere
            // è un metodo scemo ma per ora uso questo.
            // il top sarebbe riuscire a fissare il limite ad 1 e poi dare la possibilità di editare
            if(drawnItems && drawnItems.getLayers().length!==0){
                drawnItems.clearLayers();
            }
            drawnItems.addLayer(layer);        

            // drawnItems.addLayer(layer);
            console.log(drawnItems);

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
