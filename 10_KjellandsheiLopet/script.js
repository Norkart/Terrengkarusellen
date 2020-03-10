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
loadGeoJson('coordinates.geojson', function () {   
    var geoJson = JSON.parse(this.responseText);

    /* First reorder the short track -> first feature */
    var latLngsShortTrack = geoJson.features[0].geometry.coordinates.map(latLng => {
        return new L.LatLng(latLng[1], latLng[0]);
    });

    /* zoom to track */
    map.fitBounds([
        latLngsShortTrack,
    ]);

    /* create polylines with color, then decorate with arrows */
    var polylineShortTrack = new L.polyline(
        latLngsShortTrack, { color: '#1F75FE' }
    );

    polylineShortTrack.addTo(map);

    var polylinePatterns = [
        { offset: 25, repeat: 100, symbol: L.Symbol.arrowHead({ pixelSize: 15, pathOptions: { fillOpacity: 1, weight: 0 } }) }
    ]

    L.polylineDecorator(polylineShortTrack, {
        patterns: polylinePatterns
    }).addTo(map);

    /* start point and short track labels as icons */
    var startpoint = latLngsShortTrack[0];

    //L.marker(startpoint).bindTooltip("Start / Mål", {permanent: true}).addTo(map);

    var iconStart = L.divIcon({
        html: '<span>Start / Mål</span>',
        className: 'label',
        iconSize: [60, 15],
        iconAnchor: [30, -5]
    });

    L.marker(startpoint, {icon:iconStart}).addTo(map);

});

//https://leafletjs.com/examples/layers-control/


/****
Looking for Mapbox vector tiles for the Norwegian maps? Reach out at info@norkart.no for some amazing vector tile action
****/

function loadGeoJson(fileName, onSuccess) {
    var request = new XMLHttpRequest();
    request.onload = onSuccess;
    request.open('GET', fileName);
    request.send();    
}