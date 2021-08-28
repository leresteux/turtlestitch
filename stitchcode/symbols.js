SymbolMorph.prototype.names.push('largeStage');
SymbolMorph.prototype.names.push('zoomToFit');

/*
SymbolMorph.prototype.originalSymbolCanvasColored = SymbolMorph.prototype.symbolCanvasColored;
SymbolMorph.prototype.symbolCanvasColored = function (aColor) {
    if (this.name == 'largeStage') {
        return this.drawSymbolLargeStage(newCanvas(new Point(this.symbolWidth(), this.size)), aColor);
    } else if (this.name == 'zoomToFit') {
		    return this.drawSymbolZoomToFit(newCanvas(new Point(this.symbolWidth(), this.size)), aColor);
	  } else if (this.name == 'turtle') {
      return this.drawSymbolTurtle(newCanvas(new Point(this.symbolWidth(), this.size)), aColor);
    } else {
        return this.originalSymbolCanvasColored(aColor)
    }
}
*/

SymbolMorph.prototype.originalSymbolWidth = SymbolMorph.prototype.symbolWidth;
SymbolMorph.prototype.symbolWidth = function () {
    switch (this.name) {
    // case 'gears':
    // case 'file':
    // return this.originalSymbolWidth() * 0.8;
    case 'turtle':
      return this.originalSymbolWidth() * 0.8;
    default:
        return this.originalSymbolWidth();
    }
};




SymbolMorph.prototype.origRenderShape = SymbolMorph.prototype.renderShape;
SymbolMorph.prototype.renderShape = function (ctx, aColor) {
    switch (this.name) {
      case 'zoomToFit':
          this.renderSymbolZoomToFit(ctx, aColor);
          break;
      default:
          this.origRenderShape(ctx, aColor);
    }
}

SymbolMorph.prototype.renderSymbolZoomToFit = function(ctx, color) {
    var c = this.symbolWidth() / 2,
        h = this.size,
        w = this.symbolWidth()  / 5;

    ctx.fillStyle = color.toString();
    ctx.beginPath();

    ctx.moveTo(0, 0);
    ctx.lineTo(w, 0);
    ctx.stroke();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, w);
    ctx.stroke();

    ctx.moveTo(0, h);
    ctx.lineTo(0, h - w);
    ctx.stroke();
    ctx.moveTo(0, h);
    ctx.lineTo(w, h);
    ctx.stroke();

    ctx.moveTo(h, 0);
    ctx.lineTo(h - w, 0);
    ctx.stroke();
    ctx.moveTo(h, 0);
    ctx.lineTo(h, w);
    ctx.stroke();

    ctx.moveTo(h, h);
    ctx.lineTo(h - w, h);
    ctx.stroke();
    ctx.moveTo(h, h);
    ctx.lineTo(h, h - w);
    ctx.stroke();

}



SymbolMorph.prototype.renderSymbolTurtle = function (ctx, color) {
   // this.renderTexture('stitchcode/assets/turtles16.png', ctx);
    // draw a circle
    // draw a solid circle
    var w = this.symbolWidth();
    var r = w / 2.5;

    ctx.fillStyle = color.toString();
    ctx.beginPath();
    ctx.scale(1, 0.7);
    ctx.arc(w / 2 - 1, w / (2 * 0.7), r, radians(0), radians(360), true);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(w / 2 - 1 + r, w / (2 * 0.7), r/2, radians(0), radians(360), true);
    ctx.fill();
    ctx.beginPath();
    ctx.scale(1,1);
    ctx.arc(w / 2 - 1 - r/1.5, w / 2 - r/2, r/2.5, radians(0), radians(360), true);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(w / 2 - 1  + r/1.5, w / 2 - r/2, r/2.5, radians(0), radians(360), true);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(w / 2 - 1 - r/1.5, w / 2 + (r*1.5), r/2.5, radians(0), radians(360), true);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(w / 2 - 1  + r/1.5, w / 2.0 + r*1.5, r/2.5, radians(0), radians(360), true);
    ctx.fill();
}

SymbolMorph.prototype.renderSymbolTurtle2 = function (ctx, color) {

    this.texture = "data:image/png;base64,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";


    this.render = function (ctx) {
        if (this.cachedTexture) {
            this.renderCachedTexture(ctx);
        } else if (this.texture) {
            this.renderTexture(this.texture, ctx);
        }
        this.changed();
    };

    this.renderCachedTexture = function (ctx) {
        ctx.drawImage(
            this.cachedTexture,
            0,
            16
        );
        this.changed();
    };

    this.render()
    this.fixLayout()
};

