var mqttTest = {
"type": "FeatureCollection",
"name": "bornhack-mqtt-test",
"crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
"features": [
{ "type": "Feature", "properties": { "Name": "Test 1", "topic": "topic1", "func": "testF" }, "geometry": { "type": "Point", "coordinates": [ 9.940434786427065, 55.387446078682025 ] } },
{ "type": "Feature", "properties": { "Name": "Test 2", "topic": "topic2", "func": "testF2" }, "geometry": { "type": "Point", "coordinates": [ 9.940597200582772, 55.387443828556286 ] } },
{ "type": "Feature", "properties": { "Name": "Test 3", "topic": "topic3", "func": "testF3" }, "geometry": { "type": "Point", "coordinates": [ 9.940757634078043, 55.387450578933105 ] } },
{ "type": "Feature", "properties": { "Name": "Entry traffic light", "topic": "trafficlight/1", "func": "trafficlight" }, "geometry": { "type": "Point", "coordinates": [ 9.948655187454372, 55.39222505680172 ] } },
{ "type": "Feature", "properties": { "Name": "Exit traffic light", "topic": "trafficlight/2", "func": "trafficlight" }, "geometry": { "type": "Point", "coordinates": [ 9.947411992921051, 55.38947338994091 ] } },
{ "type": "Feature", "properties": { "Name": "Hottub temperature", "topic": "hottub", "func": "hottub" }, "geometry": { "type": "Point", "coordinates": [ 9.938521468446416, 55.385426164286564 ] } }
]
}
