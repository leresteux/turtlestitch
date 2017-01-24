/* Sprite */
// modified SpriteMorph turtlestitch functions


SpriteMorph.prototype.origInit = SpriteMorph.prototype.init;
SpriteMorph.prototype.init = function(globals) {
    this.origInit(globals);
    this.hide();
    this.lastJumped = false;
};

SpriteMorph.prototype.addStitch = function(x1, y1, x2, y2) {
    var   stage = this.parentThatIsA(StageMorph),
    lineMaterial = new THREE.LineDashedMaterial(
        { color: 0x00000, dashSize: 4, gapSize: 0, linewidth: 1.3 } );

    startPoint = new THREE.Vector3(x1, y1, 0);
    endPoint = new THREE.Vector3(x2,y2, 0);


    startPoint = new THREE.Vector3(x1, y1, 0);
    endPoint = new THREE.Vector3(x2,y2, 0);

    if (this.stitchLines === null) {
        this.stitchLines = new THREE.Group();
    }

    stitchLine = {};
    stitchLine.points = [startPoint];
    stitchLine.points.push(endPoint);
    stitchLine.geometry = new THREE.Geometry();
    stitchLine.geometry.vertices = stitchLine.points;
    stitchLine.geometry.verticesNeedUpdate = true;
    stitchLine.line = new THREE.Line(stitchLine.geometry, lineMaterial);

    //stage.myObjects.remove(this.stitchLines);
    //this.stitchLines.add( stitchLine.line );
    stage.myStitchLines.add(stitchLine.line);

    this.lastJumped = false;
    stage.reRender();
};

SpriteMorph.prototype.addJumpLine = function(x1, y1, x2, y2) {
    var   stage = this.parentThatIsA(StageMorph),
        lineMaterial = new THREE.LineDashedMaterial(
            { color: 0xff0000, dashSize: 4, gapSize: 4, linewidth: .8 } );

    startPoint = new THREE.Vector3(x1, y1, 0);
    endPoint = new THREE.Vector3(x2,y2, 0);

    if (this.jumpLines === null) {
        this.jumpLines = new THREE.Group();
    }

    jumpLine = {};
    jumpLine.points = [startPoint];
    jumpLine.points.push(endPoint);
    jumpLine.geometry = new THREE.Geometry();
    jumpLine.geometry.vertices = jumpLine.points;
    jumpLine.geometry.verticesNeedUpdate = true;
    jumpLine.line = new THREE.Line(jumpLine.geometry, lineMaterial);

    stage.myJumpLines.add(jumpLine.line);

    this.lastJumped = true;
    stage.reRender();
};

SpriteMorph.prototype.addStitchPoint = function(x1, y1) {
    var   stage = this.parentThatIsA(StageMorph);

    var geometry = new THREE.CircleGeometry( 1.5, 4 );
    geometry.vertices.shift();
    var material = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
    var circle = new THREE.Mesh( geometry, material );
    circle.translateX(x1);
    circle.translateY(y1);

    stage.myStitchPoints.add(circle);

    stage.reRender();
};


SpriteMorph.prototype.origForward = SpriteMorph.prototype.forward;
SpriteMorph.prototype.forward = function (steps) {
    var dest,
        dist = steps * this.parent.scale || 0;

    oldx = this.xPosition();
    oldy = this.yPosition();
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


    this.parentThatIsA(StageMorph).turtleShepherd.moveTo(
        oldx, oldy,
        this.xPosition(), this.yPosition(),
        this.isDown );

    if (this.isDown)
        this.addStitch(oldx, oldy, this.xPosition(), this.yPosition());
    else {
        this.addJumpLine(oldx, oldy, this.xPosition(), this.yPosition());
    }
    this.addStitchPoint(this.xPosition(), this.yPosition());

    //this.changed();
};