/*
SymbolMorph.prototype.drawSymbolFullScreen = function (canvas, color) {
    // answer a canvas showing two arrows pointing diagonally outwards
    var ctx = canvas.getContext('2d'),
        h = canvas.height,
        c = canvas.width / 2,
        off = canvas.width / 10,
        w = canvas.width / 2;

    ctx.strokeStyle = color.toString();
    ctx.lineWidth = 1.5;
    ctx.moveTo(c - off, c + off);
    ctx.lineTo(0, h);
    ctx.stroke();

    ctx.moveTo(c + off, c - off);
    ctx.lineTo(h, 0);
    ctx.stroke();

    ctx.moveTo(0, h);
    ctx.lineTo(0, h - w);
    ctx.stroke();
    ctx.moveTo(0, h);
    ctx.lineTo(w, h);
    ctx.stroke();

    ctx.moveTo(h, 0);
    ctx.lineTo(h - w, 0);
    ctx.stroke();
    ctx.moveTo(h, 0);
    ctx.lineTo(h, w);
    ctx.stroke();

    return canvas;
};

SymbolMorph.prototype.drawSymbolZoomToFit = function (canvas, color) {
    // answer a canvas showing two arrows pointing diagonally outwards
    var ctx = canvas.getContext('2d'),
        h = canvas.height,
        c = canvas.width / 2,
        off = canvas.width / 10,
        w = canvas.width / 4;

    ctx.strokeStyle = color.toString();
    ctx.lineWidth = 1.5;


    ctx.moveTo(0, 0);
    ctx.lineTo(w, 0);
    ctx.stroke();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, w);
    ctx.stroke();

    ctx.moveTo(0, h);
    ctx.lineTo(0, h - w);
    ctx.stroke();
    ctx.moveTo(0, h);
    ctx.lineTo(w, h);
    ctx.stroke();

    ctx.moveTo(h, 0);
    ctx.lineTo(h - w, 0);
    ctx.stroke();
    ctx.moveTo(h, 0);
    ctx.lineTo(h, w);
    ctx.stroke();

    ctx.moveTo(h, h);
    ctx.lineTo(h - w, h);
    ctx.stroke();
    ctx.moveTo(h, h);
    ctx.lineTo(h, h - w);
    ctx.stroke();

    return canvas;
};



SymbolMorph.prototype.drawSymbolFile= function (canvas, color) {
    // answer a canvas showing a page symbol
    var ctx = canvas.getContext('2d'),
        w = Math.min(canvas.width, canvas.height) / 2;

    //ctx.fillStyle = color.toString();
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(w, 0);
    ctx.lineTo(w, w);
    ctx.lineTo(canvas.width, w);
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.stroke();
    //ctx.fill();

    //ctx.fillStyle = color.darker(25).toString();
    ctx.beginPath();
    ctx.moveTo(w, 0);
    ctx.lineTo(canvas.width, w);
    ctx.lineTo(w, w);
    ctx.lineTo(w, 0);
    ctx.stroke();
    //ctx.fill();

    return canvas;
};

SymbolMorph.prototype.drawSymbolNormalScreen = function (canvas, color) {
    // answer a canvas showing two arrows pointing diagonally outwards
    var ctx = canvas.getContext('2d'),
        h = canvas.height,
        c = canvas.width / 2,
        off = canvas.width / 10,
        w = canvas.width / 2;

    ctx.strokeStyle = color.toString();
    ctx.lineWidth = 1.5;
    ctx.moveTo(c - off, c + off);
    ctx.lineTo(0, h);
    ctx.stroke();

    ctx.moveTo(c + off, c - off);
    ctx.lineTo(h, 0);
    ctx.stroke();

    ctx.moveTo(0, h);
    ctx.lineTo(0, h - w);
    ctx.stroke();
    ctx.moveTo(0, h);
    ctx.lineTo(w, h);
    ctx.stroke();

    ctx.moveTo(h, 0);
    ctx.lineTo(h - w, 0);
    ctx.stroke();
    ctx.moveTo(h, 0);
    ctx.lineTo(h, w);
    ctx.stroke();

    return canvas;
};


SymbolMorph.prototype.drawSymbolLargeStage = function (canvas, color) {
    var ctx = canvas.getContext('2d'),
        w = canvas.width,
        h = canvas.height,
        w2 = w * 1 / 3,
        h2 = h * 2 / 3;

    ctx.strokeStyle = color.toString();
    ctx.lineWidth = 2;
    ctx.rect(0, 0, w, h);
    ctx.stroke();
    ctx.rect(w2, 0, w, h2);
    ctx.stroke();

    return canvas;
};

SymbolMorph.prototype.drawSymbolNormalStage = function (canvas, color) {
    var ctx = canvas.getContext('2d'),
        w = canvas.width,
        h = canvas.height,
        w2 = w / 2,
        h2 = h / 2;

    ctx.strokeStyle = color.toString();
    ctx.lineWidth = 2;
    ctx.rect(0, 0, w, h);
    ctx.stroke();
    ctx.rect(w2, 0, w2, h2);
    ctx.stroke();

    return canvas;
};

SymbolMorph.prototype.drawSymbolSmallStage = function (canvas, color) {
    var ctx = canvas.getContext('2d'),
        w = canvas.width,
        h = canvas.height,
        w2 = w * 2 / 3,
        h2 = h * 1 / 3;

    ctx.strokeStyle = color.toString();
    ctx.lineWidth = 2;
    ctx.rect(0, 0, w, h);
    ctx.stroke();
    ctx.rect(w2, 0, w2, h2);
    ctx.stroke();

    return canvas;
};
*/
