        var map = L.map('map').setView([55.38806, 9.93970], 17);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        const gridLayer = L.geoJson(json_Gridsquares_4, {
            onEachFeature: onEachFeature,
            style: {
              color: "gray",
              fillOpacity: 0.0,
              weight: 0.5
            }
        }).addTo(map);

        const mqttLayer = L.geoJson(mqttTest, {
            onEachFeature: onEachMqttFeature,
            style: {
              color: "green",
              fillOpacity: 1.0,
              weight: 0.5
            }
        }).addTo(map);

