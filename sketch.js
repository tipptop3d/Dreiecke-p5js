var vectors;
var vector_ab;
var vector_ac;

var new_vector;

var canvas;
var pg;
var points_count = 0;

var slider;

var pausebutton;
var paused = false;

function pause() {
  paused = !paused;
  paused ? noLoop() : loop();
  pausebutton.html(paused ? 'PLAY' : 'PAUSE');
}

function reset() {
  pg.background(12, 12, 12, 255);
  points_count = 0;

  pg.stroke('red');
  vectors.forEach(element => {
    pg.point(element);
  });
  pg.stroke(240,240,240)

  redraw();
}

function setup() {
  // init canvas
  canvas = createCanvas(750, 700);
  canvas.parent("canvas");
  frameRate(60);
  textSize(40);
  textAlign(CENTER);

  // init buttons
  pausebutton = createButton(paused ? 'PLAY' : 'PAUSE');
  pausebutton.parent("pause-button");
  pausebutton.mouseClicked(pause);

  let resetbutton = createButton('RESET');
  resetbutton.parent('reset-button');
  resetbutton.mouseClicked(reset);

  slider = createSlider(1, 120, 60);
  slider.parent("slider-container");
  slider.class('slider');
  slider.id('range1')

  pg = createGraphics(750, 700);
  pg.strokeWeight(2);

  // init vectors and draw corner points
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
  frameRate(slider.value());
  let random_point = random(vectors);
  point_to_corner = p5.Vector.div(p5.Vector.sub(random_point, new_vector), 2);
  new_vector.add(point_to_corner);
  switch (random_point) {
    case vectors[0]:
      pg.stroke('lime');
      break;
    case vectors[1]:
      pg.stroke('fuchsia');
      break;
    case vectors[2]:
      pg.stroke('cyan');
      break;
  }
  pg.point(new_vector);
  // counter
  points_count += 1;
  background(12,12,12);
  fill(240, 240, 240);
  image(pg, 0, 0);
  text(points_count, 50, 10, 64, 64);
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