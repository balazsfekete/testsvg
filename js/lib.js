var canvas;

// Object definitions

function Point(x, y) {
    this.x = x;
    this.y = y;
}

function Line(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
    this.length = distance(p1, p2);
}

function Arc(c, p1, p2) {
    this.c = c;
    this.p1 = p1;
    this.p2 = p2;
    this.r = distance(c, p2);
    this.angle1 = Math.atan2(p1.y - c.y, p1.x - c.x);
    this.angle2 = Math.atan2(p2.y - c.y, p2.x - c.x);
    this.angle = ((this.angle1 - this.angle2 + 3 * Math.PI) % (2 * Math.PI)) - Math.PI;
    
    this.angleDelta = Math.abs(this.angle1 - this.angle2);
    if (this.angleDelta > Math.PI) {this.angleDelta = Math.abs(this.angleDelta - 2 * Math.PI)};
    
    
    this.length = this.angleDelta * this.r;
    this.p3 = new Point();
    this.p3.x = c.x + this.r * Math.cos(this.angle2);
    this.p3.y = c.y + this.r * Math.sin(this.angle2);

}

function Circle(c, p1) {
    this.c = c;
    this.p1 = p1;
    this.p2 = mirror(p1, c);
    this.r = distance(c, p1);
    //this.angle = Math.atan2(p1.y - c.y, p1.x - c.x);
    this.length = 2 * Math.PI * this.r;

    /*    this.p2 = mirror(p1, c);
    var _circle = document. createElementNS("http://www.w3.org/2000/svg", "path");
    _circle.setAttribute("class", "path");
    _circle.setAttribute("id", eventId);
    let str = 'M ' + p1.x + ' ' + p1.y 
    str += ' A ' + this.r + ' ' + this.r + ' 0 0 0 ' + this.p2.x + ' ' + this.p2.y;
    str += ' A ' + this.r + ' ' + this.r + ' 0 0 0 ' + this.p1.x + ' ' + this.p1.y;  
    _circle.setAttribute("d", str);
    canvas.appendChild (_circle);*/
}









//Definitions
function point(x, y) { return new Point(x, y); }
function line(p1, p2) { return new Line(p1, p2); }
function arc(c, p1, p2) { return new Arc(c, p1, p2); }
function circle(c, p1) { return new Circle(c, p1); }







window.onload = function() { 
    canvas = document.getElementById("canvas");
    sketch();
}


