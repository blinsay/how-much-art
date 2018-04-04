// SKETCH: train-schedule-for-sol

interface Vec2D {
  x: number
  y: number
}

interface Rect {
  x: number
  y: number
  width: number
  height: number
}

function inBounds(p: Vec2D, bounds: Rect): boolean {
  return bounds.x <= p.x &&
      bounds.y <= p.y &&
      p.x <= (bounds.x + bounds.width) &&
      p.y <= (bounds.y + bounds.height)
}

function vadd(a: Vec2D, b: Vec2D): Vec2D {
  return {x: a.x + b.x, y: a.y + b.y}
}


function walk(start: Vec2D, bounds: Rect, speed: (x: number, y:number) => Vec2D): Array<Vec2D> {
  let path = [start]
  let current = start

  while (true) {
    let next = vadd(current, speed(current.x, current.y))

    if (!inBounds(next, bounds)) {
      break
    }
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

function drawPath(path: Array<Vec2D>, weight = 5) {
  console.log(path);

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
const N_WALKERS = 75;

function setup() {
  createCanvas(windowWidth, windowHeight)

  noLoop()
}

function draw() {

  let padding = 250
  let bounds = {
    x: padding,
    y: padding,
    width: windowWidth - 2 *padding,
    height: windowHeight - 2 * padding,
  }
  let stride = bounds.height / N_WALKERS;
  let buildPath = (w: Vec2D) => walk(w, bounds, rightAndJumpUp(25, 25, 0.05))

  // build walkers in a line down the left edge of the bounding box
  let walkers = []
  for (let i = bounds.y; i < (bounds.y + bounds.height); i += stride) {
    walkers.push({x: bounds.x, y: i})
  }

  walkers
    .map(buildPath)
    .forEach(p => drawPath(p, 1.5))
}

