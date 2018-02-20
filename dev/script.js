/*jssc.querySelector('.jssc__type-link').onclick = function() {
	jsscContentReplace(this);
}*/

jsscTempContent.querySelector('.jssc__type-link').onclick = function() {
	jsscContentToggle(true);
}

jsscWaveContent.querySelector('.jssc__type-link').onclick = function() {
	jsscContentToggle(false);
}

jssc.querySelector('.jssc__modal-close').onclick = function() {
	jsscToggle(true);
}