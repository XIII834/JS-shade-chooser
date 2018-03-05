'use strict';

var baseJsscTemplate = '' + '<div class="jssc__modal">' + '<div class="jssc__modal-close">' + '<svg version="1.1" baseProfile="full" width="20" height="20"' + 'xmlns="http://www.w3.org/2000/svg">' + '<line x1="0" x2="20" y1="0" y2="20" stroke="#9A9EA0"' + ' stroke-width="2"/>' + '<line x1="0" x2="20" y1="20" y2="0" stroke="#9A9EA0"' + ' stroke-width="2"/>' + '</svg>' + '</div>' + '<div class="jssc__content">' + '</div>' + '</div>';

var jsscTempTemplate = '' + '<div class="jssc__hat">' + '<div class="jssc__title"><span>Температура, К</span></div>' + '<div class="jssc__type-link">' + '<span>Длина волны, λ</span>' + '<div class="jssc__type-link-img jssc__type-link-img_wave"></div>' + '</div>' + '</div>' + '<div class="jssc__color-palette jssc__color-palette_temp">' + '<div class="jssc__carriage-wrapper">' + '<div class="jssc__count"><span>400</span></div>' + '<div class="jssc__left-arrow-wrapper">' + '<div class="jssc__left-arrow"></div>' + '</div>' + '<div class="jssc__carriage"></div>' + '<div class="jssc__right-arrow-wrapper">' + '<div class="jssc__right-arrow"></div>' + '</div>' + '<div class="jssc__bottom-arrow-wrapper">' + '<div class="jssc__bottom-arrow"></div>' + '</div>' + '</div>' + '</div>' + '<div class="jssc__marking">' + '<span>2200к</span>' + '<span>2700-3000к</span>' + '<span>4000-4500к</span>' + '<span>4800к</span>' + '<span>5000-6000к</span>' + '<span>7000-7500к</span>' + '<span>10000к</span>' + '<span>20000к</span>' + '</div>' + '<div class="jssc__temp-sectors">' + '<span>свеча</span>' + '<span>лампа</span>' + '<span>день</span>' + '<span>небо</span>' + '</div>' + '<div class="jssc__input">' + '<input type="text" name="jssc__input" placeholder="Поле для ввода">' + '<div class="jssc__input-error">Введите значение температуры (в кельвинах) вручную, или используйте селектор цвета.</div>' + '</div>';

var jsscWaveTemplate = '' + '<div class="jssc__hat">' + '<div class="jssc__title"><span>Длина волны, λ</span></div>' + '<div class="jssc__type-link">' + '<span>Температура, К</span>' + '<div class="jssc__type-link-img jssc__type-link-img_temp"></div>' + '</div>' + '</div>' + '<div class="jssc__color-palette jssc__color-palette_wave">' + '<div class="jssc__carriage-wrapper">' + '<div class="jssc__count"><span></span></div>' + '<div class="jssc__left-arrow-wrapper">' + '<div class="jssc__left-arrow"></div>' + '</div>' + '<div class="jssc__carriage"><span></span></div>' + '<div class="jssc__right-arrow-wrapper">' + '<div class="jssc__right-arrow"></div>' + '</div>' + '<div class="jssc__bottom-arrow-wrapper">' + '<div class="jssc__bottom-arrow"></div>' + '</div>' + '</div>' + '</div>' + '<div class="jssc__marking">' + '<span>УФ</span>' + '<span>380-440нм</span>' + '<span>440-485нм</span>' + '<span>485-500нм</span>' + '<span>500-565нм</span>' + '<span>565-590нм</span>' + '<span>590-625нм</span>' + '<span>625-740нм</span>' + '<span>ИК</span>' + '</div>' + '<div class="jssc__input">' + '<input type="text" name="jssc__input" placeholder="Поле для ввода">' + '<div class="jssc__input-error">Введите значение длины волны (в нм) вручную, или используйте селектор цвета.</div>' + '</div>';
var jssc = document.createElement('div');
jssc.insertAdjacentHTML('afterBegin', baseJsscTemplate);
jssc.classList.add('jssc');

var stepsObj = {};

var paletteWidth = void 0,
    carriageWidth = void 0,
    paletteWaveBlockWidth = void 0,
    paletteTempBlockWidth = void 0,
    paletteFullWidth = void 0,
    cursorPosition = null;

