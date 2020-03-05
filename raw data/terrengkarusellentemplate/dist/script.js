//Initiating Leaflet map and set the view to coordinates (in WGS84 / EPSG:3857) and zoom level 13
var map = L.map('mapid').setView([58.14615, 7.99573], 13);

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
                mapType: L.TileLayer.Webatlas.Type.HYBRID,
                apikey: apiKey
            });


var baseMaps = {
  vektorKart,
  hybrid
}

L.control.layers(baseMaps).addTo(map);
//https://leafletjs.com/examples/layers-control/

/****
add line data and style with polylinedecorator

Approach #1
* Convert line from GPX to GeoJSON
* Add as geojson-layer
* Style

Approach #2
* Convert line from GPX to GeoJSON
* Add as geojson-layer
* Extract line-feature as a polyline
* Style
**/

/*https://github.com/bbecquet/Leaflet.PolylineDecorator
var polyline = L.polyline([...]).addTo(map);
var decorator = L.polylineDecorator(polyline, {
    patterns: [
        // defines a pattern of 10px-wide dashes, repeated every 20px on the line
        {offset: 0, repeat: 20, symbol: L.Symbol.dash({pixelSize: 10})}
    ]
}).addTo(map);

*/


/****
Looking for Mapbox vector tiles for the Norwegian maps? Reach out at info@norkart.no for some amazing vector tile action
****/