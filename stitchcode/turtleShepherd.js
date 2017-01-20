/*
    TurtleShepherd

    turltestich's central intelligence agancy

*/

function TurtleShepherd() {
    this.clear();
}

TurtleShepherd.prototype.clear = function() {
    this.cache = [];
    this.minX = 0;
    this.minY = 0;
    this.maxX = 0;
    this.maxY = 0;
    this.steps = 0;
    this.initX = 0;
    this.initY = 0;
    this.w = 480;
    this.h = 360;
    this.scale = 1;
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
    this.initY = y;
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

TurtleShepherd.prototype.setDimensions = function(x,y) {
    this.w = x;
    this.h = y;
};


TurtleShepherd.prototype.renderGrid = function(size=50) {
    return '<defs>\n' +
        '<pattern id="grid" width="'+size+'" height="'+size+'" patternUnits="userSpaceOnUse">\n' +
        '<path d="M '+size+' 0 L 0 0 0 '+size+'" fill="none" stroke="gray" stroke-width="0.5"/>\n' +
        '</pattern>' +
        '</defs>\n';
};

TurtleShepherd.prototype.toSVG = function() {

    //var svgStr = "<?xml version=\"1.0\" standalone=\"no\"?>\n";
    //svgStr += "<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \n\"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\n";
    svgStr = '<svg width="' + this.w +'" height="' +this.h + '"' +
        ' viewBox="' + (-1 * this.w / 2 * this.scale) + ' ' +
            (-1 * this.h / 2 * this.scale) + ' ' +
            (this.w* this.scale) + ' ' +
            (this.h* this.scale)+ '"\n';
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

TurtleShepherd.prototype.reRender = function(cnv) {
    //load a svg snippet in the canvas with id = 'svg'
   canvas = document.getElementById('svg');
   document.getElementById("code").innerHTML =  turtleShepherd.toSVG();
   document.getElementById("svg2").innerHTML =  turtleShepherd.toSVG();
   //canvg(document.getElementById('svg'), cmdCache.toSVG());

   //canvg(cnv, cmdCache.toSVG());

   //var cnv = caller.parent.penTrails();
   //var ctx = cnv.getContext('2d');
   //ctx.drawSvg(cmdCache.toSVG(), 0, 0, cnv.width, cnv.height);

}

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
