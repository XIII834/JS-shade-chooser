function jsscContentToggle(isCurrentTemp) {

	if (isCurrentTemp) {
		jsscModal.removeChild(jsscTempContent);
		jsscModal.appendChild(jsscWaveContent);
	} else {
		jsscModal.removeChild(jsscWaveContent);
		jsscModal.appendChild(jsscTempContent);
	}
}

function jsscToggle(objUnClick) {

	if (arguments.length) {
		if ((objUnClick.dataset.wave !== undefined) && (objUnClick.dataset.wave !== '')) {

			stepsObj.wave = validValuesConverter(objUnClick.dataset.wave).sort(function(a, b) {
				return a - b;
			});
			jsscTempContent.querySelector('.jssc__type-link').style.visibility = 'visible';
		} else {

			stepsObj.wave = validValuesConverter('0');
			jsscTempContent.querySelector('.jssc__type-link').style.visibility = 'hidden';

			if (jsscModal.contains(jsscWaveContent)) {
				jsscModal.removeChild(jsscWaveContent);
			}

			if (!jsscModal.contains(jsscTempContent)) {
				jsscModal.appendChild(jsscTempContent);
			}
		}

		if ((objUnClick.dataset.temp !== undefined) && (objUnClick.dataset.temp !== '')) {

			stepsObj.temp = validValuesConverter(objUnClick.dataset.temp).sort(function(a, b) {
				return a - b;
			});
			jsscWaveContent.querySelector('.jssc__type-link').style.visibility = 'visible'
		} else {

			stepsObj.temp = validValuesConverter('2200');
			jsscWaveContent.querySelector('.jssc__type-link').style.visibility = 'hidden';

			if (jsscModal.contains(jsscTempContent)) {
				jsscModal.removeChild(jsscTempContent);
			}

			if (!jsscModal.contains(jsscWaveContent)) {
				jsscModal.appendChild(jsscWaveContent);
			}
		}

		if (objUnClick.dataset.temp === objUnClick.dataset.wave) {
			jssc.querySelector('.jssc__ranges-error').style.display = 'block';
			jssc.querySelector('.jssc__content').style.display = 'none';
		}

		if (objUnClick.dataset.itemTitle !== undefined) {

			stepsObj.itemTitle = objUnClick.dataset.itemTitle;
		} else {

			stepsObj.itemTitle = '';
		}

		if (objUnClick.dataset.itemArticle !== undefined) {

			stepsObj.itemArticle = objUnClick.dataset.itemArticle;
		} else {

			stepsObj.itemArticle = '';
		}

		if (objUnClick.dataset.itemTitleLink !== undefined) {

			stepsObj.itemTitleLink = objUnClick.dataset.itemTitleLink;
		} else {

			stepsObj.itemTitleLink = '#';
		}
	} else {

		jssc.querySelector('.jssc__ranges-error').style.display = '';
		jssc.querySelector('.jssc__content').style.display = '';
	}

	if (getComputedStyle(jssc).display === 'none') {
		jssc.style.display = 'flex';

		paletteWidth = (jsscWaveContent.querySelector('.jssc__color-palette').offsetWidth !== 0) ?
						jsscWaveContent.querySelector('.jssc__color-palette').offsetWidth :
						jsscTempContent.querySelector('.jssc__color-palette').offsetWidth;

		carriageWidth = (jsscWaveContent.querySelector('.jssc__carriage-wrapper').offsetWidth !== 0) ?
						 jsscWaveContent.querySelector('.jssc__carriage-wrapper').offsetWidth :
						 jsscTempContent.querySelector('.jssc__carriage-wrapper').offsetWidth;

		paletteWaveBlockWidth = Math.round(paletteWidth / 8);
		paletteTempBlockWidth = Math.floor(paletteWidth / 7) +
								(Math.ceil(paletteWidth / 7) - Math.floor(paletteWidth / 7)) / 2;


		    leftTempLimitPosition = jsscTempContent.querySelector('.jssc__left-limit-position');
			leftTempLimitPosition.style.left = (getLeft(stepsObj.temp[0], 'temp') + carriageWidth / 2 - 2) + 'px';
			leftTempLimitPosition.querySelector('span').innerHTML = 'MIN= ' + stepsObj.temp[0] + 'к';

			rightTempLimitPosition = jsscTempContent.querySelector('.jssc__right-limit-position');
			rightTempLimitPosition.style.left = (getLeft(stepsObj.temp[stepsObj.temp.length - 1], 'temp') + carriageWidth / 2 - 2) + 'px';
			rightTempLimitPosition.querySelector('span').innerHTML = 'MAX= ' + stepsObj.temp[stepsObj.temp.length - 1] + 'к';

			leftWaveLimitPosition = jsscWaveContent.querySelector('.jssc__left-limit-position');
			leftWaveLimitPosition.style.left = (getLeft(stepsObj.wave[0], 'wave') + carriageWidth / 2 - 2) + 'px';
			leftWaveLimitPosition.querySelector('span').innerHTML = 'MIN= ' + stepsObj.wave[0] + 'nm';
			if (stepsObj.wave[0] > 625) {
				leftWaveLimitPosition.style.backgroundColor = 'white';
			} else {
				leftWaveLimitPosition.style.backgroundColor= 'red';
			}

			rightWaveLimitPosition = jsscWaveContent.querySelector('.jssc__right-limit-position');
			rightWaveLimitPosition.style.left = (getLeft(stepsObj.wave[stepsObj.wave.length - 1], 'wave') + carriageWidth / 2 - 2) + 'px';
			rightWaveLimitPosition.querySelector('span').innerHTML = 'MAX= ' + stepsObj.wave[stepsObj.wave.length - 1] + 'nm';
			if (stepsObj.wave[stepsObj.wave.length - 1] > 625) {
				rightWaveLimitPosition.style.backgroundColor = 'white';
			} else {
				rightWaveLimitPosition.style.backgroundColor = 'red';
			}

		jsscTempContent.querySelector('.jssc__item-title').innerHTML =
		jsscWaveContent.querySelector('.jssc__item-title').innerHTML =
		'' + stepsObj.itemTitle;

		jsscTempContent.querySelector('.jssc__item-title').href =
		jsscWaveContent.querySelector('.jssc__item-title').href =
		'' + stepsObj.itemTitleLink;

		jsscTempContent.querySelector('.jssc__item-article').innerHTML =
		jsscWaveContent.querySelector('.jssc__item-article').innerHTML =
		(stepsObj.itemArticle) ? 'Артикул: ' + stepsObj.itemArticle : '';

		setCarriage(stepsObj.wave[0], 'wave');
		setCarriage(stepsObj.temp[0], 'temp');

	} else {
		jssc.style.display = 'none';
	}
}

