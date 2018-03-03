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

		stepsObj.wave = validValuesConverter('380-740');
	}

	if (strObj.temp !== undefined) {

		stepsObj.temp = validValuesConverter(strObj.temp);
	} else {

		stepsObj.temp = [2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900, 3000, 3100];
	}

	if (getComputedStyle(jssc).display === 'none') {
		jssc.style.display = 'flex';

		if (!paletteWidth) {

			paletteWidth = document.querySelector('.jssc__color-palette').offsetWidth;

			carriageWidth = document.querySelector('.jssc__carriage-wrapper').offsetWidth;

			paletteBlockWidth = Math.round(paletteWidth / 8);

			minLeft = -(Math.round(carriageWidth / 2));
			maxLeft = paletteWidth - Math.round(carriageWidth / 2);
			setCarriage(stepsObj.wave[0]);
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

function getRange(num) {

	for (let i = 0; i < wavesRanges.length - 1; i++) {
		if ((num <= wavesRanges[i + 1]) && (num >= wavesRanges[i])) {
			return i;
		}
	}

	return false;
}

function getLeft(num) {
	
	let currentRangeCount = wavesRanges[getRange(num) + 1] - wavesRanges[getRange(num)],
		currentRangeNMs = num - wavesRanges[getRange(num)],
		percentage = currentRangeNMs / (currentRangeCount / 100),
		proportion = percentage / 100;



	return paletteBlockWidth * getRange(num) + paletteBlockWidth * proportion - carriageWidth / 2;
}

function getColor(num) {

	let currentRangeCount = wavesRanges[getRange(num) + 1] - wavesRanges[getRange(num)],
		currentRangeNMs = num - wavesRanges[getRange(num)],
		percentage = currentRangeNMs / (currentRangeCount / 100),
		proportion = percentage / 100;

	let initial = {
		red: gradientRanges[getRange(num)].slice(0, 2),
		green: gradientRanges[getRange(num)].slice(2, 4),
		blue: gradientRanges[getRange(num)].slice(4, 6)
	},
	final = {
		red: gradientRanges[getRange(num) + 1].slice(0, 2),
		green: gradientRanges[getRange(num) + 1].slice(2, 4),
		blue: gradientRanges[getRange(num) + 1].slice(4, 6)
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

function setCarriage(num) {
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

function nextStep() {
	let currentPosition = stepsObj.wave.indexOf(parseInt(waveCarriage.querySelector('.jssc__count span').innerHTML));
	if (currentPosition + 1 < stepsObj.wave.length) {
		setCarriage(stepsObj.wave[currentPosition + 1]);
	}
}

function prevStep() {
	let currentPosition = stepsObj.wave.indexOf(parseInt(waveCarriage.querySelector('.jssc__count span').innerHTML));
	if (currentPosition - 1 >= 0) {
		setCarriage(stepsObj.wave[currentPosition - 1]);
	}
}

function dragAndDropCarriage(cursor) {
	
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

/*function getNearStep(inputNum) {
	for (let i = 0; i < stepsObj.wave.length - 1; i++) {
		if (inputNum >= stepsObj.wave[i]) && (inputNum <= stepsObj.wave[i + 1]) {
			return (((stepsObj.wave[i + 1] - stepsObj.wave[i]) / 2) > inputNum) ?
			stepsObj.wave[i] : stepsObj.wave[i + 1];
		}
	}
}*/
