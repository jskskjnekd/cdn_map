var Tone = require("tone");
const synth = new Tone.MembraneSynth().toMaster();
var synth2 = new Tone.FMSynth().toMaster();
// var synth2 = new Tone.PolySynth(6, Tone.Synth, {
//     oscillator : {
//         type : "square"
//     }
// }).toMaster();



mapboxgl.accessToken = 'pk.eyJ1Ijoic3VueWFvamluMjAxMSIsImEiOiJjazEzMDhocWIwNGRvM2lsbjM2YW1qaTNoIn0.zDLR10-_uM7LrQFjmkMLEQ';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/sunyaojin2011/ck13wxtuw1ftl1ctd1pq653t0',
    center: [0, 0],
    zoom: 0.5
});

let max_time_interval = 2000;
let max_time_interval_opacity = 1000;
let all_msg_flow = [];
let all_msg_flow_opacity = [];
let init_radius = 1;

let tic = 0;

let cities = [
    [-80.243057, 27.192223],
    [-100.450279, 31.442778],
    [-117.241112, 33.193611],
    [-90.590836, 41.543056],
    [122.983330, 41.116669],
    [108.316666, 22.816668],
    [126.633331, 45.750000],
    [104.066002, 30.657000],
    [116.383331, 39.916668],

    [-83.98, 35.82],
    [-83.98, 35.82],
    [-83.98, 35.82],
    [-83.98, 35.82],
    [-83.98, 35.82],
    [-83.98, 35.82],

    [-118.40, 33.93],
    [-118.40, 33.93],
    [-118.40, 33.93],
    [-118.40, 33.93],
    [-118.40, 33.93],
    [-118.40, 33.93],

    [-73.98, 40.77],
    [-73.98, 40.77],
    [-73.98, 40.77],
    [-73.98, 40.77],
    [-73.98, 40.77],
    [-73.98, 40.77],

    [-104.87, 39.75],
    [-104.87, 39.75],
    [-104.87, 39.75],
    [-104.87, 39.75],
    [-104.87, 39.75],
    [-104.87, 39.75],
    [-104.87, 39.75],

    [-80.28, 25.82],
    [-80.28, 25.82],
    [-80.28, 25.82],
    [-80.28, 25.82],
    [-80.28, 25.82],
    [-80.28, 25.82],

    [-122.30, 47.45],
    [-122.30, 47.45],
    [-122.30, 47.45],
    [-122.30, 47.45],



    //
    [116.383331, 39.916668],
    [116.383331, 39.916668],
    [116.383331, 39.916668],
    [116.383331, 39.916668],
    [103.828812, 36.054871],
    [123.918182, 47.354347],
    [114.062996, 22.542883],
    [114.062996, 22.542883],
    [114.062996, 22.542883],
    [114.062996, 22.542883],
    [114.062996, 22.542883],
    [121.560501, 31.226444],
    [121.560501, 31.226444],
    [121.560501, 31.226444],
    // japan
    [136.899994, 35.183334],
    [140.869415, 38.268223],
    [130.399994, 33.583332],
    [135.497009, 34.669529],
    [130.598663, 32.535366],
    [139.677887, 35.817616],
    [139.839478, 35.652832],

    //EU
    [ -3.707721, 40.412752],
    [-1.130042, 37.987041],
    [-6.940044, 37.266385],
    [-2.666667, 42.85],
    [-6.347778, 53.718889],
    [-8.183333, 53.633333],

    // south america
    [-43.277548, -22.875113],
    [-48.470614, -1.437281],
    [-40.345011, -20.332179],

    //
    [16.05, 48.333333],
    [10.733333, 47.233333],
    [9.733056, 47.416667],
    [16.25, 47.8],
    [51.4216, 35.705],
    [3.716667, 51.05],
    [126.9783, 37.5985],
    [37.615556, 55.752222],
    [37.615556, 55.752222],
    [37.615556, 55.752222],
    [37.615556, 55.752222],
    [37.615556, 55.752222],
    [50.150002, 53.200065]
];



