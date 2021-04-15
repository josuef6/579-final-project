// To run locally run following commands in terminal (make sure you have all the files):
// npm install - g live - server
// live - server

// Initialize variables for song and FFT (Fast Fourier Transform)
let song
let fft
let stars = []
function preload(){
    song = loadSound('music/Orbit.mp3');

}
// Creates Canvas for visualizer
function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}
// Sets positioning for visualizer
function setup(){
    let myCanvas = createCanvas(windowWidth, windowHeight)
    myCanvas.position(0,0);
    myCanvas.style('z-index', '-1');
    angleMode(DEGREES)
    fft = new p5.FFT()
}
// Draws visualizer on the screen
function draw(){
    background(0, 39, 76)
    stroke(255)
    noFill()
    translate(width / 2, height / 2);

    // Transforms sound into frequencies
    fft.analyze()
    amp = fft.getEnergy(20, 200)
    let wave = fft.waveform()

    for(let t = -1; t <=1; t +=2){
        beginShape()
        for (let i = 0; i <= 180; i+= .5) {
            let index = floor(map(i, 0, 180, 0, wave.length - 1))

            let r = map(wave[index], -1, 1, 150, 350)
            let x = r * sin(i) * t
            let y = r * cos(i)
            vertex(x, y)
        }
        endShape()
    }

    let s = new Star()
    stars.push(s)

    for (let i = stars.length - 1; i >= 0; i--) {
        if(!stars[i].edges()){
            stars[i].update(amp > 200)
            stars[i].show()
        }
        else{
            stars.splice(i, 1)
        }
    }
}

function mouseClicked(){
    if (song.isPlaying()){
        song.pause()
        noLoop()
    }
    else{
        song.play()
        loop()
    }
}
// Star particles that react to song for the visualizer
class Star {
    constructor(){
        this.pos = p5.Vector.random2D().mult(250)
        this.vel = createVector(0,0)
        this.acc = this.pos.copy().mult(random(0.0001, 0.00001))

        this.w = random(3, 5)
        this.color = [random(200, 255), random(200, 255), random(200, 255)]
    }
    update(cond){
        this.vel.add(this.acc)
        this.pos.add(this.vel)
        if (cond){
            this.pos.add(this.vel)
            this.pos.add(this.vel)
            this.pos.add(this.vel)
        }
    }
    edges(){
        if(this.pos.x < -width / 2 || this.pos.x > width / 2 ||
            this.pos.y < -height / 2 || this.pos.y > height / 2){
                return true
            }
        else{
            return false
        }
    }
    show(){
        noStroke()
        fill(this.color)
        ellipse(this.pos.x, this.pos.y, this.w)
    }
}