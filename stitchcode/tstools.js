var tstools = {};

tstools.getBaseURL = function () {
    var url = location.href;  // entire url including querystring - also: window.location.href;
    if (url.lastIndexOf('#') > 0) {
		url = url.substring(0, url.lastIndexOf('#'));
	}
    url = url.substring(0, url.lastIndexOf('/'));
	return url + "/";
};

tstools.debug_msg = function (st, clear=false) {
	o = new String();
	if (!clear) {
		o = document.getElementById("debug").innerHTML;
	} else {
		o = "";
	}
	o = st + "<br />" + o;
	document.getElementById("debug").innerHTML = o;
};
