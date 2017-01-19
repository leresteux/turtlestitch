
cmdCache = new CommandCache();
DEBUG = true;

function reDraw(cnv) {
    //load a svg snippet in the canvas with id = 'svg'
   canvas = document.getElementById('svg');
   //document.getElementById("code").innerHTML =  cmdCache.toSVG();
   //document.getElementById("svg2").innerHTML =  cmdCache.toSVG();
   //canvg(document.getElementById('svg'), cmdCache.toSVG());

   canvg(cnv, cmdCache.toSVG());

   //var cnv = caller.parent.penTrails();
   //var ctx = cnv.getContext('2d');
   //ctx.drawSvg(cmdCache.toSVG(), 0, 0, cnv.width, cnv.height);

}