SpriteMorph.prototype.origGotoXY = SpriteMorph.prototype.gotoXY;
SpriteMorph.prototype.gotoXY = function (x, y, justMe) {
    oldx = this.xPosition();
    oldy = this.yPosition();
    this.origGotoXY(x, y, justMe);
    if ( Math.abs(this.xPosition()-oldx)<=1 && Math.abs(this.yPosition()-oldy)<=1 ) {
		// jump in place - don't add
    } else {
        this.parentThatIsA(StageMorph).turtleShepherd.moveTo(
            oldx, oldy,
            this.xPosition(), this.yPosition(),
            this.isDown );

            if (this.isDown)
                this.addStitch(oldx, oldy, this.xPosition(), this.yPosition());
            else {
                this.addJumpLine(oldx, oldy, this.xPosition(), this.yPosition());
            }
            this.addStitchPoint(this.xPosition(), this.yPosition());
        //this.changed();
	}
};

SpriteMorph.prototype.drawLine = function (start, dest) {};

SpriteMorph.prototype.origSilentGotoXY = SpriteMorph.prototype.silentGotoXY;
SpriteMorph.prototype.silentGotoXY = function (x, y, justMe) {
    this.origSilentGotoXY(x,y,justMe);
};

SpriteMorph.prototype.origClear = SpriteMorph.prototype.clear;
SpriteMorph.prototype.clear = function () {
    this.origClear();
    this.parentThatIsA(StageMorph).clearAll();
    this.parentThatIsA(StageMorph).turtleShepherd.clear();
    this.parentThatIsA(StageMorph).renderer.changed = true  ;
};

SpriteMorph.prototype.reRender = function () {

    //this.hide();
    this.changed();
};

// Single Sprite mode

SpriteMorph.prototype.origDrawNew = SpriteMorph.prototype.drawNew;
SpriteMorph.prototype.drawNew = function () {
    this.origDrawNew();
};

//SpriteMorph.prototype.thumbnail = function (extentPoint) {};
//SpriteMorph.prototype.drawNew = function () { this.hide() }

// THREE additions

THREE.Object3D.prototype.addLineToPointWithColor = function (point, color, thickness) {
    return this.addLineFromPointToPointWithColor(new THREE.Vector3(), point, color, thickness)
};

THREE.Object3D.prototype.addLineFromPointToPointWithColor = function (originPoint, destinationPoint, color, thickness) {
    geometry = new THREE.Geometry();
    geometry.vertices.push(originPoint);
    geometry.vertices.push(destinationPoint);
    var lineMaterial = new THREE.LineBasicMaterial({ color: color, linewidth: (thickness ? thickness : 1) });
    var line = new THREE.Line(geometry, lineMaterial);
    this.add(line);
    return line;
};


// ########################################################################
/* STAGE */
// ########################################################################



// StageMorph

StageMorph.prototype.originalDestroy = StageMorph.prototype.destroy;
StageMorph.prototype.destroy = function () {
    var myself = this;
    this.clearAll();
    this.children.forEach(function (eachSprite) {
        myself.removeChild(eachSprite);
    });
    this.originalDestroy();
};

StageMorph.prototype.originalInit = StageMorph.prototype.init;
StageMorph.prototype.init = function (globals) {
    var myself = this;

    this.originalInit(globals);
    this.initScene();
    this.initRenderer();
    this.initCamera();
    this.initLights();
    this.turtleShepherd = new TurtleShepherd();

    this.scene.grid.draw();

    this.myObjects = new THREE.Object3D();
    this.myStitchPoints = new THREE.Object3D();
    this.myStitchLines = new THREE.Object3D();
    this.myJumpLines = new THREE.Object3D();
    this.scene.add(this.myObjects);
    this.scene.add(this.myStitchPoints);
    this.scene.add(this.myStitchLines);
    this.scene.add(this.myJumpLines);

    //this.trailsCanvas = this.renderer.domElement;
};