var wavesRanges = [0, 410, 463, 493, 533, 578, 608, 683, 1000],
    gradientWaveRanges = ['000000', '7100C4', '004DFF', '00B8D9', '00C43A', 'FFFF00', 'FF8C00', 'FF0000', '000000'],
    tempsRanges = [2200, 2850, 4250, 4800, 5500, 7250, 10000, 20000],
    gradientTempRanges = ['DC841A', 'F7C16B', 'FFECC1', 'FFFAEA', 'E4F5FD', '92B9D6', '5D90BF', '0000A2'];

var jsscContent = jssc.querySelector('.jssc__content');

var jsscTempContent = jsscContent.cloneNode(true),
    jsscWaveContent = jsscContent.cloneNode(true);
jsscTempContent.insertAdjacentHTML('beforeEnd', jsscTempTemplate);
jsscWaveContent.insertAdjacentHTML('afterBegin', jsscWaveTemplate);

var jsscModal = jssc.querySelector('.jssc__modal');
jsscModal.removeChild(jsscContent);
jsscModal.appendChild(jsscTempContent);

var waveCarriage = jsscWaveContent.querySelector('.jssc__carriage-wrapper'),
    tempCarriage = jsscTempContent.querySelector('.jssc__carriage-wrapper');

document.body.appendChild(jssc);
function jsscContentToggle(isCurrentTemp) {

	if (isCurrentTemp) {
		jsscModal.removeChild(jsscTempContent);
		jsscModal.appendChild(jsscWaveContent);
	} else {
		jsscModal.removeChild(jsscWaveContent);
		jsscModal.appendChild(jsscTempContent);
	}
}

function jsscToggle(strObj) {

	strObj = strObj ? strObj : {};

	if (strObj.wave !== undefined) {

		stepsObj.wave = validValuesConverter(strObj.wave);
	} else {

		stepsObj.wave = validValuesConverter('400, 440, 550, 600, 650-660, 1000');
	}

	if (strObj.temp !== undefined) {

		stepsObj.temp = validValuesConverter(strObj.temp);
	} else {

		stepsObj.temp = validValuesConverter('5500-5550, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000, 16000, 20000');
	}

	if (getComputedStyle(jssc).display === 'none') {
		jssc.style.display = 'flex';

		if (!paletteWidth) {

			paletteWidth = document.querySelector('.jssc__color-palette').offsetWidth;

			carriageWidth = document.querySelector('.jssc__carriage-wrapper').offsetWidth;

			paletteWaveBlockWidth = Math.round(paletteWidth / 8);
			paletteTempBlockWidth = Math.floor(paletteWidth / 7) + (Math.ceil(paletteWidth / 7) - Math.floor(paletteWidth / 7)) / 2;

			setCarriage(stepsObj.wave[0]);
			setCarriage(stepsObj.temp[0], 'temp');
		}
	} else {
		jssc.style.display = 'none';
	}
}

function validValuesConverter(str) {

	var arr = str.split(','),
	    resultArr = new Array();

	arr.forEach(function (elem) {
		if (~elem.indexOf('-')) {
			for (var i = parseInt(elem); i <= parseInt(elem.slice(elem.indexOf('-') + 1)); i++) {
				resultArr.push(i);
			}
		} else {
			resultArr.push(parseInt(elem));
		}
	});

	return resultArr;
}

function getRange(num, paletteType) {

	paletteType = paletteType !== undefined ? paletteType : 'wave';

	if (paletteType === 'temp') {

		for (var i = 0; i < tempsRanges.length; i++) {
			if (num <= tempsRanges[i + 1] && num >= tempsRanges[i]) {
				return i;
			}
		}
	} else if (paletteType === 'wave') {

		for (var _i = 0; _i < wavesRanges.length - 1; _i++) {
			if (num <= wavesRanges[_i + 1] && num >= wavesRanges[_i]) {
				return _i;
			}
		}
	}

	return false;
}

