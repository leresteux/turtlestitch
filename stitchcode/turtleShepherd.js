/*
    TurtleShepherd

    turltestich's central intelligence agancy

*/

var camera, renderer, scene;

function TurtleShepherd() {
    this.init();
}

function TurtleShepherd(world) {
    this.init();
}

TurtleShepherd.prototype.init = function() {
    this.clear();
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
    this.stitchCount = 0;
    this.jumpCount = 0;
};

TurtleShepherd.prototype.hasSteps = function() {
    return this.steps > 0;
};

TurtleShepherd.prototype.addMoveTo= function(x, y, penState) {

    x = Math.round(x);
    y = Math.round(y);
    this.cache.push(
        {
            "cmd":"move",
            "x":x,
            "y":y,
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
};

TurtleShepherd.prototype.initPosition = function(x,y) {
    x = Math.round(x);
    y = Math.round(y);
    this.initX = x;
    this.initY = y;
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
};

/*

TurtleShepherd.prototype.renderGrid = function(size) {
    size = this.gridSize;
    return '<defs>' +
        '<pattern id="grid" width="'+size+'" height="'+size+'" patternUnits="userSpaceOnUse">' +
        '<path d="M '+size+' 0 L 0 0 0 '+size+'" fill="none" stroke="gray" stroke-width="0.5"/>' +
        '</pattern>' +
        '</defs>\n';
};
*/

TurtleShepherd.prototype.toSVG = function() {

    tx = ((-1 * (this.w / 2) * this.scale) + (this.dx * this.scale));
    ty = ((-1 * (this.h / 2) * this.scale) + (this.dy * this.scale));
    bx = ((this.w * this.scale) + (this.dx * this.scale));
    by = ((this.h * this.scale) + (this.dy * this.scale));

    // TODO: Panning

    //var svgStr = "<?xml version=\"1.0\" standalone=\"no\"?>\n";
    //svgStr += "<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \n\"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\n";
    svgStr = '<svg width="' + (this.w) + '" height="' +this.h + '"' +
        ' viewBox="' +
            (tx) + ' ' +
            (ty) + ' ' +
            (bx) + ' ' +
            (by) + '"\n';
    svgStr += ' xmlns="http://www.w3.org/2000/svg" version="1.1">\n';
    svgStr += '<title>Embroidery export</title>\n';

    if (this.showGrid) {
        svgStr += this.renderGrid();
        svgStr += '<rect x="' + ((-1 * (this.w / 2) * this.scale)) +
            '" y="' + ((-1 * (this.h / 2) * this.scale)) +
            '" width="100%" height="100%" fill="url(#grid)" />\n';
    }

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
    tx = ((-1 * (this.w / 2) * this.scale) + (this.dx * this.scale));
    ty = ((-1 * (this.h / 2) * this.scale) + (this.dy * this.scale));
    bx = ((this.w * this.scale) + (this.dx * this.scale));
    by = ((this.h * this.scale) + (this.dy * this.scale));

    // TODO: Panning

    //var svgStr = "<?xml version=\"1.0\" standalone=\"no\"?>\n";
    //svgStr += "<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \n\"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\n";
    svgStr = '<svg width="' + (this.w) + '" height="' +this.h + '"' +
        ' viewBox="' +
            (tx) + ' ' +
            (ty) + ' ' +
            (bx) + ' ' +
            (by) + '"\n';
    svgStr += ' xmlns="http://www.w3.org/2000/svg" version="1.1">\n';
    svgStr += '<title>Embroidery export</title>\n';

    if (this.showGrid) {
        svgStr += this.renderGrid();
        svgStr += '<rect x="' + ((-1 * (this.w / 2) * this.scale)) +
            '" y="' + ((-1 * (this.h / 2) * this.scale)) +
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
                svgStr += '<line x1="'+ (prevX) +
                    '" y1="'+ (prevY) +
                    '" x2="' + (stitch.x) +
                    '" y2="' + (stitch.y);

            if (stitch.penDown)
                svgStr +='" stroke-linecap="round" style="stroke:rgb(0,0,0);stroke-width:1" />\n';
            else
                if (this.showJumpStitches)
                    svgStr +='" stroke-linecap="round" style="stroke:rgb(255,0,0);stroke-width:0.6;" stroke-dasharray="4 4" />\n';

            if (this.showStitches) {
                svgStr +='<circle cx="'+  (stitch.x) +
                    '" cy="'+  (stitch.y) +
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