StageMorph.prototype.initScene = function () {
    var myself = this;
    this.scene = new THREE.Scene();
    this.scene.grid = {};
    this.scene.grid.defaultColor = 0xe0e0e0;
    this.scene.grid.visible = true;
    this.scene.grid.interval = new Point(50, 50);

    // Grid
    this.scene.grid.draw = function () {

        //var color = this.lines ? this.lines[0].material.color : this.defaultColor;
        var color = 0xf0f0f0;
        var color2 = 0xd0d0d0;

        if (this.lines) {
            this.lines.forEach(function (eachLine){
                myself.scene.remove(eachLine);
            });
        }

        this.lines = [];

        limit = this.interval.x * 20
        for (x = -limit / this.interval.x; x <= limit / this.interval.x; x++) {
            p1 = new THREE.Vector3(x * this.interval.x, -limit, 0);
            p2 = new THREE.Vector3(x * this.interval.x, limit, 0);
            l = myself.scene.addLineFromPointToPointWithColor(p1, p2, color);
            l.visible = this.visible;
            this.lines.push(l);
        }

        for (y = -limit / this.interval.y; y <= limit / this.interval.y; y++) {
            p1 = new THREE.Vector3(-limit, y * this.interval.y, 0);
            p2 = new THREE.Vector3(limit, y * this.interval.y, 0);
            l = myself.scene.addLineFromPointToPointWithColor(p1, p2, color);
            l.visible = this.visible;
            this.lines.push(l);
        }

        for (x = -limit/10 / this.interval.x; x <= limit/10 / this.interval.x *1; x++) {
            p1 = new THREE.Vector3(x * this.interval.x * 10, -limit,0);
            p2 = new THREE.Vector3(x * this.interval.x* 10, limit,0);
            l = myself.scene.addLineFromPointToPointWithColor(p1, p2, color2);
            l.visible = this.visible;
            this.lines.push(l);
        }

        for (y = -limit/10 / this.interval.y; y <= limit/10 / this.interval.y; y++) {
            p1 = new THREE.Vector3(-limit, y * this.interval.y* 10, 0);
            p2 = new THREE.Vector3(limit, y * this.interval.y* 10, 0);
            l = myself.scene.addLineFromPointToPointWithColor(p1, p2, color2);
            l.visible = this.visible;
            this.lines.push(l);
        }

        myself.reRender();
    };

    this.scene.grid.setInterval = function (aPoint) {
        this.interval = aPoint;
        this.draw();
    };

    this.scene.grid.setColor = function (color) {
        this.lines.forEach(function (eachLine) {
            eachLine.material.color.setHex(color);
        });
    };

    this.scene.grid.toggle = function () {
        var myInnerSelf = this;
        this.visible = !this.visible;
        this.lines.forEach(function (line){ line.visible = myInnerSelf.visible });
        myself.reRender();
    };

};

StageMorph.prototype.clearAll = function () {
    for (var i = this.myObjects.children.length - 1; i >= 0; i--) {
        this.myObjects.remove(this.myObjects.children[i]);
    }
    for (i = this.myStitchPoints.children.length - 1; i >= 0; i--) {
        this.myStitchPoints.remove(this.myStitchPoints.children[i]);
    }
    for (i = this.myStitchLines.children.length - 1; i >= 0; i--) {
        this.myStitchLines.remove(this.myStitchLines.children[i]);
    }
    for (i = this.myJumpLines.children.length - 1; i >= 0; i--) {
        this.myJumpLines.remove(this.myJumpLines.children[i]);
    }

    this.renderer.clear();
};

