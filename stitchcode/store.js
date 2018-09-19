SnapSerializer.prototype.app = 'TurtleStitch 2.0, http://www.turtlestitch.org';
SnapSerializer.prototype.thumbnailSize = new Point(480, 360);

SnapSerializer.prototype.openProject = function (project, ide) {
	console.log("adsf")
    var stage = ide.stage,
        sprites = [],
        sprite;
    if (!project || !project.stage) {
        return;
    }
    ide.projectName = project.name;
    ide.projectNotes = project.notes || '';
    ide.origName = project.origName || '';
    ide.origCreator = project.origCreator || '';
    ide.creator = project.creator || '';
    ide.remixHistory = project.remixHistorycreat || '';

    console.log("name: " + ide.projectName + ", creator: " + ide.creator + ", origName: " + ide.origName + ", origCreator: " + ide.origCreator);
    
    if (ide.globalVariables) {
        ide.globalVariables = project.globalVariables;
    }
    if (stage) {
        stage.destroy();
    }
    ide.add(project.stage);
    ide.stage = project.stage;
    sprites = ide.stage.children.filter(function (child) {
        return child instanceof SpriteMorph;
    });
    sprites.sort(function (x, y) {
        return x.idx - y.idx;
    });

    ide.sprites = new List(sprites);
    sprite = sprites[0] || project.stage;

    if (sizeOf(this.mediaDict) > 0) {
        ide.hasChangedMedia = false;
        this.mediaDict = {};
    } else {
        ide.hasChangedMedia = true;
    }
    project.stage.drawNew();
    ide.createCorral();
    ide.selectSprite(sprite);
    ide.fixLayout();

    // force watchers to update
    //project.stage.watchers().forEach(function (watcher) {
    //  watcher.onNextStep = function () {this.currentValue = null;};
    //})

    ide.world().keyboardReceiver = project.stage;
    ide.stage.initCamera();
};



StageMorph.prototype.toXML = function (serializer) {
    var thumbnail = normalizeCanvas(
            this.thumbnail(SnapSerializer.prototype.thumbnailSize),
            true
        ),
        thumbdata,
        ide = this.parentThatIsA(IDE_Morph);

    // catch cross-origin tainting exception when using SVG costumes
    try {
        thumbdata = thumbnail.toDataURL('image/png');
    } catch (error) {
        thumbdata = null;
    }

    function code(key) {
        var str = '';
        Object.keys(StageMorph.prototype[key]).forEach(
            function (selector) {
                str += (
                    '<' + selector + '>' +
                        XML_Element.prototype.escape(
                            StageMorph.prototype[key][selector]
                        ) +
                        '</' + selector + '>'
                );
            }
        );
        return str;
    }

    this.removeAllClones();
    return serializer.format(
        '<project name="@" app="@" version="@">\n' +
            '<notes>$</notes>\n' +
            '<creator>$</creator>\n' +
            '<origCreator>$</origCreator>\n' +
            '<origName>$</origName>\n' +
            '<remixHistory>$</remixHistory>\n' +
            '<thumbnail>$</thumbnail>\n' +
            '<stage name="@" width="@" height="@" ' +
            'costume="@" tempo="@" threadsafe="@" ' +
            '%' +
            'lines="@" ' +
            'ternary="@" ' +
            'codify="@" ' +
            'inheritance="@" ' +
            'sublistIDs="@" ' +
            'scheduled="@" ~>' +
            '<pentrails>$</pentrails>' +
            '<costumes>%</costumes>' +
            '<sounds>%</sounds>' +
            '<variables>%</variables>' +
            '<blocks>%</blocks>' +
            '<scripts>%</scripts><sprites>%</sprites>' +
            '</stage>\n' +
            '<hidden>$</hidden>' +
            '<headers>%</headers>' +
            '<code>%</code>' +
            '<blocks>%</blocks>' +
            '<variables>%</variables>\n' +
            '</project>',
        (ide && ide.projectName) ? ide.projectName : localize('Untitled'),  
        serializer.app,
        serializer.version,
        (ide && ide.projectNotes) ? ide.projectNotes : '',
        (ide && ide.creator) ? ide.creator : '',
        (ide && ide.origCreator) ? ide.origCreator : '',
        (ide && ide.origName) ? ide.origName : '',
        (ide && ide.remixHistory) ? ide.remixHistory : '',
        thumbdata,
        this.name,
        StageMorph.prototype.dimensions.x,
        StageMorph.prototype.dimensions.y,
        this.getCostumeIdx(),
        this.getTempo(),
        this.isThreadSafe,
        this.instrument ?
                ' instrument="' + parseInt(this.instrument) + '" ' : '',
        SpriteMorph.prototype.useFlatLineEnds ? 'flat' : 'round',
        BooleanSlotMorph.prototype.isTernary,
        this.enableCodeMapping,
        this.enableInheritance,
        this.enableSublistIDs,
        StageMorph.prototype.frameRate !== 0,
        normalizeCanvas(this.trailsCanvas, true).toDataURL('image/png'),
        serializer.store(this.costumes, this.name + '_cst'),
        serializer.store(this.sounds, this.name + '_snd'),
        serializer.store(this.variables),
        serializer.store(this.customBlocks),
        serializer.store(this.scripts),
        serializer.store(this.children),
        Object.keys(StageMorph.prototype.hiddenPrimitives).reduce(
                function (a, b) {return a + ' ' + b; },
                ''
            ),
        code('codeHeaders'),
        code('codeMappings'),
        serializer.store(this.globalBlocks),
        (ide && ide.globalVariables) ?
                    serializer.store(ide.globalVariables) : ''
    );
};
