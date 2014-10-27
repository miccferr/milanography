        var map = L.map('map').setView([-41.2858, 174.78682], 14);
        mapLink =
            '<a href="http://openstreetmap.org">OpenStreetMap</a>';
        L.tileLayer(
            'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; ' + mapLink + ' Contributors',
                maxZoom: 18,
            }).addTo(map);

        var LeafIcon = L.Icon.extend({
            options: {
                shadowUrl: 'http://leafletjs.com/docs/images/leaf-shadow.png',
                iconSize: [38, 95],
                shadowSize: [50, 64],
                iconAnchor: [22, 94],
                shadowAnchor: [4, 62],
                popupAnchor: [-3, -76]
            }
        });

        var greenIcon = new LeafIcon({
            iconUrl: 'http://leafletjs.com/docs/images/leaf-green.png'
        });


        var drawnItems = new L.FeatureGroup();
        map.addLayer(drawnItems);

        var drawControl = new L.Control.Draw({
            position: 'topright',
            draw: {
                polygon: {
                    shapeOptions: {
                        color: 'purple'
                    },
                    allowIntersection: false,
                    drawError: {
                        color: 'orange',
                        timeout: 1000
                    },
                    showArea: true,
                    metric: false,
                    repeatMode: true
                },
                polyline: {
                    shapeOptions: {
                        color: 'red'
                    },
                },
                rect: {
                    shapeOptions: {
                        color: 'green'
                    },
                },
                circle: {
                    shapeOptions: {
                        color: 'steelblue'
                    },
                },
                marker: {
                    icon: greenIcon
                },
            },
            edit: {
                featureGroup: drawnItems
            }
        });
        map.addControl(drawControl);

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
            var type = e.layerType,
                layer = e.layer;
            // console.log(layer);
            // console.log('layer e: ' + layer);

            if (type === 'marker') {
                layer.bindPopup('A popup!');
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
