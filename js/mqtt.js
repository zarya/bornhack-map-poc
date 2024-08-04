function topicData(topic, payload) {
    mapObject.map.eachLayer(function(layer) {
        if (layer.feature && layer.feature.properties.topic && layer.feature.properties.topic === topic) {
            if (proc[layer.feature.properties.func])
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
let myVar2 = setInterval(myTimer2, 1000);

function getRandomLoc(min,max) {
 return Math.random() * (max - min) + min;
}

function myTimer2() {
  const tub = Math.floor(Math.random() * (45 - 20 + 1) + 20);
  topicData("hottub", {"value":tub+""})
  let noice = Math.floor(Math.random() * (60 - 25 + 1) + 25);
  topicData("noisesensor/1", {"avg": noice})
  noice = Math.floor(Math.random() * (60 - 25 + 1) + 25);
  topicData("noisesensor/2", {"avg": noice})
}
let myVar = setInterval(myTimer, 3000);

function myTimer() {
  topicData("golfcar", {
    "lat":getRandomLoc(55.39004471637513, 55.38379389032002),
    "lng":getRandomLoc(9.936828255477785, 9.945946155611598),
  });
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
