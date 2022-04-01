var vectors;
var vector_ab;
var vector_ac;

var new_vector;

var pg;
var points_count = 0;

var button;
var paused = false;

function pause() {
  paused = !paused;
  button.html(paused ? 'Play' : 'Pause');
}

function setup() {
  createCanvas(750, 700);
  frameRate(60);
  textSize(40);
  textAlign(CENTER);

  button = createButton('Pause');
  button.size(100, 40);
  button.mousePressed(pause);

  pg = createGraphics(750, 700);
  pg.strokeWeight(2);

  vectors = [
    createVector(375, 20),
    createVector(20, 680),
    createVector(730, 680),
  ];

  pg.stroke('red');
  vectors.forEach(element => {
    pg.point(element);
  });
  pg.stroke(240,240,240)

  vector_ab = p5.Vector.sub(vectors[1], vectors[0]);
  vector_ac = p5.Vector.sub(vectors[2], vectors[0]);

  new_vector = p5.Vector.add(vectors[0], random_vector(vector_ab, vector_ac));
  pg.point(new_vector);
}

function draw() {
  if (paused) {
    return
  }
  let random_point = random(vectors);
  old_vector = new_vector.copy();
  new_vector = p5.Vector.div(p5.Vector.sub(random_point, old_vector), 2);
  new_vector.add(old_vector);
  pg.point(new_vector);
  points_count += 1;
  background(12,12,12);
  fill(240, 240, 240);
  text(points_count, 50, 10, 64, 64);
  image(pg, 0, 0);
}

function random_vector(u, v) {
  while (true) {
    s = random(0, 1);
    t = random(0, 1);
    let in_triangle = s + t <= 1
    if (in_triangle) {
      v1 = p5.Vector.mult(u, s)
      v2 = p5.Vector.mult(v, t)
      return p5.Vector.add(v1, v2)
    }
  }
}