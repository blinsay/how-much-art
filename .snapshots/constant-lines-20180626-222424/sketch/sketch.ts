// SKETCH: constant-lines

interface Point {
  x: number
  y: number
}

interface Rect {
  x: number,
  y: number,
  w: number,
  h: number,
}

function drawShape(ps: Array<Point>) {
  beginShape()
  ps.forEach(p => vertex(p.x, p.y))
  endShape(CLOSE)
}

function drawRect(r: Rect) {
  rect(r.x, r.y, r.w, r.h)
}

// generate n random intervals that have the given length
function randomSegments(n: number, min: number, max: number, gapmin: number, gapmax: number): Array<{start: number, end: number}> {
  let segments: Array<{start: number, end: number}> = [];
  let x = 0;

  let addInterval = () => {
    let len = (Math.random() * (max - min)) + min
    segments.push({start: x, end: x + len})
    x += len
  }

  let addGap = () => {
    x += (Math.random() * (gapmax - gapmin)) + gapmin
  }

  if (Math.random() > 0.5) {
    addGap()
  }
  for (let i = 0; i < n; i++) {
    addInterval()
    addGap()
  }

  return segments;
}

function setup() {
  createCanvas(windowWidth, windowHeight)
  strokeWeight(3);

  noLoop()
}

const ITERATIONS = 10;
const X_PADDING = 350;
const Y_PADDING = 150;


function draw() {
  let makeSegments = () => randomSegments(15, 20, 50, 10, 20)

  for (let offset = 0; offset < windowHeight - (2 * Y_PADDING); offset += 10) {
    let x = X_PADDING;
    let y = Y_PADDING + offset;

    makeSegments().forEach(segment => {
      let p1 = {x: x + segment.start, y: y}
      let p2 = {x: x + segment.end, y: y}
      line(p1.x, p1.y, p2.x, p2.y)
    })
  }
}



