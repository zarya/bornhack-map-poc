function topicData(topic, payload) {
    const proc  = new processing();
    map.eachLayer(function(layer) {
        if (layer.feature && layer.feature.properties.topic && layer.feature.properties.topic === topic) {
            proc[layer.feature.properties.func](topic, payload, layer);
        }
    });
}
