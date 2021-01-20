function sketch() {

    /*    a = point(20, 500);
    c = point(500,20);
    b = point(980, 500);
    d= point(500,980);

    ac = line(a,c);
    arc1 = arc(a,c,d);
    da = line(d,a);
    arc2 = arc(d,a,b);
    bd = line(b,d);
    arc3 = arc(b,d,c);
    cb = line(c,b);
    arc4 = arc(c,b,a);

    ab = line(a,b);
    cd = line(c,d);
    x = intersect(ab,cd);
    c1 = circle(a,x);
    c2 = circle(b,x);
    c3 = circle(c,x);
    c4 = circle(d,x);

    draw([a,c,b,d,ab,cd,arc1,arc2,arc3,arc4]);*/


    /*    a = point(100, 300);
    a1 = point(50, 800);
    ca = circle(a,a1);

    b = point(900, 400);
    b1 = point(600,800);
    cb = circle(b,b1);

    i = intersectCircleCircle(cb,ca);

    il = line(i[0],i[1]);

    draw([a,ca,b,cb, i[0], i[1], il]);*/




    x = point(50,500);
    y = point(950,500);

    a = point(500,50);
    z = point(500,950);

    xy = line(x,y);
    az = line(a,z);

    o = intersect(xy,az);

    c = circle(o,y);

    cm = circle(y,o);

    mi = intersectCircleCircle(c,cm);

    ml = line(mi[1],mi[0]);

    m = intersect(xy,ml);

    cma = circle(m,a);

    r = intersectLineCircle(xy,cma);

    car = circle(a,r[0]);

    b = intersectCircleCircle(c,car);

    car1 = circle(b[1],a);

    cc = intersectCircleCircle(c, car1);

    car2 = circle(b[0],a);

    dd = intersectCircleCircle(c, car2);

    ab = line(a,b[1]);
    bc = line(b[1], cc[1]);
    cd = line(cc[1],dd[0]);
    de = line(dd[0],b[0]);
    ea = line(b[0],a);


    draw([c,xy,x,y,az,a,z,cm,mi[1],mi[0],ml,m,cma,r[0],car,b[1],b[0],car1,cc[1],car2,dd[0], ab,bc,cd,de,ea]);

























    /*    a = point(50, 100);
    b = point(900, 100);
    c = point(900, 800);
    a1 = point(500, 600);
    c1 = circle(a,a1);

    ab = line(a,b);
    ib = intersectLineCircle(ab,c1);

    ac = line(a,c);
    ic = intersectLineCircle(ac,c1);
    arc1 = arc(a, ib[0], ic[0]);

    draw([ab,ac, a, ib[0],arc1, ic[0]]);*/


    /*

    ac = line(a,c);
    da = line(d,a);
    cd = line(c,d);
    x = point(600, 500);
    c1 = circle(a, x);
    i = intersectLineCircle(cd, c1);
    il = line(i[0], i[1]);
    console.log(i);

    draw([a,x,cd,c1,i[0], i[1], il]);*/
}