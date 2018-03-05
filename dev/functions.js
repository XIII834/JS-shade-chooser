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
			paletteTempBlockWidth = Math.floor(paletteWidth / 7) +
									(Math.ceil(paletteWidth / 7) - Math.floor(paletteWidth / 7)) / 2;

			setCarriage(stepsObj.wave[0]);
			setCarriage(stepsObj.temp[0], 'temp');
		}

	} else {
		jssc.style.display = 'none';
	}
}

function validValuesConverter(str) {

	let arr = str.split(','),
		resultArr = new Array();

	arr.forEach(function(elem) {
		if (~elem.indexOf('-')) {
			for (let  i = parseInt(elem); i <= parseInt(elem.slice(elem.indexOf('-') + 1)); i++) {
				resultArr.push(i);
			}
		} else {
			resultArr.push(parseInt(elem));
		}
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
		if (currentPosition + 1 < stepsObj.temp.length) {
			setCarriage(stepsObj.temp[currentPosition + 1], 'temp');
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
		if (currentPosition - 1 >= 0) {
			setCarriage(stepsObj.temp[currentPosition - 1], 'temp');
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

/**
  * Функция использует закон смещения Вина
  * для получения значения длины волны в нм
  * из значения температуры в кельвинах 
  * @param {number} kelvins - Температура в кельвинах
  */
function getWaveFromTemp(kelvins) {
/*	Постоянная Вина, изм. в м*К */
	let b = 0.002898;

	return b / kelvins;
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