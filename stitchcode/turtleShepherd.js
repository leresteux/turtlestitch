/*
    TurtleShepherd

    turltestich's central intelligence agancy

*/

function TurtleShepherd() {
    this.init();
}

function TurtleShepherd(world) {
    this.init();
    this.setWorld(world);
}

TurtleShepherd.prototype.init = function() {
    this.w = 480;
    this.h = 360;
    this.clear();
    this.gridSize = 50;
    this.showJumpStitches = true;
    this.showStitches = true;
    this.showGrid = true;
    this.showTurtle = true;
};

TurtleShepherd.prototype.clear = function() {
    this.cache = [];
    this.minX = 0;
    this.minY = 0;
    this.maxX = 0;
    this.maxY = 0;
    this.steps = 0;
    this.initX = 0;
    this.initY = 0;
    this.scale = 1;
};

TurtleShepherd.prototype.setWorld = function(world) {
    this.world = world;
};

TurtleShepherd.prototype.hasSteps = function() {
    return this.steps > 0;
};

TurtleShepherd.prototype.addMoveTo= function(x,y,penState) {
    this.cache.push(
        {
            "cmd":"move",
            "x":x,
            "y":-y,
            "penDown":penState,
        }
    );
    if (this.steps === 0) {
        this.minX = x;
        this.minY = y;
        this.maxX = x;
        this.maxY = y;
    } else {
        if (x < this.minX) this.minX = x;
        if (x > this.maxX) this.maxX = x;

        if (y < this.minY) this.minY  = y;
        if (y > this.maxY) this.maxY  = y;
    }
    this.steps++;
    if (DEBUG) this.debug_msg("move to " + x + " " + y + " " + penState );
};

TurtleShepherd.prototype.initPosition = function(x,y) {
    this.initX = x;
    this.initY = -y;
    if (DEBUG) this.debug_msg("init " + x + " " + y );
};

TurtleShepherd.prototype.addColorChange= function(color) {
    this.cache.push(
        {
            "cmd":"color",
            "value":color,
        }
    );
};


TurtleShepherd.prototype.setScale = function(s) {
    this.scale = s;
    if (DEBUG) this.debug_msg("zoom to scale "+ s );
};


TurtleShepherd.prototype.zoomIn = function() {
    this.scale += 0.1;
    if (DEBUG) this.debug_msg("zoom to scale "+this.scale );
};

TurtleShepherd.prototype.zoomOut = function() {
    if (this.scale > 0.15)
        this.scale -= 0.1;
    if (DEBUG) this.debug_msg("zoom to scale "+ this.scale );
};

TurtleShepherd.prototype.setStageDimensions = function(w,h) {
    this.w = w;
    this.h = h;
    /*
    document.getElementById("svg2").style.left = x + "px";
    document.getElementById("svg2").style.top = y+ "px";
    */
    document.getElementById("svg2").style.width = w + "px";
    document.getElementById("svg2").style.height = h + "px";
    document.getElementById("svg2").style.right = "0";
    document.getElementById("svg2").style.bottom = "0";
};

TurtleShepherd.prototype.setStagePosition = function(x,y) {
    //document.getElementById("svg2").style.top = y + "px";
    //document.getElementById("svg2").style.left = x + "px";
};


TurtleShepherd.prototype.renderGrid = function(size) {
    size = this.gridSize;
    return '<defs>' +
        '<pattern id="grid" width="'+size+'" height="'+size+'" patternUnits="userSpaceOnUse">' +
        '<path d="M '+size+' 0 L 0 0 0 '+size+'" fill="none" stroke="gray" stroke-width="0.5"/>' +
        '</pattern>' +
        '</defs>\n';
};

TurtleShepherd.prototype.toSVG = function() {

    var svgStr = "<?xml version=\"1.0\" standalone=\"no\"?>\n";
    svgStr += "<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \n\"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\n";
    svgStr += '<svg width="' + (this.w) + '" height="' +this.h + '"' +
        ' viewBox="' + (-1 * (this.w / 2) * this.scale) + ' ' +
            (-1 * (this.h / 2) * this.scale) + ' ' +
            (this.w * this.scale) + ' ' +
            (this.h * this.scale) + '"\n';
    svgStr += ' xmlns="http://www.w3.org/2000/svg" version="1.1">\n';
    svgStr += '<title>Embroidery export</title>\n';

    svgStr += this.renderGrid();
    svgStr += '<rect x="' + (-1 * this.w / 2 * this.scale) +
        '" y="' + (-1 * this.h / 2 * this.scale) +
        '" width="100%" height="100%" fill="url(#grid)" />\n';

    hasFirst = false;
    tagOpen = false;

    for (var i=0; i < this.cache.length; i++) {
        if (this.cache[i].cmd == "move") {
            stitch = this.cache[i];
            if (!hasFirst) {
                if (stitch.penDown) {
                    svgStr += '<path fill="none" stroke="black" d="M ' +
                        this.initX +
                        ' ' +
                        this.initY ;
                    hasFirst = true;
                    tagOpen = true;
                } else {
                    svgStr += '<path stroke="red" stroke-dasharray="4 4" d="M ' +
                        this.initX +
                        ' ' +
                        this.initY +
                        ' L ' +
                        (stitch.x) +
                        ' ' +
                        (stitch.y) +
                        '" />\n' ;
                    hasFirst = true;
                }
            } else {

                if (this.cache[i].penDown ) {
                    if (!this.cache[i-1].penDown ) {
                        svgStr +='  <path fill="none" stroke="black" d="M ' +
                            (this.cache[i-1].x) +
                            ' ' +
                            (this.cache[i-1].y) +
                            ' L ' +
                            (stitch.x) +
                            ' ' +
                            (stitch.y);
                    }
                    svgStr += ' L ' +
                        (stitch.x) +
                        ' ' +
                        (stitch.y);
                    tagOpen = true;
                } else {

                    svgStr += '<path stroke="red" stroke-dasharray="4 4" d="M ' +
                        (this.cache[i-1].x) +
                        ' ' +
                        (this.cache[i-1].y) +
                        ' L ' +
                        (stitch.x) +
                        ' ' +
                        (stitch.y) +
                    '" />\n' ;
                }
            }
        }
    }
    if (tagOpen) svgStr += '" />\n';
    svgStr += '</svg>\n';
    return svgStr;
};

