

/* Sprite */
// modified SpriteMorph turtle functions

// SpriteMorph motion primitives


SpriteMorph.prototype.forward = function (steps) {
    var dest,
        dist = steps * this.parent.scale || 0;

    oldpos =  this.position();

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
    //this.drawLineX(dest);

    tx = dest.x - this.parent.topLeft().x;
    ty = dest.y - this.parent.topLeft().y;
    tjump = !this.isDown;

    if (tStitch.isFirst()) {
			origx = oldpos.x - this.parent.topLeft().x;
			origy = oldpos.y - this.parent.topLeft().y;
		    tStitch.addPoint(origx , origy ,true);
		    //alert("first");
		    //alert("orig: " + origx + "," + origy+ " tx/ty: " + tx + ", "+ ty + " - "+ this.position());
	}

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

    oldX = this.position().x / stage.scale - stage.center().x + this.extent().x/2;
	oldY = -(this.position().y / stage.scale - stage.center().y + this.extent().y/2);

    if (this.costume) {
        dest = new Point(newX, newY).subtract(this.rotationOffset);
    } else {
        dest = new Point(newX, newY).subtract(this.extent().divideBy(2));
    }

    this.setPosition(dest, justMe);
    this.positionTalkBubble();

    tx = dest.x - this.parent.topLeft().x;
    ty = dest.y - this.parent.topLeft().y;
    tjump = !this.isDown;

    if ( Math.abs(x-oldX)<=1.1 && Math.abs(y-oldY)<=1.1 ) {
		if (tStitch.debug)
			console.log("jump in place - don't add.");
    } else {
		if (tStitch.debug)
			console.log("gotoXY "+ x + "," + y + " from: + " + oldX + "," + oldY);
		tStitch.addPoint(tx,ty,tjump);
	}
};
// SpriteMorph drawing:

SpriteMorph.prototype.drawLine = function (start, dest) {
    var stagePos = this.parent.bounds.origin,
        stageScale = this.parent.scale,
        context = this.parent.penTrails().getContext('2d'),
        from = start.subtract(stagePos).divideBy(stageScale),
        to = dest.subtract(stagePos).divideBy(stageScale),
        damagedFrom = from.multiplyBy(stageScale).add(stagePos),
        damagedTo = to.multiplyBy(stageScale).add(stagePos),
        damaged = damagedFrom.rectangle(damagedTo).expandBy(
            Math.max(this.size * stageScale / 2, 1)
        ).intersect(this.parent.visibleBounds()).spread();



    if (this.isDown) {
        context.lineWidth = this.size;
        context.strokeStyle = this.color.toString();
        if (this.useFlatLineEnds) {
            context.lineCap = 'butt';
            context.lineJoin = 'miter';
        } else {
            context.lineCap = 'round';
            context.lineJoin = 'round';
        }
        context.beginPath();
        context.moveTo(from.x, from.y);
        context.lineTo(to.x, to.y);
        context.stroke();
        if (this.isWarped === false) {
            this.world().broken.push(damaged);
        }
    }
};

SpriteMorph.prototype.drawJumpLine = function (start, dest) {
    var stagePos = this.parent.bounds.origin,
	stageScale = this.parent.scale,
	context = this.parent.penTrails().getContext('2d'),
	from = start.subtract(stagePos).divideBy(stageScale),
	to = dest.subtract(stagePos).divideBy(stageScale),
	damagedFrom = from.multiplyBy(stageScale).add(stagePos),
	damagedTo = to.multiplyBy(stageScale).add(stagePos),
	damaged = damagedFrom.rectangle(damagedTo).expandBy(
		Math.max(this.size * stageScale / 2, 1)
	).intersect(this.parent.visibleBounds()).spread();

	context.lineWidth = this.size;
	context.strokeStyle = new Color(255, 0, 0).toString();
	context.lineCap = 'round';
	context.lineJoin = 'round';
	context.beginPath();
	context.moveTo(from.x, from.y);
	context.lineTo(to.x, to.y);
	context.stroke();
	if (this.isWarped === false) {
		this.world().broken.push(damaged);
	}

};

SpriteMorph.prototype.drawStitch = function (dest) {
	//dest = dest.subtract(this.topLeft());
	var s = tStitch.draw_stitch_len;
    var stagePos = this.parent.bounds.origin,
        stageScale = this.parent.scale,
        context = this.parent.penTrails().getContext('2d'),
        to = dest.subtract(stagePos).divideBy(stageScale),
        damagedFrom = new Point(to.x-s,to.y-s).multiplyBy(stageScale).add(stagePos),
        damagedTo = new Point(to.x+s,to.y+s).multiplyBy(stageScale).add(stagePos),
        damaged = damagedFrom.rectangle(damagedTo).expandBy(
            Math.max(this.size * stageScale / 2, 1)
        ).intersect(this.parent.visibleBounds()).spread();

        context.lineWidth = this.size;
        context.strokeStyle = new Color(0, 0, 255).toString();
        context.lineCap = 'round';
        context.lineJoin = 'round';

        context.beginPath();
        context.moveTo(to.x - s, to.y - s );
        context.lineTo(to.x + s, to.y + s);
        context.stroke();

        context.beginPath();
        context.moveTo(to.x - s, to.y + s);
        context.lineTo(to.x + s, to.y - s);
        context.stroke();
         if (this.isWarped === false) {
            this.world().broken.push(damaged);
        }
};



SpriteMorph.prototype.clear = function () {
    this.parent.clearPenTrails();
    tStitch.clearPoints();
 	if (tStitch.debug) {
		tStitch.debug_msg("",true);
	}

};




// SpriteMorph motion - adjustments due to nesting

SpriteMorph.prototype.moveBy = function (delta, justMe) {
    // override the inherited default to make sure my parts follow
    // unless it's justMe (a correction)
    var start = this.isDown && !justMe && this.parent ?
            this.rotationCenter() : null;

    // add stitch controls
    if (this.parent) {
		if (this.parent.penTrails()) {
			origin = this.rotationCenter();
		}
	}

	SpriteMorph.uber.moveBy.call(this, delta);

	 // add stitch controls
    if (this.parent) {
		if (this.parent.penTrails() && origin.x > 100) {
 			//alert(origin.x);
			if (tStitch.draw_stitches)  {
				this.drawStitch(this.rotationCenter());
			}
			if (tStitch.draw_jumps && !this.isDown) {
				this.drawJumpLine(origin,this.rotationCenter());
			}
		}
	}


    if (start) {
        this.drawLine(start, this.rotationCenter());
    }
    if (!justMe) {
        this.parts.forEach(function (part) {
            part.moveBy(delta);
        });
    }
};

/*
// Definition of new block categories
SpriteMorph.prototype.categories =
    [
        'motion',
        'control',
        'shapes',
		'colors',
        'sensing',
        'operators',
        'variables',
        'lists',
        'my blocks'
    ];

SpriteMorph.prototype.blockColor = {
    motion : new Color(74, 108, 212),
    shapes : new Color(143, 86, 227),
	colors : new Color(207, 74, 217),
	sound : new Color(207, 74, 217), // we need to keep this color for the zoom blocks dialog
    control : new Color(230, 168, 34),
    sensing : new Color(4, 148, 220),
    operators : new Color(98, 194, 19),
    variables : new Color(243, 118, 29),
    lists : new Color(217, 77, 17),
    other : new Color(150, 150, 150),
    'my blocks': new Color(150, 150, 60),
};

// now move also "make a block to 'my blocks'

*/
