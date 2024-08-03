class BHMap {
  constructor(div) {
    this.onGridClick = function (_e) {}
    this.findGridName = this.findGridName.bind(this)
    this.findGridLoc = this.findGridLoc.bind(this)
    this.findGridLocEach = this.findGridLocEach.bind(this)
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
      pointToLayer: function(feature, latlng) {
        if (feature.properties.marker == "circle")
          return new L.CircleMarker(latlng, {
            radius: 5,
            color: '#FF0000'
          });
        else
          return L.marker(latlng) 
      },
      style: {
        color: "green",
        fillOpacity: 1.0,
        weight: 0.5
      }
    }).addTo(this.map);
  }

  // Find the grid locator by lat lng
  findGridLoc(lat, lon) {
    const m1 = L.latLng([lat, lon]);
    this.gridLayer.eachLayer(e => this.findGridLocEach(e,m1));
    return this.selectedLayer;
  }

  findGridLocEach(e, m1) {
    if (e.getBounds().contains(m1)) {
      this.resetStyle();
      this.selectedLayer = e;
    }
  }

  // Find the grid locator by name
  findGridName(fullgrid) {
    this.resetStyle();
    let regex = /^([A-Z]+)([0-9]+)/g;
    const reggrid = regex.exec(fullgrid);
    const col = this.cols.indexOf(reggrid[1]) + 2;
    const row = Number(reggrid[2]) + 1
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
    this.selectedLayer = e.target;
    this.onGridClick(e);
  }

  onEachMqttFeature(_feature, layer) {
    layer.on('click', function (e) {
      console.log(e);
    });
  }
}