function getLeft(num, paletteType) {

	paletteType = paletteType !== undefined ? paletteType : 'wave';

	if (paletteType === 'temp') {

		var currentRangeCount = tempsRanges[getRange(num, 'temp') + 1] - tempsRanges[getRange(num, 'temp')],
		    currentRangeKs = num - tempsRanges[getRange(num, 'temp')],
		    percentage = currentRangeKs / (currentRangeCount / 100),
		    proportion = percentage / 100;

		return paletteTempBlockWidth * getRange(num, 'temp') + paletteTempBlockWidth * proportion - carriageWidth / 2;
	} else if (paletteType === 'wave') {

		var _currentRangeCount = wavesRanges[getRange(num, 'wave') + 1] - wavesRanges[getRange(num, 'wave')],
		    currentRangeNMs = num - wavesRanges[getRange(num, 'wave')],
		    _percentage = currentRangeNMs / (_currentRangeCount / 100),
		    _proportion = _percentage / 100;

		return paletteWaveBlockWidth * getRange(num, 'wave') + paletteWaveBlockWidth * _proportion - carriageWidth / 2;
	}
}

function getColor(num, paletteType) {

	paletteType = paletteType !== undefined ? paletteType : 'wave';

	if (paletteType === 'temp') {

		var currentRangeCount = tempsRanges[getRange(num, 'temp') + 1] - tempsRanges[getRange(num, 'temp')],
		    currentRangeKs = num - tempsRanges[getRange(num, 'temp')],
		    percentage = currentRangeKs / (currentRangeCount / 100),
		    proportion = percentage / 100;

		var initial = {
			red: gradientTempRanges[getRange(num, 'temp')].slice(0, 2),
			green: gradientTempRanges[getRange(num, 'temp')].slice(2, 4),
			blue: gradientTempRanges[getRange(num, 'temp')].slice(4, 6)
		},
		    final = {
			red: gradientTempRanges[getRange(num, 'temp') + 1].slice(0, 2),
			green: gradientTempRanges[getRange(num, 'temp') + 1].slice(2, 4),
			blue: gradientTempRanges[getRange(num, 'temp') + 1].slice(4, 6)
		},
		    result = {
			red: Math.round(parseInt(initial.red, 16) + (parseInt(final.red, 16) - parseInt(initial.red, 16)) * proportion).toString(16),
			green: Math.round(parseInt(initial.green, 16) + (parseInt(final.green, 16) - parseInt(initial.green, 16)) * proportion).toString(16),
			blue: Math.round(parseInt(initial.blue, 16) + (parseInt(final.blue, 16) - parseInt(initial.blue, 16)) * proportion).toString(16)
		},
		    color = void 0;

		for (color in result) {
			result[color] = result[color].length < 2 ? '0' + result[color] : result[color];
		}

		return result.red + result.green + result.blue;
	} else if (paletteType === 'wave') {

		var _currentRangeCount2 = wavesRanges[getRange(num) + 1] - wavesRanges[getRange(num)],
		    currentRangeNMs = num - wavesRanges[getRange(num)],
		    _percentage2 = currentRangeNMs / (_currentRangeCount2 / 100),
		    _proportion2 = _percentage2 / 100;

		var _initial = {
			red: gradientWaveRanges[getRange(num)].slice(0, 2),
			green: gradientWaveRanges[getRange(num)].slice(2, 4),
			blue: gradientWaveRanges[getRange(num)].slice(4, 6)
		},
		    _final = {
			red: gradientWaveRanges[getRange(num) + 1].slice(0, 2),
			green: gradientWaveRanges[getRange(num) + 1].slice(2, 4),
			blue: gradientWaveRanges[getRange(num) + 1].slice(4, 6)
		},
		    _result = {
			red: Math.round(parseInt(_initial.red, 16) + (parseInt(_final.red, 16) - parseInt(_initial.red, 16)) * _proportion2).toString(16),
			green: Math.round(parseInt(_initial.green, 16) + (parseInt(_final.green, 16) - parseInt(_initial.green, 16)) * _proportion2).toString(16),
			blue: Math.round(parseInt(_initial.blue, 16) + (parseInt(_final.blue, 16) - parseInt(_initial.blue, 16)) * _proportion2).toString(16)
		},
		    _color = void 0;

		for (_color in _result) {
			_result[_color] = _result[_color].length < 2 ? '0' + _result[_color] : _result[_color];
		}

		return _result.red + _result.green + _result.blue;
	}
}

