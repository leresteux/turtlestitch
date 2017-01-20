/* Sprite */
// modified SpriteMorph turtlestitch functions

SpriteMorph.prototype.origForward = SpriteMorph.prototype.forward;
SpriteMorph.prototype.forward = function (steps) {
    oldx = this.xPosition();
    oldy = this.yPosition();
    this.origForward(steps);
    if (!turtleShepherd.hasSteps())
        turtleShepherd.initPosition(oldx, oldy);
    turtleShepherd.addMoveTo(this.xPosition() , this.yPosition() , this.isDown);
    this.reDrawTrails();
};

SpriteMorph.prototype.origGotoXY = SpriteMorph.prototype.gotoXY;
SpriteMorph.prototype.gotoXY = function (x, y, justMe) {
    oldx = this.xPosition();
    oldy = this.yPosition();
    console.log("jump in place - don't add.");
    this.origGotoXY(x, y, justMe);
    if ( Math.abs(this.xPosition()-oldx)<=1 && Math.abs(this.yPosition()-oldy)<=1 ) {
		console.log("jump in place - don't add.");
    } else {
        if (!turtleShepherd.hasSteps())
            turtleShepherd.initPosition(oldx, oldy);
        turtleShepherd.addMoveTo(this.xPosition() , this.yPosition() , this.isDown);
        this.reDrawTrails();
	}
};

SpriteMorph.prototype.origClear = SpriteMorph.prototype.clear;
SpriteMorph.prototype.clear = function () {
    this.origClear();
    turtleShepherd.clear();
    this.reDrawTrails();
};

SpriteMorph.prototype.reDrawTrails = function () {
    this.parent.clearPenTrails();
    reDraw(this.parent.penTrails());
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

    this.clearPenTrails();
    reDraw(this.penTrails());
};
