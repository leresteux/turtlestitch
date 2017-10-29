
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

	'move %n steps by %n steps':
		'gehe %n Schritte in %n er Schritten',
	'move %n steps in %n':
		'gehe %n Schritte in %n Stichen',

    'Upload and Order!':
		'Bestellen',
		
};

// Add attributes to original SnapTranslator.dict.de
for (var attrname in tempDict) { SnapTranslator.dict.de[attrname] = tempDict[attrname]; }
