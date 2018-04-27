"use strict";
// SKETCH: concentric-squares
function shape(ps) {
    beginShape();
    ps.forEach(function (p) { return vertex(p.x, p.y); });
    endShape(CLOSE);
}
function drawRect(r) {
    rect(r.x, r.y, r.w, r.h);
}
// return a smaller rect nestled inside this rect
function nested(r, padding) {
    return {
        x: r.x + padding,
        y: r.y + padding,
        w: r.w - 2 * padding,
        h: r.h - 2 * padding
    };
}
function keepNesting(r, padding, times) {
    var rs = [r];
    for (var i = 1; i <= times; i++) {
        rs[i] = nested(rs[i - 1], padding);
    }
    return rs;
}
// return smaller rectangles that represent an even division of a rectangle. always
// divides in half
//
// if the input rectangle has length 1 or less in any dimension, does not split
// in that dimension.
function halfsies(r) {
    if (r.w <= 1 && r.h <= 1) {
        return [r];
    }
    if (r.w <= 1) {
        return [
            { x: r.x, y: r.y + 0, w: r.w, h: r.h / 2 },
            { x: r.x, y: r.y + r.h / 2, w: r.w, h: r.h / 2 }
        ];
    }
    if (r.h <= 1) {
        return [
            { x: r.x, y: r.y, w: r.w / 2, h: r.h },
            { x: r.x + r.w / 2, y: r.y, w: r.w / 2, h: r.h }
        ];
    }
    return [
        { x: r.x, y: r.y, w: r.w / 2, h: r.h / 2 },
        { x: r.x + r.w / 2, y: r.y, w: r.w / 2, h: r.h / 2 },
        { x: r.x, y: r.y + r.h / 2, w: r.w / 2, h: r.h / 2 },
        { x: r.x + r.w / 2, y: r.y + r.h / 2, w: r.w / 2, h: r.h / 2 },
    ];
}
// subdivide the given rectangle n times using halfsies
//
// TODO(benl): imperative?
function splitsies(start, n) {
    if (n == 0) {
        return [start];
    }
    return halfsies(start).reduce(function (ds, x) { return ds.concat(splitsies(x, n - 1)); }, []);
}
function setup() {
    createCanvas(windowWidth, windowHeight);
    strokeWeight(3);
    noLoop();
}
var ITERATIONS = 10;
function draw() {
    halfsies({ x: 50, y: 50, w: 600, h: 600 })
        .reduce(function (rs, x) { return rs.concat(keepNesting(nested(x, 10), 10, 15)); }, [])
        .forEach(drawRect);
}
