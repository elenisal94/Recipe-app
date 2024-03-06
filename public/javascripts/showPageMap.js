mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v11',
    center: recipe.geometry.coordinates,
    zoom: 5,
});

const markerElement = document.createElement('div');
markerElement.className = 'custom-marker';
markerElement.style.width = '20px';
markerElement.style.height = '20px';
markerElement.style.backgroundColor = '#F50057';
markerElement.style.opacity = 0.8;

new mapboxgl.Marker(markerElement)
    .setLngLat(recipe.geometry.coordinates)
    .addTo(map)