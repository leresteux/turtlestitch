
/*
    Special characters: (see <http://0xcc.net/jsescape/>)

    Ä, ä   \u00c4, \u00e4
    Ö, ö   \u00d6, \u00f6
    Ü, ü   \u00dc, \u00fc
    ß      \u00df
*/

tempDict = {
	// UI
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
		'Exportieren als SVG Vektorgrafik',
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
        
	' are too long! (will get clamped)':
		'sind zu lang! (werden geklammert)',
	' is too long! (will get clamped)':
		'Stich ist zu lang! (wird geklammert)',
};

// Add attributes to original SnapTranslator.dict.de
for (var attrname in tempDict) { SnapTranslator.dict.de[attrname] = tempDict[attrname]; }
