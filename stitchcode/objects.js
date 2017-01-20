/* Sprite */
// modified SpriteMorph turtlestitch functions


SpriteMorph.prototype.origInit = SpriteMorph.prototype.init;
SpriteMorph.prototype.init = function(globals) {
    this.origInit(globals);
    this.hide();
};

SpriteMorph.prototype.origForward = SpriteMorph.prototype.forward;
SpriteMorph.prototype.forward = function (steps) {
    oldx = this.xPosition();
    oldy = this.yPosition();
    this.origForward(steps);
    if (!turtleShepherd.hasSteps())
        turtleShepherd.initPosition(oldx, oldy);
    turtleShepherd.addMoveTo(this.xPosition() , this.yPosition() , this.isDown);
    this.reRender();
};

SpriteMorph.prototype.origGotoXY = SpriteMorph.prototype.gotoXY;
SpriteMorph.prototype.gotoXY = function (x, y, justMe) {
    oldx = this.xPosition();
    oldy = this.yPosition();
    this.origGotoXY(x, y, justMe);
    if ( Math.abs(this.xPosition()-oldx)<=1 && Math.abs(this.yPosition()-oldy)<=1 ) {
		// jump in place - don't add.
        if (DEBUG) turtleShepherd.debug_msg("jump in place - don't add");
    } else {
        if (!turtleShepherd.hasSteps())
            turtleShepherd.initPosition(oldx, oldy);
        turtleShepherd.addMoveTo(this.xPosition() , this.yPosition() , this.isDown);
        this.reRender();
	}
};

SpriteMorph.prototype.origClear = SpriteMorph.prototype.clear;
SpriteMorph.prototype.clear = function () {
    this.origClear();
    turtleShepherd.clear();
    //this.changed();
    this.reRender();
};

SpriteMorph.prototype.reRender = function () {
    //this.changed();
    turtleShepherd.reRender(this.parent.penTrails());
    this.hide();
    this.changed();
};


/* Stage */
// modified StageMorph turtlestitch functions

StageMorph.prototype.referencePos = null;
StageMorph.prototype.mouseScroll = function (y, x) {
    if (y > 0) {
        turtleShepherd.zoomOut();
    } else if (y < 0) {
        turtleShepherd.zoomIn();
    }

    this.reRender();
    this.changed();
};


StageMorph.prototype.reRender = function () {
    //this.changed();
    turtleShepherd.reRender(this.penTrails());
    //this.changed();
};

StageMorph.prototype.originalSetScale = StageMorph.prototype.setScale;
StageMorph.prototype.setScale = function (number) {
    this.scaleChanged = true;
    this.originalSetScale(number);
    if (DEBUG) turtleShepherd.debug_msg("scale stage to "+ number );
    if (DEBUG) turtleShepherd.debug_msg("stage dimensions " +
        this.extent().x + " " +
        this.extent().y);
    if (DEBUG) turtleShepherd.debug_msg("stage position " +
        this.position().x + " " +
        this.position().y);
    turtleShepherd.setStageDimensions(this.extent().x, this.extent().y);
    turtleShepherd.setStagePosition(this.position().x, this.position().y);
    //this.resizePenTrails();
    this.changed();
    this.reRender();
};

StageMorph.prototype.resizePenTrails = function () {
    this.trailsCanvas = newCanvas(new Point(this.extent().x,this.extent().y));
    this.changed();
};

StageMorph.prototype.originalDrawOn = StageMorph.prototype.drawOn;

/*
StageMorph.prototype.drawOn = function (aCanvas, aRect) {
    if (DEBUG) turtleShepherd.debug_msg("draw on stage");
    //turtleShepherd.reRender(this.penTrails());

    c = this.penTrails().getContext('2d');
    c.drawSvg(turtleShepherd.toSVG(), 0, 0, aCanvas.width, aCanvas.height);
    return this.originalDrawOn(aCanvas, aRect);
};*


/* from beetleblocks */
/*
// StageMorph drawing
StageMorph.prototype.originalDrawOn = StageMorph.prototype.drawOn;
StageMorph.prototype.drawOn = function (aCanvas, aRect) {
    // If the scale is lower than 1, we reuse the original method,
    // otherwise we need to modify the renderer dimensions
    // we do not need to render the original canvas anymore because
    // we have removed sprites and backgrounds

    var rectangle, area, delta, src, context, w, h, sl, st;
    if (!this.isVisible) {
        return null;
    }
    if (this.scale < 1) {
        return this.originalDrawOn(aCanvas, aRect);
    }

    rectangle = aRect || this.bounds;
    area = rectangle.intersect(this.bounds).round();
    if (area.extent().gt(new Point(0, 0))) {
        delta = this.position().neg();
        src = area.copy().translateBy(delta).round();
        context = aCanvas.getContext('2d');
        context.globalAlpha = this.alpha;

        sl = src.left();
        st = src.top();
        w = Math.min(src.width(), this.image.width - sl);
        h = Math.min(src.height(), this.image.height - st);

        if (w < 1 || h < 1) {
            return null;
        }

        context.save();
        if (this.scaleChanged) {
            w = this.width();
            h = this.height();
            this.scaleChanged = false;
            this.reRender();
        }

        context.drawImage(
                this.penTrails(),
                src.left() / this.scale,
                src.top() / this.scale,
                w,
                h,
                area.left() / this.scale,
                area.top() / this.scale,
                w,
                h
                );
        context.restore();
    }
};

*/

/*

StageMorph.prototype.originalSetScale = StageMorph.prototype.setScale;
StageMorph.prototype.setScale = function (number) {
    this.scaleChanged = true;
    this.originalSetScale(number);
};

// Contextual menu
StageMorph.prototype.userMenu = function () {
    var ide = this.parentThatIsA(IDE_Morph),
        menu = new MenuMorph(this),
        shiftClicked = this.world().currentKey === 16,
        myself = this;

    if (ide && ide.isAppMode) {
        menu.hide();
        return menu;
    }
    menu.addItem(
            'pic...',
            function () {
                window.open(myself.fullImageClassic().toDataURL());
            },
            'open a new window\nwith a picture of the scene'
            );
    return menu;
};

*/
