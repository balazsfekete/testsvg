//Helper functions

function distance(p1, p2) {
    return Math.hypot(p1.x - p2.x, p1.y - p2.y);    
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



function intersectLineCircle(line, circle) {

    var a, b, c, d, u1, u2, ret, retP1, retP2, v1, v2;
    v1 = {};
    v2 = {};
    v1.x = line.p2.x - line.p1.x;
    v1.y = line.p2.y - line.p1.y;
    v2.x = line.p1.x - circle.c.x;
    v2.y = line.p1.y - circle.c.y;
    b = (v1.x * v2.x + v1.y * v2.y);
    c = 2 * (v1.x * v1.x + v1.y * v1.y);
    b *= -2;
    d = Math.sqrt(b * b - 2 * c * (v2.x * v2.x + v2.y * v2.y - circle.r * circle.r));
    if(isNaN(d)){ // no intercept
        return [];
    }
    u1 = (b - d) / c;  // these represent the unit distance of point one and two on the line
    u2 = (b + d) / c;    
    retP1 = {};   // return points
    retP2 = {}  
    ret = []; // return array
    if(u1 <= 1 && u1 >= 0){  // add point if on the line segment
        retP1.x = line.p1.x + v1.x * u1;
        retP1.y = line.p1.y + v1.y * u1;
        ret[0] = point(retP1.x, retP1.y);
    }
    if(u2 <= 1 && u2 >= 0){  // second add point if on the line segment
        retP2.x = line.p1.x + v1.x * u2;
        retP2.y = line.p1.y + v1.y * u2;
        ret[ret.length] = point(retP2.x, retP2.y);
    }       
    return ret;

}



function intersectCircleCircle(circle1, circle2) {

    var dx = circle2.c.x - circle1.c.x;
    var dy = circle2.c.y - circle1.c.y;
    var d = distance(circle1.c, circle2.c);

    // Check if solutions exist
    if (d > (circle1.r + circle2.r)) {
        console.log("Circles are too far.");
        return false;
    }

    if (d < Math.abs(circle1.r - circle2.r)) {
        console.log("One circle contains the other.");
        return false;
    }
    
    // Find intersection of between lines connecting circle centers and intersection points
    var l = ((d * d) + (circle1.r * circle1.r) - (circle2.r * circle2.r)) / (2.0 * d);
    let lx = circle1.c.x + (dx * l / d);
    let ly = circle1.c.y + (dy * l / d);
    
   // Find intersection points
    var h = Math.sqrt((circle1.r * circle1.r) - (l * l));
    var hx = -dy * (h / d);
    var hy = dx * (h / d);
    var i1 = new Point(lx + hx, ly + hy);
    var i2 = new Point(lx - hx, ly - hy);

    return [i1, i2];
}





function mirror(o, m) {
    return point(2 * m.x - o.x, 2 * m.y - o.y);
}