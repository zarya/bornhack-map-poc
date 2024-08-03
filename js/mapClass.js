class BHMap {
  constructor(div) {
    this.findGrid = this.findGrid.bind(this)
    this.findGridEach = this.findGridEach.bind(this)
    this.onEachGrid = this.onEachGrid.bind(this)
    this.onEachGridClick = this.onEachGridClick.bind(this)
    this.onEachMqttFeature = this.onEachMqttFeature.bind(this)
    this.cols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'AA', 'AB', 'AC', 'AD', 'AE', 'AF', 'AG', 'AH', 'AI', 'AJ', 'AK', 'AL', 'AM', 'AN', 'AO', 'AP', 'AQ', 'AR', 'AS', 'AT', 'AU', 'AV', 'AW', 'AX', 'AY', 'AZ'];
    this.map = L.map(div).setView([55.38806, 9.93970], 17);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    this.gridLayer = L.geoJson(json_Gridsquares_4, {
      onEachFeature: this.onEachGrid,
      style: {
        color: "gray",
        fillOpacity: 0.0,
        weight: 0.5
      }
    }).addTo(this.map);

    this.mqttLayer = L.geoJson(mqttTest, {
      onEachFeature: this.onEachMqttFeature,
      style: {
        color: "green",
        fillOpacity: 1.0,
        weight: 0.5
      }
    }).addTo(this.map);
  }

  findSquare(lat, lon) {
    const m1 = L.latLng([lat, lon]);
    this.gridLayer.eachLayer(function(e) {
      if (e.getBounds().contains(m1)) {
        this.selectedLayer = e;
      }
    });
    return this.selectedLayer;
  }

  findGrid(fullgrid) {
    this.resetStyle();
    let regex = /^([A-Z]+)([0-9]+)/g;
    const reggrid = regex.exec(fullgrid);
    const col = this.cols.indexOf(reggrid[1]) + 2;
    const row = Number(reggrid[2]) + 1
    document.getElementById('selectedGrid').innerHTML = reggrid[0]; 
    this.gridLayer.eachLayer(layer => this.findGridEach(layer, col, row));
    return this.selectedLayer;
  }

  findGridEach(layer, col, row) {
      if (Number(layer.feature.properties.col_index) == col && Number(layer.feature.properties.row_index) == row) {
        this.selectedLayer = layer;
        return layer;
      }
  }

  resetStyle() {
    if (this.selectedLayer) {
      this.selectedLayer.setStyle({fillOpacity: 0.0});
      this.selectedLayer = undefined;
    }
  }

  onEachGrid(_feature, layer) {
    layer.on('click', layer => this.onEachGridClick(layer));
  }

  onEachGridClick(e) {
    this.resetStyle();
    e.target.setStyle({fillOpacity: 1.0});
    this.selectedLayer = e.target;
    let center = e.target.getCenter();
    document.getElementById('selectedGridCenter').innerHTML = center.lat + "/" + center.lng;
    document.getElementById('selectedGrid').innerHTML = this.cols[e.target.feature.properties.col_index - 2] + (e.target.feature.properties.row_index - 1);
    document.getElementById('grid').value = ""; 
  }

  onEachMqttFeature(_feature, layer) {
    layer.on('click', function (e) {
      console.log(e);
    });
  }
}
