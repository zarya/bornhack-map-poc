class Processing {
  tooltip(_topic, payload, layer){
    console.log(layer);
    layer.bindTooltip(payload.value);
    layer.openTooltip();
    var greenIcon = new L.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    layer.setIcon(greenIcon);
  }
  trafficlight(_topic, payload, layer){
    var icon = new L.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-'+payload.value+'.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    layer.setIcon(icon);
    layer.bindTooltip(payload.value);
    layer.openTooltip();
  }
  hottub(_topic, payload, layer){
    const value = Number(payload.value);
    layer.bindTooltip(payload.value + " ºC", {
        permanent: true, 
        direction: 'right'
    });
    layer.openTooltip();
    if (value > 35)
      layer.setIcon(new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      }));
    else
      layer.setIcon(new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      }));
  }
  noisesensor(_topic, payload, layer) {
    var hue = ((1 - payload.avg / 100) * 120).toString(10);
    var color = ["hsl(", hue, ",100%,50%)"].join("");
    layer.setStyle({
      radius: payload.avg * 1.4,
      fillColor: color
    })
    layer.bindTooltip(layer.feature.properties.Name + ": " + payload.avg + " dB", {
        permanent: true, 
        direction: 'right'
    });
    layer.openTooltip();
  }
  golfcar(_topic, payload, layer) {
      layer.setIcon(new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      }));
    layer.setLatLng([payload.lat, payload.lng])
  }
}
