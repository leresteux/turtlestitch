
/* traduction 
v0.2-26/09/2024 
V0.1-16/07/2024
julien leresteux-leresteux.net
*/ 
tempDict = {

  // UI strings
  'About Snap!...':
    'A propos de Snap!...',
  'About TurtleStitch...':
    'A propos de TurtleStitch!...',
  'About TurtleStitch':
    ' A propos de TurtleStitch',
  ' Stitches : ':
    ' Points : ',
  'Jumps':
    'Sauts',
  'Jumps : ':
    'Sauts : ',
  'Stitchpoints':
    'Points de broderie',
  'Grid':
    'Grille',
  'Reset View':
    'Réinitialiser l affichage',
  'Zoom to fit' :
    'Zoomer pour ajuster',
  'zoom to fit' :
    'zoom pour ajuster',
  'Size : ':
    'Taille : ',
  'Imperial units':
    'Unités impériales',
  'Turtle':
    'Tortue',
  'Login':
    'Connexion',
  'Create an account':
    'Créer un compte',
  'Reset Password...':
    'Réinitialiser le mot de passe...',
  'Export as SVG':
    'Exporter en SVG',
    'Export as DXF': //new
    'Exporter en DXF',
  'Export as PNG':
    'Exporter en PNG',
  'Export as Melco/EXP':
    'Exporter en Melco/EXP',
  'Export as Tajima/DST':
    'Exporter en Tajima/DST',
  'Export current drawing as SVG Vector file':
    'Exporter le dessin actuel en tant que fichier vectoriel SVG',
  'Export current drawing as EXP/Melco Embroidery file':
    'Exporter le dessin actuel au format EXP/Melco',
  'Export current drawing as DST/Tajima Embroidery file':
    'Exporter le dessin actuel au format Tajima/DST',
  'Export to Embroidery service':
     'Exporter vers le service de broderie',
  'Export to stitchcode.com\'s embroidery service':
    'Exporter le dessin actuel vers le service de broderie de stitchcode.com',
  'Ignore colors during export':
    'Ignorer les couleurs lors de l exportation',
  'X-Ray':
    'Rayons X',

  // settings
  'Units..':
     'Unités de mesure...',
  'Display dimension in Inch':
       'Afficher les dimensions en pouces',
  'Hide grid':
    'Cacher la grille',
  'Hide turtle':
    'Cacher la tortue ',
'Hide jump stitches' :
    'Ne pas afficher les points de saut',
  'Hide stitch points' :
    'Ne pas afficher les points de couture',
  'Ignore embroidery warnings':
    'Ignorer les avertissements de broderie',
       'uncheck to show embroidery specific warnings' :
    'Désactiver pour afficher les avertissements relatifs à la broderie',
  'check to ignore embroidery specific warnings' :
    'Activer pour ignorer les avertissements relatifs à la broderie',
  'uncheck to show grid' :
    'Désactiver pour afficher la grille',
  'check to hide grid' :
    'Allumer pour cacher la grille',
  'uncheck to show jump stitches' :
    'Désactiver pour afficher les points de saut',
  'check to hide jump stitches' :
    'Allumer pour cacher les points de saut',
  'uncheck to show stitch points' :
    'désactiver pour afficher les points de broderie',
  'check to hide stitch points' :
    'Allumer pour cacher les points de broderie',
  'uncheck to show turtle' :
    'Désactiver pour afficher les tortues',
  'check to hide turtle' :
    'Allumer pour cacher les tortues',
  'uncheck to display dimensions in millmeters' :
    'Désactiver pour afficher les dimensions en millimètres',
  'check to show dimensions in inch' :
    'Activer pour afficher les dimensions en pouces',
  'Default background color' :
    'Couleur de fond',
  'Default pen color' :
    'Couleur de stylo par défaut',
  'Default background color...' :
    'Couleur de fond par défaut...',
  'Default pen color...' :
    'Couleur du stylo par défaut...',
  'Load a camera snapshot...' :
    'Prendre une photo avec la caméra...',
  'Clear background image' :
    'Effacer l image d arrière-plan',
  'Import Image' :
    'Importer une image',
      
  'Import Image as Background or as data table into a variable ?':
    'Importer l image comme arrière-plan ou comme tableau de données dans une variable ?',
  'As background' :
    'En tant qu arrière-plan',
  'As data' :
    'Comme données',
    
  // legacy blocks
  'clear' :
    'Effacer',
  'move %n steps by %n steps' :
    'passer de %n pas en %n pas',
  'move %n steps in %n' :
    'faire %n pas en %n points',
  'go to x : %n y : %n par %n' :
    'aller à x : %n y : %n en %n en pas',
  'go to x : %n y : %n en %n' :
    'aller à x : %n y : %n en %n points',

  

  // nouveaux blocs
  'point towards x : %n y : %n' :
    'pointer vers x : %n y : %n',
  'reset' :
    'réinitialiser',

  // avertissements
  ' are too long! (will get clamped)':
    'sont trop longs ! (risque d emmêlement)',
  ' is too long ! (will get clamped)' :
    'est trop long ! (risque d emmêlement)',

  // réglage du stylo et de la couleur
 'pen size':
    'épaisseur du stylo',
  'pen down?':
    'le stylo dessine ?',
  
  'RGB color':
     'couleur RGB',
   'hex color':
     'valeur hexadécimale de la couleur',
   'HSV color':
     'couleur HSV',
      
   'set color to %clr':
     'définir la couleur %clr',
  'set color to RGB %n %n %n' :
    'définir la couleur RGB %n %n %n',
  'set color to HSV %n %n %n' :
    'définir la couleur HSV %n %n %n',
    
  'set color to hex %s' :
    'définir la couleur hex %s',
  'set color by hue %huewheel' :
    'définir la teinte %huewheel',
  'set %hsb to %n':
    'mettre %hsb par %n',
   
  'change %hsb by %n' :
    'change %hsb par %n',
  'color: %hsb' :
    'couleur: %hsb',
  'opacity' :
    'opacité',
  'set opacity to %n' :
  'mettre l opacité à %n',
  'change opacity by %n' :
    'change l opacité par %n',
  'hue' :
    'teinte',
  'brightness' :
    'luminosité',
  'change hue by %n' :
    'change la teinte par %n',
  'arc $turnRight radius: %n degrees: %n ' :
     'arc de cercle $turnRight de rayon: %n angle: %n ',
  'arc $turnLeft radius: %n degrees: %n ' :
     'arc $turnLeft avec rayon: %n angle: %n ',
  
  // catégories turtlestitch
  'Embroidery' :
    'Broderie',
  'Colors' :
    'Couleurs',
  //categorie "by_square"
  'By_square' :
    'Par case',

  // embroidery blocks and stuff
  'running stitch by %n steps' :
    'point droit en %n étapes',
  'triple run by %n' :
    'point droit triple en %n étapes',
  'cross stitch in %n by %n center %b' :
    'point de croix de %n sur %n centré %b',
  'zigzag with density %n width %n center %b':
    'zigzag avec densité de %n et largeur de %n centré %b',
  'Z-stitch with density %n width %n center %b' :
    'point-Z avec densité de %n et largeur de %n centré %b',
  'satin stitch with width %n center %b' :
    'point de satin avec largeur de %n centré %b',
  'tatami stitch width %n interval %n center %b' :
    'point tatami avec largeur de %n et intervalle de %n centré %b',
  'jump stitch %b' :
    'se déplace sans broder %b',
  'tie stitch' :
    'faire un nœud',
  'trim' :
    'couper',
  'stop running' :
    'stoppe la broderie',
  'draw text %s with size %n' :
    'écrire le texte %s en taille %n',
  'text length of %s with size %n':
    'longueur de texte %s avec taille %n',
  'rendering X-RAY ...' :
    'calculer l image en rayons-X ...',
  'turn off X-RAY ...' :
    'quitter l affichage de l image en rayons-X ...',
} ;

// Ajouter des attributs à l'original SnapTranslator.dict.fr
for (var attrname in tempDict) { SnapTranslator.dict.fr[attrname] = tempDict[attrname] ; }


