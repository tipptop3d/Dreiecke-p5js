var vectors;
var vector_ab;
var vector_ac;

var new_vector;

var pg;

function setup() {
  createCanvas(600, 600);
  frameRate(30);
  textSize(40);
  textAlign(CENTER);

  pg = createGraphics(600, 600);
  pg.strokeWeight(5);

  vectors = [
    createVector(300, 40),
    createVector(20, 580),
    createVector(580, 580),
  ];

  pg.stroke('red');
  vectors.forEach(element => {
    pg.point(element);
  });
  pg.stroke('black')

  vector_ab = p5.Vector.sub(vectors[1], vectors[0]);
  vector_ac = p5.Vector.sub(vectors[2], vectors[0]);

  new_vector = p5.Vector.add(vectors[0], random_vector(vector_ab, vector_ac));
  pg.point(new_vector);
}

function draw() {
  let random_point = random(vectors);
  old_vector = new_vector.copy();
  new_vector = p5.Vector.div(p5.Vector.sub(random_point, old_vector), 2);
  new_vector.add(old_vector);
  pg.point(new_vector);
  background('white')
  text(frameCount, 50, 10, 64, 64);
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