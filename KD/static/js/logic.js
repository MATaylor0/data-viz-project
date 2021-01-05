// loading geoJSON from source

var queryURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

// Initialize map, setting the streetmap and earthquakes layers to display on load
// Set view to san francisco latlng
var mymap = L.map("map", {center: [37.73379, -122.44676], zoom: 3});




// Use Thunderforest.Outdoors layer as basemap
var lyrOutdoors = L.tileLayer.provider('Thunderforest.Outdoors');
mymap.addLayer(lyrOutdoors);

// const geoData = 'C:/Users/home/Documents/data-viz-project/KD/static/data/countries.geojson'

// layer boundaries
var lyrBoundaries;
lyrBoundaries = new L.LayerGroup();

var geoData = './static/data/countries.geojson';

var geojson;

// Grab data with d3
d3.json(geoData, function(data) {
    console.log(data);
    // Create a new choropleth layer
    geojson = L.choropleth(data, {

      // Define what  property in the features to use
    //   valueProperty: "geometry",
      // Set color scale
    //   scale: ["#ffffb2", "#e600e6"],

      // Number of breaks in step range
    //   steps: 10,

      // q for quartile, e for equidistant, k for k-means
      mode: "q",
      style: {
        // Border color
        color: getColor(data.export_vals),
        weight: 1,
        fillOpacity: 0.6
      },

      // Binding a pop-up to each layer
    //   onEachFeature: function(feature, layer) {
    //     layer.bindPopup("Zip Code: " + feature.properties.ZIP + "<br>Median Household Income:<br>" +
    //       "$" + feature.properties.MHI2016);
    //   }
    }).addTo(mymap);
});

// use d3 to load countries.geojson data
/*d3.json(geoData, function(json) {
    console.log(json);
    // adding boundaries to layer
    L.geoJSON(json, {color: '#424a44', weight:1.1, fillColor:'#004691', Opacity: 1, dashArray: '1'}).addTo(lyrBoundaries);
    lyrBoundaries.addTo(mymap);


})
*/
function CtyMarkers(json, latlng) {
    console.log(json);
    optColor = json.properties.mag;

    // create circle marker for each feature
    var myMarkers = L.circleMarker(latlng, {radius:optColor*6, color:'black',
                                fillColor:getColor(optColor),
                                weight: 0.3, fillOpacity:0.8});

    // set popup label on mouse click
    myMarkers.bindPopup("<h5>" + json.properties.place + "</h5><hr>"
                         + new Date(json.properties.time) + " - Magnitude: " + optColor,{interactive:true});

    return myMarkers;
}

function getColor(d) {

    // use conditional operator (?:) to return suitable color scheme
    return d < 1 ? '#ecffb3' :
           d < 2 ? '#ffcc66' :
           d < 3 ? '#ff9900' :
           d < 4 ? '#e68a00' :
           d < 5 ? '#b36b00' :
           d >= 5 ?  '#ff0000' :
                    '#ff0000';
}
/*
// define basemaps
objBasemaps = {
    "Outdoors": lyrOutdoors
};

// define overlays
objOverlays = {
    "Boundary":lyrBoundaries
};

ctlLayers = L.control.layers(objBasemaps, objOverlays, {collapsed: false}).addTo(mymap);
*/