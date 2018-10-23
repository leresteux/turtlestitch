
/*
    Special characters: (see <http://0xcc.net/jsescape/>)

    Ä, ä   \u00c4, \u00e4
    Ö, ö   \u00d6, \u00f6
    Ü, ü   \u00dc, \u00fc
    ß      \u00df
*/

tempDict = {
	// UI
	'About Snap!...':
		'\u00dcber Snap!...',
	'About TurtleStitch...':
		'\u00dcber TurtleStitch!...',
	'About TurtleStitch':
		' \u00dcber TurtleStitch',
	'Save to Disk':
		'Sichern auf Festplatte',
	'Save to Disk':
		'Sichern auf Festplatte',
	' Stitches : ':
		' Stiche : ',
	'Jumps':
		'Sprungstiche',
	'Jumps : ':
		'Sprungstiche : ',
	'Stitchpoints':
		'Stichpunkte',
	'Grid':
		'Raster',
	'Reset View':
		'Anzeige zur\u00fccksetzen',
	'Zoom to fit':
		'passend zoomen',
	'Size : ':
		'Gr\u00f6\u00dfe : ',
	'clear':
		'l\u00f6schen',
	'Imperial units':
		'Ang/Amerik. Einheiten',
	'Turtle':
		'Schildkr\u00f6te',

	'Login':
		'Anmelden',
	'Create an account':
		'Benutzerkonto anlegen',
	'Reset Password...':
		'Passwort zur\u00fccksetzen',

	'Export as SVG':
		'Exportieren als SVG',
	'Export as PNG':
		'Exportieren als PNG',
	'Export as Melco/EXP':
		'Exportieren als Melco/EXP',
	'Export as Tajima/DST':
		'Exportieren als Tajima/DST',
	'Export current drawing as SVG Vector file':
		'Exportiert die aktuelle Zeichnung als Vektorgrafik im SVG Format',
	'Export current drawing as EXP/Melco Embroidery file':
		'Exportiert die aktuelle Zeichnung als Stickmuster im EXP/Melco Format',
	'Export current drawing as DST/Tajima Embroidery file':
		'Exportiert die aktuelle Zeichnung als Stickmuster im Tajima/DST Format',
	'Export to Embroidery service':
		'Exportieren zum Ausstickservice',
	'Export to stitchcode.com\'s embroidery service':
		'Exportiert die aktuelle Zeichnung zum stitchcode.com Ausstickservice',

	'move %n steps by %n steps':
		'gehe %n Schritte in %n er Schritten',
	'move %n steps in %n':
		'gehe %n Schritte in %n Stichen',
	'go to x: %n y: %n by %n':
		'gehe zu x: %n y: %n in %n er Schritten',
	'go to x: %n y: %n in %n':
		'gehe zu x: %n y: %n in %n Stichen',
  	'point towards x: %n y: %n':
		'zeige nach x: %n y: %n',
	'reset':
        'zur\u00fccksetzen',
		      
	' are too long! (will get clamped)':
		'sind zu lang! (werden geklammert)',
	' is too long! (will get clamped)':
		'Stich ist zu lang! (wird geklammert)',

    'pen size':
        'Stiftdicke',
	'pen down?':
        'Stift unten?',
    'RGB color':
        'RGB Farbe',
    'hex color':
        'hexadezimaler Farbwert',
    'HSV color':
        'HSV Farbe',
    'set pen color to':
        'setze Stiftfarbe auf',
    'set pen color to RGB %n %n %n':
        'setze Stiftfarbe auf RGB %n %n %n',
    'set pen color to HSV %n %n %n':
        'setze Stiftfarbe auf HSV %n %n %n',
    'set pen color to hex %s':
        'setze Stiftfarbe auf hex %s',
    'set pen color by hue %huewheel':
        'setze Stiftfarbton %huewheel',
    'set pen %hsb to %n':
		'setze %hsb auf %n',
    'change pen %hsb by %n':
		'\u00e4ndere %hsb auf %n',
	'pen color: %hsb':
		'Siftfarbe: %hsb',
	'opacity':
		'Deckkraft',
	'set opacity to %n':
		'setze Deckkraft auf %n',
	'change opacity by %n':
		'\u00e4ndere Deckkraft um %n',
    'hue':
        'Farbton',
    'brightness':
        'absolute Helligkeit',
    'change hue by %n':
        '\u00e4ndere Farbton um %n',

    'draw text: %s scale: %n font: %n':
        'Schreibe %s Skalierung: %n Schrift %n',         
};

// Add attributes to original SnapTranslator.dict.de
for (var attrname in tempDict) { SnapTranslator.dict.de[attrname] = tempDict[attrname]; }
