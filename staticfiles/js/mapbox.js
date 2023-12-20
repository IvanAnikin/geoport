
mapboxgl.accessToken = 'pk.eyJ1IjoiaXZhbi1hbmlraW4iLCJhIjoiY2xkYWVtaW55MGE2ZDNvbXVldGRsdmx5ZSJ9.XqgF6Uk5aWZTz0d9B6OsRQ';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/ivan-anikin/clfva2vvm007o01mz7lge15jd',
    center: [14.437800, 50.075539], // starting position [lng, lat]
    zoom: 2 
});

map.on('load', () => {
    map.resize();

    map.addSource('density', {
        'type': 'vector',
        'tiles': [
            'https://tiles.mapillary.com/maps/vtp/mly1_public/2/{z}/{x}/{y}?access_token=MLY|4142433049200173|72206abe5035850d6743b23a49c41333'
        ],
    });

    map.addLayer(
        {
            'id': 'density',
            'type': 'fill',
            'source': 'density',
            'source-layer': 'all-cities-together-ctv3m3 copy',
            'layout': {},
            'paint': {
                'fill-color': [
                    'let',
                    'all-cities-together-ctv3m3 copy',
                    ['/', ['get', 'population'], ['get', 'sq-km']],
                    [
                        'interpolate',
                        ['linear'],
                        ['zoom'],
                        8, 
                        [
                            'interpolate',
                            ['linear'],
                            ['var', 'densall-cities-together-ctv3m3 copy'],
                            274,
                            ['to-color', '#f5e5f3'],
                            1551,
                            ['to-color', '#8d00ac']
                            ],
                            10,
                            [
                            'interpolate',
                            ['linear'],
                            ['var', 'all-cities-together-ctv3m3 copy'],
                            274,
                            ['to-color', '#eff3ff'],
                            1551,
                            ['to-color', '#08519c']
                            ]
                    ]
                ],
                'fill-opacity': 0.7
            }
        },
        'road-label' 
    );

    // Add click event listener to the 'density' layer
    map.on('click', 'density', (e) => {
        const clickedFeature = e.features[0];
        // Perform actions based on the clicked feature
        // You can access the feature properties using clickedFeature.properties
        console.log(clickedFeature.properties);
    });

    // Change the cursor style to pointer when hovering over the 'density' layer
    map.on('mouseenter', 'density', () => {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change the cursor style back to the default when not hovering over the 'density' layer
    map.on('mouseleave', 'density', () => {
        map.getCanvas().style.cursor = '';
    });
});


map.addControl(new mapboxgl.FullscreenControl());


const draw = new MapboxDraw({
    displayControlsDefault: false,
    // Select which mapbox-gl-draw control buttons to add to the map.
    controls: {
    polygon: true,
    trash: true
    },
    // Set mapbox-gl-draw to draw by default.
    // The user does not have to click the polygon control button first.
    defaultMode: 'draw_polygon'
});
map.addControl(draw);
    
map.on('draw.create', updateArea);
map.on('draw.delete', updateArea);
map.on('draw.update', updateArea);



function updateArea(e) {
    const data = draw.getAll();
    const answer = document.getElementById('calculated-area');
    if (data.features.length > 0) {
        const area = turf.area(data);

            
        const coordinates = data.features[0].geometry.coordinates[0];

        console.log("COORDINATES SELECTED");
        // Display the coordinates in the console.
        console.log(coordinates);
        
        // Restrict the area to 2 decimal points.
        const rounded_area = Math.round(area * 100) / 100;
        answer.innerHTML = `<p><strong>${rounded_area}</strong></p><p>square meters</p>`;
    } else {
        answer.innerHTML = '';
    if (e.type !== 'draw.delete')
        alert('Click the map to draw a polygon.');
    }
}


