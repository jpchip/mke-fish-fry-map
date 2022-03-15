import * as L from 'leaflet';
const map = L.map('map').fitWorld();


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
      }).addTo(map);

const fishFryLayer = L.geoJSON();

var geojsonMarkerOptions = {
    radius: 8,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

fishFryLayer.options = {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, geojsonMarkerOptions);
    }
};
fishFryLayer.addTo(map);

fetch('assets/data.json')
.then(response => {
    if (!response.ok) {
        throw new Error("HTTP error " + response.status);
    }
    return response.json();
})
.then(json => {
    fishFryLayer.addData(json);
})
  .catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
  });