TurtleShepherd.prototype.toogleShowStitches = function() {
    this.showStitches = !this.showStitches;
};

TurtleShepherd.prototype.getShowStitches = function() {
    return this.showStitches;
};

TurtleShepherd.prototype.toogleShowJumpStitches = function() {
    this.showJumpStitches = !this.showJumpStitches;
};

TurtleShepherd.prototype.getShowJumpStitches = function() {
    return this.showJumpStitches;
};

TurtleShepherd.prototype.toogleShowGrid = function() {
    this.showGrid = !this.showGrid;
};

TurtleShepherd.prototype.getShowGrid = function() {
    return this.showGrid;
};

TurtleShepherd.prototype.toSVG2 = function() {

    //var svgStr = "<?xml version=\"1.0\" standalone=\"no\"?>\n";
    //svgStr += "<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \n\"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\n";
    svgStr = '<svg width="' + (this.w) + '" height="' +this.h + '"' +
        ' viewBox="' + Math.round(-1 * (this.w / 2) * this.scale) + ' ' +
            Math.round(-1 * (this.h / 2) * this.scale) + ' ' +
            Math.round(this.w * this.scale) + ' ' +
            Math.round(this.h * this.scale) + '"\n';
    svgStr += ' xmlns="http://www.w3.org/2000/svg" version="1.1">\n';
    svgStr += '<title>Embroidery export</title>\n';

    if (this.showGrid) {
        svgStr += this.renderGrid();
        svgStr += '<rect x="' + Math.round(-1 * this.w / 2 * this.scale) +
            '" y="' + Math.round(-1 * this.h / 2 * this.scale) +
            '" width="100%" height="100%" fill="url(#grid)" />\n';
    }
    hasFirst = false;
    tagOpen = false;
    prevX = this.initX;
    prevY = this.initY;

    for (var i=0; i < this.cache.length; i++) {
        if (this.cache[i].cmd == "move") {
            stitch = this.cache[i];
            if (stitch.penDown || this.showJumpStitches)
                svgStr += '<line x1="'+ prevX +
                    '" y1="'+ prevY +
                    '" x2="' + stitch.x +
                    '" y2="' + stitch.y;

            if (stitch.penDown)
                svgStr +='" stroke-linecap="round" style="stroke:rgb(0,0,0);stroke-width:1" />\n';
            else
                if (this.showJumpStitches)
                    svgStr +='" stroke-linecap="round" style="stroke:rgb(255,0,0);stroke-width:0.6;" stroke-dasharray="4 4" />\n';

            if (this.showStitches) {
                svgStr +='<circle cx="'+ stitch.x +
                    '" cy="'+ stitch.y +
                    '" r="1.8" stroke="blue" fill="blue"/>\n';
            }

        }
        prevX = stitch.x;
        prevY = stitch.y;
    }
    if (tagOpen) svgStr += '" />\n';
    svgStr += '</svg>\n';
    return svgStr;
};

TurtleShepherd.prototype.reRender = function(cnv) {
    sourceSVG = turtleShepherd.toSVG2();

    /* get canvas of world not via call
    if (DEBUG) this.debug_msg("this world is " + this.world.children[0].stage.penTrails() );
    if (typeof this.world !== 'undefined') {
        cnv = this.world.children[0].stage.penTrails();
        this.debug_msg("override canvas" );
    }
    */

    // draw via canvg's drawSVF
    if (cnv) {
        var ctx = cnv.getContext('2d');
        ctx.clearRect(0, 0, cnv.width, cnv.height);
        ctx.drawSvg(turtleShepherd.toSVG2(), 0, 0, cnv.width, cnv.height);
    }

    // debug options
    document.getElementById("code").innerHTML =  sourceSVG;
    //document.getElementById("svg2").innerHTML =  sourceSVG;

    // drawing alternatives - to be REMOVED:

    // draw via canvg - works but very slow!
    //canvg(document.getElementById('svg'), turtleShepherd.toSVG());

    // draw via canvg - works but very slow!
    //canvg(cnv, turtleShepherd.toSVG());

    /*
    // another method to draw svg on canvas
    var svgString = (new XMLSerializer()).serializeToString(document.querySelector('svg'));
    var img = new Image();
    ctx = cnv.getContext('2d');
    img.src = "data:image/svg+xml;base64," + btoa(svgString);
    img.onload = function() {
    // after this, Canvas’ origin-clean is DIRTY
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    ctx.drawImage(img, 0, 0, cnv.width, cnv.height);
   };
   */

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