function validValuesConverter(str) {

	let arr = str.split(','),
		resultArr = new Array();

	arr.forEach(function(elem) {
		if (~elem.indexOf('-')) {
			if (parseInt(elem) < parseInt(elem.slice(elem.indexOf('-') + 1))) {
				for (let  i = parseInt(elem); i <= parseInt(elem.slice(elem.indexOf('-') + 1)); i++) {
					resultArr.push(i);
				}
			} else {
				for (let  i = parseInt(elem.slice(elem.indexOf('-') + 1)); i <= parseInt(elem); i++) {
					resultArr.push(i);
				}
			}
			
		} else {
			resultArr.push(parseInt(elem));
		}
	});

	resultArr = resultArr.sort(function(a, b) {
		return a > b;
	});

	return resultArr;
}

function getRange(num, paletteType) {

	paletteType = (paletteType !== undefined) ? paletteType : 'wave';

	if (paletteType === 'temp') {

		for (let i = 0; i < tempsRanges.length; i++) {
			if ((num <= tempsRanges[i + 1]) && (num >= tempsRanges[i])) {
				return i;
			}
		}

	} else if (paletteType === 'wave') {

		for (let i = 0; i < wavesRanges.length - 1; i++) {
			if ((num <= wavesRanges[i + 1]) && (num >= wavesRanges[i])) {
				return i;
			}
		}
	}	

	return false;
}

