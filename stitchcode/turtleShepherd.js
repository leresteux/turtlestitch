/*
    TurtleShepherd

    turltestich's embroidery intelligence agency
*/

function TurtleShepherd() {
    this.init();
}

TurtleShepherd.prototype.init = function() {
    this.clear();
    this.gridSize = 50;
    this.showJumpStitches = false;
    this.showStitches = false;
    this.showGrid = false;
    this.showTurtle = false;
};

TurtleShepherd.prototype.clear = function() {
    this.cache = [];
    this.w = 0;
    this.h = 0;
    this.minX = 0;
    this.minY = 0;
    this.maxX = 0;
    this.maxY = 0;
    this.initX = 0;
    this.initY = 0;
    this.scale = 1;
    this.steps = 0;
    this.stitchCount = 0;
    this.jumpCount = 0;
};

TurtleShepherd.prototype.hasSteps = function() {
    return this.steps > 0;
};

TurtleShepherd.prototype.getStepCount = function() {
    return this.steps;
};
TurtleShepherd.prototype.getJumpCount = function() {
    return this.jumpCount;
};

TurtleShepherd.prototype.getDimensions = function() {
    w= ((this.maxX - this.minX)/5).toFixed(2).toString();
    h= ((this.maxY - this.minY)/5).toFixed(2).toString();
    return w + " x " + h + " mm";
};


TurtleShepherd.prototype.moveTo= function(x1, y1, x2, y2, penState) {

    x = Math.round(x);
    y = Math.round(y);

    if (this.steps === 0) {
        this.initX = x1;
        this.initY = y1;
        this.minX = x1;
        this.minY = y1;
        this.maxX = x1;
        this.maxY = y1;
        this.cache.push(
            {
                "cmd":"move",
                "x":x1,
                "y":y1,
                "penDown":penState,
            }
        );
    } else {
        if (x2 < this.minX) this.minX = x2;
        if (x2 > this.maxX) this.maxX = x2;

        if (y2 < this.minY) this.minY  = y2;
        if (y2 > this.maxY) this.maxY  = y2;
    }
    this.cache.push(
        {
            "cmd":"move",
            "x":x2,
            "y":y2,
            "penDown":penState,
        }
    );

    this.w = this.maxX - this.minX;
    this.h = this.maxY - this.minY;

    this.steps++;
    if (!penState)
        this.jumpCount++;
};


TurtleShepherd.prototype.addColorChange= function(color) {
    this.cache.push(
        {
            "cmd":"color",
            "value":color,
        }
    );
};

TurtleShepherd.prototype.toSVG = function() {

    var svgStr = "<?xml version=\"1.0\" standalone=\"no\"?>\n";
    svgStr += "<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \n\"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\n";
    svgStr += '<svg width="' + (this.w) + '" height="' + (this.h) + '"' +
        ' viewBox="0 0 ' + (this.w) + ' ' + (this.h) + '"';
    svgStr += ' xmlns="http://www.w3.org/2000/svg" version="1.1">\n';
    svgStr += '<title>Embroidery export</title>\n';

    hasFirst = false;
    tagOpen = false;

    for (var i=0; i < this.cache.length; i++) {
        if (this.cache[i].cmd == "move") {
            stitch = this.cache[i];
            if (!hasFirst) {
                if (stitch.penDown) {
                    svgStr += '<path fill="none" stroke="black" d="M ' +
                        (this.initX - this.minX) +
                        ' ' +
                        (this.maxY - this.initY) ;
                    hasFirst = true;
                    tagOpen = true;
                } else {
                    /* is jum
                    svgStr += '<path stroke="red" stroke-dasharray="4 4" d="M ' +
                        this.initX +
                        ' ' +
                        this.initY +
                        ' L ' +
                        (stitch.x) +
                        ' ' +
                        (stitch.y) +
                        '" />\n' ;
                    */
                    hasFirst = true;
                }
            } else {

                if (this.cache[i].penDown ) {
                    if (!this.cache[i-1].penDown ) {
                        svgStr +='  <path fill="none" stroke="black" d="M ' +
                            (this.cache[i-1].x - this.minX) +
                            ' ' +
                            (this.cache[i-1].y - this.minY ) +
                            ' L ' +
                            (stitch.x - this.minX) +
                            ' ' +
                            (this.maxY -  stitch.y);
                    }
                    svgStr += ' L ' +
                        (stitch.x- this.minX) +
                        ' ' +
                        (this.maxY - stitch.y);
                    tagOpen = true;
                } else {
                    if (tagOpen) svgStr += '" />\n';
                    tagOpen = false;
                    /* is jump
                    svgStr += '<path stroke="red" stroke-dasharray="4 4" d="M ' +
                        (this.cache[i-1].x) +
                        ' ' +
                        (this.cache[i-1].y) +
                        ' L ' +
                        (stitch.x) +
                        ' ' +
                        (stitch.y) +
                    '" />\n' ;
                    */
                }
            }
        }
    }
    if (tagOpen) svgStr += '" />\n';
    svgStr += '</svg>\n';
    return svgStr;
};

