
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




    map.addSource('radar', {
        'type': 'image',
        'url': 'https://docs.mapbox.com/mapbox-gl-js/assets/radar.gif',
        //'url': 'https://mangekyou-sharingan-api.s3.eu-central-1.amazonaws.com/Berlin/.png/Berlin_Census_MP_All-Scene_2013_Density.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAQaDGV1LWNlbnRyYWwtMSJHMEUCIQCFtTlOE%2FlFQPBrSJ5BvWtkjujqXm9bSByMQqj%2Bb1DfiQIgfUoHecccXlhv6YLkTzJ0pnQiMn4h%2BAVGA9iWo4kP2SIqigMI7f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw3OTQ5OTYzMDQ4NzMiDAIp9F640xNqa75wuCreAt2h%2BLdvDIjdGJI%2BPVfTiYY4uCWKqWlY5ssSSpw5eBhyYMWs6Cl8DtpdezD5xSZJpEunDeDn2GZJpVOq0EFYT66giOP5jIiWknTvBNT5UXKkH%2FJjZUkOGV%2FGHJWmF69U7a%2Fd2%2FtOzr3z1%2FqB0vHdGFtQhAuDUuGG%2Bk7WI%2F1AYdMbnuw5sqZtitJ5%2FebYNWCvzPhEbVaRluP19rCwNTswUEZgi%2BaiaemefhrdVM5GgvDf7Y0pIZzLRBPv8vb4mBEr4YJnn4CwksiM%2FVLKVTwvHEdc%2FxiNfHqGNNaHTqA43Sxry5OidQKFumxuAU37oDBsgsfeJ8fRaO%2FYbv1ule1DR55uVuTLAspXfa035CgVwc%2FWMn5VePVAt1pGTgbfNyeUB5lgnUFQ3mTwvf3FGeJyNCo8YQ7MFd0lePtGV84UHhst77ACdNzpIJwCFzv4Tbx%2BqBAs%2FvCcnoDbnJfVV9TKMJrlsKgGOrMCpRiLP%2FHekUA8vHToHIH%2BR6GavxBva0QgTNZ0%2BSL3%2FF0yDO5JEkkxYLjzPrc%2Bc9OgmgIfnY2Max%2FdLHqX8ibHeeOMTfbb1oJDXK0q0i7%2FB%2B5YcEdCE4X4VgbOO6IszkjG5XrZzzDh6ezHMaa%2FVVDDl8kFhixeEVTwNgGJzaa6Eaha4w89ej%2FYITLA9pd1%2F6AYihkXOF9rKqstDxSLllViLZgf%2F3hvTHH7DXBkPuI6j8fTszcgS3arWSD5IXqHPia14zwaUCB1fuJZh%2FdoSgWK6bpj4S8jmGwXfApYj3Q5VprtlmVtYnvIaz30dc5bl5J5hS76eU6%2BD05rptmst%2FS2tYRz4bNvdklCWXVWFhfrD7VBMtORgVq3UjO829OdAcfLM4eZ3nOJWZ9DFfJQCB64GoX1Dw%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230921T121745Z&X-Amz-SignedHeaders=host&X-Amz-Expires=43200&X-Amz-Credential=ASIA3SGLY5PURTMS4FFU%2F20230921%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Signature=2b5553a57c6a6c627a493b19c7126db2925b0bba93fc0687e78992baf4a9399d',
        //'url': 'https://mangekyou-sharingan-api.s3.amazonaws.com/Berlin/.png/Berlin_Satellite_NDWI_T33UVU_Annual_2022.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA3SGLY5PUT7UAXX4O%2F20230921%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20230921T123008Z&X-Amz-Expires=43200&X-Amz-SignedHeaders=host&X-Amz-Signature=f0adeecf88ce2bb7615d01564c69dac06e0f7f3f8acb81590797ea36f92432b3',
        'coordinates': [
            [-80.425, 46.437],
            [-71.516, 46.437],
            [-71.516, 37.936],
            [-80.425, 37.936]
        ]
    });
    map.addLayer({
        id: 'radar-layer',
        'type': 'raster',
        'source': 'radar',
        'paint': {
            'raster-fade-duration': 0
        }
    });


    // map.addSource('tifpng', {
    //     'type': 'image',
    //     'url': '/static/tiffs/tif.png',
    //     'coordinates': [
    //         [2.352221, 51.5073359],
    //         [2.352221, 41.5073359],
    //         [-8.11111, 41.5073359],
    //         [-8.11111, 51.5073359]
    //     ]
    // });

    // map.addSource('tifpng', {
    //     'type': 'image',
    //     'url': '/static/tiffs/transparent.png',
    //     'coordinates': [
    //         [13.761159145035254, 52.67550765972353],
    //         [13.761159145035254, 52.338245549997296],
    //         [13.08834761473099, 52.338245549997296],
    //         [13.08834761473099, 52.67550765972353]
    //     ]
    // });

    // map.addLayer({
    //     id: 'tifpng-layer',
    //     'type': 'raster',
    //     'source': 'tifpng',
    //     'paint': {
    //         'raster-fade-duration': 0
    //     }
    // });
    
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


