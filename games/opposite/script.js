var earth1;
var earth2;
var zoom = 2;
var center = [45.0, 6.0];

function antipode(coord) {
return [-1 * coord[0], coord[1] - 180];
}

function update() {
if (center[0] == earth1.getCenter()[0] && center[1] == earth1.getCenter()[1]) {
    center = antipode(earth2.getCenter());
    earth1.setView([center[0], center[1]]);
} else {
    center = earth1.getCenter();
    var antip = antipode(earth1.getCenter());
    earth2.setView([antip[0], antip[1]]);
}
if (earth1.getZoom() != zoom) {
    zoom = earth1.getZoom();
    earth2.setZoom(zoom);
} else {
    zoom = earth2.getZoom();
    earth1.setZoom(zoom);
}
}

function initialize() {
var proxyUrl = 'http://data.webglearth.com/cgi-bin/corsproxy.fcgi?url=';
earth1 = new WebGLEarth('earth_div1', {zoom: zoom, center: center, proxyHost: proxyUrl});
earth2 = new WebGLEarth('earth_div2', {zoom: zoom, center: antipode(center), proxyHost: proxyUrl});

// Recalculate positions whenever any of the two globes moves
setInterval('update()', 5);
}