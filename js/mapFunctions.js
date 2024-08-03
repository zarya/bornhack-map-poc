        function findSquareProperties(lat, lon) {
          var foundProperties = null;
          const m1 = L.latLng([lat, lon]);
          gridLayer.eachLayer(function(e) {
            if (e.getBounds().contains(m1)) {
              foundProperties = e.feature.properties;
            }
          });
          return foundProperties;
        }

        function findGrid() {
            resetStyle();
            const fullgrid = document.getElementById('grid').value.toUpperCase();
            let regex = /^([A-Z]+)([0-9]+)/g;
            const reggrid = regex.exec(fullgrid);
            const col = cols.indexOf(reggrid[1]) + 2;
            const row = Number(reggrid[2]) + 1
            document.getElementById('selectedGrid').innerHTML = reggrid[0]; 
            gridLayer.eachLayer(function (layer) {
                if (Number(layer.feature.properties.col_index) == col && Number(layer.feature.properties.row_index) == row) {
                  layer.setStyle({fillOpacity: 1.0});
                  selectedLayer = layer;
                  let center = layer.getCenter();
                  document.getElementById('selectedGridCenter').innerHTML = center.lat + "/" + center.lng;
                  return;
                } 
            });
        }
        function resetStyle() {
            if (selectedLayer) {
                selectedLayer.setStyle({fillOpacity: 0.0});
                selectedLayer = undefined;
            }
        }

        function onEachFeature(feature, layer) {
          layer.on('click', function (e) {
            resetStyle();
            e.target.setStyle({fillOpacity: 1.0});
            selectedLayer = e.target;
            let center = e.target.getCenter();
            document.getElementById('selectedGridCenter').innerHTML = center.lat + "/" + center.lng;
            document.getElementById('selectedGrid').innerHTML = cols[e.target.feature.properties.col_index - 2] + (e.target.feature.properties.row_index - 1);
            document.getElementById('grid').value = ""; 
          });
        }

        function onEachMqttFeature(feature, layer) {
          layer.on('click', function (e) {
            console.log(e);
          });
        }

