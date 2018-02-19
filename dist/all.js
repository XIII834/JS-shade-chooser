'use strict';

var jssc = document.createElement('div'),
    jsscModal = document.createElement('div'),
    jsscContentWrapper = document.createElement('div');

function jsscModalToggle(steps, separator) {
	if (steps) {
		steps = steps.split(separator);
		document.querySelector('.jssc').style.visibility = 'visible';
	} else {
		document.querySelector('.jssc').style.visibility = 'hidden';
	}
}

console.log(document.querySelector('#tmpl'));

document.querySelector('#tmpl').createShadowRoot();
//# sourceMappingURL=all.js.map