function setCarriage(num, paletteType) {

	paletteType = paletteType !== undefined ? paletteType : 'wave';

	if (paletteType === 'temp') {

		var carriageCircle = tempCarriage.querySelector('.jssc__carriage'),
		    carriageCircleSpan = carriageCircle.querySelector('span'),
		    carriageCountSpan = tempCarriage.querySelector('.jssc__count span');

		tempCarriage.style.left = getLeft(num, 'temp') + 'px';
		carriageCircle.style.backgroundColor = '#' + getColor(num, 'temp');

		carriageCountSpan.innerHTML = num;
	} else if (paletteType === 'wave') {

		var _carriageCircle = waveCarriage.querySelector('.jssc__carriage'),
		    _carriageCircleSpan = _carriageCircle.querySelector('span'),
		    _carriageCountSpan = waveCarriage.querySelector('.jssc__count span');

		waveCarriage.style.left = getLeft(num) + 'px';
		_carriageCircle.style.backgroundColor = '#' + getColor(num);

		if (num > 740) {
			_carriageCircleSpan.innerHTML = 'ИК';
		} else if (num < 380) {
			_carriageCircleSpan.innerHTML = 'УФ';
		} else {
			_carriageCircleSpan.innerHTML = '';
		}

		_carriageCountSpan.innerHTML = num;
	}
}

function nextStep(paletteType) {

	paletteType = paletteType !== undefined ? paletteType : 'wave';

	if (paletteType === 'temp') {

		var currentPosition = stepsObj.temp.indexOf(parseInt(tempCarriage.querySelector('.jssc__count span').innerHTML));
		if (currentPosition + 1 < stepsObj.temp.length) {
			setCarriage(stepsObj.temp[currentPosition + 1], 'temp');
		}
	} else if (paletteType === 'wave') {

		var _currentPosition = stepsObj.wave.indexOf(parseInt(waveCarriage.querySelector('.jssc__count span').innerHTML));
		if (_currentPosition + 1 < stepsObj.wave.length) {
			setCarriage(stepsObj.wave[_currentPosition + 1]);
		}
	}
}

function prevStep(paletteType) {

	paletteType = paletteType !== undefined ? paletteType : 'wave';

	if (paletteType === 'temp') {

		var currentPosition = stepsObj.temp.indexOf(parseInt(tempCarriage.querySelector('.jssc__count span').innerHTML));
		if (currentPosition - 1 >= 0) {
			setCarriage(stepsObj.temp[currentPosition - 1], 'temp');
		}
	} else if (paletteType === 'wave') {

		var _currentPosition2 = stepsObj.wave.indexOf(parseInt(waveCarriage.querySelector('.jssc__count span').innerHTML));
		if (_currentPosition2 - 1 >= 0) {
			setCarriage(stepsObj.wave[_currentPosition2 - 1]);
		}
	}
}

function dragAndDropCarriage(cursor, paletteType) {

	paletteType = paletteType !== undefined ? paletteType : 'wave';

	if (paletteType === 'temp') {

		if (cursorPosition === null) {
			cursorPosition = cursor.pageX;
		} else {
			if (cursorPosition < cursor.pageX) {
				nextStep('temp');
				cursorPosition = null;
			}
			if (cursorPosition > cursor.pageX) {
				prevStep('temp');
				cursorPosition = null;
			}
		}
	} else if (paletteType === 'wave') {

		if (cursorPosition === null) {
			cursorPosition = cursor.pageX;
		} else {
			if (cursorPosition < cursor.pageX) {
				nextStep();
				cursorPosition = null;
			}
			if (cursorPosition > cursor.pageX) {
				prevStep();
				cursorPosition = null;
			}
		}
	}
}

/**
  * Функция использует закон смещения Вина
  * для получения значения длины волны в нм
  * из значения температуры в кельвинах 
  * @param {number} kelvins - Температура в кельвинах
  */
function getWaveFromTemp(kelvins) {
	/*	Постоянная Вина, изм. в м*К */
	var b = 0.002898;

	return b / kelvins;
}

