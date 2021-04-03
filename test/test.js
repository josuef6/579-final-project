let wave = new Wave();

// let audio = document.getElementById("audio");
let canvas = document.getElementById("wave");

// wave.fromElement(audio, canvas, {
//     type: ["bars", "bars blocks", "big bars", "cubes", "dualbars", "dualbars blocks", "fireworks", "flower", "flower blocks", "orbs", "ring", "rings", "round wave", "shine", "shine rings", "shockwave", "star", "static", "stitches", "web", "wave"]
// });

// wave.fromElement(audio, canvas, {
//     stroke: 2
// });
// wave.fromElement(audio, canvas, {
//     colors: ["#24292e", "#547ee2"]
// });

// wave.playStream();
// wave.stopStream();

// wave.onFileLoad = (image) => {
//     //work with image as data uri
// }

// let wave = new Wave();
wave.fromFile("music/HotlineBling.m4a", { type: "shine",
    colors: ["#24292e", "#547ee2"]
 });

wave.onFileLoad = (image) => {
    //work with image as data uri
}