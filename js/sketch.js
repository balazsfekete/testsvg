function sketch() {
    a = point(20, 500);
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

    

    draw([a,b,c,d,ab,cd,arc1,arc2,arc3,arc4]);
}