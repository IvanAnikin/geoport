
window.onload = function(){

    const continentSelect = document.getElementById("continent_input");
    // const countrySelect = document.getElementById("country_input");
    const citySelect = document.getElementById("city_input");

    const layerSelect = document.getElementById("custom_layers_input");
     

    
    var last_continent_lng = "14.437800";
    var last_continent_lat = "50.075539";

    flaskApiHost = "http://127.0.0.1:5000"

    document.getElementById("cleanlayers_btn").addEventListener("click", function (){


        var addedLayers = map.getStyle().layers;

        if (addedLayers) {
            // Iterate through the layers and remove them
            addedLayers.forEach(function (layer) {
                if (layer.id.startsWith('http')) {
                    map.removeLayer(layer.id);
                }
            });
        }
    });

    layerSelect.addEventListener("change", function (){
        
        var selectedOption = layerSelect.options[layerSelect.selectedIndex];

        // Get the name (text) of the selected option
        var selectedLayerName = selectedOption.text;
        
        var layer = layerSelect.value;
        
        map.addSource(layer, {
            'type': 'image',
            'url': layer,
            'coordinates': [
                [13.761159145035254, 52.67550765972353],
                [13.761159145035254, 52.338245549997296],
                [13.08834761473099, 52.338245549997296],
                [13.08834761473099, 52.67550765972353]
            ]
        });

        map.addLayer({
            id: layer,
            'type': 'raster',
            'source': layer,
            'paint': {
                'raster-fade-duration': 0
            }
        });

        switch(layer){
            case "berlin":

                map.addSource('tifpng', {
                    'type': 'image',
                    'url': '/static/tiffs/transparent.png',
                    'coordinates': [
                        [13.761159145035254, 52.67550765972353],
                        [13.761159145035254, 52.338245549997296],
                        [13.08834761473099, 52.338245549997296],
                        [13.08834761473099, 52.67550765972353]
                    ]
                });

                map.addLayer({
                    id: 'tifpng-layer',
                    'type': 'raster',
                    'source': 'tifpng',
                    'paint': {
                        'raster-fade-duration': 0
                    }
                });
                
                break;
        }


        var diagram = myDiagram;
        diagram.startTransaction("Add Node");

        // Create a new "State" data object for the new node
        var newNodeData = { text: selectedLayerName };

        // Position the new node near the center of the diagram
        var center = diagram.documentBounds.center;
        newNodeData.loc = go.Point.stringify(center);

        // Add the new node data to the model
        diagram.model.addNodeData(newNodeData);

        diagram.commitTransaction("Add Node");

    });

    continentSelect.addEventListener("change", function (){
        var continent = continentSelect.value;


        switch(continent){
            case "Europe":
                map.flyTo({
                    center: [14.437800, 50.075539], zoom: 3
                });
                break;
            case "Asia":
                map.flyTo({
                    center: [116.407394, 39.904202], zoom: 3
                });
                break;
            case "North America":
                map.flyTo({
                    center: [-98.484245, 39.011902], zoom: 3
                });
                break;
            case "South America":
                map.flyTo({
                    center: [-57.575928, -25.263741], zoom: 3
                });
                break;
            case "Oceania":
                map.flyTo({
                    center: [121.183957, -1.728888], zoom: 3
                });
                break;
            case "Africa":
                map.flyTo({
                    center: [20.043211, 5.439168], zoom: 3
                });
                break;
            case "none":
                map.flyTo({
                    center: [14.437800, 50.075539], zoom: 2
                });
        }

        // var url = '/get_countries?continents="'+continent+'"';
        // var xhr = new XMLHttpRequest();
        // xhr.open('POST', url, true);
        // xhr.responseType = 'json';
        // var countries;
        // var cities_in_continent;

        // xhr.onload = function() {
        
                
        //     var status = xhr.status;
        //     if (status == 200) {
        //         myresponse = xhr.response;
        //         console.log(myresponse);
                
        //         countries = xhr.response['data'];
        //         console.log(countries );

        //     } else {
        //         console.log(status);
        //         console.log(xhr.response);
        //     }
        // };
        // xhr.send(JSON.stringify({"function": "continent", "data":[continent]})); //country_input.value

    });

    citySelect.addEventListener("change", function (){

        var city = citySelect.value;

        switch(city){
            case "Berlin":
                map.flyTo({
                    center: [13.4050, 52.5200], zoom: 9
                });
                break;
            case "Brno":
                map.flyTo({
                    center: [16.6068, 49.1951], zoom: 8
                });
                break;
            case "Busan":
                map.flyTo({
                    center: [129.0689, 35.210], zoom: 8
                });
                break;
            
            case "Frankfurt":
                map.flyTo({
                    center: [8.6821, 50.1109], zoom: 8
                });
                break;
            case "Geneva":
                map.flyTo({
                    center: [6.1432, 46.2044], zoom: 8
                });
                break;
            case "Incheon":
                map.flyTo({
                    center: [126.7052, 37.4563], zoom: 8
                });
                break;
            case "Kyoto":
                map.flyTo({
                    center: [135.7681, 35.0116], zoom: 8
                });
                break;
            case "Lyon":
                map.flyTo({
                    center: [ 4.8357, 45.7640], zoom: 8
                });
                break;
            case "Marseille":
                map.flyTo({
                    center: [5.3698, 43.2965], zoom: 8
                });
                break;
            case "Munich":
                map.flyTo({
                    center: [11.5820, 48.1351], zoom: 8
                });
                break;
            case "Osaka":
                map.flyTo({
                    center: [135.5023, 34.6937], zoom: 8
                });
                break;
            case "Ostrava":
                map.flyTo({
                    center: [ 18.2625, 49.8209], zoom: 8
                });
                break;
            case "Prague":
                map.flyTo({
                    center: [ 14.4378,  50.0755], zoom: 8
                });
                break;
            case "Seoul":
                map.flyTo({
                    center: [126.9918, 37.5519], zoom: 8
                });
                break;
            case "Singapore":
                map.flyTo({
                    center: [103.8198, 1.3521], zoom: 8
                });
                break;
            case "Tokyo":
                map.flyTo({
                    center: [ 139.6503, 35.6762], zoom: 8
                });
                break;
            case "none":
                map.flyTo({
                    center: [14.437800, 50.075539], zoom: 2
                });
        }
    });


    const popup_button = document.getElementById("popup_btn");

    popup_button.addEventListener("click", function (){

        document.getElementById("nocode_popup").style.display = "";
    });

    const close_btn = document.getElementById("close");

    close_btn.addEventListener("click", function (){

        document.getElementById("nocode_popup").style.display = "none";
    });

}
    