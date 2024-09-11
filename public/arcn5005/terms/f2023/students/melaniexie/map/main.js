import { plants } from "./plants.js";

const map = new maplibregl.Map({
  container: "map",
  style:
    "https://api.maptiler.com/maps/backdrop-light/style.json?key=RGPOEN82OWm2BBbdAcht",
  center: [-79.58, 43.60],
  zoom: 7,
});

let PlantsFeatureCollection = [];

plants.forEach((plant) => {
  const image = `images/${plant.id}.jpg`;

  let plantFeature = {
    code: `${plant.code}`,
    type: "Feature",
    properties: {
      description: `<h1>${plant.Name}</h1><ul><li>Code: ${plant.id}</li><li>Province: ${plant.Address}</li><li>City: ${plant.City}</li></ul><img src="${image}" alt="${plant.id}" width=200px>`,
    },
    geometry: {
      type: "Point",
      coordinates: [plant.Longitude, plant.Latitude],
    },
  };
  PlantsFeatureCollection.push(plantFeature);
});


map.on("load", () => {
  map.addSource("places", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: PlantsFeatureCollection,
    },
  });

  // Add a layer showing the places with a custom icon.
 // Load the first marker image
 map.loadImage("marker.png", (error, image) => {
  if (error) {
    console.error("Error loading image:", error);
    return;
  }
  map.addImage("custom-marker", image);


    map.addLayer({
      id: "places",
      type: "symbol",
      source: "places",
      layout: {
        "icon-image": "custom-marker",
        "icon-size": 0.1, // Adjust the size as needed
        "icon-allow-overlap": true,
      },
    });
  });

 
  // Create a popup, but don't add it to the map yet.
  const popup = new maplibregl.Popup({
    closeButton: false,
    closeOnClick: false,
  });

  map.on("mouseenter", "places", (e) => {
    // Change the cursor style as a UI indicator.
    map.getCanvas().style.cursor = "pointer";

    const coordinates = e.features[0].geometry.coordinates.slice();
    const description = e.features[0].properties.description;

    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    // Populate the popup and set its coordinates
    // based on the feature found.
    popup.setLngLat(coordinates).setHTML(description).addTo(map);
  });

  map.on("mouseleave", "places", () => {
    map.getCanvas().style.cursor = "";
    popup.remove();
  });
});