function get_updated_marker_coordinates(src, dst, start_time, current_time){
    if (current_time - start_time < max_time_interval){
        let coeff = (current_time - start_time)/max_time_interval;
        let pos_0 = (dst[0] - src[0])*coeff + src[0];
        let pos_1 = (dst[1] - src[1])*coeff + src[1];
        return {"type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        pos_0,
                        pos_1
                    ]
                }};
    }
    return undefined;
}

function extracted(timestamp_int) {
    // synth2.triggerAttackRelease('C4', '2n');
    // synth.triggerAttackRelease(["C4", "E4", "A4"], "4n");
    let ind = Math.floor((tic + Math.random()*10)) % 15;

    if ((timestamp_int * timestamp_int) % 19 == 0){
        switch (ind) {
            case 0:
                synth.triggerAttackRelease('C3', '3n');
                break;
            case 1:
                synth.triggerAttackRelease('c4', '2n');
                break;
            case 2:
                synth.triggerAttackRelease('c5', '2n');
                break;
            case 3:
                synth.triggerAttackRelease('eb3', '2n');
                break;
            case 4:
                synth.triggerAttackRelease('eb4', '2n');
                break;
            case 5:
                synth.triggerAttackRelease('eb5', '2n');
                break;
            case 6:
                synth.triggerAttackRelease('F3', '2n');
                break;
            case 7:
                synth.triggerAttackRelease('f4', '2n');
                break;
            case 8:
                synth.triggerAttackRelease('f5', '2n');
                break;
            case 9:
                synth.triggerAttackRelease('g3', '2n');
                break;
            case 10:
                synth.triggerAttackRelease('g4', '2n');
                break;
            case 11:
                synth.triggerAttackRelease('g5', '2n');
                break;
            case 12:
                synth.triggerAttackRelease('bb3', '2n');
                break;
            case 13:
                synth.triggerAttackRelease('bb4', '2n');
                break;
            default:
                synth2.triggerAttackRelease('bb5', '2n');
        }
        ++tic;
    }
}

function extracted_opacity(timestamp_int) {
    // synth2.triggerAttackRelease('C4', '2n');
    // synth.triggerAttackRelease(["C4", "E4", "A4"], "4n");
    let ind = Math.floor((tic + Math.random()*10)) % 15;

    if ((timestamp_int * timestamp_int) % 21 == 0){
        switch (ind) {
            case 0:
                synth2.triggerAttackRelease('C4', '1n');
                break;
            case 1:
                synth2.triggerAttackRelease('C3', '1n');
                break;
            case 2:
                synth2.triggerAttackRelease('C5', '1n');
                break;
            case 3:
                synth2.triggerAttackRelease('eb3', '1n');
                break;
            case 4:
                synth2.triggerAttackRelease('eb4', '1n');
                break;
            case 5:
                synth2.triggerAttackRelease('eb3', '1n');
                break;
            case 6:
                synth2.triggerAttackRelease('eb5', '1n');
                break;
            case 7:
                synth2.triggerAttackRelease('eb4', '1n');
                break;
            case 8:
                synth2.triggerAttackRelease('g4', '1n');
                break;
            case 9:
                synth2.triggerAttackRelease('g5', '1n');
                break;
            case 11:
                synth2.triggerAttackRelease('g3', '1n');
                break;
            case 12:
                synth2.triggerAttackRelease('bb3', '1n');
                break;
            case 13:
                synth2.triggerAttackRelease('bb4', '1n');
                break;
            case 14:
                synth2.triggerAttackRelease('bb5', '1n');
                break;
            default:
                synth2.triggerAttackRelease('bb4', '1n');
        }
        ++tic;
    }
}

