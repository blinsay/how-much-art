"use strict";
// SKETCH: constant-lines
function drawShape(ps) {
    beginShape();
    ps.forEach(function (p) { return vertex(p.x, p.y); });
    endShape(CLOSE);
}
function drawRect(r) {
    rect(r.x, r.y, r.w, r.h);
}
// generate n random intervals that have the given length
function randomSegments(n, min, max, gapmin, gapmax) {
    var segments = [];
    var x = 0;
    var addInterval = function () {
        var len = (Math.random() * (max - min)) + min;
        segments.push({ start: x, end: x + len });
        x += len;
    };
    var addGap = function () {
        x += (Math.random() * (gapmax - gapmin)) + gapmin;
    };
    if (Math.random() > 0.5) {
        addGap();
    }
    for (var i = 0; i < n; i++) {
        addInterval();
        addGap();
    }
    return segments;
}
function setup() {
    createCanvas(windowWidth, windowHeight);
    strokeWeight(3);
    noLoop();
}
var ITERATIONS = 10;
var X_PADDING = 250;
var Y_PADDING = 250;
function draw() {
    var makeSegments = function () { return randomSegments(15, 20, 50, 10, 20); };
    translate(windowWidth / 2, windowHeight / 2);
    rotate(PI / 2);
    translate(-windowWidth / 2, -windowHeight / 2);
    var _loop_1 = function (offset) {
        var x = X_PADDING;
        var y = Y_PADDING + offset;
        makeSegments().forEach(function (segment) {
            var p1 = { x: x + segment.start, y: y };
            var p2 = { x: x + segment.end, y: y };
            line(p1.x, p1.y, p2.x, p2.y);
        });
    };
    for (var offset = 0; offset < windowHeight - (2 * Y_PADDING); offset += 10) {
        _loop_1(offset);
    }
}
