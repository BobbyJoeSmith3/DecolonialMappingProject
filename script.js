// Create a variable to hold the map
let myMap;

// Create a variable to hold the canvas
let canvas;

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
    myMap.onChange(drawPoint);

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
