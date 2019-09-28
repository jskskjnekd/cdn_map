
const {DeckGL, GeoJsonLayer, ArcLayer} = deck;

const inFlowColors = [
    [255, 255, 204],
    // [199, 233, 180],
    // [127, 205, 187],
    // [65, 182, 196],
    // [29, 145, 192],
    // [34, 94, 168],
    // [12, 44, 132]
];

const outFlowColors = [
    [255, 255, 178],
    // [254, 217, 118],
    // [254, 178, 76],
    // [253, 141, 60],
    // [252, 78, 42],
    // [227, 26, 28],
    // [177, 0, 38]
];

const deckgl = new DeckGL({
    mapboxApiAccessToken: 'pk.eyJ1Ijoic3VueWFvamluMjAxMSIsImEiOiJjazEzbjQ1N3gwYjQzM25uenlrbnFtMWo5In0.z5Hq67L2U5EViF-4W4BRiA',
    // mapStyle: 'mapbox://styles/mapbox/light-v9',
    mapStyle: 'mapbox://styles/sunyaojin2011/ck13wxtuw1ftl1ctd1pq653t0',
    // mapStyle: 'mapbox://styles/sunyaojin2011/ck13x4pal0qvd1cnh5sla50g4',
    longitude: -100,
    latitude: 40.7,
    zoom: 3,
    maxZoom: 15,
    pitch: 80,
    bearing: 0,
    layers: []
});

function getArcLayer(data, selectedFeature) {

    const {flows, centroid} = selectedFeature.properties;
    console.log(centroid);
    const arcs = Object.keys(flows).map(toId => {
        const f = data.features[toId];
        console.log("--->");
        console.log(toId);
        console.log(f.properties.name);
        return {
            source: centroid,
            target: f.properties.centroid,
            value: flows[toId]
        };
    });

    const scale = d3.scaleQuantile()
        .domain(arcs.map(a => Math.abs(a.value)))
        .range(inFlowColors.map((c, i) => i));

    arcs.forEach(a => {
        a.gain = Math.sign(a.value);
        a.quantile = scale(Math.abs(a.value));
    });

    return new ArcLayer({
        id: 'arc',
        data: arcs,
        getSourcePosition: d => d.source,
        getTargetPosition: d => d.target,
        getSourceColor: d => (d.gain > 0 ? inFlowColors : outFlowColors)[d.quantile],
        getTargetColor: d => (d.gain > 0 ? outFlowColors : inFlowColors)[d.quantile],
        strokeWidth: 4
    });
}

function updateTooltip({x, y, object}) {
    const tooltip = document.getElementById('tooltip');
    if (object) {
        tooltip.style.top = `${y}px`;
        tooltip.style.left = `${x}px`;
        tooltip.innerText = object.properties.name;
    } else tooltip.innerText = '';
}

function renderLayers(data, selectedFeature) {

    selectedFeature = selectedFeature || data.features.find(f => f.properties.name === 'Los Angeles, CA');
    const arcLayer = getArcLayer(data, selectedFeature);
    const countyLayer = new GeoJsonLayer({
        id: 'geojson',
        data,
        stroked: false,
        filled: true,
        autoHighlight: true,
        pickable: true,
        getFillColor: () => [0, 0, 0, 0],
        onClick: info => renderLayers(data, info.object),
        onHover: updateTooltip,
    });

    deckgl.setProps({ layers: [countyLayer, arcLayer] });
}

fetch('https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/arc/counties.json')
    .then(res => res.json())
    .then(data => renderLayers(data))
