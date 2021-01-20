//Definitions

function point(x, y) { return new Point(x, y); }
function line(p1, p2) { return new Line(p1, p2); }
function arc(c, p1, p2) { return new Arc(c, p1, p2); }
function circle(c, p1) { return new Circle(c, p1); }


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
    this.r = distance(c, p1);
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


