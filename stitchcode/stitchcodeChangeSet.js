
var tStitch = {};
tStitch.debug = true;
tStitch.stitches = {};
tStitch.stitches.x = new Array();
tStitch.stitches.y = new Array();
tStitch.stitches.jump = new Array();
tStitch.addPoint = function (x,y,jump) {
	if (tStitch.debug) {
		o = new String();
		o = document.getElementById("bug").innerHTML;
		o = o + "[" + x + "x" + y;
		if (jump) o = o + " (isJump = " + jump +")";
		o+= "], ";
		document.getElementById("bug").innerHTML = o ;	
	}
	
}

// SpriteMorph turtle functions

SpriteMorph.prototype.forward = function (steps) {
    var dest,
        dist = steps * this.parent.scale || 0;

    if (dist >= 0) {
        dest = this.position().distanceAngle(dist, this.heading);
    } else {
        dest = this.position().distanceAngle(
            Math.abs(dist),
            (this.heading - 180)
        );
    }
    
    this.setPosition(dest);
    this.positionTalkBubble();
    
    tx = dest.x - this.parent.topLeft().x
    ty = dest.y - this.parent.topLeft().y
    tjump = !this.isDown;
    tStitch.addPoint(tx,ty,tjump);
    //alert("move to: " + tx + "x" + ty + " - isJump = " + tjump);
        
};

SpriteMorph.prototype.gotoXY = function (x, y, justMe) {
    var stage = this.parentThatIsA(StageMorph),
        newX,
        newY,
        dest;

    newX = stage.center().x + (+x || 0) * stage.scale;
    newY = stage.center().y - (+y || 0) * stage.scale;
    if (this.costume) {
        dest = new Point(newX, newY).subtract(this.rotationOffset);
    } else {
        dest = new Point(newX, newY).subtract(this.extent().divideBy(2));
    }
    
    this.setPosition(dest, justMe);
    this.positionTalkBubble();
    
    tx = dest.x - this.parent.topLeft().x
    ty = dest.y - this.parent.topLeft().y    
    //alert("jump to: " + tx + "x" + ty);
    tStitch.addPoint(tx,ty,tjump);    
};
