
/*
    Special characters: (see <http://0xcc.net/jsescape/>)

    Ä, ä   \u00c4, \u00e4
    Ö, ö   \u00d6, \u00f6
    Ü, ü   \u00dc, \u00fc
    ß      \u00df
*/

tempDict = {

  // UI strings
  'About Snap!...':
    'Sobre Snap!...',
  'About TurtleStitch...':
    'Sobre TurtleStitch!...',
  'About TurtleStitch':
    'Sobre TurtleStitch',
  ' Stitches : ':
    ' Puntadas : ',
  'Jumps':
    'Saltos',
  'Jumps : ':
    'Saltos : ',
  'Stitchpoints':
    'Puntos',
  'Grid':
    'Cuadrícula',
  'Reset View':
    'Reinicar la vista',
  'Zoom to fit':
    'Zoom para adaptarse',
  'zoom to fit':
    'zoom para adaptarse',
  'Size : ':
    'Tamaño : ',
  'Imperial units':
    'Unitades inglesas',
  'Turtle':
    'Tortuga',
  'Login':
    'Iniciar sesión',
  'Create an account':
    'Registrarse',
  'Reset Password...':
    'Recuperar la contraseña...',
  'Export as SVG':
    'Exportar a SVG',
  'Export as PNG':
    'Exportar a PNG',
  'Export as Melco/EXP':
    'Exportar a Melco/EXP',
  'Export as Tajima/DST':
    'Exportar a Tajima/DST',
  'Export current drawing as SVG Vector file':
    'Exportar diseño actual a archivo vectorial SVG',
  'Export current drawing as EXP/Melco Embroidery file':
    'Exportar diseño actual a arxivo de bordado EXP/Melco',
  'Export current drawing as DST/Tajima Embroidery file':
    'Exportar diseño actual a archivo de bordado Tajima/DST',
  'Export to Embroidery service':
    'Exportar a un servicio de bordado',
  'Export to stitchcode.com\'s embroidery service':
    'Exportar al servico de bordado stitchcode.com',
  'Ignore colors during export':
    'Ignorar colores al exportar',
  'X-Ray':
    'Radiografia',
  'Import tools':
    'Importar herramientas',
  'load the official library of powerful blocks':
    'carga la llibreria oficial de bloques poderosos', 
   'Turbo mode':
    'Modo turbo',
 
  // settings
  'Units..':
    'Unidades...',
  'Display dimension in Inch':
    'Mostrar dimensions en pulgadas',
  'Hide grid':
    'Ocultar cuadrícula',
  'Hide turtle':
    'Ocultar tortuga',
  'Hide jump stitches':
    'Ocultar puntadas de salto',
  'Hide stitch points':
    'Ocultar puntos de puntada',
  'Ignore embroidery warnings':
    'Ignorar advertancias de bordado',
  'uncheck to show embroidery specific warnings':
    'desmarcar para mostrar advertencias específicas de bordado',
  'check to ignore embroidery specific warnings':
    'marcar para ignorar advertencias específicas de bordado',
  'uncheck to show grid':
    'desmarcar para mostrar la cuadrícula',
  'check to hide grid':
    'marcar para ocultar la cuadrícula',
  'uncheck to show jump stitches':
    'desmarcar para mostrar las puntadas de salto',
  'check to hide jump stitches':
    'marcar para ocultar las puntadas de salto',
  'uncheck to show stitch points':
    'desmarcar para mostrar puntos de puntada',
  'check to hide stitch points':
    'marcar para ocultar punts de puntada',
  'uncheck to show turtle':
    'desmarcar para mostrar la tortuga',
  'check to hide turtle':
    'marcar para ocultar la tortuga',
  'uncheck to display dimensions in millimeters':
    'desmarcar para mostrar las dimensions en milímetros',
  'check to show dimensions in inch':
    'marcar para mostrar dimensions en pulgadas',
  'Default background color':
    'Color de fondo por defecto',
  'Default pen color':
    'Color de lápiz por defecto',
  'Default background color...':
    'Color de fondo por defecto...',
  'Default pen color...':
    'Color de lápiz por defecto...',

  // legacy blocks
  'clear':
    'borrar',
  'move %n steps by %n steps':
    'mover %n pasos con %n saltos',
  'mover %n steps in %n':
    'mover %n pasos en %n puntadas',
  'go to x: %n y: %n by %n':
    'ir a x: %n y: %n con %n salts ',
  'go to x: %n y: %n in %n':
    'ir a x: %n y: %n en %n puntades',

  // new blocks
  'point towards x: %n y: %n':
    'apuntar a x: %n y: %n',
  'reset':
    'reiniciar',

  // warnings
  ' are too long! (will get clamped)':
    'son demasiado largas! (se cortarà)',
  ' is too long! (will get clamped)':
    'es deamsiado larga! (se cortarà)',

  // pen and color setting
  'pen size':
    'tamaño del lápiz',
  'pen down?':
    '¿lápiz bajado?',
  'RGB color':
    'color RGB',
  'hex color':
    'color hexadecimal',
  'HSV color':
    'color HSV',
  'set color to %clr':
    'fijar color a %clr',
  'set color to RGB %n %n %n':
    'fijar color a RGB %n %n %n',
  'set color to HSV %n %n %n':
    'fijar color a HSV %n %n %n',
  'set color to hex %s':
    'fijar color a hexadecimal %s',
  'set color by hue %huewheel':
    'fijar color por tonalidad %huewheel',
  'set %hsb to %n':
    'fijar %hsb a %n',
  'change %hsb by %n':
    'incrementar %hsb en %n',
  'color: %hsb':
    'color: %hsb',
  'opacity':
    'opacitat',
  'set opacity to %n':
    'fijar opacitdad %n',
  'change opacity by %n':
    'incrementar opacidad en %n',
  'hue':
    'matiz',
  'brightness':
    'brilllo',
 'change hue by %n':
    'incrementar matiz en %n',

  // new categories
  'Embroidery':
    'Bordado',
  'Colors':
    'Colores',

  // embroidery blocks and stuff
  'running stitch by %n steps':
    'puntada simple cada %n pasos',
  'triple run by %n':
    'puntada triple cada %n pasos',
  'cross stitch in %n by %n center %b':
    'puntada de cruz cada %n ancho %n centrado %b',
  'zigzag with density %n width %n center %b':
    'zig-zag densidad %n ancho %n centrado %b',
  'Z-stitch with density %n width %n center %b':
    'puntada Z densidad %n ancho %n centrado %b',
  'satin stitch with width %n center %b':
    'puntada satén ancho %n centrado %b',
  'tatami stitch width %n interval %n center %b':
    'puntada tatami ancho %n intervalo %n centrado %b',
  'jump stitch %b':
    'puntada de salto %b',
  'tie stitch':
    'puntada de corbata',
  'trim':
    'cortar',
  'stop running':
    'parar bordado',
  'draw text %s with size %n':
    'escribir %s con tamaño %n',
  'text length of %s with size %n':
    'longitud de %s con tamaño %n',
  'rendering X-RAY ...':
    'renderitzant radiografia ...',
  'turn off X-RAY ...':
    'desactivar radiografia ...',
};

// Add attributes to original SnapTranslator.dict.de
for (var attrname in tempDict) { SnapTranslator.dict.es[attrname] = tempDict[attrname]; }
