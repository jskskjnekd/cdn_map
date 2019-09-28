'use strict';

var Tone = require("tone");
const synth = new Tone.MembraneSynth().toMaster();
var synth2 = new Tone.FMSynth().toMaster();

function playNote() {

    // synth2.triggerAttackRelease also has time and schedule options
    //   e.g.   synth.triggerAttackRelease('C4', '4n', '8n')
    //          synth.triggerAttackRelease('E4', '8n', Tone.Time('4n') + Tone.Time('8n'))
    synth2.triggerAttackRelease('C4', '2n');

}

let button = document.getElementById("test_music_play");

button.addEventListener("click", (event) => {
    playNote();
});

