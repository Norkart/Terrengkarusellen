//Initiating Leaflet map and set the view to coordinates (in WGS84 / EPSG:3857) and zoom level 13
var map = L.map('map'); //.setView([58.2, 7.99573], 10);
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

/* zoom to track */
map.fitBounds([[58.0, 7.75], [58.32, 8.26]]);

/* set markers and Popups with links */
L.marker([58.0856968, 7.7622559]).addTo(map).bindPopup('<a href="https://norkart.github.io/Terrengkarusellen/10_KjellandsheiLopet/" target="_blank">Kjellandshei løpet</a>');

L.marker([58.0770575, 7.8417985]).addTo(map).bindPopup('<a href="https://norkart.github.io/Terrengkarusellen/13_Repstad/" target="_blank">Repstad løpe</a>');

L.marker([58.0964522, 7.9645037]).addTo(map).bindPopup('<a href="https://norkart.github.io/Terrengkarusellen/16_Kanonmuseum/" target="_blank">Kanonmuseet løpet</a>');

L.marker([58.1181161, 7.9928677]).addTo(map).bindPopup('<a href="https://norkart.github.io/Terrengkarusellen/11_Bragdoya/" target="_blank">Bragdøya løpet</a>');

L.marker([58.1332567, 8.0064331]).addTo(map).bindPopup('<a href="https://norkart.github.io/Terrengkarusellen/08_Unicon/" target="_blank">Unicon løpet</a>');

L.marker([58.1480655, 8.0335639]).addTo(map).bindPopup('<a href="https://norkart.github.io/Terrengkarusellen/14_GumpenGruppenLopet/" target="_blank">Gumpen Gruppen løpet</a>');

L.marker([58.1844918, 8.1442452]).addTo(map).bindPopup('<a href="https://norkart.github.io/Terrengkarusellen/15_Dyreparken/" target="_blank">Dyreparken løpet</a>');

L.marker([58.19148, 8.0773431]).addTo(map).bindPopup('<a href="https://norkart.github.io/Terrengkarusellen/12_NOV-lopet/" target="_blank">NOV-løpet</a>');

L.marker([58.1464385, 8.0070497]).addTo(map).bindPopup('<a href="https://norkart.github.io/Terrengkarusellen/18_Aquarama/"target="_blank">Aquarama løpet</a>');

L.marker([58.1945674, 7.882803]).addTo(map).bindPopup('<a href="https://norkart.github.io/Terrengkarusellen/Sommerskogslopet/" target="_blank">Sommerskogsløpet</a>');

L.marker([58.1539223, 7.9857767]).addTo(map).bindPopup('<a href="https://norkart.github.io/Terrengkarusellen/01_brannvaktloype/" target="_blank">Brannvakt løpet</a></br><a href="https://norkart.github.io/Terrengkarusellen/02_SparebankenSor/" target="_blank">Sparebanken Sør løpet</a></br><a href="https://norkart.github.io/Terrengkarusellen/03_Bankloypa/" target="_blank">Bankløypa</a></br><a href="https://norkart.github.io/Terrengkarusellen/04_WaltersLoype/" target="_blank">Walters løype</a></br><a href="https://norkart.github.io/Terrengkarusellen/HvitLoypa/" target="_blank">Hvit løypa</a></br><a href="https://norkart.github.io/Terrengkarusellen/1000_trapp/" target="_blank">1000-trapp løpry</a></br><a href="https://norkart.github.io/Terrengkarusellen/Stafetten/" target="_blank">BilXstra stafetten</a></br><a href="https://norkart.github.io/Terrengkarusellen/Reflekslopet/" target="_blank">Refleksløpet</a></br>');

L.marker([58.1687225, 8.0061248]).addTo(map).bindPopup('<a href="https://norkart.github.io/Terrengkarusellen/05_Varodd/" target="_blank">Varodd</a></br><a href="https://norkart.github.io/Terrengkarusellen/07_BDO-lopet/" target="_blank">BDO løpet</a></br><a href="https://norkart.github.io/Terrengkarusellen/09_HennigOlsen/" target="_blank">Hennig-Olsen løpet</a></br><a href="https://norkart.github.io/Terrengkarusellen/SkauSkau/" target="_blank">Skau-Skau løpet</a>');

L.marker([58.160266, 8.0045833]).addTo(map).bindPopup('<a href="https://norkart.github.io/Terrengkarusellen/06_LOS/" target="_blank">LOS løpet</a></br><a href="https://norkart.github.io/Terrengkarusellen/19_Ramboll/" target="_blank">Rambøll løpet</a></br><a href="https://norkart.github.io/Terrengkarusellen/lop_for_livet/" target="_blank">Løp for livet</a>');



//https://leafletjs.com/examples/layers-control/


/****
Looking for Mapbox vector tiles for the Norwegian maps? Reach out at info@norkart.no for some amazing vector tile action
****/