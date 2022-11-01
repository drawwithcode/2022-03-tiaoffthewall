
var trip;
let particles = [];
let res = 8;
let img;

function preload() { 
  trip = loadSound('libraries/sound/trip.mp3'); 
  img = loadImage("libraries/images/brain1.png");
}
function loaded() {
  console.log("loaded");
}



function setup() {
  createCanvas(1100, 1000);
  trip.setVolume(1);
  trip.play();
  placeParticles();
  noStroke();
  
}



//function keyTyped(){
 // if(key == 'p'){
 //   trip.play();
 //   loop();
  //  
 // }
//}

function draw() {
  background(0);
  for(let i = 0; i < particles.length; i++){
    particles[i].update();
    particles[i].draw();
  }
  //imageMode(CENTER);
  //image(img, windowWidth / 2, windowHeight / 2, 300, 429);

  
  
 
}

function placeParticles(){
  for(let i = 0; i < width; i += res){
    for(let j = 0; j < height; j+= res){
      let x = (i/width) * img.width;
      let y = (j/width) * img.height;
      let c = img.get(x,y);

      if(c[3] != 0){
        particles.push(new Particle(i,j,c))
      }
    }
  }

}


class Particle {
  constructor(x, y, c){
    this.x = x;
    this.y = y;
    
    this.c = c;

    this.homeX = x;
    this.homeY = y;
  }

  update(){

    // mouse
    let mouseD = dist(this.x, this.y, mouseX, mouseY);
    let mouseA = atan2(this.y - mouseY,  this.x - mouseX);

    // home
    let homeD = dist(this.x, this.y, this.homeX, this.homeY);
    let homeA = atan2(this.homeY - this.y, this.homeX - this.x);

    // forze
    let mouseF = constrain(map(mouseD, 0, 100, 50, 0), 0, 50);
    let homeF = map(homeD, 0, 100, 0, 5);

    let vx = cos(mouseA) * mouseF;
    vx += cos(homeA) * homeF;

    let vy = sin(mouseA) * mouseF;
    vy += sin(homeA) * homeF;


    this.x += vx;
    this.y += vy;

  }

  draw() {
    fill(this.c);
    ellipse(this.x, this.y, 6, 6);
  }
}
