// Stitchode's main changes and addtions to snap! go in here
// sorry it lacks proper documentation


var tStitch = {};

tStitch.debug = true;
tStitch.draw_jumps = true;
tStitch.draw_stitches = true;
tStitch.draw_stitch_len = 2;

tStitch.debug_msg = function (st,clear) {
	o = new String();
	if (!clear) {
		o = document.getElementById("bug").innerHTML;
	} else {
		o = "";
	}
	o += st;
	document.getElementById("bug").innerHTML = o;
};

tStitch.getBaseURL = function () {
    var url = location.href;  // entire url including querystring - also: window.location.href;
    if (url.lastIndexOf('#') > 0) {
		url = url.substring(0, url.lastIndexOf('#'));
	}
    url = url.substring(0, url.lastIndexOf('/'));
	return url + "/";
};


tStitch.stitches = {};
tStitch.stitches.x = [];
tStitch.stitches.y = [];
tStitch.stitches.jump = [];

tStitch.isFirst = function() {
	if (tStitch.stitches.x.length > 0)
		return false;
	else
		return true;
};

tStitch.clearPoints = function() {
	tStitch.stitches.x = [];
	tStitch.stitches.y = [];
	tStitch.stitches.jump = [];
};

tStitch.addPoint = function (x,y,jump) {
	if (tStitch.debug) {
		s = new String();
		s = s + "adding Point (" + x + "," + y;
		if (jump) s = s + ",jump";
		s+= ")";
		console.log(s);
	}

	if (tStitch.stitches.x[tStitch.stitches.x.length-1] == x  &&
		tStitch.stitches.y[tStitch.stitches.y.length-1] == y
	) {
		//alert("pint exist");
	} else {
		tStitch.stitches.x.push(x);
		tStitch.stitches.y.push(y);
		tStitch.stitches.jump.push(jump);
	}
};

tStitch.toogleShowStitches = function() {
	tStitch.draw_stitches = !tStitch.draw_stitches;
};

tStitch.getShowStitches = function() {
	return tStitch.draw_stitches;
};

tStitch.toogleShowJumpStitches = function() {
	tStitch.draw_jumps = !tStitch.draw_jumps;
};

tStitch.getShowJumpStitches = function() {
	return tStitch.draw_jumps;
};

tStitch.signup = function() {
	window.open('http://' + window.location.hostname + '/signup');
};


tStitch.upload = function(name) {

	tStitch.debug_msg("uploading points... sending SAVE with num points= " + tStitch.stitches.x.length, true);
	params = { "x[]": tStitch.stitches.x, "y[]":tStitch.stitches.y, "j[]":tStitch.stitches.jump, "name":name };

    if (tStitch.stitches.x.length <= 1 || tStitch.stitches.y <= 1) {
		new  DialogBoxMorph().inform(
			'Upload Error',
			'No stitches to upload, please (re)generate a drawing first!',
			world);

	} else {
		$.post(
			"/upload",
			data = params,
			successCallback = function (data) {
				if (data!="ERROR") {
					/*new  DialogBoxMorph().inform(
						'Upload Success',
						'Your embroidery file is ready and will be available at this url:\n' +
						window.location.hostname + '/view/'+data,'\n',
						world);*/
					window.open('http://' + window.location.hostname + '/view/'+data, 'TurtleStitch file preview');
				} else {
					new  DialogBoxMorph().inform(
						'Upload Error',
						'Sorry! Upload failed for an unknown reason',
						world);
				}
			});
	}

	/*
	$.fileDownload(tStitch.getBaseURL() +"stitchcode/backend/save.py", {
		successCallback: function (html, url) {
			alert("DSD");
		},
		failCallback: function (html, url) {
			alert(
			  'Your file download just failed for this URL:' + url +
			  '\r\n' + 'Here was the resulting error HTML: \r\n'
				+ html
			);
		},

		httpMethod: "POST",
		data: params
	});		*/
};



IDE_Morph.prototype.uploadStitches = function () {
    tStitch.upload();
};
