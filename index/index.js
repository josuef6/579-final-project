// // import Wave from "@foobar404/wave"

// let canvas = document.getElementById("audio_visual");
// let ctx = canvas.getContext("2d");
// // let ctx = canvas.getContext("webgl");


// let audioElement = document.getElementById("source");
// let audioCtx = new AudioContext() || webkitAudioContext();
// // let audioCtx = new webkitAudioContext();

// let analyser = audioCtx.createAnalyser();
// analyser.fftSize = 2048;
// let source = audioCtx.createMediaElementSource(audioElement);

// source.connect(analyser);
// //this connects our music back to the default output, such as your //speakers
// source.connect(audioCtx.destination);


// let data = new Uint8Array(analyser.frequencyBinCount);


// function loopingFunction(data) {
//     requestAnimationFrame(loopingFunction);
//     analyser.getByteFrequencyData(data);
//     draw(data);
// }

// function draw(data) {
//     data = [...data];
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     let space = canvas.width / data.length;
//     data.forEach((value, i) => {
//         ctx.beginPath();
//         ctx.moveTo(space * i, canvas.height); //x,y
//         ctx.lineTo(space * i, canvas.height - value); //x,y
//         ctx.stroke();
//     })
// }

// audioElement.onplay = () => {

//     audioCtx.resume();
// }

window.onload = function () {

    var file = document.getElementById("thefile");
    var audio = document.getElementById("audio");

    file.onchange = function () {
        var files = this.files;
        audio.src = URL.createObjectURL(files[0]);
        audio.load();
        audio.play();
        var context = new AudioContext();
        var src = context.createMediaElementSource(audio);
        var analyser = context.createAnalyser();

        var canvas = document.getElementById("canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        var ctx = canvas.getContext("2d");

        src.connect(analyser);
        analyser.connect(context.destination);

        analyser.fftSize = 256;

        var bufferLength = analyser.frequencyBinCount;
        console.log(bufferLength);

        var dataArray = new Uint8Array(bufferLength);

        var WIDTH = canvas.width;
        var HEIGHT = canvas.height;

        var barWidth = (WIDTH / bufferLength) * 2.5;
        var barHeight;
        var x = 0;

        function renderFrame() {
            requestAnimationFrame(renderFrame);

            x = 0;

            analyser.getByteFrequencyData(dataArray);

            ctx.fillStyle = "#000";
            ctx.fillRect(0, 0, WIDTH, HEIGHT);

            for (var i = 0; i < bufferLength; i++) {
                barHeight = dataArray[i];

                var r = barHeight + (25 * (i / bufferLength));
                var g = 250 * (i / bufferLength);
                var b = 50;

                ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
                ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

                x += barWidth + 1;
            }
        }

        audio.play();
        renderFrame();
    };
};

var wavesurfer = WaveSurfer.create({
    // container: document.getElementById("waveform"),
    container: '#waveform',
    waveColor: 'blue',
    progressColor: 'yellow'
});

wavesurfer.load('music/HotlineBling.m4a');
// in order to run files locally you must have your own server; run following commands in terminal:
// npm install - g live - server
// live-server

// otherwise you need a url the will now throw any CORS errors
// wavesurfer.load('http://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3');

wavesurfer.on('ready', function () {
    wavesurfer.play();
});