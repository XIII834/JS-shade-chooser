'use strict';

var baseJsscTemplate = '' + '<div class="jssc__modal">' + '<div class="jssc__modal-close">' + '<svg version="1.1" baseProfile="full" width="20" height="20"' + 'xmlns="http://www.w3.org/2000/svg">' + '<line x1="0" x2="20" y1="0" y2="20" stroke="#9A9EA0"' + ' stroke-width="2"/>' + '<line x1="0" x2="20" y1="20" y2="0" stroke="#9A9EA0"' + ' stroke-width="2"/>' + '</svg>' + '</div>' + '<div class="jssc__content">' + '</div>' + '</div>';

var jsscTempTemplate = '' + '<div class="jssc__hat">' + '<div class="jssc__title"><span>Температура, К</span></div>' + '<div class="jssc__type-link">' + '<span>Длина волны, λ</span>' + '<div class="jssc__type-link-img jssc__type-link-img_wave"></div>' + '</div>' + '</div>' + '<div class="jssc__color-palette jssc__color-palette_temp">' + '<div class="jssc__carriage-wrapper">' + '<div class="jssc__count"><span>400</span></div>' + '<div class="jssc__left-arrow-wrapper">' + '<div class="jssc__left-arrow"></div>' + '</div>' + '<div class="jssc__carriage"></div>' + '<div class="jssc__right-arrow-wrapper">' + '<div class="jssc__right-arrow"></div>' + '</div>' + '<div class="jssc__bottom-arrow-wrapper">' + '<div class="jssc__bottom-arrow"></div>' + '</div>' + '</div>' + '</div>' + '<div class="jssc__marking"></div>' + '<div class="jssc__temp-sectors">' + '<span>свеча</span>' + '<span>лампа</span>' + '<span>день</span>' + '<span>небо</span>' + '</div>' + '<div class="jssc__input">' + '<input type="text" name="jssc__input">' + '</div>';

var jsscWaveTemplate = '' + '<div class="jssc__hat">' + '<div class="jssc__title"><span>Длина волны, λ</span></div>' + '<div class="jssc__type-link">' + '<span>Температура, К</span>' + '<div class="jssc__type-link-img jssc__type-link-img_temp"></div>' + '</div>' + '</div>' + '<div class="jssc__color-palette jssc__color-palette_wave">' + '<div class="jssc__carriage-wrapper">' + '<div class="jssc__count"><span></span></div>' + '<div class="jssc__left-arrow-wrapper">' + '<div class="jssc__left-arrow"></div>' + '</div>' + '<div class="jssc__carriage"><span></span></div>' + '<div class="jssc__right-arrow-wrapper">' + '<div class="jssc__right-arrow"></div>' + '</div>' + '<div class="jssc__bottom-arrow-wrapper">' + '<div class="jssc__bottom-arrow"></div>' + '</div>' + '</div>' + '</div>' + '<div class="jssc__marking">' + '<span>УФ</span>' + '<span>380-440нм</span>' + '<span>440-485нм</span>' + '<span>485-500нм</span>' + '<span>500-565нм</span>' + '<span>565-590нм</span>' + '<span>590-625нм</span>' + '<span>625-740нм</span>' + '<span>ИК</span>' + '</div>' + '<div class="jssc__input">' + '<input type="text" name="jssc__input">' + '</div>';
var jssc = document.createElement('div');
jssc.insertAdjacentHTML('afterBegin', baseJsscTemplate);
jssc.classList.add('jssc');

var stepsObj = {};

var paletteWidth = void 0,
    carriageWidth = void 0,
    paletteBlockWidth = void 0,
    minLeft = void 0,
    maxLeft = void 0,
    paletteFullWidth = void 0,
    cursorPosition = null;

var wavesRanges = [0, 410, 463, 493, 533, 578, 608, 683, 1000],
    gradientRanges = ['000000', '7100C4', '004DFF', '00B8D9', '00C43A', 'FFFF00', 'FF8C00', 'FF0000', '000000'];

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

			minLeft = -Math.round(carriageWidth / 2);
			maxLeft = paletteWidth - Math.round(carriageWidth / 2);
			setCarriage(stepsObj.wave[0]);
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

function getRange(num) {

	for (var i = 0; i < wavesRanges.length - 1; i++) {
		if (num <= wavesRanges[i + 1] && num >= wavesRanges[i]) {
			return i;
		}
	}

	return false;
}

function getLeft(num) {

	var currentRangeCount = wavesRanges[getRange(num) + 1] - wavesRanges[getRange(num)],
	    currentRangeNMs = num - wavesRanges[getRange(num)],
	    percentage = currentRangeNMs / (currentRangeCount / 100),
	    proportion = percentage / 100;

	return paletteBlockWidth * getRange(num) + paletteBlockWidth * proportion - carriageWidth / 2;
}

function getColor(num) {

	var currentRangeCount = wavesRanges[getRange(num) + 1] - wavesRanges[getRange(num)],
	    currentRangeNMs = num - wavesRanges[getRange(num)],
	    percentage = currentRangeNMs / (currentRangeCount / 100),
	    proportion = percentage / 100;

	var initial = {
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
	    color = void 0;

	for (color in result) {
		result[color] = result[color].length < 2 ? '0' + result[color] : result[color];
	}

	return result.red + result.green + result.blue;
}

function setCarriage(num) {
	var carriageCircle = waveCarriage.querySelector('.jssc__carriage'),
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
	var currentPosition = stepsObj.wave.indexOf(parseInt(waveCarriage.querySelector('.jssc__count span').innerHTML));
	if (currentPosition + 1 < stepsObj.wave.length) {
		setCarriage(stepsObj.wave[currentPosition + 1]);
	}
}

function prevStep() {
	var currentPosition = stepsObj.wave.indexOf(parseInt(waveCarriage.querySelector('.jssc__count span').innerHTML));
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

jsscWaveContent.querySelector('.jssc__carriage').onmousedown = function () {
	jssc.style.cursor = 'none';
	jssc.querySelector('.jssc__left-arrow').style.cursor = 'none';
	jssc.querySelector('.jssc__right-arrow').style.cursor = 'none';
	waveCarriage.querySelector('.jssc__carriage').style.boxShadow = '0 0 15px rgba(0, 0, 0, 0.5)';
	jssc.onmousemove = function (cursor) {
		dragAndDropCarriage(cursor);
	};
};

jssc.onmouseup = function () {
	jssc.style.cursor = '';
	jssc.querySelector('.jssc__left-arrow').style.cursor = '';
	jssc.querySelector('.jssc__right-arrow').style.cursor = '';
	waveCarriage.querySelector('.jssc__carriage').style.boxShadow = '';
	this.onmousemove = function () {};
};
//# sourceMappingURL=all.js.map
