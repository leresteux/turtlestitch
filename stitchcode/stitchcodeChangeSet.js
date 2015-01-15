
// Stitchode's main changes and addtions to snap! go in here
// sorry it lacks proper documentation

// Force flat design
IDE_Morph.prototype.setDefaultDesign = IDE_Morph.prototype.setFlatDesign; 


function debug_msg(st,clear) {
	o = new String();
	if (!clear) {
		o = document.getElementById("bug").innerHTML;
	} else {
		o = "";
	}
	o += st;
	document.getElementById("bug").innerHTML = o;
}

var tStitch = {};
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
		debug_msg(s);
	}
	tStitch.stitches.x.push(x);
	tStitch.stitches.y.push(y);
	tStitch.stitches.jump.push(jump);
}

function getBaseURL() {
    var url = location.href;  // entire url including querystring - also: window.location.href;
    var baseURL = url.substring(0, url.lastIndexOf('/'));
	return baseURL + "/";
}
var baseUrl=getBaseURL()

tStitch.upload = function() {
	debug_msg("uploading points... sending SAVE with num points= " + tStitch.stitches.x.length, true);
	params = { "x[]": tStitch.stitches.x, "y[]":tStitch.stitches.y, "j[]":tStitch.stitches.jump };		
	//log("sending SAVE with num points= " + tStitch.stitches.x.length);		
	$.fileDownload(baseUrl+"stitchcode/backend/save.py", {
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
	});		
}


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
		debug_msg("",true);
	}   
    
};

// add buttons

