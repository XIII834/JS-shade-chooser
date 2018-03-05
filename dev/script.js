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

jsscTempContent.querySelector('.jssc__left-arrow').onclick = function() {
	prevStep('temp');
}

jsscTempContent.querySelector('.jssc__right-arrow').onclick = function() {
	nextStep('temp');
}

jsscWaveContent.querySelector('.jssc__carriage').onmousedown = function() {
	let inputError = jsscWaveContent.querySelector('.jssc__input-error'),
		inputField = jsscWaveContent.querySelector('.jssc__input input');
	if (inputError.classList.contains('jssc__input-error_active')) {
		inputError.classList.remove('jssc__input-error_active');
	}
	inputError.innerHTML = 'Введите значение длины волны (в нм) вручную, или используйте селектор цвета.';
	inputField.value = '';

	jssc.style.cursor = 'none';
	jssc.querySelector('.jssc__left-arrow').style.cursor = 'none';
	jssc.querySelector('.jssc__right-arrow').style.cursor = 'none';
	waveCarriage.querySelector('.jssc__carriage').style.boxShadow = '0 0 15px rgba(0, 0, 0, 0.5)';
	jssc.onmousemove = function(cursor) {
		dragAndDropCarriage(cursor);
	}
}

jsscTempContent.querySelector('.jssc__carriage').onmousedown = function() {
	let inputError = jsscTempContent.querySelector('.jssc__input-error'),
		inputField = jsscTempContent.querySelector('.jssc__input input');
	if (inputError.classList.contains('.jssc__input-error_active')) {
		inputError.classList.remove('.jssc__input-error_active');
	}
	inputError.innerHTML = 'Введите значение температуры (в кельвинах) вручную, или используйте селектор цвета.';
	inputField.value = '';

	jssc.style.cursor = 'none';
	jssc.querySelector('.jssc__left-arrow').style.cursor = 'none';
	jssc.querySelector('.jssc__right-arrow').style.cursor = 'none';
	tempCarriage.querySelector('.jssc__carriage').style.boxShadow = '0 0 15px rgba(0, 0, 0, 0.5)';
	jssc.onmousemove = function(cursor) {
		dragAndDropCarriage(cursor, 'temp');
	}
}

jssc.onmouseup = function() {
	jssc.style.cursor = '';
	jssc.querySelector('.jssc__left-arrow').style.cursor = '';
	jssc.querySelector('.jssc__right-arrow').style.cursor = '';
	tempCarriage.querySelector('.jssc__carriage').style.boxShadow = '';
	waveCarriage.querySelector('.jssc__carriage').style.boxShadow = '';
	this.onmousemove = function() {};
}

jsscWaveContent.querySelector('.jssc__input input').oninput = function() {
	let inputError = jsscWaveContent.querySelector('.jssc__input-error');
	if (isInputCorrect(this.value) === 'ok') {
		setCarriage(getNearStep(this.value));
		if (inputError.classList.contains('jssc__input-error_active')) {
			inputError.classList.remove('jssc__input-error_active');
		}
		inputError.innerHTML = 'Ближайшее существующее значение: ' + getNearStep(this.value);
	} else if (isInputCorrect(this.value) === 'empty') {
		if (inputError.classList.contains('jssc__input-error_active')) {
			inputError.classList.remove('jssc__input-error_active');
		}
		inputError.innerHTML = 'Введите значение длины волны (в нм) вручную, или используйте селектор цвета.';
	} else {
		if (!inputError.classList.contains('jssc__input-error_active')) {
			inputError.classList.add('jssc__input-error_active');
		}
		inputError.innerHTML = isInputCorrect(this.value);
	}
}

jsscTempContent.querySelector('.jssc__input input').oninput = function() {
	let inputError = jsscTempContent.querySelector('.jssc__input-error');
	if (isInputCorrect(this.value, 'temp') === 'ok') {
		setCarriage(getNearStep(this.value, 'temp'), 'temp');
		if (inputError.classList.contains('jssc__input-error_active')) {
			inputError.classList.remove('jssc__input-error_active');
		}
		inputError.innerHTML = 'Ближайшее существующее значение: ' + getNearStep(this.value, 'temp');
	} else if (isInputCorrect(this.value, 'temp') === 'empty') {
		if (inputError.classList.contains('jssc__input-error_active')) {
			inputError.classList.remove('jssc__input-error_active');
		}
		inputError.innerHTML = 'Введите значение температуры (в кельвинах) вручную, или используйте селектор цвета.';
	} else {
		if (!inputError.classList.contains('jssc__input-error_active')) {
			inputError.classList.add('jssc__input-error_active');
		}
		inputError.innerHTML = isInputCorrect(this.value, 'temp');
	}
}