TurtleShepherd.prototype.toEXP = function() {
    var expArr = [];
    pixels_per_millimeter = 5;
    scale = 10 / pixels_per_millimeter;

    function move(x, y) {
        y *= -1;
        if (x<0) x = x + 256;
        expArr.push(Math.round(x));
        if (y<0) y = y + 256;
        expArr.push(Math.round(y));
    }

    for (var i=1; i < this.cache.length; i++) {
        if (this.cache[i].cmd == "move") {
            x1 = Math.round(this.cache[i].x * scale);
            y1 = -Math.round(this.cache[i].y * scale);
            x0 = Math.round(this.cache[i-1].x * scale);
            y0 = -Math.round(this.cache[i-1].y * scale);

            sum_x = 0;
            sum_y = 0;
            dmax = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0));
            dsteps = Math.abs(dmax / 127) + 1;
            if (dsteps == 1) {
                if (!this.cache[i].penDown) {
                    expArr.push(0x80);
                    expArr.push(0x04);
                }
                move(Math.round(x1 - x0), Math.round(y1 - y0));
            } else {
                for(j=0;j<dsteps;j++) {
                    if (!this.cache[i].penDown) {
                        expArr.push(0x80);
                        expArr.push(0x04);
                    }
                    if (j < dsteps -1) {
                        move((x1 - x0)/dsteps, (y1 - y0)/dsteps);
                        sum_x += (x1 - x0)/dsteps;
                        sum_y += (y1 - y0)/dsteps;
                    } else {
                        move(Math.round((x1 - x0) - sum_x),
                            Math.round((y1 - y0) - sum_y));
                    }
                }
            }
        }
    }

    expUintArr = new Uint8Array(expArr.length);
    for (i=0;i<expArr.length;i++) {
        expUintArr[i] = Math.round(expArr[i]);
    }
    return expUintArr;
};


TurtleShepherd.prototype.toDST = function() {
    var expArr = [];

    pixels_per_millimeter = 5;
    scale = 10 / pixels_per_millimeter;

    function encodeTajimaStitch(dx, dy, jump) {
        b1 = 0;
        b2 = 0;
        b3 = 0;

        if (dx > 40) {
                b3 |= 0x04;
                dx -= 81;
        }

        if (dx < -40) {
                b3 |= 0x08;
                dx += 81;
        }

        if (dy > 40) {
                b3 |= 0x20;
                dy -= 81;
        }

        if (dy < -40) {
                b3 |= 0x10;
                dy += 81;
        }

        if (dx > 13) {
                b2 |= 0x04;
                dx -= 27;
        }

        if (dx < -13) {
                b2 |= 0x08;
                dx += 27;
        }

        if (dy > 13) {
                b2 |= 0x20;
                dy -= 27;
        }

        if (dy < -13) {
                b2 |= 0x10;
                dy += 27;
        }

        if (dx > 4) {
                b1 |= 0x04;
                dx -= 9;
        }

        if (dx < -4) {
                b1 |= 0x08;
                dx += 9;
        }

        if (dy > 4) {
                b1 |= 0x20;
                dy -= 9;
        }

        if (dy < -4) {
                b1 |= 0x10;
                dy += 9;
        }

        if (dx > 1) {
                b2 |= 0x01;
                dx -= 3;
        }

        if (dx < -1) {
                b2 |= 0x02;
                dx += 3;
        }

        if (dy > 1) {
                b2 |= 0x80;
                dy -= 3;
        }

        if (dy < -1) {
                b2 |= 0x40;
                dy += 3;
        }

        if (dx > 0) {
                b1 |= 0x01;
                dx -= 1;
        }

        if (dx < 0) {
                b1 |= 0x02;
                dx += 1;
        }

        if (dy > 0) {
                b1 |= 0x80;
                dy -= 1;
        }

        if (dy < 0) {
                b1 |= 0x40;
                dy += 1;
        }

        expArr.push(b1);
        expArr.push(b2);
        if (jump) {
            expArr.push(b3 | 0x83);
        } else {
            expArr.push(b3 | 0x03);
        }
    }

    // Print empty header
    for (var i=0; i<512; i++) {
        expArr.push(0x00);
    }

    for (i=1; i< this.cache.length; i++) {
        x1 = Math.round(this.cache[i].x * scale);
        y1 = Math.round(this.cache[i].y * scale);
        x0 = Math.round(this.cache[i-1].x * scale);
        y0 = Math.round(this.cache[i-1].y * scale);

        sum_x = 0;
        sum_y = 0;
        dmax = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0));
        dsteps = Math.abs(dmax / 127) + 1;
        if (dsteps == 1) {
            encodeTajimaStitch((x1 - x0), (y1 - y0),
                !this.cache[i].penDown);
        } else {
            for(j=0;j<dsteps;j++) {
                //if (tStitch.stitches.jump[i])  {
                //	expArr.push(0x80);
                //	expArr.push(0x04);
                //}
                if (j < dsteps -1) {
                    encodeTajimaStitch(
                        Math.round((x1 - x0)/dsteps),
                        Math.round((y1 - y0)/dsteps),
                        !this.cache[i].penDown
                    );
                    sum_x += (x1 - x0)/dsteps;
                    sum_y += (y1 - y0)/dsteps;
                } else {
                    encodeTajimaStitch(
                        Math.round((x1 - x0) - sum_x),
                        Math.round((y1 - y0) - sum_y),
                        !this.cache[i].penDown
                    );
                }
            }
        }
    }

    expArr.push(0x00);
    expArr.push(0x00);
    expArr.push(0xF3);

    expUintArr = new Uint8Array(expArr.length);
    for (i=0;i<expArr.length;i++) {
        expUintArr[i] = Math.round(expArr[i]);
    }
    return expUintArr;
};

TurtleShepherd.prototype.debug_msg = function (st, clear) {
	o = "";
	if (!clear) {
		o = document.getElementById("debug").innerHTML;
	} else {
		o = "";
	}
	o = st + "<br />" + o;
	document.getElementById("debug").innerHTML = o;
};