IDE_Morph.prototype.createControlBar = function () {
    // assumes the logo has already been created
    var padding = 5,
        button,
        stopButton,
        pauseButton,
        startButton,
        projectButton,
        settingsButton,
        stageSizeButton,
        appModeButton,
        cloudButton,
        upstitchButton,
        x,
        colors = [
            this.groupColor,
            this.frameColor.darker(50),
            this.frameColor.darker(50)
        ],
        myself = this;

    if (this.controlBar) {
        this.controlBar.destroy();
    }

    this.controlBar = new Morph();
    this.controlBar.color = this.frameColor;
    this.controlBar.setHeight(this.logo.height()); // height is fixed
    this.controlBar.mouseClickLeft = function () {
        this.world().fillPage();
    };
    this.add(this.controlBar);

    //smallStageButton
    button = new ToggleButtonMorph(
        null, //colors,
        myself, // the IDE is the target
        'toggleStageSize',
        [
            new SymbolMorph('smallStage', 14),
            new SymbolMorph('normalStage', 14)
        ],
        function () {  // query
            return myself.isSmallStage;
        }
    );

    button.corner = 12;
    button.color = colors[0];
    button.highlightColor = colors[1];
    button.pressColor = colors[2];
    button.labelMinExtent = new Point(36, 18);
    button.padding = 0;
    button.labelShadowOffset = new Point(-1, -1);
    button.labelShadowColor = colors[1];
    button.labelColor = this.buttonLabelColor;
    button.contrast = this.buttonContrast;
    button.drawNew();
    // button.hint = 'stage size\nsmall & normal';
    button.fixLayout();
    button.refresh();
    stageSizeButton = button;
    this.controlBar.add(stageSizeButton);
    this.controlBar.stageSizeButton = button; // for refreshing

    //appModeButton
    button = new ToggleButtonMorph(
        null, //colors,
        myself, // the IDE is the target
        'toggleAppMode',
        [
            new SymbolMorph('fullScreen', 14),
            new SymbolMorph('normalScreen', 14)
        ],
        function () {  // query
            return myself.isAppMode;
        }
    );

    button.corner = 12;
    button.color = colors[0];
    button.highlightColor = colors[1];
    button.pressColor = colors[2];
    button.labelMinExtent = new Point(36, 18);
    button.padding = 0;
    button.labelShadowOffset = new Point(-1, -1);
    button.labelShadowColor = colors[1];
    button.labelColor = this.buttonLabelColor;
    button.contrast = this.buttonContrast;
    button.drawNew();
    // button.hint = 'app & edit\nmodes';
    button.fixLayout();
    button.refresh();
    appModeButton = button;
    this.controlBar.add(appModeButton);
    this.controlBar.appModeButton = appModeButton; // for refreshing

    // upload StitchButton
    button = new PushButtonMorph(
        this,
        'uploadStitches',
        new SymbolMorph('arrowUp', 14)
    );
    button.corner = 12;
    button.color = colors[0];
    button.highlightColor = colors[1];
    button.pressColor = colors[2];
    button.labelMinExtent = new Point(36, 18);
    button.padding = 0;
    button.labelShadowOffset = new Point(-1, -1);
    button.labelShadowColor = colors[1];
    button.labelColor =  this.buttonLabelColor;
    button.contrast = this.buttonContrast;
    button.drawNew();
    // button.hint = 'stop\nevery-\nthing';
    button.fixLayout();
    upstitchButton = button;
    this.controlBar.add(upstitchButton);


    // stopButton
    button = new PushButtonMorph(
        this,
        'stopAllScripts',
        new SymbolMorph('octagon', 14)
    );
    button.corner = 12;
    button.color = colors[0];
    button.highlightColor = colors[1];
    button.pressColor = colors[2];
    button.labelMinExtent = new Point(36, 18);
    button.padding = 0;
    button.labelShadowOffset = new Point(-1, -1);
    button.labelShadowColor = colors[1];
    button.labelColor = new Color(200, 0, 0);
    button.contrast = this.buttonContrast;
    button.drawNew();
    // button.hint = 'stop\nevery-\nthing';
    button.fixLayout();
    stopButton = button;
    this.controlBar.add(stopButton);

    //pauseButton
    button = new ToggleButtonMorph(
        null, //colors,
        myself, // the IDE is the target
        'togglePauseResume',
        [
            new SymbolMorph('pause', 12),
            new SymbolMorph('pointRight', 14)
        ],
        function () {  // query
            return myself.isPaused();
        }
    );

    button.corner = 12;
    button.color = colors[0];
    button.highlightColor = colors[1];
    button.pressColor = colors[2];
    button.labelMinExtent = new Point(36, 18);
    button.padding = 0;
    button.labelShadowOffset = new Point(-1, -1);
    button.labelShadowColor = colors[1];
    button.labelColor = new Color(255, 220, 0);
    button.contrast = this.buttonContrast;
    button.drawNew();
    // button.hint = 'pause/resume\nall scripts';
    button.fixLayout();
    button.refresh();
    pauseButton = button;
    this.controlBar.add(pauseButton);
    this.controlBar.pauseButton = pauseButton; // for refreshing

    // startButton
    button = new PushButtonMorph(
        this,
        'pressStart',
        new SymbolMorph('flag', 14)
    );
    button.corner = 12;
    button.color = colors[0];
    button.highlightColor = colors[1];
    button.pressColor = colors[2];
    button.labelMinExtent = new Point(36, 18);
    button.padding = 0;
    button.labelShadowOffset = new Point(-1, -1);
    button.labelShadowColor = colors[1];
    button.labelColor = new Color(0, 200, 0);
    button.contrast = this.buttonContrast;
    button.drawNew();
    // button.hint = 'start green\nflag scripts';
    button.fixLayout();
    startButton = button;
    this.controlBar.add(startButton);
    this.controlBar.startButton = startButton;

    // projectButton
    button = new PushButtonMorph(
        this,
        'projectMenu',
        new SymbolMorph('file', 14)
        //'\u270E'
    );
    button.corner = 12;
    button.color = colors[0];
    button.highlightColor = colors[1];
    button.pressColor = colors[2];
    button.labelMinExtent = new Point(36, 18);
    button.padding = 0;
    button.labelShadowOffset = new Point(-1, -1);
    button.labelShadowColor = colors[1];
    button.labelColor = this.buttonLabelColor;
    button.contrast = this.buttonContrast;
    button.drawNew();
    // button.hint = 'open, save, & annotate project';
    button.fixLayout();
    projectButton = button;
    this.controlBar.add(projectButton);
    this.controlBar.projectButton = projectButton; // for menu positioning

    // settingsButton
    button = new PushButtonMorph(
        this,
        'settingsMenu',
        new SymbolMorph('gears', 14)
        //'\u2699'
    );
    button.corner = 12;
    button.color = colors[0];
    button.highlightColor = colors[1];
    button.pressColor = colors[2];
    button.labelMinExtent = new Point(36, 18);
    button.padding = 0;
    button.labelShadowOffset = new Point(-1, -1);
    button.labelShadowColor = colors[1];
    button.labelColor = this.buttonLabelColor;
    button.contrast = this.buttonContrast;
    button.drawNew();
    // button.hint = 'edit settings';
    button.fixLayout();
    settingsButton = button;
    this.controlBar.add(settingsButton);
    this.controlBar.settingsButton = settingsButton; // for menu positioning

    // cloudButton
    button = new PushButtonMorph(
        this,
        'cloudMenu',
        new SymbolMorph('cloud', 11)
    );
    button.corner = 12;
    button.color = colors[0];
    button.highlightColor = colors[1];
    button.pressColor = colors[2];
    button.labelMinExtent = new Point(36, 18);
    button.padding = 0;
    button.labelShadowOffset = new Point(-1, -1);
    button.labelShadowColor = colors[1];
    button.labelColor = this.buttonLabelColor;
    button.contrast = this.buttonContrast;
    button.drawNew();
    // button.hint = 'cloud operations';
    button.fixLayout();
    cloudButton = button;
    this.controlBar.add(cloudButton);
    this.controlBar.cloudButton = cloudButton; // for menu positioning

    this.controlBar.fixLayout = function () {
        x = this.right() - padding;
        [stopButton, pauseButton, startButton].forEach(
            function (button) {
                button.setCenter(myself.controlBar.center());
                button.setRight(x);
                x -= button.width();
                x -= padding;
            }
        );

        x = Math.min(
            startButton.left() - (3 * padding + 2 * stageSizeButton.width()),
            myself.right() - StageMorph.prototype.dimensions.x *
                (myself.isSmallStage ? myself.stageRatio : 1)
        );
        [stageSizeButton, appModeButton].forEach(
            function (button) {
                x += padding;
                button.setCenter(myself.controlBar.center());
                button.setLeft(x);
                x += button.width();
            }
        );
        
        
		upstitchButton.setCenter(myself.controlBar.center());
        upstitchButton.setRight(stageSizeButton.left() - padding);
        
        settingsButton.setCenter(myself.controlBar.center());
        settingsButton.setLeft(this.left());

        cloudButton.setCenter(myself.controlBar.center());
        cloudButton.setRight(settingsButton.left() - padding);

        projectButton.setCenter(myself.controlBar.center());
        projectButton.setRight(cloudButton.left() - padding);

        this.updateLabel();
    };

    this.controlBar.updateLabel = function () {
        var suffix = myself.world().isDevMode ?
                ' - ' + localize('development mode') : '';

        if (this.label) {
            this.label.destroy();
        }
        if (myself.isAppMode) {
            return;
        }

        this.label = new StringMorph(
            (myself.projectName || localize('untitled')) + suffix,
            14,
            'sans-serif',
            true,
            false,
            false,
            MorphicPreferences.isFlat ? null : new Point(2, 1),
            myself.frameColor.darker(myself.buttonContrast)
        );
        this.label.color = myself.buttonLabelColor;
        this.label.drawNew();
        this.add(this.label);
        this.label.setCenter(this.center());
        this.label.setLeft(this.settingsButton.right() + padding);
    };
};


IDE_Morph.prototype.uploadStitches = function () {
    tStitch.upload();
};

ProjectDialogMorph.prototype.getExamplesProjectList = function () {
    var dir,
        projects = [];

    //dir = this.ide.getURL('http://snap.berkeley.edu/snapsource/Examples/');
    dir = this.ide.getURL(getBaseURL() + '/stitchcode/examples/');
    dir.split('\n').forEach(
        function (line) {
            var startIdx = line.search(new RegExp('href=".*xml"')),
                endIdx,
                name,
                dta;
            if (startIdx > 0) {
                endIdx = line.search(new RegExp('.xml'));
                name = line.substring(startIdx + 6, endIdx);
                dta = {
                    name: name,
                    thumb: null,
                    notes: null
                };
                projects.push(dta);
            }
        }
    );
    projects.sort(function (x, y) {
        return x.name < y.name ? -1 : 1;
    });
    return projects;
};
