'use strict';

var baseJsscTemplate = '' + '<div class="jssc__modal">' + '<div class="jssc__modal-close">' + '<svg version="1.1" baseProfile="full" width="20" height="20"' + 'xmlns="http://www.w3.org/2000/svg">' + '<line x1="0" x2="20" y1="0" y2="20" stroke="#9A9EA0"' + ' stroke-width="2"/>' + '<line x1="0" x2="20" y1="20" y2="0" stroke="#9A9EA0"' + ' stroke-width="2"/>' + '</svg>' + '</div>' + '<div class="jssc__content">' + '</div>' + '</div>';

var jsscTempTemplate = '' + '<div class="jssc__hat">' + '<div class="jssc__title"><span>Температура, К</span></div>' + '<div class="jssc__type-link">' + '<span>Длина волны, λ</span>' + '<div class="jssc__type-link-img jssc__type-link-img_wave"></div>' + '</div>' + '</div>' + '<div class="jssc__color-palette jssc__color-palette_temp">' + '<div class="jssc__carriage-wrapper">' + '<div class="jssc__count"><span>400</span></div>' + '<div class="jssc__left-arrow-wrapper">' + '<div class="jssc__left-arrow"></div>' + '</div>' + '<div class="jssc__carriage"></div>' + '<div class="jssc__right-arrow-wrapper">' + '<div class="jssc__right-arrow"></div>' + '</div>' + '<div class="jssc__bottom-arrow-wrapper">' + '<div class="jssc__bottom-arrow"></div>' + '</div>' + '</div>' + '</div>' + '<div class="jssc__marking"></div>' + '<div class="jssc__temp-sectors">' + '<span>свеча</span>' + '<span>лампа</span>' + '<span>день</span>' + '<span>небо</span>' + '</div>' + '<div class="jssc__input">' + '<input type="text" name="jssc__input">' + '</div>';

var jsscWaveTemplate = '' + '<div class="jssc__hat">' + '<div class="jssc__title"><span>Длина волны, λ</span></div>' + '<div class="jssc__type-link">' + '<span>Температура, К</span>' + '<div class="jssc__type-link-img jssc__type-link-img_temp"></div>' + '</div>' + '</div>' + '<div class="jssc__color-palette jssc__color-palette_wave">' + '<div class="jssc__carriage-wrapper">' + '<div class="jssc__count"><span>380</span></div>' + '<div class="jssc__left-arrow-wrapper">' + '<div class="jssc__left-arrow"></div>' + '</div>' + '<div class="jssc__carriage"><span>ИК</span></div>' + '<div class="jssc__right-arrow-wrapper">' + '<div class="jssc__right-arrow"></div>' + '</div>' + '<div class="jssc__bottom-arrow-wrapper">' + '<div class="jssc__bottom-arrow"></div>' + '</div>' + '</div>' + '</div>' + '<div class="jssc__marking">' + '<span>УФ</span>' + '<span>380-440нм</span>' + '<span>440-485нм</span>' + '<span>485-500нм</span>' + '<span>500-565нм</span>' + '<span>565-590нм</span>' + '<span>590-625нм</span>' + '<span>625-740нм</span>' + '<span>ИК</span>' + '</div>' + '<div class="jssc__input">' + '<input type="text" name="jssc__input">' + '</div>';
var jssc = document.createElement('div');
jssc.insertAdjacentHTML('afterBegin', baseJsscTemplate);
jssc.classList.add('jssc');

var stepsObj = {};

var paletteWidth = void 0,
    carriageWidth = void 0,
    paletteBlockWidth = void 0,
    minLeft = void 0,
    maxLeft = void 0;

var wavesRanges = [0, 410, 463, 493, 533, 578, 608, 683, 1000];

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

	if (getComputedStyle(jssc).display === 'none') {
		jssc.style.display = 'flex';

		if (!paletteWidth) {
			paletteWidth = document.querySelector('.jssc__color-palette').offsetWidth;

			carriageWidth = document.querySelector('.jssc__carriage-wrapper').offsetWidth;

			paletteBlockWidth = Math.round(paletteWidth / 8);

			minLeft = -Math.round(carriageWidth / 2);
			maxLeft = paletteWidth - Math.round(carriageWidth / 2);

			waveCarriage.style.left = getLeft(0) + 'px';
		}

		console.log(getRange(0));
	} else {
		jssc.style.display = 'none';
	}

	if (strObj.wave !== undefined) {

		stepsObj.wave = validValusConverter(strObj.wave);
	} else {

		stepsObj.wave = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
	}

	if (strObj.temp !== undefined) {

		stepsObj.temp = validValusConverter(strObj.temp);
	} else {

		stepsObj.temp = [2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900, 3000, 3100];
	}
}

function validValusConverter(str) {

	var arr = atr.split(','),
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
	return paletteBlockWidth * getRange(num) + paletteBlockWidth / (wavesRanges[getRange(num) + 1] - wavesRanges[getRange(num)]) - Math.round(carriageWidth / 2);
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
//# sourceMappingURL=all.js.map
