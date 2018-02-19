'use strict';

var jssc = document.createElement('div');
jssc.classList.add('jssc');

jssc.insertAdjacentHTML('beforeEnd', '<div class="jssc__modal">' + '<div class="jssc__modal-close">test</div>' + '</div>');

document.body.appendChild(jssc);
function jsscModalToggle(steps, separator) {
	if (steps) {
		steps = steps.split(separator);
		document.querySelector('.jssc').style.visibility = 'visible';
	} else {
		document.querySelector('.jssc').style.visibility = 'hidden';
	}
}
//# sourceMappingURL=all.js.map
