var drawStack = [];
var timer = 0;

var canvas, timeline;

var startDelay = 0;
var endDelay = 2000;

var pathDuration = 1000;
var pointDuration = 1000;




function Point(x, y) {
    this.x = x;
    this.y = y;

    this.start = timer;
    this.end = timer + pointDuration;

    this.plot = function(eventId) {
        var circle1 = document. createElementNS("http://www.w3.org/2000/svg", "circle");

        circle1.setAttribute("class", "point");
        circle1.setAttribute("id", eventId);
        circle1.setAttribute("cx", x);
        circle1.setAttribute("cy", y);
        circle1.setAttribute("r", 1);

        canvas.appendChild (circle1);

        var keyframe = "";

        keyframe += "#" + eventId + " {";
        keyframe += "animation: " + eventId + "Animation " + timer + "ms ease-out infinite;";
        keyframe += "}";

        keyframe += "@keyframes " + eventId + "Animation {";
        keyframe += "0% {stroke-width: 0;}";
        keyframe += (100 * this.start / timer) + "% {stroke-width: 0;}";
        keyframe += (100 * this.end / timer) + "% {stroke-width: 10;}";
        keyframe += "}";

        timeline.innerHTML += keyframe;
    }
}

function Line(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
    this.length = Math.sqrt(Math.pow((p1.x - p2.x), 2) + Math.pow((p1.y - p2.y), 2));

    this.start = timer;
    this.end = timer + pathDuration;

    this.plot = function(eventId) {
        var line1 = document. createElementNS("http://www.w3.org/2000/svg", "line");

        line1.setAttribute("class", "path");
        line1.setAttribute("id", eventId);
        line1.setAttribute("x1", p1.x);
        line1.setAttribute("y1", p1.y);
        line1.setAttribute("x2", p2.x);
        line1.setAttribute("y2", p2.y);

        canvas.appendChild (line1);

        var keyframe = "";

        keyframe += "#" + eventId + " {";
        keyframe += "stroke-dasharray: " + this.length + ";"
        keyframe += "animation: " + eventId + "Animation " + timer + "ms ease-out infinite;";
        keyframe += "}";

        keyframe += "@keyframes " + eventId + "Animation {";
        keyframe += "0% {stroke-dashoffset: " + this.length + ";}";
        keyframe += (100 * this.start / timer) + "% {stroke-dashoffset: " + this.length + ";}";
        keyframe += (100 * this.end / timer) + "% {stroke-dashoffset: 0;}";
        keyframe += "}";

        timeline.innerHTML += keyframe;
    }
}



function point(x, y) {
    _point = new Point(x, y);
    drawStack.push(_point);
    timer += pointDuration;
    return _point;
}


function line(a, b) {
    _line = new Line(a, b);
    drawStack.push(_line);
    timer += pathDuration;
    return _line;
}






window.onload = function() { 

    canvas = document.getElementById("canvas");
    timeline = document.createElement("style");
    document.body.appendChild(timeline);

    timer += startDelay;
    drawthis();
    timer += endDelay;
    var drawStackLength = drawStack.length;
    for (var i = 0; i < drawStackLength; i++) {
        drawStack[i].plot("event" + i);
    }
}













/*function point(x, y) {
    var circle1 = document. createElementNS("http://www.w3.org/2000/svg", "circle");

    circle1.setAttribute("class", "point");
    circle1.setAttribute("cx", x);
    circle1.setAttribute("cy", y);
    circle1.setAttribute("r", 2);

    canvas.appendChild (circle1);

    return new Point(x,y);
}


function line(a, b) {
    var line1 = document. createElementNS("http://www.w3.org/2000/svg", "line");

    line1.setAttribute("class", "path");
    line1.setAttribute("x1", a.x);
    line1.setAttribute("y1", a.y);
    line1.setAttribute("x2", b.x);
    line1.setAttribute("y2", b.y);

    canvas.appendChild (line1);

    return new Line(a, b);
}


function circle(c,r) {
    var circle1 = document. createElementNS("http://www.w3.org/2000/svg", "circle");
    circle1.setAttribute("class", "path");
    circle1.setAttribute("cx", c.x);
    circle1.setAttribute("cy", c.y);
    circle1.setAttribute("r", r);

    canvas.appendChild (circle1);
}*/