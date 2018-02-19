function jsscModalToggle(steps, separator) {
	if (steps) {
		steps = steps.split(separator);
		document.querySelector('.jssc').style.visibility = 'visible';

	} else {
		document.querySelector('.jssc').style.visibility = 'hidden';
	}
}