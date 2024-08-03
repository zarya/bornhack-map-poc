function topicData(topic, payload) {
    mapObject.map.eachLayer(function(layer) {
        if (layer.feature && layer.feature.properties.topic && layer.feature.properties.topic === topic) {
            proc[layer.feature.properties.func](topic, payload, layer);
        }
    });
}
