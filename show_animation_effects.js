mapboxgl.accessToken = 'pk.eyJ1Ijoic3VueWFvamluMjAxMSIsImEiOiJjazEzMDhocWIwNGRvM2lsbjM2YW1qaTNoIn0.zDLR10-_uM7LrQFjmkMLEQ';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/sunyaojin2011/ck13wxtuw1ftl1ctd1pq653t0',
    center: [0, 0],
    zoom: 0.5
});

var radius = 20;
let num_elements = 40;

function pointOnCircle(angle) {
    return {"type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    Math.cos(angle) * radius + Math.random()*10,
                    Math.sin(angle) * radius + Math.random()*10,
                ]
            }};
}

map.on('load', function () {
    // Add a source and layer displaying a point which will be animated in a circle.

    let rec_points = {
        "type": "FeatureCollection",
        "features": []
    };

    for (let i=0; i<num_elements; ++i){
        rec_points.features.push(pointOnCircle(0));
    }


    console.log("---> 1");
    console.log(rec_points);

    map.addSource('Mpoint', {
        "type": "geojson",
        // "data": pointOnCircle(0)
        "data": rec_points
    });

    map.addLayer({
        "id": "point",
        "source": "Mpoint",
        "type": "circle",
        "paint": {
            "circle-radius": 2,
            "circle-color": "#007cbf",
            "circle-opacity": 0.7
        },
        "filter": ["==", "$type", "Point"],
    });

    function animateMarker(timestamp) {
        // Update the data to a new position based on the animation timestamp. The
        // divisor in the expression `timestamp / 1000` controls the animation speed.
        rec_points = {
            "type": "FeatureCollection",
            "features": []
        };

        for (let i=0; i<num_elements; ++i){
            rec_points.features.push(pointOnCircle(timestamp / 1000));
        }

        map.getSource('Mpoint').setData(rec_points);


        // Request the next frame of the animation.
        requestAnimationFrame(animateMarker);
    }

    // Start the animation.
    animateMarker(0);
});


