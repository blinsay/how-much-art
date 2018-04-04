"use strict";
// SKETCH: train-schedule-for-sol
function inBounds(p, bounds) {
    return bounds.x <= p.x &&
        bounds.y <= p.y &&
        p.x <= (bounds.x + bounds.width) &&
        p.y <= (bounds.y + bounds.height);
}
function vadd(a, b) {
    return { x: a.x + b.x, y: a.y + b.y };
}
function walk(start, bounds, speed) {
    var path = [start];
    var current = start;
    while (true) {
        var next = vadd(current, speed(current.x, current.y));
        if (!inBounds(next, bounds)) {
            break;
        }
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
function drawPath(path, weight) {
    if (weight === void 0) { weight = 5; }
    console.log(path);
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
var N_WALKERS = 75;
function setup() {
    createCanvas(windowWidth, windowHeight);
    noLoop();
}
function draw() {
    var padding = 250;
    var bounds = {
        x: padding,
        y: padding,
        width: windowWidth - 2 * padding,
        height: windowHeight - 2 * padding
    };
    var stride = bounds.height / N_WALKERS;
    var buildPath = function (w) { return walk(w, bounds, rightAndJumpUp(25, 25, 0.05)); };
    // build walkers in a line down the left edge of the bounding box
    var walkers = [];
    for (var i = bounds.y; i < (bounds.y + bounds.height); i += stride) {
        walkers.push({ x: bounds.x, y: i });
    }
    walkers
        .map(buildPath)
        .forEach(function (p) { return drawPath(p, 1.5); });
}
