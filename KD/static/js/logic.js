// loading geoJSON from source
// Initialize map, setting the streetmap and earthquakes layers to display on load
// Set view to Central Europe latlng
var mymap = L.map("map", {center: [50.378472, 14.970598], zoom: 3});

// Use Thunderforest.Outdoors layer as basemap
var lyrOutdoors = L.tileLayer.provider('Thunderforest.Outdoors');

mymap.addLayer(lyrOutdoors);

const geoData = './static/data/countries.geojson';

// declare variables
var objBasemaps;
var objOverlays;
var ctlLayers;
var lyrBoundaries;

var ctyData ={};
var expVal;
var att;

d3.csv('./static/data/export_data_2018.csv', function(expData) {

  // console.log(expData);

  for (var i = 0; i < expData.length; i++) {
    var att = expData[i]
    // console.log(att);
    ctyData[att.location_code] = att.export_value;


  }
  // rowData["country_code"] = d.location_code;
  // rowData["country_name"] = d.country_name;
  // rowData["export_value"] = d.export_value;
  // rowData["import_value"] = d.import_value;
});

lyrBoundaries = new L.LayerGroup();
lyrBoundaries = L.geoJSON.ajax('./static/data/countries.geojson',{ style: myStyle,
                                  onEachFeature: function(feature, layer) {
                                  layer.bindPopup("<h5>" + feature.properties.ADMIN + "</h5><hr>" + "export value: " + parseFloat(optColor).toFixed(2));
                                }
  });

function myStyle(feature) {

  if (feature.properties.ISO_A3 != "-99") {
    optColor = ctyData[feature.properties.ISO_A3];
    console.log(optColor);

    return {
        fillColor: getColor(optColor),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
  }
  else {
    console.log('ERROR: -99 found')
    return
  }

// add layer to map
lyrBoundaries.addTo(mymap);

// function to assign suitable color depend up export value
function getColor(val) {

  // console.log('getColor was called!', val);
  // use conditional operator (?:) to return suitable color scheme
  return  val < 1000000000 ? '#86b300' :
          val < 150000000000 ? '#ffcc66':
          val < 200000000000 ? '#ff9900':
          val < 250000000000 ? '#e68a00':
          val < 300000000000 ? '#b36b00':
          val < 350000000000 ? '#ff0000':
          val < 350000000000 ? '#00ffff':
          val < 400000000000 ? '#00bfff':
          val < 450000000000 ? '#0080ff':
          val < 500000000000 ? '#0040ff':
          val < 550000000000 ? '#8000ff':
          val < 600000000000 ? '#00661a':
          val < 650000000000 ? '#006666':
                               '#000066';
}

// define basemaps
objBasemaps = {
    "Outdoors": lyrOutdoors
};

// define overlays
objOverlays = {
    "Boundary":lyrBoundaries
};

// ctlLayers = L.control.layers(objBasemaps, objOverlays, {collapsed: false}).addTo(mymap);
