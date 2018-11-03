
/*
    Special characters: (see <http://0xcc.net/jsescape/>)

    Ä, ä   \u00c4, \u00e4
    Ö, ö   \u00d6, \u00f6
    Ü, ü   \u00dc, \u00fc
    ß      \u00df
*/

tempDict = {
	// UI stuff
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
	'Ignore colors during export':
		'Ignoriere Farben beim Export',

	// new blocks
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

	// warnings
	' are too long! (will get clamped)':
		'sind zu lang! (werden geklammert)',
	' is too long! (will get clamped)':
		'Stich ist zu lang! (wird geklammert)',

	// pen and color setting
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
    'set color to %clr':
        'setze Farbe auf %clr',
    'set color to RGB %n %n %n':
        'setze Farbe auf RGB %n %n %n',
    'set color to HSV %n %n %n':
        'setze Farbe auf HSV %n %n %n',
    'set color to hex %s':
        'setze Farbe auf hex %s',
    'set color by hue %huewheel':
        'setze Farbton %huewheel',
    'set %hsb to %n':
		'setze %hsb auf %n',
    'change %hsb by %n':
		'\u00e4ndere %hsb auf %n',
	'color: %hsb':
		'Farbe: %hsb',
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

	// new categories
    'Embroidery':
        'Stickerei',
    'Colors':
        'Farben',

	// embroidery stuff
    'running stitch by %n steps':
	'	Laufstich in %n er Schritten',
	'triple run by %n':
			'Dreifach-Laufstich in %n er Schritten',
	'cross stitch in %n by %n center %b':
			'Kreuzstich %n mal %n zentriert %b',
	'zigzag with density %n width %n center %b':
			'Zickzack mit Dichte %n Breite %n zentriert %b',
	'Z-stitch with density %n width %n center %b':
			'Z-Sitch mit Dichte %n Breite %n zentriert %b',
	'satin stitch with width %n center %b':
			'Plattstitch mit Breite %n zentriert %b',
	'tatami stitch width %n interval %n offset %n center %b':
			'Tatami-Stich mit Breite %n Intervall %n Versatz %n zentriert %b',
    'jump stitch %b':
        'Sprungstich %b',
    'tie stitch':
        'Riegelstich',
	'trim':
        'schneiden',
	'stop running':
        'stop Lauf',

    'draw text: %s scale: %n font: %n':
        'Schreibe %s Skalierung: %n Schrift %n',
};

// Add attributes to original SnapTranslator.dict.de
for (var attrname in tempDict) { SnapTranslator.dict.de[attrname] = tempDict[attrname]; }
