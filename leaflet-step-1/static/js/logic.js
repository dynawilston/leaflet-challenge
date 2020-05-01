//Create the map object with options
var myMap = L.map("leafletmap", {
  center: [40.73, -100],
  zoom: 4,
});
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
}).addTo(myMap); 



var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson"

function MarkerSize(magnitude) {
  return magnitude * 1000;
}

function MarkerColor(magnitude) { 

  var color = '#ffffff';

  if (magnitude < 1) {
    color = '#7bab11';
} else if (magnitude < 2) {
    color = "#ffe700";
} else if (magnitude < 3) {
    color = "#ff7400";
} else 
    color = "#BD0026";
    
    return color;
}

d3.json(url, response => {
  
  var Response = response.feature;
  var location = []; 
  var mag = [];
  var cities = [];
  for (var i = 0; i < Response.length; i++) {
    location.push([Response[i].geometry.coordinates[1], Response[i].geometry.coordinates[0]]);
    mag.push(Response[i].properties.mag); 
    cities.push(Response[i].properties.place);
  }

  for (var i = 0; i < location.length; i++){
  L.circle(location[i], {
    fillOpacity: 0.75,
    color: MarkerColor(mag[i]),
    fillColor: MarkerColor(mag[i]),
    // Setting our circle's radius equal to the output of our markerSize function
    // This will make our marker's size proportionate to its population
    radius: markerSize(mag)
  }).bindPopup("<h1>" + cities[i] + "</h1>").addTo(myMap);
}
});