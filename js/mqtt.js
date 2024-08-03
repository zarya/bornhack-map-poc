function topicData(topic, payload) {
    mapObject.map.eachLayer(function(layer) {
        if (layer.feature && layer.feature.properties.topic && layer.feature.properties.topic === topic) {
            proc[layer.feature.properties.func](topic, payload, layer);
        }
    });
}

topicData("trafficlight/1", {"value":"green"})
topicData("trafficlight/2", {"value":"red"})
topicData("noisesensor/1", {"avg": 10.2})
topicData("noisesensor/2", {"avg": 30.2})
topicData("hottub", {"value":"39.5"})
var lightSide = 0;
let myVar = setInterval(myTimer, 3000);
function myTimer() {
  const tub = Math.floor(Math.random() * (45 - 25 + 1) + 25);
  topicData("hottub", {"value":tub+""})
  const noice = Math.floor(Math.random() * (60 - 25 + 1) + 25);
  topicData("noisesensor/1", {"avg": noice})
  topicData("noisesensor/2", {"avg": noice})

  if (lightSide) {
    lightSide = 0
    topicData("trafficlight/1", {"value":"green"})
    topicData("trafficlight/2", {"value":"red"})
  } else {
    topicData("trafficlight/2", {"value":"green"})
    topicData("trafficlight/1", {"value":"red"})
    lightSide = 1
  }
}