function draw(drawStack) {


    //Build timeline

    var timeTotal = 0;
    timeTotal += DELAY_START;

    function addTime(item) {
        if (item instanceof Point) { timeTotal += DURATION_POINT; } else { timeTotal += DURATION_PATH; }
    }

    drawStack.forEach(addTime);
    timeTotal += DELAY_MID * +(drawStack.length - 1); 
    timeTotal += DELAY_END;


    //Add objects

    var timeCurrent = DELAY_START;


    function drawObject(item, index) {

        var _anim;

        if (item instanceof Point) {
            var _item = document. createElementNS("http://www.w3.org/2000/svg", "circle");
            _item.setAttribute("id", "event" + index);
            _item.setAttribute("fill", COLOR_PASSIVE);
            _item.setAttribute("cx", item.x);
            _item.setAttribute("cy", item.y);
            _item.setAttribute("r", POINT_RADIUS_PASSIVE);
            canvas.appendChild(_item);


            let timeStart = timeCurrent / timeTotal;
            let timeEnd = (timeCurrent + DURATION_POINT) / timeTotal;
            let timeFade = (timeCurrent + DURATION_POINT + DURATION_FADE) / timeTotal;

            timeCurrent += DURATION_POINT + DELAY_MID;

            _anim = document. createElementNS("http://www.w3.org/2000/svg", "animate");
            _anim.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#event" + index);
            _anim.setAttribute("attributeName", "r");
            _anim.setAttribute("dur", timeTotal+"ms");
            _anim.setAttribute("values", "0; 0; " + POINT_RADIUS_ACTIVE + "; " + POINT_RADIUS_PASSIVE + "; " + POINT_RADIUS_PASSIVE);
            _anim.setAttribute("keyTimes", "0; " + timeStart + "; " + timeEnd + "; " + timeFade + "; 1");
            _anim.setAttribute("repeatCount", "indefinite");
            canvas.appendChild(_anim);

            _anim = document. createElementNS("http://www.w3.org/2000/svg", "animate");
            _anim.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#event" + index);
            _anim.setAttribute("attributeName", "fill");
            _anim.setAttribute("dur", timeTotal+"ms");
            _anim.setAttribute("values", COLOR_ACTIVE+"; " + COLOR_ACTIVE + "; " + COLOR_PASSIVE + "; " + COLOR_PASSIVE);
            _anim.setAttribute("keyTimes", "0; " + timeEnd + "; " + timeFade + "; 1");
            _anim.setAttribute("repeatCount", "indefinite");
            canvas.appendChild(_anim);       


        }

        if (item instanceof Line) {
            var _item = document. createElementNS("http://www.w3.org/2000/svg", "line");
            _item.setAttribute("id", "event" + index);
            _item.setAttribute("fill", "none");
            _item.setAttribute("stroke-width", PATH_THICKNESS_PASSIVE);
            _item.setAttribute("stroke-dasharray", item.length);
            _item.setAttribute("y2", item.p2.y);
            _item.setAttribute("x1", item.p1.x);
            _item.setAttribute("y1", item.p1.y);
            _item.setAttribute("x2", item.p2.x);
            _item.setAttribute("y2", item.p2.y);
            _item.setAttribute("y2", item.p2.y);
            canvas.appendChild (_item);


            let timeStart = timeCurrent / timeTotal;
            let timeEnd = (timeCurrent + DURATION_PATH) / timeTotal;
            let timeFade = (timeCurrent + DURATION_PATH + DURATION_FADE) / timeTotal;

            timeCurrent += DURATION_PATH + DELAY_MID;

            _anim = document. createElementNS("http://www.w3.org/2000/svg", "animate");
            _anim.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#event" + index);
            _anim.setAttribute("attributeName", "stroke-dashoffset");
            _anim.setAttribute("dur", timeTotal+"ms");
            _anim.setAttribute("values", item.length + "; " + item.length + "; 0; 0");
            _anim.setAttribute("keyTimes", "0; " + timeStart + "; " + timeEnd + "; 1");
            _anim.setAttribute("repeatCount", "indefinite");
            canvas.appendChild(_anim);

            _anim = document. createElementNS("http://www.w3.org/2000/svg", "animate");
            _anim.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#event" + index);
            _anim.setAttribute("attributeName", "stroke");
            _anim.setAttribute("dur", timeTotal+"ms");
            _anim.setAttribute("values", COLOR_ACTIVE+"; " + COLOR_ACTIVE + "; " + COLOR_PASSIVE + "; " + COLOR_PASSIVE);
            _anim.setAttribute("keyTimes", "0; " + timeEnd + "; " + timeFade + "; 1");
            _anim.setAttribute("repeatCount", "indefinite");
            canvas.appendChild(_anim);    

            _anim = document. createElementNS("http://www.w3.org/2000/svg", "animate");
            _anim.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#event" + index);
            _anim.setAttribute("attributeName", "stroke-width");
            _anim.setAttribute("dur", timeTotal+"ms");
            _anim.setAttribute("values", PATH_THICKNESS_ACTIVE+"; " + PATH_THICKNESS_ACTIVE + "; " + PATH_THICKNESS_PASSIVE + "; " + PATH_THICKNESS_PASSIVE);
            _anim.setAttribute("keyTimes", "0; " + timeEnd + "; " + timeFade + "; 1");
            _anim.setAttribute("repeatCount", "indefinite");
            canvas.appendChild(_anim);   


        }

        if (item instanceof Arc) {
            var _item = document. createElementNS("http://www.w3.org/2000/svg", "path");
            _item.setAttribute("id", "event" + index);
            _item.setAttribute("fill", "none");
            _item.setAttribute("stroke-width", PATH_THICKNESS_PASSIVE);
            _item.setAttribute("stroke-dasharray", item.length);
            _item.setAttribute("stroke", COLOR_PASSIVE);
            let dir = 0;
            if (item.angle < 0) {dir = 1};
            let str = 'M ' + item.p1.x + ' ' + item.p1.y + ' A ' + item.r + ' ' + item.r + ' 0 0 ' + dir + ' ' + item.p3.x + ' ' + item.p3.y;   
            _item.setAttribute("d", str);
            canvas.appendChild (_item);

            console.log(item.length);

            let timeStart = timeCurrent / timeTotal;
            let timeEnd = (timeCurrent + DURATION_PATH) / timeTotal;
            let timeFade = (timeCurrent + DURATION_PATH + DURATION_FADE) / timeTotal;

            timeCurrent += DURATION_PATH + DELAY_MID;

            _anim = document. createElementNS("http://www.w3.org/2000/svg", "animate");
            _anim.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#event" + index);
            _anim.setAttribute("attributeName", "stroke-dashoffset");
            _anim.setAttribute("dur", timeTotal+"ms");
            _anim.setAttribute("values", item.length + "; " + item.length + "; 0; 0");
            _anim.setAttribute("keyTimes", "0; " + timeStart + "; " + timeEnd + "; 1");
            _anim.setAttribute("repeatCount", "indefinite");
            canvas.appendChild(_anim);

            _anim = document. createElementNS("http://www.w3.org/2000/svg", "animate");
            _anim.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#event" + index);
            _anim.setAttribute("attributeName", "stroke");
            _anim.setAttribute("dur", timeTotal+"ms");
            _anim.setAttribute("values", COLOR_ACTIVE+"; " + COLOR_ACTIVE + "; " + COLOR_PASSIVE + "; " + COLOR_PASSIVE);
            _anim.setAttribute("keyTimes", "0; " + timeEnd + "; " + timeFade + "; 1");
            _anim.setAttribute("repeatCount", "indefinite");
            canvas.appendChild(_anim);    

            _anim = document. createElementNS("http://www.w3.org/2000/svg", "animate");
            _anim.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#event" + index);
            _anim.setAttribute("attributeName", "stroke-width");
            _anim.setAttribute("dur", timeTotal+"ms");
            _anim.setAttribute("values", PATH_THICKNESS_ACTIVE+"; " + PATH_THICKNESS_ACTIVE + "; " + PATH_THICKNESS_PASSIVE + "; " + PATH_THICKNESS_PASSIVE);
            _anim.setAttribute("keyTimes", "0; " + timeEnd + "; " + timeFade + "; 1");
            _anim.setAttribute("repeatCount", "indefinite");
            canvas.appendChild(_anim);









        }


        if (item instanceof Circle) {
            var _item = document. createElementNS("http://www.w3.org/2000/svg", "path");
            _item.setAttribute("id", "event" + index);
            _item.setAttribute("fill", "none");
            _item.setAttribute("stroke-width", PATH_THICKNESS_PASSIVE);
            _item.setAttribute("stroke-dasharray", item.length);
            _item.setAttribute("stroke", COLOR_PASSIVE);
            let str = 'M ' + item.p1.x + ' ' + item.p1.y 
            str += ' A ' + item.r + ' ' + item.r + ' 0 0 0 ' + item.p2.x + ' ' + item.p2.y;
            str += ' A ' + item.r + ' ' + item.r + ' 0 0 0 ' + item.p1.x + ' ' + item.p1.y;  
            _item.setAttribute("d", str);
            canvas.appendChild (_item);
            
            
            
            
                        let timeStart = timeCurrent / timeTotal;
            let timeEnd = (timeCurrent + DURATION_PATH) / timeTotal;
            let timeFade = (timeCurrent + DURATION_PATH + DURATION_FADE) / timeTotal;

            timeCurrent += DURATION_PATH + DELAY_MID;

            _anim = document. createElementNS("http://www.w3.org/2000/svg", "animate");
            _anim.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#event" + index);
            _anim.setAttribute("attributeName", "stroke-dashoffset");
            _anim.setAttribute("dur", timeTotal+"ms");
            _anim.setAttribute("values", item.length + "; " + item.length + "; 0; 0");
            _anim.setAttribute("keyTimes", "0; " + timeStart + "; " + timeEnd + "; 1");
            _anim.setAttribute("repeatCount", "indefinite");
            canvas.appendChild(_anim);

            _anim = document. createElementNS("http://www.w3.org/2000/svg", "animate");
            _anim.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#event" + index);
            _anim.setAttribute("attributeName", "stroke");
            _anim.setAttribute("dur", timeTotal+"ms");
            _anim.setAttribute("values", COLOR_ACTIVE+"; " + COLOR_ACTIVE + "; " + COLOR_PASSIVE + "; " + COLOR_PASSIVE);
            _anim.setAttribute("keyTimes", "0; " + timeEnd + "; " + timeFade + "; 1");
            _anim.setAttribute("repeatCount", "indefinite");
            canvas.appendChild(_anim);    

            _anim = document. createElementNS("http://www.w3.org/2000/svg", "animate");
            _anim.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#event" + index);
            _anim.setAttribute("attributeName", "stroke-width");
            _anim.setAttribute("dur", timeTotal+"ms");
            _anim.setAttribute("values", PATH_THICKNESS_ACTIVE+"; " + PATH_THICKNESS_ACTIVE + "; " + PATH_THICKNESS_PASSIVE + "; " + PATH_THICKNESS_PASSIVE);
            _anim.setAttribute("keyTimes", "0; " + timeEnd + "; " + timeFade + "; 1");
            _anim.setAttribute("repeatCount", "indefinite");
            canvas.appendChild(_anim);
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
        }


    }


    drawStack.forEach(drawObject);



}







