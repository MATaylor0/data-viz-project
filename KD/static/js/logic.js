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

var expDict = {};
var impDict = {};
var expVal, impVal, defVal;

// use d3 to load csv file and create dictionary to hold key/value pairs
d3.csv('./static/data/export_data_2018.csv', function(expData) {

  // console.log(expData);
  expData.export_value = +expData.export_value;
  expData.import_value = +expData.import_value;

  for (var i = 0; i < expData.length; i++) {
    var att = expData[i];

    expDict[att.location_code] = att.export_value;
    impDict[att.location_code] = att.import_value;

  }
});

// console.log(expDic);

// setup bindPopup for each country
lyrBoundaries = new L.LayerGroup();
lyrBoundaries = L.geoJSON.ajax('./static/data/countries.geojson',{ style: myStyle,
                                  onEachFeature: function(feature, layer) {
                                  var expVal = parseFloat(optColor).toFixed(2);
                                  var impNum = parseFloat(impVal).toFixed(2);

                                  var trdDefi = expVal - impNum;
                                  trdDefi.toFixed(0);
                                  expVal = numberWithCommas(expVal);
                                  impNum = numberWithCommas(impNum);

                                  layer.bindTooltip("<h4 style = 'text-align: center; background-color: #ffcc66'><b>" + feature.properties.ADMIN + "</h4></b>" +
                                    "Export: " + '$' + expVal + '<br>' + 'Import: ' + '$' + impNum + '<br>' +
                                    'Deficit: ' + (trdDefi < 0 ? '-' + formatDollar(trdDefi) : formatDollar(trdDefi)),{interactive:false});
                                  layer.on({
                                    mouseover: highlightFeature,
                                    mouseout: resetHighlight
                                  });
                                }
  });

// add layer to map
lyrBoundaries.addTo(mymap);

// function style
function myStyle(feature) {

  if (feature.properties.ISO_A3 != "-99") {
    optColor = expDict[feature.properties.ISO_A3];
    impVal = impDict[feature.properties.ISO_A3];
    // console.log(optColor);

    return {
        fillColor: getColor(optColor),
        weight: 1,
        // opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
  }
  else {
    console.log('ERROR: -99 found')
    return
  }
}

// function higlight Feature
function highlightFeature(e) {
  var layer = e.target;

  layer.setStyle({
      weight: 2,
      color: '#666',
      dashArray: '3',
      fillOpacity: 0.7
  });


  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
  }
}

// function reset highlight
function resetHighlight(e) {

  lyrBoundaries.resetStyle(e.target);

}

// function to assign suitable color depend up export value
function getColor(val) {
  if (val === 'NaN') {
    return '#f0f0f5'
  }
  // use conditional operator (?:) to return suitable color scheme
  return  val < 1000000   ? '#eeffcc':
          val < 10000000   ? '#ddff99':
          val < 100000000  ? '#ccff66':
          val < 1000000000  ? '#bbff33':
          val < 10000000000 ? '#99e600':
          val < 100000000000 ? '#88cc00':
          val < 1000000000000 ? '#669900':
          val < 2000000000000 ? '#446600':
          val < 5000000000000 ? '#1a3300':
                                '#f0f0f5';
}

// Function to format number with dollar sign
function formatDollar(num) {
  var p = num.toFixed(2).split(".");
  return "$" + p[0].split("").reverse().reduce(function(acc, num, i, orig) {
      return  num=="-" ? acc : num + (i && !(i % 3) ? "," : "") + acc;
  }, "") + "." + p[1];
}

// Function number with comma
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// define basemaps
objBasemaps = {
    "Outdoors": lyrOutdoors
};

// define overlays
objOverlays = {
    "Boundary":lyrBoundaries
};

// Set up the legend

var legend = L.control({position: 'bottomleft'});

  legend.onAdd = function () {

    var div = L.DomUtil.create('div', 'info legend');
    var lgdInfo = [1000000, 10000000, 100000000,
                  1000000000, 10000000000, 100000000000,
                  1000000000000, 2000000000000];

    var labels = ['$1M', '$10M', '$100M', '$1B', '$100B', '$1T', '$2T', '$2T+'];

    // var legendInfo = "<h4 style='text-align:center;'>Export Value</h4>" ;

    // div.innerHTML = legendInfo;
    // loop through lgdInfo to set the equivalent color

    div.innerHTML += "<ul>" + labels.join("&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;") + "</ul>";
    for (var i = 0; i < lgdInfo.length; i++) {
      // labels.push('<i style="background-color: ' + getColor(lgdInfo[i]) +'" ></i>');
      // setting labels for the legend using (?:) conditional operator
      div.innerHTML += '<i style="background-color: ' + getColor(lgdInfo[i]) +'" ></i>'
    }
    return div;
  };

// Add legend to the map
legend.addTo(mymap);


mymap.on('click', function(e){
  if (e.originalEvent.shiftKey) {
      alert(mymap.getZoom());
  } else {
      alert(e.latlng.toString());
  }
});

// ctlLayers = L.control.layers(objBasemaps, objOverlays, {collapsed: false}).addTo(mymap);