map.on('load', function () {
    // Add a source and layer displaying a point which will be animated in a circle.

    let rec_points = {
        "type": "FeatureCollection",
        "features": []
    };

    let rec_points_opcaity = {
        "type": "FeatureCollection",
        "features": []
    };

    console.log("---> 1");

    map.addSource('Mpoint', {
        "type": "geojson",
        "data": rec_points
    });

    map.addLayer({
        "id": "point",
        "source": "Mpoint",
        "type": "circle",
        "paint": {
            "circle-radius": 2.5,
            "circle-color": "#007cbf",
            "circle-opacity": 0.8
        },
        "filter": ["==", "$type", "Point"],
    });

    // opacity
    map.addSource('OpacityPoint', {
        "type": "geojson",
        "data": rec_points_opcaity
    });

    map.addLayer({
        "id": "opac_point",
        "source": "OpacityPoint",
        "type": "circle",
        "paint": {
            "circle-radius": init_radius,
            "circle-color": "#D85F7D",
            "circle-opacity": 0.8
        },
        "filter": ["==", "$type", "Point"],
    });




    // rm layer first, then remove source

    function animate_opacity(timestamp) {
        // Update the data to a new position based on the animation timestamp. The
        // divisor in the expression `timestamp / 1000` controls the animation speed.
        rec_points_opcaity = {
            "type": "FeatureCollection",
            "features": []
        };

        let timestamp_int = Math.floor(timestamp+111);
        if (timestamp_int % 5 == 0){
            let rand_ind1 = 5 + Math.floor(Math.random() * 40);
            let new_ele = [];
            new_ele.push(cities[rand_ind1]);
            let rand_ind2 = Math.floor(Math.random() * cities.length);
            new_ele.push([-43.277548, -22.875113]);
            new_ele.push(timestamp_int);
            all_msg_flow_opacity.push(new_ele);
            console.log("added new src/dst, the length is ", all_msg_flow_opacity.length);
        }

        let should_be_updated = [];
        for (let k=0; k<all_msg_flow_opacity.length; ++k){
            if (timestamp_int - all_msg_flow_opacity[k][2] < max_time_interval){
                should_be_updated.push(all_msg_flow_opacity[k]);
            }
        }
        all_msg_flow_opacity = should_be_updated;
        console.log("opacity --> ", all_msg_flow_opacity.length);

        for (let i=0; i<all_msg_flow_opacity.length; ++i){
            rec_points_opcaity.features.push(
                get_updated_marker_coordinates(all_msg_flow_opacity[i][0], all_msg_flow_opacity[i][1], all_msg_flow_opacity[i][2], timestamp_int));
        }

        //
        map.getSource('OpacityPoint').setData(rec_points_opcaity);
        map.setPaintProperty('opac_point', 'circle-radius', init_radius * (1 + 2*(timestamp_int % max_time_interval)/max_time_interval));

        if (all_msg_flow_opacity.length > 10){
            extracted_opacity(timestamp_int);
        }
        // Request the next frame of the animation.
        requestAnimationFrame(animate_opacity);
    }





    // simple update the data


    function animateMarker(timestamp) {
        // Update the data to a new position based on the animation timestamp. The
        // divisor in the expression `timestamp / 1000` controls the animation speed.
        rec_points = {
            "type": "FeatureCollection",
            "features": []
        };

        let timestamp_int = Math.floor(timestamp);
        if (timestamp_int % 5 == 0){
            let rand_ind1 = Math.floor(Math.random() * cities.length /2);
            let new_ele = [];
            new_ele.push(cities[rand_ind1]);
            let rand_ind2 = Math.floor(Math.random() * cities.length);
            new_ele.push(cities[rand_ind2]);
            new_ele.push(timestamp_int);
            all_msg_flow.push(new_ele);
            console.log("added new src/dst, the length is ", all_msg_flow.length);
        }

        let should_be_updated = [];
        for (let k=0; k<all_msg_flow.length; ++k){
            if (timestamp_int - all_msg_flow[k][2] < max_time_interval){
                should_be_updated.push(all_msg_flow[k]);
            }
        }
        all_msg_flow = should_be_updated;
        console.log("-> ", all_msg_flow.length);



        if (all_msg_flow.length > 10){
            extracted(timestamp_int);
        }

        for (let i=0; i<all_msg_flow.length; ++i){
            rec_points.features.push(
                get_updated_marker_coordinates(all_msg_flow[i][0], all_msg_flow[i][1], all_msg_flow[i][2], timestamp_int));
        }

        map.getSource('Mpoint').setData(rec_points);


        // Request the next frame of the animation.
        requestAnimationFrame(animateMarker);
    }

    // Start the animation.
    animateMarker(0);
    animate_opacity(0);

});