//Helper functions

function distance(p1, p2) {
    return Math.sqrt(Math.pow((p1.x - p2.x), 2) + Math.pow((p1.y - p2.y), 2));
}

function intersect(o1, o2) {
    denominator = ((o2.p2.y - o2.p1.y) * (o1.p2.x - o1.p1.x) - (o2.p2.x - o2.p1.x) * (o1.p2.y - o1.p1.y));

    // Check if lines are parallel
    if (denominator === 0) {return false}

    let ua = ((o2.p2.x - o2.p1.x) * (o1.p1.y - o2.p1.y) - (o2.p2.y - o2.p1.y) * (o1.p1.x - o2.p1.x)) / denominator;
    let ub = ((o1.p2.x - o1.p1.x) * (o1.p1.y - o2.p1.y) - (o1.p2.y - o1.p1.y) * (o1.p1.x - o2.p1.x)) / denominator;

    // Check if the intersection is on the line segments
    //if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {return false}

    // Return a object with the x and y coordinates of the intersection
    let x = o1.p1.x + ua * (o1.p2.x - o1.p1.x);
    let y = o1.p1.y + ua * (o1.p2.y - o1.p1.y);

    return point(x,y);
}

function mirror(o, m) {
    return point(2 * m.x - o.x, 2 * m.y - o.y);
}