function getLeft(num, paletteType) {

	paletteType = (paletteType !== undefined) ? paletteType : 'wave';

	if (paletteType === 'temp') {

		let currentRangeCount = tempsRanges[getRange(num, 'temp') + 1] - tempsRanges[getRange(num, 'temp')],
			currentRangeKs = num - tempsRanges[getRange(num, 'temp')],
			percentage = currentRangeKs / (currentRangeCount / 100),
			proportion = percentage / 100;

		return paletteTempBlockWidth * getRange(num, 'temp') + paletteTempBlockWidth * proportion - carriageWidth / 2;
	} else if (paletteType === 'wave') {

		let currentRangeCount = wavesRanges[getRange(num, 'wave') + 1] - wavesRanges[getRange(num, 'wave')],
			currentRangeNMs = num - wavesRanges[getRange(num, 'wave')],
			percentage = currentRangeNMs / (currentRangeCount / 100),
			proportion = percentage / 100;

		return paletteWaveBlockWidth * getRange(num, 'wave') + paletteWaveBlockWidth * proportion - carriageWidth / 2;
	}
}

function getColor(num, paletteType) {

	paletteType = (paletteType !== undefined) ? paletteType : 'wave';

	if (paletteType === 'temp') {

		let currentRangeCount = tempsRanges[getRange(num, 'temp') + 1] - tempsRanges[getRange(num, 'temp')],
			currentRangeKs = num - tempsRanges[getRange(num, 'temp')],
			percentage = currentRangeKs / (currentRangeCount / 100),
			proportion = percentage / 100;

		let initial = {
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
		color;

		for (color in result) {
			result[color] = (result[color].length < 2) ? '0' + result[color] : result[color];
		}

		return result.red + result.green + result.blue;


	} else if (paletteType === 'wave') {

		let currentRangeCount = wavesRanges[getRange(num) + 1] - wavesRanges[getRange(num)],
			currentRangeNMs = num - wavesRanges[getRange(num)],
			percentage = currentRangeNMs / (currentRangeCount / 100),
			proportion = percentage / 100;

		let initial = {
			red: gradientWaveRanges[getRange(num)].slice(0, 2),
			green: gradientWaveRanges[getRange(num)].slice(2, 4),
			blue: gradientWaveRanges[getRange(num)].slice(4, 6)
		},
		final = {
			red: gradientWaveRanges[getRange(num) + 1].slice(0, 2),
			green: gradientWaveRanges[getRange(num) + 1].slice(2, 4),
			blue: gradientWaveRanges[getRange(num) + 1].slice(4, 6)
		},
		result = {
			red: Math.round(parseInt(initial.red, 16) + (parseInt(final.red, 16) - parseInt(initial.red, 16)) * proportion).toString(16),
			green: Math.round(parseInt(initial.green, 16) + (parseInt(final.green, 16) - parseInt(initial.green, 16)) * proportion).toString(16),
			blue: Math.round(parseInt(initial.blue, 16) + (parseInt(final.blue, 16) - parseInt(initial.blue, 16)) * proportion).toString(16)
		},
		color;

		for (color in result) {
			result[color] = (result[color].length < 2) ? '0' + result[color] : result[color];
		}

		return result.red + result.green + result.blue;
	}
}

function setCarriage(num, paletteType) {

	paletteType = (paletteType !== undefined) ? paletteType : 'wave';

	if (paletteType === 'temp') {

		let carriageCircle = tempCarriage.querySelector('.jssc__carriage'),
			carriageCircleSpan = carriageCircle.querySelector('span'),
			carriageCountSpan = tempCarriage.querySelector('.jssc__count span');

		tempCarriage.style.left = getLeft(num, 'temp') + 'px';
		carriageCircle.style.backgroundColor = '#' + getColor(num, 'temp');

		carriageCountSpan.innerHTML = num;

	} else if (paletteType === 'wave') {

		let carriageCircle = waveCarriage.querySelector('.jssc__carriage'),
			carriageCircleSpan = carriageCircle.querySelector('span'),
			carriageCountSpan = waveCarriage.querySelector('.jssc__count span');

		waveCarriage.style.left = getLeft(num) + 'px';
		carriageCircle.style.backgroundColor = '#' + getColor(num);

		if (num > 740) {
			carriageCircleSpan.innerHTML = 'ИК';
		} else if (num < 380) {
			carriageCircleSpan.innerHTML = 'УФ';
		} else {
			carriageCircleSpan.innerHTML = '';
		}

		carriageCountSpan.innerHTML = num;
	}
}

function nextStep(paletteType) {

	paletteType = (paletteType !== undefined) ? paletteType : 'wave';

	if (paletteType === 'temp') {

		let currentPosition = stepsObj.temp.indexOf(parseInt(tempCarriage.querySelector('.jssc__count span').innerHTML));
		if (currentPosition + 100 < stepsObj.temp.length) {

			setCarriage(stepsObj.temp[currentPosition + 100], 'temp');
		} else {
			
			setCarriage(stepsObj.temp[stepsObj.temp.length - 1], 'temp');
		}
	} else if (paletteType === 'wave') {

		let currentPosition = stepsObj.wave.indexOf(parseInt(waveCarriage.querySelector('.jssc__count span').innerHTML));
		if (currentPosition + 1 < stepsObj.wave.length) {
			setCarriage(stepsObj.wave[currentPosition + 1]);
		}
	}
}

function prevStep(paletteType) {

	paletteType = (paletteType !== undefined) ? paletteType : 'wave';

	if (paletteType === 'temp') {

		let currentPosition = stepsObj.temp.indexOf(parseInt(tempCarriage.querySelector('.jssc__count span').innerHTML));
		if (currentPosition - 100 >= 0) {

			setCarriage(stepsObj.temp[currentPosition - 100], 'temp');
		} else {

			setCarriage(stepsObj.temp[0], 'temp');
		}
	} else if (paletteType === 'wave') {

		let currentPosition = stepsObj.wave.indexOf(parseInt(waveCarriage.querySelector('.jssc__count span').innerHTML));
		if (currentPosition - 1 >= 0) {
			setCarriage(stepsObj.wave[currentPosition - 1]);
		}
	}
}

function dragAndDropCarriage(cursor, paletteType) {

	paletteType = (paletteType !== undefined) ? paletteType : 'wave';

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

function getNearStep(inputNum, paletteType) {

	paletteType = (paletteType !== undefined) ? paletteType : 'wave';

	if (paletteType === 'temp') {

		for (let i = 0; i < stepsObj.temp.length - 1; i++) {
			if ((inputNum >= stepsObj.temp[i]) && (inputNum <= stepsObj.temp[i + 1])) {
				return (((stepsObj.temp[i + 1] - stepsObj.temp[i]) / 2) > (inputNum - stepsObj.temp[i])) ?
				stepsObj.temp[i] : stepsObj.temp[i + 1];
			}
		}

	} else if (paletteType === 'wave') {

		for (let i = 0; i < stepsObj.wave.length - 1; i++) {
			if ((inputNum >= stepsObj.wave[i]) && (inputNum <= stepsObj.wave[i + 1])) {
				return (((stepsObj.wave[i + 1] - stepsObj.wave[i]) / 2) > (inputNum - stepsObj.wave[i])) ?
				stepsObj.wave[i] : stepsObj.wave[i + 1];
			}
		}
	}
}

function isNumeric(str) {
	return !isNaN(parseFloat(str)) && isFinite(str);
}

function isInputCorrect(inputNum, paletteType) {

	paletteType = (paletteType !== undefined) ? paletteType : 'wave';

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

function clearField(paletteType) {

	paletteType = (paletteType !== undefined) ? paletteType : 'wave';

	if (paletteType === 'temp') {

		let inputError = jsscTempContent.querySelector('.jssc__input-error'),
			inputErrorSpan = inputError.querySelector('span'),
			inputField = jsscTempContent.querySelector('.jssc__input input');
		if (inputError.classList.contains('.jssc__input-error_active')) {
			inputError.classList.remove('.jssc__input-error_active');
		}
		inputErrorSpan.innerHTML = 'Введите значение температуры (в кельвинах) вручную, или используйте селектор цвета.';
		inputField.value = '';
		if (inputError.classList.contains('jssc__input-error_active')) {
			inputError.classList.remove('jssc__input-error_active');
		}

	} else if (paletteType === 'wave') {

		let inputError = jsscWaveContent.querySelector('.jssc__input-error'),
			inputErrorSpan = inputError.querySelector('span'),
			inputField = jsscWaveContent.querySelector('.jssc__input input');
		if (inputError.classList.contains('jssc__input-error_active')) {
			inputError.classList.remove('jssc__input-error_active');
		}
		inputErrorSpan.innerHTML = 'Введите значение длины волны (в нм) вручную, или используйте селектор цвета.';
		inputField.value = '';
		if (inputError.classList.contains('jssc__input-error_active')) {
			inputError.classList.remove('jssc__input-error_active');
		}
	}
}