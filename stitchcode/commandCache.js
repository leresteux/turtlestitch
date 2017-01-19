
function CommandCache() {
    this.clear();
}

CommandCache.prototype.addMoveTo= function(x,y,penState) {
    this.cache.push(
        {
            "cmd":"move",
            "x":x,
            "y":-y,
            "penDown":penState,
        }
    );
    if (this.count === 0) {
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
    this.count++;
    //if (DEBUG) tstools.debug_msg("add move to" + x + " " + y + " " + penState );
};

CommandCache.prototype.hasSteps = function() {
    return this.count > 0;
};

CommandCache.prototype.addColorChange= function(color) {
    this.cache.push(
        {
            "cmd":"color",
            "value":color,
        }
    );
};

CommandCache.prototype.clear = function() {
    this.cache = [];
    this.minX = 0;
    this.minY = 0;
    this.maxX = 0;
    this.maxY = 0;
    this.count = 0;
    this.initX = 0;
    this.initY = 0;
    this.w = 480;
    this.h = 360;
    this.scale = 1;
};

CommandCache.prototype.initPosition = function(x,y) {
    this.initX = x;
    this.initY = y;
};

CommandCache.prototype.setScale = function(s) {
    this.scale = s;
    if (DEBUG) tstools.debug_msg("zoom to scale "+ s );
};


CommandCache.prototype.zoomIn = function() {
    this.scale += 0.1;
    if (DEBUG) tstools.debug_msg("zoom to scale "+this.scale );
};

CommandCache.prototype.zoomOut = function() {
    if (this.scale > 0.15)
        this.scale -= 0.1;
    if (DEBUG) tstools.debug_msg("zoom to scale "+ this.scale );
};

CommandCache.prototype.setDimensions = function(x,y) {
    this.w = x;
    this.h = y;
};


CommandCache.prototype.renderGrid = function(size=50) {
    return '<defs>' +
        '<pattern id="grid" width="'+size+'" height="'+size+'" patternUnits="userSpaceOnUse">' +
        '<path d="M '+size+' 0 L 0 0 0 '+size+'" fill="none" stroke="gray" stroke-width="0.5"/>' +
        '</pattern>' +
        '</defs>';
};

CommandCache.prototype.toSVG = function() {

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
        '" width="100%" height="100%" fill="url(#grid)" />';
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