function getNearStep(inputNum, paletteType) {

	paletteType = paletteType !== undefined ? paletteType : 'wave';

	if (paletteType === 'temp') {

		for (var i = 0; i < stepsObj.temp.length - 1; i++) {
			if (inputNum >= stepsObj.temp[i] && inputNum <= stepsObj.temp[i + 1]) {
				return (stepsObj.temp[i + 1] - stepsObj.temp[i]) / 2 > inputNum - stepsObj.temp[i] ? stepsObj.temp[i] : stepsObj.temp[i + 1];
			}
		}
	} else if (paletteType === 'wave') {

		for (var _i2 = 0; _i2 < stepsObj.wave.length - 1; _i2++) {
			if (inputNum >= stepsObj.wave[_i2] && inputNum <= stepsObj.wave[_i2 + 1]) {
				return (stepsObj.wave[_i2 + 1] - stepsObj.wave[_i2]) / 2 > inputNum - stepsObj.wave[_i2] ? stepsObj.wave[_i2] : stepsObj.wave[_i2 + 1];
			}
		}
	}
}

function isNumeric(str) {
	return !isNaN(parseFloat(str)) && isFinite(str);
}

function isInputCorrect(inputNum, paletteType) {

	paletteType = paletteType !== undefined ? paletteType : 'wave';

	if (inputNum.length === 0) {
		return 'empty';
	}

	if (!isNumeric(inputNum)) {
		return 'Допустимо вводить только числа!';
	}

	if (paletteType === 'temp') {
		if (inputNum < stepsObj.temp[0]) return 'Минимальное допустимое значение: ' + stepsObj.temp[0];
		if (inputNum > stepsObj.temp[stepsObj.temp.length - 1]) return 'Максимальное допустимое значение: ' + stepsObj.temp[stepsObj.temp.length - 1];
	} else if (paletteType === 'wave') {
		if (inputNum < stepsObj.wave[0]) return 'Минимальное допустимое значение: ' + stepsObj.wave[0];
		if (inputNum > stepsObj.wave[stepsObj.wave.length - 1]) return 'Максимальное допустимое значение: ' + stepsObj.wave[stepsObj.wave.length - 1];
	}

	return 'ok';
}
/*jssc.querySelector('.jssc__type-link').onclick = function() {
	jsscContentReplace(this);
}*/
jsscTempContent.querySelector('.jssc__type-link').onclick = function () {
	jsscContentToggle(true);
};

jsscWaveContent.querySelector('.jssc__type-link').onclick = function () {
	jsscContentToggle(false);
};

jssc.querySelector('.jssc__modal-close').onclick = function () {
	jsscToggle(true);
};

jsscWaveContent.querySelector('.jssc__left-arrow').onclick = function () {
	prevStep();
};

jsscWaveContent.querySelector('.jssc__right-arrow').onclick = function () {
	nextStep();
};

jsscTempContent.querySelector('.jssc__left-arrow').onclick = function () {
	prevStep('temp');
};

jsscTempContent.querySelector('.jssc__right-arrow').onclick = function () {
	nextStep('temp');
};

jsscWaveContent.querySelector('.jssc__carriage').onmousedown = function () {
	var inputError = jsscWaveContent.querySelector('.jssc__input-error'),
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
	jssc.onmousemove = function (cursor) {
		dragAndDropCarriage(cursor);
	};
};

jsscTempContent.querySelector('.jssc__carriage').onmousedown = function () {
	var inputError = jsscTempContent.querySelector('.jssc__input-error'),
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
	jssc.onmousemove = function (cursor) {
		dragAndDropCarriage(cursor, 'temp');
	};
};

jssc.onmouseup = function () {
	jssc.style.cursor = '';
	jssc.querySelector('.jssc__left-arrow').style.cursor = '';
	jssc.querySelector('.jssc__right-arrow').style.cursor = '';
	tempCarriage.querySelector('.jssc__carriage').style.boxShadow = '';
	waveCarriage.querySelector('.jssc__carriage').style.boxShadow = '';
	this.onmousemove = function () {};
};

jsscWaveContent.querySelector('.jssc__input input').oninput = function () {
	var inputError = jsscWaveContent.querySelector('.jssc__input-error');
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
};

jsscTempContent.querySelector('.jssc__input input').oninput = function () {
	var inputError = jsscTempContent.querySelector('.jssc__input-error');
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
};
//# sourceMappingURL=all.js.map
