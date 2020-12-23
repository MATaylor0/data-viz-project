// Creating map object
var myMap = L.map('map').setView([0.0, 0.0], 2.5);

// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/light-v9",
  accessToken: API_KEY
}).addTo(myMap);

// Load in geojson data
var geoData = "static/data/countries.geojson";

var geojson;

L.geoJson(geoData).addTo(myMap);

// Grab data with d3
d3.json(geoData, function(data) {

  // Create a new choropleth layer
  geojson = L.choropleth(data, {
    
    style:
    {
      // Border colour
      color: "#fff",
      weight: 1,
      fillOpacity: 0.8
    }
  }).addTo(myMap);

});