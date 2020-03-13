//Initiating Leaflet map and set the view to coordinates (in WGS84 / EPSG:3857) and zoom level 13
var map = L.map('map');
var apiKey = '07C4A129-9D26-4B3D-9BC8-B22E4B6E509E'; //DO NOT USE THIS KEY: DEMO ONLY

var vektorKart = L.tileLayer.webatlas({
    mapType: L.TileLayer.Webatlas.Type.VECTOR,
    apikey: apiKey
}).addTo(map);

var hybrid = L.tileLayer.webatlas({
    mapType: L.TileLayer.Webatlas.Type.AERIAL,
    apikey: apiKey
});

var baseMaps = {
    "Kart": vektorKart,
    "Flyfoto": hybrid
}

L.control.layers(baseMaps).addTo(map);

/* loading the GeoJSON file */
loadGeoJson('oversikt.geojson', function () {
    var geoJson = JSON.parse(this.responseText);

    var areas = geoJson.features.map(function (feature) {
        var latLng = feature.geometry.coordinates;
        return {
            urls: feature.properties.urls,
            point: new L.LatLng(latLng[1], latLng[0])
        }
    });

    console.log(areas);
    

    /* zoom to track */
    map.fitBounds([
        areas.map(function(area) {
            return area.point;
        })
    ]);

    areas.forEach(function (area, index) {
        var marker = L.marker(area.point).addTo(map);
        var htmlLinks = area.urls.map(function(link) {
            return "<li><a href='" + link.url + "'>"+ link.name + "</a></li>";
        });
        console.log(htmlLinks);
        
        var list = "<ul>" + htmlLinks.join('') + "</ul>";
        marker.bindTooltip(list, { permanent: true, interactive: true }).openTooltip();
    });
});

//https://leafletjs.comexamples/layers-control/

/****
Looking for Mapbox vector tiles for the Norwegian maps? Reach out at info@norkart.no for some amazing vector tile action
****/

function loadGeoJson(fileName, onSuccess) {
    var request = new XMLHttpRequest();
    request.onload = onSuccess;
    request.open('GET', fileName);
    request.send();
}