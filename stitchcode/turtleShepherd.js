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
    this.metric = true;
    this.pixels_per_millimeter = 5;
    this.maxLength = 121;
    this.calcTooLong = true;
    this.densityMax = 15;
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
    this.density = {};
    this.tooLongCount = 0;
    this.densityWarning = false;
};


TurtleShepherd.prototype.toggleMetric = function() {
    return this.metric = !this.metric;
};

TurtleShepherd.prototype.setMetric = function(b) {
    this.metric = b;
};

TurtleShepherd.prototype.isMetric = function() {
    return this.metric;
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

TurtleShepherd.prototype.getTooLongCount = function() {
    return this.tooLongCount;
};

TurtleShepherd.prototype.getTooLongStr = function() {
    if (this.tooLongCount > 1)
		return this.tooLongCount +  " are too long! (will get clamped)"
	else if (this.tooLongCount == 1)
		return this.tooLongCount +  " is too long! (will get clamped)"
	else
		return "";
};

TurtleShepherd.prototype.getDensityWarningStr = function() {
    if (this.densityWarning)
		return "DENSITY WARNING!";
	else
		return "";
};

TurtleShepherd.prototype.getDimensions = function() {
	
	if (this.metric) {
		//c = 1;
		//unit = "mm";
		c = 0.1
		unit = "cm";
	} else { 
		c = 0.03937;
		unit = "in";
	} 
    w= ((this.maxX - this.minX)/ this.pixels_per_millimeter * c).toFixed(2).toString();
    h= ((this.maxY - this.minY)/ this.pixels_per_millimeter * c).toFixed(2).toString();
	return w + " x " + h + " " + unit;
};

TurtleShepherd.prototype.getMetricWidth = function() {
	c = 0.1
	return ((this.maxX - this.minX)/ this.pixels_per_millimeter * c).toFixed(2).toString();
};


TurtleShepherd.prototype.getMetricHeight = function() {
	c = 0.1
	return((this.maxY - this.minY)/ this.pixels_per_millimeter * c).toFixed(2).toString();
};


TurtleShepherd.prototype.moveTo= function(x1, y1, x2, y2, penState) {

    x = Math.round(x);
    y = Math.round(y);
    warn = false;

    // ignore jump stitches withouth any previous stitches
    if (this.steps === 0 && !penState)
		return

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
        this.density[Math.round(x1) + "x" + Math.round(y1)] = 1;
    }

	if (x2 < this.minX) this.minX = x2;
	if (x2 > this.maxX) this.maxX = x2;

	if (y2 < this.minY) this.minY  = y2;
	if (y2 > this.maxY) this.maxY  = y2;

	var d = Math.round(x2) + "x" + Math.round(y2);
	if (this.density[d]) {
		this.density[d] += 1;
		if (this.density[d] > this.densityMax) {
			this.densityWarning = true;
			if (this.density[d] <= this.densityMax+1)
				warn = true;
		}
	} else  {
		this.density[d] = 1;
	}

	if ( this.calcTooLong && penState) {
		if ( (Math.max(
			Math.abs(x2 - x1), Math.abs(y2 - y1)
			) / this.pixels_per_millimeter * 10) / this.maxLength > 1)
			this.tooLongCount += 1;
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
	
    if (!penState)
        this.jumpCount++;
    else {
        this.steps++;
    }
    
    if (warn) {
		warn = false;
		return [x2, y2];
	} else {
		return false;
	}
};


TurtleShepherd.prototype.addColorChange= function(color) {
    this.cache.push(
        {
            "cmd":"color",
            "color":{
                r: Math.round(color.r),
                g: Math.round(color.g),
                b: Math.round(color.b),
                a: Math.round(color.a) || 0
            },
        }
    );
};

/*
TurtleShepherd.prototype.flatten = function(max_length) {
	new_cache = [];
	hasFirst = false;
	lastStitch = null;
	
	for (var i=0; i < this.cache.length; i++) {
        if (this.cache[i].cmd == "color") {
            new_cache.push(this.cache[i]);
        } else if (this.cache[i].cmd == "move") {
            stitch = this.cache[i];

            if (hasFirst) {
                x1 = Math.round(stitch.x * scale);
                y1 = -Math.round(stitch.y * scale);
                x0 = Math.round(lastStitch.x * scale);
                y0 = -Math.round(lastStitch.y * scale);

                sum_x = 0;
                sum_y = 0;
                dmax = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0));
				dsteps = Math.abs(dmax / 127);
                
                if (dsteps <= 1) {
                    new_cache.push(this.cache[i]);
                } else {
                    for(j=0;j<dsteps;j++) {
                        if (j < dsteps -1) {
                            new_cache.push(
								{
									"cmd":"move",
									"x":Math.round((x1 - x0)/dsteps),
									"y":Math.round((y1 - y0)/dsteps),
									"penDown":penState,
								}
							);                            
                            sum_x += (x1 - x0)/dsteps;
                            sum_y += (y1 - y0)/dsteps;
                        } else {
							new_cache.push(
								{
									"cmd":"move",
									"x":Math.round((x1 - x0) - sum_x),
									"y":Math.round((y1 - y0) - sum_y),
									"penDown":penState,
								}
							);    
                        }
                    }
                }

            }
            lastStitch = stitch;
            hasFirst = true;
        }	
	}
	this.cache = new_cache;
}
*/


TurtleShepherd.prototype.toSVG = function() {

    var svgStr = "<?xml version=\"1.0\" standalone=\"no\"?>\n";
    svgStr += "<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \n\"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\n";
    svgStr += '<svg width="' + (this.w) + '" height="' + (this.h) + '"' +
        ' viewBox="0 0 ' + (this.w) + ' ' + (this.h) + '"';
    svgStr += ' xmlns="http://www.w3.org/2000/svg" version="1.1">\n';
    svgStr += '<title>Embroidery export</title>\n';

    hasFirst = false;
    tagOpen = false;
    lastStitch = null;
    color = { r:0, g:0, b:0 };

    for (var i=0; i < this.cache.length; i++) {
        if (this.cache[i].cmd == "color") {
            /*if (tagOpen) svgStr += '" />\n';
            color = {
                    r: this.cache[i].color.r,
                    g: this.cache[i].color.g,
                    b: this.cache[i].color.b
                };
            tagOpen = false;*/
        } else if (this.cache[i].cmd == "move") {
            stitch = this.cache[i];
            if (!hasFirst) {
                if (stitch.penDown) {
                    svgStr += '<path fill="none" style="stroke:rgb('+
                        color.r + ',' + color.g + ',' + color.b +
                        ')" d="M ' +
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
                    //hasFirst = true;
                }

            } else {
                if (stitch.penDown ) {
                    if (!lastStich.penDown ) {
                        svgStr +='  <path fill="none" style="stroke:rgb('+
                            color.r + ',' + color.g + ',' + color.b +
                            ')" d="M ' +
                            (lastStich.x - this.minX) +
                            ' ' +
                            (this.maxY - lastStich.y) +
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
            lastStich = stitch;
        }
    }
    if (tagOpen) svgStr += '" />\n';
    svgStr += '</svg>\n';
    return svgStr;
};

TurtleShepherd.prototype.toEXP = function() {
    var expArr = [];
    pixels_per_millimeter = this.pixels_per_millimeter;
    scale = 10 / pixels_per_millimeter;
    lastStitch = null;
    hasFirst = false;

    function move(x, y) {
        y *= -1;
        if (x<0) x = x + 256;
        expArr.push(Math.round(x));
        if (y<0) y = y + 256;
        expArr.push(Math.round(y));
    }

    for (var i=0; i < this.cache.length; i++) {
        if (this.cache[i].cmd == "color") {
            //expArr.push(0x01);
            //expArr.push(0x01);
        } else if (this.cache[i].cmd == "move") {
            stitch = this.cache[i];

            if (hasFirst) {
                x1 = Math.round(stitch.x * scale);
                y1 = -Math.round(stitch.y * scale);
                x0 = Math.round(lastStitch.x * scale);
                y0 = -Math.round(lastStitch.y * scale);

                sum_x = 0;
                sum_y = 0;
                dmax = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0));
				dsteps = Math.abs(dmax / 127);
                
				if (!lastStitch.penDown)
					move(0,0);

                if (dsteps <= 1) {
                    if (!stitch.penDown) {
                        //ignore color
                        expArr.push(0x80);
                        expArr.push(0x04);
                    }
                    move(Math.round(x1 - x0), Math.round(y1 - y0));
                } else {
                    for(j=0;j<dsteps;j++) {
                        if (!stitch.penDown) {
                            expArr.push(0x80);
                            expArr.push(0x04);
                        }
                        if (j < dsteps -1) {
                            move((x1 - x0)/dsteps, (y1 - y0)/dsteps);
                            sum_x += (x1 - x0)/dsteps;
                            sum_y += (y1 - y0)/dsteps;
                        } else {
                            move(Math.round((x1 - x0) - sum_x), Math.round((y1 - y0) - sum_y));
                        }
                    }
                }
            } else {
				move(Math.round(Math.round(stitch.x * scale), -Math.round(stitch.y * scale)));
			}
            lastStitch = stitch;
            hasFirst = true;
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
    lastStitch = null;
    hasFirst = false;
    pixels_per_millimeter = this.pixels_per_millimeter;
    scale = 10 / pixels_per_millimeter;
	count_stitches = 0;
	count_jumps = 0;

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

    function writeHeader(str, length, padWithSpace=false) {
		for(var i = 0; i<length-2; i++) {
			if (i < str.length) {
				expArr.push("0xF1" + str[i].charCodeAt(0).toString(16));
			} else {
				if (padWithSpace) {
					expArr.push(0x20);
				} else {
					expArr.push(0x00);
				}
			}
		}
		expArr.push(0x0A);
		expArr.push(0x1A);
	}

	writeHeader("LA:turtlestitch", 20, true);
	writeHeader("ST:" + this.steps.toString(), 11);
	writeHeader("CO:1", 7);
	writeHeader("+X:" +  Math.round(this.maxX / this.pixels_per_millimeter) * 10, 9); // Math.round(this.getMetricWidth()*10), 9);
	writeHeader("-X:" + Math.round(this.minX / this.pixels_per_millimeter) * 10, 9);
	writeHeader("+Y:" + Math.round(this.maxY/ this.pixels_per_millimeter) * 10, 9); //Math.round(this.getMetricHeight()*10), 9);
	writeHeader("-Y:" + Math.round(this.minY / this.pixels_per_millimeter) * 10, 9);
	
	needle_end_x = 0;
	needle_end_y = 0;
	for (i=0; i < this.cache.length; i++) {
		if (this.cache[i].cmd == "move")
			needle_end_x = this.cache[i].x;
			needle_end_y = this.cache[i].y;
	}
	
	writeHeader("AX:+" + Math.round(needle_end_x / this.pixels_per_millimeter) * 10, 10);
	writeHeader("AY:+" + Math.round(needle_end_y / this.pixels_per_millimeter) * 10, 10);
	writeHeader("MX:0", 10);
	writeHeader("MY:0", 10);
	writeHeader("PD:******", 10);

	expArr.push(0x1a);
	expArr.push(0x00);
	expArr.push(0x00);
	expArr.push(0x00);


    // Print empty header
    for (var i=0; i<384; i++) {
        expArr.push(0x20);
    }
	
    for (i=0; i < this.cache.length; i++) {
        if (this.cache[i].cmd == "color") {
            //expArr.push(0x01);
            //expArr.push(0x01);
        } else if (this.cache[i].cmd == "move") {
			
            stitch = this.cache[i];

            if (hasFirst) {
                x1 = Math.round(stitch.x * scale);
                y1 = Math.round(stitch.y * scale);
                x0 = Math.round(lastStitch.x * scale);
                y0 = Math.round(lastStitch.y * scale);

                sum_x = 0;
                sum_y = 0;
                dmax = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0));                
                dsteps = Math.abs(dmax / 121);
                
                if (!lastStitch.penDown)
					encodeTajimaStitch(0,0,false);

                if (dsteps <= 1) {
                    encodeTajimaStitch((x1 - x0), (y1 - y0),
                        !stitch.penDown);
                    count_stitches++;
                } else {
                    for(j=0;j<dsteps;j++) {
                        if (j < dsteps -1) {
                            encodeTajimaStitch(
                                Math.round((x1 - x0)/dsteps),
                                Math.round((y1 - y0)/dsteps),
                                !stitch.penDown
                            );
                            count_stitches++;
                            sum_x += (x1 - x0)/dsteps;
                            sum_y += (y1 - y0)/dsteps;
                        } else {
                            encodeTajimaStitch(
                                Math.round((x1 - x0) - sum_x),
                                Math.round((y1 - y0) - sum_y),
                                !stitch.penDown
                            );
                            count_stitches++;
							//encodeTajimaStitch(0,0,false);
                        }
                    }
                }
            } else {
				encodeTajimaStitch(Math.round(stitch.x), Math.round(stitch.y) ,false);
                count_stitches++;
			}
            lastStitch = stitch;
            hasFirst = true;
        }
    }

    expArr.push(0x00);
    expArr.push(0x00);
    expArr.push(0xF3);
    
    str = count_stitches.toString();
    
	for(var i = 0; i<9; i++) {
		if (i < str.length) {
			expArr[20+i] = "0xF1" + str[i].charCodeAt(0).toString(16);
		} else {
			expArr[20+i] = 0x00;
		}
	}

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
