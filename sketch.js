let particles = [];
function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('p5-canvas-container');
  for (let i = 0; i < 80; i++) particles.push(new Particle());
}
function draw() {
  clear(); 
  particles.forEach((p, index) => {
    p.update();
    p.draw();
    p.connect(particles.slice(index));
  });
}
function windowResized() { resizeCanvas(windowWidth, windowHeight); }

class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(random(-0.4, 0.4), random(-0.4, 0.4));
  }
  update() {
    this.pos.add(this.vel);
    if (this.pos.x < 0 || this.pos.x > width) this.vel.x *= -1;
    if (this.pos.y < 0 || this.pos.y > height) this.vel.y *= -1;
  }
  draw() {
    noStroke(); fill(56, 189, 248, 120);
    circle(this.pos.x, this.pos.y, 3);
  }
  connect(others) {
    others.forEach(other => {
      let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
      if (d < 150) {
        stroke(56, 189, 248, map(d, 0, 150, 100, 0));
        line(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
      }
    });
  }
}