StageMorph.prototype.initRenderer = function () {
    var myself = this;

    this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        canvas: this.penTrails()
    });
    this.renderer.setClearColor(0xffffff, 1);

    if (localStorage) {
        // ide is not set yet, we're accessing its prototype to circumvent this
        this.renderer.setClearColor(IDE_Morph.prototype.getSetting('bgcolor'), 1);
    }

    this.renderer.changed = false;
    this.renderer.isWireframeMode = false;
    this.renderer.showingAxes = true;
    this.renderer.isParallelProjection = true;

    this.renderer.toggleWireframe = function () {
        var myInnerSelf = this;
        this.isWireframeMode = !this.isWireframeMode;
        myself.myObjects.children.forEach(function (eachObject) {
            eachObject.material.wireframe = myInnerSelf.isWireframeMode;
        });
        myself.reRender();
    }

    this.renderer.toggleAxes = function () {
        var myInnerSelf = this;
        this.showingAxes = !this.showingAxes;

        myself.scene.labels.forEach(function (label){ label.visible = myInnerSelf.showingAxes });
        myself.scene.axes.forEach(function (line){ line.visible = myInnerSelf.showingAxes });
        myself.children.forEach(function (morph) {
            if (morph instanceof SpriteMorph) {
                morph.beetle.axes.forEach(function (line){ line.visible = myInnerSelf.showingAxes });
            }
        })
        myself.reRender();
    }

    this.renderer.toggleParallelProjection = function () {
        this.isParallelProjection = !this.isParallelProjection;
        myself.initCamera();
    }
};


StageMorph.prototype.render = function () {
    //this.pointLight.position.copy(this.camera.position); // lights move with the camera
    //this.directionalLight.position.copy(this.camera.position);
    this.renderer.render(this.scene, this.camera);
};

StageMorph.prototype.renderCycle = function () {
    if (this.renderer.changed) {
        this.render();
        this.changed();
        this.parentThatIsA(IDE_Morph).statusDisplay.refresh();
        this.renderer.changed = false;
    }
};

StageMorph.prototype.reRender = function () {
    this.renderer.changed = true;
};

StageMorph.prototype.initCamera = function () {
    var myself = this,
        threeLayer;

    if (this.scene.camera) { this.scene.remove(this.camera) };

    var createCamera = function () {
        threeLayer = document.createElement('div');

        if (myself.renderer.isParallelProjection) {
            var zoom = myself.camera ? myself.camera.zoomFactor : 82,
                width = Math.max(myself.width(), 480),
                height = Math.max(myself.height(), 360);

            myself.camera = new THREE.OrthographicCamera(
                    width / - zoom,
                    width / zoom,
                    height / zoom,
                    height / - zoom,
                    0.1,
                    10000);
        } else {
            myself.camera = new THREE.PerspectiveCamera(60, 480/360);
        }

        // We need to implement zooming ourselves for parallel projection

        myself.camera.zoomIn = function () {
            this.zoomFactor /= 1.1;
            this.applyZoom();
        }
        myself.camera.zoomOut = function () {
            this.zoomFactor *= 1.1;
            this.applyZoom();
        }

        myself.camera.applyZoom = function () {
            var zoom = myself.camera ? myself.camera.zoomFactor : 82,
                width = Math.max(myself.width(), 480),
                height = Math.max(myself.height(), 360);
            this.left = width / - zoom;
            this.right = width / zoom;
            this.top = height / zoom;
            this.bottom = height / - zoom;
            this.updateProjectionMatrix();
        }

        myself.camera.reset = function () {

            myself.controls = new THREE.OrbitControls(this, threeLayer);
            myself.controls.addEventListener('change', function (event) { myself.render });

            if (myself.renderer.isParallelProjection) {
                this.zoomFactor = 2;
                this.applyZoom();
                this.position.set(0,0,10);
                //myself.controls.rotateLeft(radians(90));
            } else {
                this.position.set(0,0,10);
            }

            myself.controls.update();
            myself.reRender();
        }

        myself.camera.fitScene = function () {

            var boundingBox = new THREE.Box3().setFromObject(myself.myObjects),
                boundingSphere = boundingBox.getBoundingSphere(),
                center = boundingSphere.center,
                distance = boundingSphere.radius;

            this.reset();

            this.position.set(center.x, center.y, center.z);
            this.translateZ(distance * 1.2);

            myself.controls.center.set(center.x, center.y, center.z);
            myself.controls.dollyOut(1.2);
            myself.controls.update();
            myself.reRender();
        }
    }

    createCamera();
    this.scene.add(this.camera);
    this.camera.reset();
};

