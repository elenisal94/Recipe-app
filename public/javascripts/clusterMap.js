mapboxgl.accessToken = mapToken;
let features = recipes.features;

const map = new mapboxgl.Map({
    container: 'cluster-map',
    style: 'mapbox://styles/mapbox/light-v11',
    center: [9.188540, 45.464664],
    zoom: 3
});

map.addControl(new mapboxgl.NavigationControl());

const spiderifier = new MapboxglSpiderifier(map, {
    customPin: true,
    initializeLeg: function (spiderLeg) {
        const $spiderPinCustom = document.createElement('div');
        $spiderPinCustom.className = 'spider-point-circle';

        spiderLeg.elements.pin.appendChild($spiderPinCustom);
        $spiderPinCustom.style.width = '20px';
        $spiderPinCustom.style.height = '20px';
        $spiderPinCustom.style.marginLeft = '-5px';
        $spiderPinCustom.style.marginTop = '-5px';
        $spiderPinCustom.style.backgroundColor = '#F50057';
        $spiderPinCustom.style.opacity = 0.8;

        const popup = new mapboxgl.Popup({
            closeButton: true,
            closeOnClick: false,
            offset: MapboxglSpiderifier.popupOffsetForSpiderLeg(spiderLeg)
        });
        const popUpMarkup = spiderLeg.feature['popUpMarkup'];
        console.log('popUpMarkup:', popUpMarkup);
        popup.setHTML(popUpMarkup);
        spiderLeg.mapboxMarker.setPopup(popup);

        spiderLeg.elements.container.addEventListener('click', function () {
            if (!popup.isOpen()) {
                popup.addTo(map);
            } else {
                popup.remove();
            }
        });

        map.on('click', function () {
            popup.remove();
        });
    }
});

map.on('load', () => {
    map.addSource('recipes', {
        type: 'geojson',
        data: recipes,
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50
    });

    map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'recipes',
        filter: ['has', 'point_count'],
        paint: {
            'circle-color': [
                'step',
                ['get', 'point_count'],
                '#F48FB1',
                100,
                '#E91E63',
                750,
                '#F50057'
            ],
            'circle-radius': [
                'step',
                ['get', 'point_count'],
                15,
                10,
                30,
                30,
                40
            ]
        }
    });

    map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'recipes',
        filter: ['has', 'point_count'],
        layout: {
            'text-field': ['get', 'point_count_abbreviated'],
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12
        }
    });

    map.addLayer({
        id: 'unclustered-point',
        type: 'circle',
        source: 'recipes',
        filter: ['!', ['has', 'point_count']],
        paint: {
            'circle-color': '#F48FB1',
            'circle-radius': 10,
            'circle-stroke-width': 1,
            'circle-stroke-color': '#fff'
        }
    });
    map.on('click', 'clusters', mouseClick);
    map.on('click', 'unclustered-point', mouseClick);
    map.on('mouseenter', 'clusters', () => {
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'clusters', () => {
        map.getCanvas().style.cursor = '';
    });
});

function mouseClick(e) {
    const features = map.queryRenderedFeatures(e.point, {
        layers: ['clusters', 'unclustered-point']
    });
    if (!features.length) {
        spiderifier.unspiderfy();
        return;
    }

    if (features[0].properties.cluster) {
        // Clicked on a cluster
        const clusterId = features[0].properties.cluster_id;
        spiderifier.unspiderfy();

        map.getSource('recipes').getClusterLeaves(
            clusterId,
            100,
            0,
            function (err, leafFeatures) {
                if (err) {
                    return console.error('Error while getting leaves of a cluster:', err);
                }

                if (!leafFeatures || leafFeatures.length === 0) {
                    console.warn('No leaf features found for cluster ID:', clusterId);
                    return;
                }

                const markers = leafFeatures.map(leafFeature => leafFeature.properties);
                console.log('Leaf features of cluster:', markers);
                spiderifier.spiderfy(features[0].geometry.coordinates, markers);
            }
        );
    } else {
        // Clicked on an individual marker
        spiderifier.unspiderfy();
        const feature = features[0];
        const popUpMarkup = feature.properties.popUpMarkup;

        const popup = new mapboxgl.Popup({
            closeButton: true,
            closeOnClick: false
        })
            .setLngLat(feature.geometry.coordinates)
            .setHTML(popUpMarkup)
            .addTo(map);

        map.on('click', function () {
            popup.remove();
        });
    }
}

