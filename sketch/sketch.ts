// SKETCH: lines

interface Vec2D {
  x: number
  y: number
}

interface Vec2D {
  x: number
  y: number
}

function vadd(a: Vec2D, b: Vec2D): Vec2D {
  return {x: a.x + b.x, y: a.y + b.y}
}

function makeWalkers(height: number, stride: number, pad: number): Array<Vec2D> {
  let walkers = []
  for (let i = pad; i < height - pad; i += stride) {
    walkers.push({x: 0, y: i})
  }
  return walkers;
}

function drawPath(path: Array<Vec2D>, weight = 5) {
  push()

  noFill()
  strokeWeight(weight)
  beginShape()
  for (let {x, y} of path) {
    vertex(x, y)
  }
  endShape()

  pop()
}

function path(start: Vec2D, bounds: {x: number, y: number}, speed: (x: number, y:number) => Vec2D): Array<Vec2D> {
  let path = [start]
  let current = start

  while (current.x < bounds.x && current.y < bounds.y) {
    let next = vadd(current, speed(current.x, current.y))
    path.push(next)
    current = next
  }

  return path
}

function perlinRight(speed: number): (x: number, y: number) => Vec2D {
  return (x: number, y: number): Vec2D => {
    return {x: speed, y: -5 + 10 * noise((x + y) / (windowWidth + windowHeight))}
  }
}

function rightAndJumpUp(xspeed: number, yspeed: number, p: number): (x: number, y: number) => Vec2D {
  return (_x: number, _y: number): Vec2D => {
    return {x: xspeed, y: random() < p ? yspeed : 0}
  }
}

const N_WALKERS = 300;

function setup() {
  createCanvas(windowWidth, windowHeight)

  noLoop()
}

function draw() {
  let walkers = makeWalkers(windowHeight, windowHeight / N_WALKERS, 25);
  let bounds = {x: windowWidth - 5, y: windowHeight - 5}
  let buildPath = (w: Vec2D) => path(w, bounds, rightAndJumpUp(5, 5, 0.05))

  walkers
    .map(buildPath)
    .forEach(p => drawPath(p, 1.5))
}