StageMorph.prototype.initLights = function () {
    this.directionalLight = new THREE.DirectionalLight(0x4c4c4c, 1);
    this.directionalLight.position.set(this.camera.position);
    this.scene.add(this.directionalLight);

    this.pointLight = new THREE.PointLight(0xffffff, 1, 2000);
    this.pointLight.position.set(this.camera.position);
    this.scene.add(this.pointLight);
};

StageMorph.prototype.originalStep = StageMorph.prototype.step;
StageMorph.prototype.step = function () {
    this.originalStep();

    // update Beetleblocks, if needed
    this.renderCycle();
};

StageMorph.prototype.referencePos = null;

StageMorph.prototype.mouseScroll = function (y, x) {
    if (this.renderer.isParallelProjection) {
        if (y > 0) {
            this.camera.zoomOut();
        } else if (y < 0) {
            this.camera.zoomIn();
        }
    } else {
        if (y > 0) {
            this.controls.dollyOut();
        } else if (y < 0) {
            this.controls.dollyIn();
        }
        this.controls.update();
    }
    this.renderer.changed = true;
};

StageMorph.prototype.mouseDownLeft = function (pos) {
    this.referencePos = pos;
};

StageMorph.prototype.mouseDownRight = function (pos) {
    this.referencePos = pos;
};

StageMorph.prototype.mouseMove = function (pos, button) {

    if (this.referencePos === null) { return };

    var factor = this.renderer.isParallelProjection ? 65 / this.camera.zoomFactor : this.controls.object.position.length() / 10,
        deltaX = (pos.x - this.referencePos.x),
        deltaY = (pos.y - this.referencePos.y);

    this.referencePos = pos;

    if (button === 'right' || this.world().currentKey === 16 || button === 'left') { // shiftClicked
        this.controls.panLeft(deltaX / this.dimensions.x / this.scale * 15 * factor);
        this.controls.panUp(deltaY / this.dimensions.y / this.scale * 10 * factor);
    } else {
        var horzAngle = deltaX / (this.dimensions.x * this.scale) * 360;
        var vertAngle = deltaY / (this.dimensions.y * this.scale) * 360;
        this.controls.rotateLeft(radians(horzAngle));
        this.controls.rotateUp(radians(vertAngle));
    }

    this.controls.update();
    this.reRender();
};

StageMorph.prototype.mouseLeave = function () {
    this.referencePos = null;
};

StageMorph.prototype.originalAdd = StageMorph.prototype.add;
StageMorph.prototype.add = function (morph) {
    this.originalAdd(morph);
    if (morph instanceof SpriteMorph) {
        this.scene.add(morph.beetle);
        this.reRender();
    }
};

// We'll never need to clear the pen trails in BeetleBlocks, it only causes the renderer to disappear
StageMorph.prototype.clearPenTrails = nop;

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
    /*
    if (this.scale < 1) {
        return this.originalDrawOn(aCanvas, aRect);
    }*/

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
        // we only draw pen trails!
        context.save();
        context.clearRect(
            area.left(),
            area.top() ,
            w,
            h);
        try {
            context.drawImage(
                this.penTrails(),
                sl,
                st,
                w,
                h,
                area.left(),
                area.top(),
                w,
                h
            );
        } catch (err) { // sometimes triggered only by Firefox
            console.log(err);
        }
        context.restore();
    }
};

StageMorph.prototype.originalSetScale = StageMorph.prototype.setScale;
StageMorph.prototype.setScale = function (number) {
    this.scaleChanged = true;
    this.originalSetScale(number);
    this.camera.aspect = this.extent().x / this.extent().y;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.extent().x, this.extent().y);
    this.renderer.changed = true;
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
