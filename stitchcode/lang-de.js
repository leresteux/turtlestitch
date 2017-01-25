
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
		'Auf Festplatte sichern',
	'Total Stitches : ':
		'Anzahl der Stiche : ',
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
    'Dimensions : ':
		'Gr\u00f6\u00dfe : ',
	'clear':
		'l\u00f6schen',
	'Export as SVG':
		'Zeichnung als SVG exportieren',
	'Export as EXP':
		'Zeichnung als EXP exportieren',
	'Export current drawing as SVG Vector file':
		'Exportiert die aktuelle Zeichnung als Vektorgrafik im SVG Format',
	'Export current drawing as EXP Embroidery file':
		'Exportiert die aktuelle Zeichnung als Stickmuster im EXP Format',
};

// Add attributes to original SnapTranslator.dict.de
for (var attrname in tempDict) { SnapTranslator.dict.de[attrname] = tempDict[attrname]; }
