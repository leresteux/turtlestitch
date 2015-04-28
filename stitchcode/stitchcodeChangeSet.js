
// Stitchode's main changes and addtions to snap! go in here
// sorry it lacks proper documentation


var tStitch = {};

tStitch.debug_msg = function (st,clear) {
	o = new String();
	if (!clear) {
		o = document.getElementById("bug").innerHTML;
	} else {
		o = "";
	}
	o += st;
	document.getElementById("bug").innerHTML = o;
}

tStitch.getBaseURL = function () {
    var url = location.href;  // entire url including querystring - also: window.location.href;
    var baseURL = url.substring(0, url.lastIndexOf('/'));
	return baseURL + "/";
}

tStitch.debug = true;
tStitch.stitches = {};
tStitch.stitches.x = new Array();
tStitch.stitches.y = new Array();
tStitch.stitches.jump = new Array();

tStitch.clearPoints = function() {
	tStitch.stitches.x = new Array();
	tStitch.stitches.y = new Array();
	tStitch.stitches.jump = new Array();
}
tStitch.addPoint = function (x,y,jump) {
	if (tStitch.debug) {
		s = new String();
		s = s + "(" + x + "," + y;
		if (jump) s = s + ",jump";
		s+= ")";
		tStitch.debug_msg(s);
	}
	
	if (tStitch.stitches.x[tStitch.stitches.x.length-1] == x  &&
		tStitch.stitches.y[tStitch.stitches.y.length-1] == y
	) {
		//alert("pint exist");
	} else { 
		tStitch.stitches.x.push(x);
		tStitch.stitches.y.push(y);
		tStitch.stitches.jump.push(jump);
	}
}


tStitch.upload = function() {

	tStitch.debug_msg("uploading points... sending SAVE with num points= " + tStitch.stitches.x.length, true);
	params = { "x[]": tStitch.stitches.x, "y[]":tStitch.stitches.y, "j[]":tStitch.stitches.jump };		
	
    if (tStitch.stitches.x.length <= 1 || tStitch.stitches.y <= 1) {
		new  DialogBoxMorph().inform(
			'Upload Error', 
			'No stitches to upload, please (re)generate a drawing first!', 
			world);
	
	} else {
		
		$.post( 
			"/upload", 
			data = params,
			successCallback = function (data) {
				if (data!="ERROR") {
					/*new  DialogBoxMorph().inform(
						'Upload Success', 
						'Your embroidery file is ready and will be available at this url:\n' +
						window.location.hostname + '/view/'+data,'\n', 
						world);*/
					window.open('http://' + window.location.hostname + '/view/'+data, 'TurtleStitch file preview');
				} else {
					new  DialogBoxMorph().inform(
						'Upload Error', 
						'Sorry! Upload failed for an unknown reason', 
						world);					
				}
			});
	}
	
	/*
	$.fileDownload(tStitch.getBaseURL() +"stitchcode/backend/save.py", {
		successCallback: function (html, url) {
			alert("DSD");
		},
		failCallback: function (html, url) {
			alert(
			  'Your file download just failed for this URL:' + url + 
			  '\r\n' + 'Here was the resulting error HTML: \r\n' 
				+ html
			);
		},
	
		httpMethod: "POST",
		data: params
	});		*/
}




/* Sprite */
// modified SpriteMorph turtle functions

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
    tjump = !this.isDown;    
    //alert("jump to: " + tx + "x" + ty);
    tStitch.addPoint(tx,ty,tjump);    
};

SpriteMorph.prototype.clear = function () {
    this.parent.clearPenTrails();
    tStitch.clearPoints();
 	if (tStitch.debug) {
		tStitch.debug_msg("",true);
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


