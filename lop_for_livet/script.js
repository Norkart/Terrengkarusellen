//Initiating Leaflet map and set the view to coordinates (in WGS84 / EPSG:3857) and zoom level 13
var map = L.map('map');
var apiKey = '07C4A129-9D26-4B3D-9BC8-B22E4B6E509E'; //DO NOT USE THIS KEY: DEMO ONLY

/** All available map types
L.TileLayer.Webatlas.Type.GREY
L.TileLayer.Webatlas.Type.VECTOR
L.TileLayer.Webatlas.Type.MEDIUM
L.TileLayer.Webatlas.Type.LITE
L.TileLayer.Webatlas.Type.AERIAL
L.TileLayer.Webatlas.Type.HYBRID
*/
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

    /* First visualising the short track -> first feature */
    var latLngsShortTrack = geoJson.features[0].geometry.coordinates.map(latLng => {
        return new L.LatLng(latLng[1], latLng[0]);
    });

    /* Second visualising the long track -> second feature */
    var latLngsLongTrack = geoJson.features[1].geometry.coordinates.map(latLngx => {
        return new L.LatLng(latLngx[1], latLngx[0]);
    });    

    /* zoom to track */
    map.fitBounds([
        latLngsShortTrack.concat(latLngsLongTrack),
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

    /* create polylines with color, then decorate with arrows */
    var polylineLongTrack = new L.polyline(
        latLngsLongTrack, { color: '#024EC6' }
    );

    polylineLongTrack.addTo(map);

    L.polylineDecorator(polylineLongTrack, {
        patterns: polylinePatterns
    }).addTo(map);

    /* start and end point */
    var startpoint = latLngsShortTrack[0];
    var endpoint = latLngsShortTrack[latLngsShortTrack.length - 1];

    /* add marker to the end / start of the run */
    var finishIcon = L.icon({
        iconUrl: 'finish-flag.png',
        iconSize: [16, 16],
        iconAnchor: [6, 17]
    });

    L.marker(endpoint, { icon: finishIcon, zIndexOffset: 1000 }).addTo(map);
    L.marker(startpoint, { icon: finishIcon, zIndexOffset: 1000 }).addTo(map);

    /* add a popup to mark the short track - find coordinates manually*/
    L.popup({ closeOnClick: false, autoClose: false })
        .setLatLng([58.16532142, 8.003])
        .setContent('Kort løype')
        .openOn(map);

    L.popup({ closeOnClick: false, autoClose: false })
        .setLatLng(startpoint)
        .setContent('Start / Mål')
        .openOn(map);

});

/*loadGeoJson('coordinates.geojson').then(geoJson => {
    const layer = L.geoJSON(geoJson, {
        style: function (feature) {
            return { color: 'red' };
        }
    });

    layer.addTo(map);
});*/


/*L.geoJSON(data, {
    style: function (feature) {
        return {color: feature.properties.color};
    }
}).bindPopup(function (layer) {
    return layer.feature.properties.description;
}).addTo(map);*/

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