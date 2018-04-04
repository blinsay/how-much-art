"use strict";
// SKETCH: lines
function vadd(a, b) {
    return { x: a.x + b.x, y: a.y + b.y };
}
function makeWalkers(height, stride, pad) {
    var walkers = [];
    for (var i = pad; i < height - pad; i += stride) {
        walkers.push({ x: 0, y: i });
    }
    return walkers;
}
function drawPath(path, weight) {
    if (weight === void 0) { weight = 5; }
    push();
    noFill();
    strokeWeight(weight);
    beginShape();
    for (var _i = 0, path_1 = path; _i < path_1.length; _i++) {
        var _a = path_1[_i], x = _a.x, y = _a.y;
        vertex(x, y);
    }
    endShape();
    pop();
}
function path(start, bounds, speed) {
    var path = [start];
    var current = start;
    while (current.x < bounds.x && current.y < bounds.y) {
        var next = vadd(current, speed(current.x, current.y));
        path.push(next);
        current = next;
    }
    return path;
}
function perlinRight(speed) {
    return function (x, y) {
        return { x: speed, y: -5 + 10 * noise((x + y) / (windowWidth + windowHeight)) };
    };
}
function rightAndJumpUp(xspeed, yspeed, p) {
    return function (_x, _y) {
        return { x: xspeed, y: random() < p ? yspeed : 0 };
    };
}
var N_WALKERS = 300;
function setup() {
    createCanvas(windowWidth, windowHeight);
    noLoop();
}
function draw() {
    var walkers = makeWalkers(windowHeight, windowHeight / N_WALKERS, 25);
    var bounds = { x: windowWidth - 5, y: windowHeight - 5 };
    var buildPath = function (w) { return path(w, bounds, rightAndJumpUp(5, 5, 0.05)); };
    walkers
        .map(buildPath)
        .forEach(function (p) { return drawPath(p, 1.5); });
}
