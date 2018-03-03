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

jsscWaveContent.querySelector('.jssc__left-arrow').onclick = function() {
	prevStep();
}

jsscWaveContent.querySelector('.jssc__right-arrow').onclick = function() {
	nextStep();
}

jsscWaveContent.querySelector('.jssc__carriage').onmousedown = function() {
	jssc.style.cursor = 'none';
	jssc.querySelector('.jssc__left-arrow').style.cursor = 'none';
	jssc.querySelector('.jssc__right-arrow').style.cursor = 'none';
	waveCarriage.querySelector('.jssc__carriage').style.boxShadow = '0 0 15px rgba(0, 0, 0, 0.5)';
	jssc.onmousemove = function(cursor) {
		dragAndDropCarriage(cursor);
	}
}

jssc.onmouseup = function() {
	jssc.style.cursor = '';
	jssc.querySelector('.jssc__left-arrow').style.cursor = '';
	jssc.querySelector('.jssc__right-arrow').style.cursor = '';
	waveCarriage.querySelector('.jssc__carriage').style.boxShadow = '';
	this.onmousemove = function() {};
}