
tempDict = {
	// UI
	'Save to Disk':
		'Opslaan',
	' Stitches : ':
		' Steken : ',
	'Jumps':
		'Springsteken',
	'Jumps : ':
		'Springsteken : ',
	'Stitchpoints':
		'Borduurpunten',
	'Grid':
		'Raster',
	'Reset View':
		'Weergave wissen',
	'Size : ':
		'Grootte : ',
	'clear':
		'wis',
	'Imperial units':
		'Brits-Amerikaanse eenheden',
	'Turtle':
		'Schildpad',
	'Login':
		'Log in',
	'Create an account':
		'Account aanmaken',
	'Reset Password...':
		'Wachtwoord opnieuw instellen',
	'Export as SVG':
		'Exporteren als SVG vectorafbeelding',
	'Export as Melco/EXP':
		'Exporteren als Melco/EXP',
	'Export as Tajima/DST':
		'Exporteren als Tajima/DST',
	'Export current drawing as SVG Vector file':
		'Exporteer huidige afbeelding als SVG vectorafbeelding',
	'Export current drawing as EXP/Melco Embroidery file':
		'Exporteer huidige afbeelding als borduurbestand in EXP/Melco format',
	'Export current drawing as DST/Tajima Embroidery file':
		'Exporteer huidige afbeelding als borduurbestand in Tajima/DST format',
	'Export to Embroidery service':
		'Exporteren naar borduurservice',
	'Export to stitchcode.com\'s embroidery service':
		'Exporteer huidige afbeelding naar borduurservice stitchcode.com',

	'move %n steps by %n steps':
		'neem %n stappen in steken van %n',
	'move %n steps in %n':
		'neem %n stappen in %n steken',

	' are too long! (will get clamped)':
		'zijn te lang! (worden geklemd)',
	' is too long! (will get clamped)':
		'Steken zijn te lang! (worden geklemd)',
};

// Add attributes to original SnapTranslator.dict.nl
for (var attrname in tempDict) { SnapTranslator.dict.nl[attrname] = tempDict[attrname]; }
