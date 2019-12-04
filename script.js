// Create a variable to hold the map
let myMap;
// Create a variable to hold the canvas
let canvas;
// Create a variable to hold Meteorite Data
let meteorites;

// Create a new Mappa instance using Leaflet
const mappa = new Mappa("Leaflet");

// Put all of the map options in a single object
const options = {
    lat: 0,
    lng: 0,
    zoom: 4,
    style: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
}

function setup() {
    canvas = createCanvas(640, 640);
    // background(100);

    // Create a tile map with the options defined above
    myMap = mappa.tileMap(options);
    // Overlay the canvas over the tile map
    myMap.overlay(canvas);
    // Only redraw the map points when the map changes and not every frame
    // myMap.onChange(drawPoint);

    // Load the Data
    meteorites = loadTable('Meteorite_Landings.csv', 'csv', 'header');
    // Only redraw the meteorites when the map position changes and not every frame
    myMap.onChange(drawMeteorites);

    // Add a color to our ellipse
    fill(200, 100, 100);

}

function draw() {


}

function drawPoint() {
    // Clear the canvas
    clear();

    // Get the canvas position for the latitude and longitude of Nigeria
    const nigeria = myMap.latLngToPixel(11.396396, 5.076543);
    // Using that position, draw an ellipse
    ellipse(nigeria.x, nigeria.y, 20, 20);
}

function drawMeteorites() {
    // Clear Canvas
    clear();

    for (let i=0; i<meteorites.getRowCount(); i++) {
        // Get the lat/lng of each meteorite
        const latitude = Number(meteorites.getString(i, 'reclat'));
        const longitude = Number(meteorites.getString(i, 'reclong'));

        /* Only draw the meteorites if the position is inside the current map bounds. We use a Leaflet mehtod to check if the lat and lng are contained inside the current map. This way we draw just what we are going to see and not everything. See getBounds() in http://lefletjs.com/reference-1.1.0.html */
        if (myMap.map.getBounds().contains({lat: latitude, lng: longitude})) {
            const pos = myMap.latLngToPixel(latitude, longitude);
            // Get the size of the meteorite and map it. 60000000 is the mass of the largest meteorite
            let size = meteorites.getString(i, 'mass (g)');
            size = map(size, 558, 60000000, 1, 25) + myMap.zoom();
            ellipse(pos.x, pos.y, size, size);
        }
    }
}
