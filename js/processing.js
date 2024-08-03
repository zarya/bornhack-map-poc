class processing {
  tooltip(topic, payload, layer){
    console.log(layer);
    layer.bindTooltip(payload.value);
    layer.openTooltip();
  }
  trafficlight(topic, payload, layer){
    console.log(layer);
    layer.bindTooltip(payload.value);
    layer.openTooltip();
  }
}
