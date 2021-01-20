var canvas;












window.onload = function() { 
    canvas = document.getElementById("canvas");
    canvas.style.backgroundColor = BACKGROUND_COLOR;
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
            _item.setAttribute("fill", PEN_COLOR_DRAWN);
            _item.setAttribute("stroke-width", 0);
            _item.setAttribute("cx", item.x);
            _item.setAttribute("cy", item.y);
            _item.setAttribute("r", 0);



            canvas.appendChild(_item);


            let timeStart = timeCurrent / timeTotal;
            let timeEnd = (timeCurrent + DURATION_POINT) / timeTotal;
            let timeFade = (timeCurrent + DURATION_POINT + DURATION_FADE) / timeTotal;

            timeCurrent += DURATION_POINT + DELAY_MID;

            _anim = document. createElementNS("http://www.w3.org/2000/svg", "animate");
            _anim.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#event" + index);
            _anim.setAttribute("attributeName", "r");
            _anim.setAttribute("dur", timeTotal+"ms");
            _anim.setAttribute("values", "0; 0; " + PEN_THICKNESS_ACTIVE_POINT / 2.0 + "; " + PEN_THICKNESS_DRAWN_POINT / 2.0 + "; " + PEN_THICKNESS_DRAWN_POINT / 2.0);
            _anim.setAttribute("keyTimes", "0; " + timeStart + "; " + timeEnd + "; " + timeFade + "; 1");
            _anim.setAttribute("repeatCount", "indefinite");
            canvas.appendChild(_anim);

            _anim = document. createElementNS("http://www.w3.org/2000/svg", "animate");
            _anim.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#event" + index);
            _anim.setAttribute("attributeName", "fill");
            _anim.setAttribute("dur", timeTotal+"ms");
            _anim.setAttribute("values", PEN_COLOR_ACTIVE + "; " + PEN_COLOR_ACTIVE + "; " + PEN_COLOR_DRAWN + "; " + PEN_COLOR_DRAWN);
            _anim.setAttribute("keyTimes", "0; " + timeEnd + "; " + timeFade + "; 1");
            _anim.setAttribute("repeatCount", "indefinite");
            canvas.appendChild(_anim);       


        }

        if (item instanceof Line) {
            var _item = document. createElementNS("http://www.w3.org/2000/svg", "line");
            _item.setAttribute("id", "event" + index);
            _item.setAttribute("fill", "none");
            //_item.setAttribute("stroke-linecap", "round");
            _item.setAttribute("stroke-width", PEN_THICKNESS_DRAWN_PATH);
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
            _anim.setAttribute("values", PEN_COLOR_ACTIVE + "; " + PEN_COLOR_ACTIVE + "; " + PEN_COLOR_DRAWN + "; " + PEN_COLOR_DRAWN);
            _anim.setAttribute("keyTimes", "0; " + timeEnd + "; " + timeFade + "; 1");
            _anim.setAttribute("repeatCount", "indefinite");
            canvas.appendChild(_anim);    

            _anim = document. createElementNS("http://www.w3.org/2000/svg", "animate");
            _anim.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#event" + index);
            _anim.setAttribute("attributeName", "stroke-width");
            _anim.setAttribute("dur", timeTotal+"ms");
            _anim.setAttribute("values", PEN_THICKNESS_ACTIVE_PATH + "; " + PEN_THICKNESS_ACTIVE_PATH + "; " + PEN_THICKNESS_DRAWN_PATH + "; " + PEN_THICKNESS_DRAWN_PATH);
            _anim.setAttribute("keyTimes", "0; " + timeEnd + "; " + timeFade + "; 1");
            _anim.setAttribute("repeatCount", "indefinite");
            canvas.appendChild(_anim);   


        }

        if (item instanceof Arc) {
            var _item = document. createElementNS("http://www.w3.org/2000/svg", "path");
            _item.setAttribute("id", "event" + index);
            _item.setAttribute("fill", "none");
            //_item.setAttribute("stroke-linecap", "round");
            _item.setAttribute("stroke-width", PEN_THICKNESS_DRAWN_PATH);
            _item.setAttribute("stroke-dasharray", item.length);
            _item.setAttribute("stroke", PEN_COLOR_DRAWN);


            let dir = 0;
            if (item.angle < 0) {dir = 1};
            let str = 'M ' + item.p1.x + ' ' + item.p1.y + ' A ' + item.r + ' ' + item.r + ' 0 0 ' + dir + ' ' + item.p3.x + ' ' + item.p3.y;   
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
            _anim.setAttribute("values", PEN_COLOR_ACTIVE + "; " + PEN_COLOR_ACTIVE + "; " + PEN_COLOR_DRAWN + "; " + PEN_COLOR_DRAWN);
            _anim.setAttribute("keyTimes", "0; " + timeEnd + "; " + timeFade + "; 1");
            _anim.setAttribute("repeatCount", "indefinite");
            canvas.appendChild(_anim);    

            _anim = document. createElementNS("http://www.w3.org/2000/svg", "animate");
            _anim.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#event" + index);
            _anim.setAttribute("attributeName", "stroke-width");
            _anim.setAttribute("dur", timeTotal+"ms");
            _anim.setAttribute("values", PEN_THICKNESS_ACTIVE_PATH + "; " + PEN_THICKNESS_ACTIVE_PATH + "; " + PEN_THICKNESS_DRAWN_PATH + "; " + PEN_THICKNESS_DRAWN_PATH);
            _anim.setAttribute("keyTimes", "0; " + timeEnd + "; " + timeFade + "; 1");
            _anim.setAttribute("repeatCount", "indefinite");
            canvas.appendChild(_anim);









        }


        if (item instanceof Circle) {
            var _item = document. createElementNS("http://www.w3.org/2000/svg", "path");
            _item.setAttribute("id", "event" + index);
            _item.setAttribute("fill", "none");
            //_item.setAttribute("stroke-linecap", "round");
            _item.setAttribute("stroke-width", PEN_THICKNESS_DRAWN_PATH);
            _item.setAttribute("stroke-dasharray", item.length);
            _item.setAttribute("stroke", PEN_COLOR_DRAWN);
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
            _anim.setAttribute("values", PEN_COLOR_ACTIVE + "; " + PEN_COLOR_ACTIVE + "; " + PEN_COLOR_DRAWN + "; " + PEN_COLOR_DRAWN);
            _anim.setAttribute("keyTimes", "0; " + timeEnd + "; " + timeFade + "; 1");
            _anim.setAttribute("repeatCount", "indefinite");
            canvas.appendChild(_anim);    

            _anim = document. createElementNS("http://www.w3.org/2000/svg", "animate");
            _anim.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#event" + index);
            _anim.setAttribute("attributeName", "stroke-width");
            _anim.setAttribute("dur", timeTotal+"ms");
            _anim.setAttribute("values", PEN_THICKNESS_ACTIVE_PATH + "; " + PEN_THICKNESS_ACTIVE_PATH + "; " + PEN_THICKNESS_DRAWN_PATH + "; " + PEN_THICKNESS_DRAWN_PATH);
            _anim.setAttribute("keyTimes", "0; " + timeEnd + "; " + timeFade + "; 1");
            _anim.setAttribute("repeatCount", "indefinite");
            canvas.appendChild(_anim);

















        }


    }


    drawStack.forEach(drawObject);



}



