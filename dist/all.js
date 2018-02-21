'use strict';

var baseJsscTemplate = '' + '<div class="jssc__modal">' + '<div class="jssc__modal-close">' + '<svg version="1.1" baseProfile="full" width="20" height="20"' + 'xmlns="http://www.w3.org/2000/svg">' + '<line x1="0" x2="20" y1="0" y2="20" stroke="#9A9EA0"' + ' stroke-width="2"/>' + '<line x1="0" x2="20" y1="20" y2="0" stroke="#9A9EA0"' + ' stroke-width="2"/>' + '</svg>' + '</div>' + '<div class="jssc__content">' + '</div>' + '</div>';

var jsscTempTemplate = '' + '<div class="jssc__hat">' + '<div class="jssc__title">Температура, К</div>' + '<div class="jssc__type-link">' + '<span>Длина волны, λ</span>' + '<div class="jssc__type-link-img jssc__type-link-img_wave"></div>' + '</div>' + '</div>' + '<div class="jssc__color-palette jssc__color-palette_temp">' + '<div class="jssc__carriage-wrapper">' + '<div class="jssc__count"></div>' + '<div class="jssc__left-arrow"></div>' + '<div class="jssc__carriage"></div>' + '<div class="jssc__right-arrow"></div>' + '</div>' + '</div>' + '<div class="jssc__marking"></div>' + '<div class="jssc__temp-sectors">' + '<span>свеча</span>' + '<span>лампа</span>' + '<span>день</span>' + '<span>небо</span>' + '</div>' + '<div class="jssc__input">' + '<input type="number" name="jssc__input">' + '</div>';

var jsscWaveTemplate = '' + '<div class="jssc__hat">' + '<div class="jssc__title">Длина волны, λ</div>' + '<div class="jssc__type-link">' + '<span>Температура, К</span>' + '<div class="jssc__type-link-img jssc__type-link-img_temp"></div>' + '</div>' + '</div>' + '<div class="jssc__color-palette jssc__color-palette_wave">' + '<div class="jssc__carriage-wrapper">' + '<div class="jssc__count"></div>' + '<div class="jssc__left-arrow"></div>' + '<div class="jssc__carriage"></div>' + '<div class="jssc__right-arrow"></div>' + '</div>' + '</div>' + '<div class="jssc__marking"></div>' + '<div class="jssc__input">' + '<input type="number" name="jssc__input">' + '</div>';
var jssc = document.createElement('div');
jssc.insertAdjacentHTML('afterBegin', baseJsscTemplate);
jssc.classList.add('jssc');

var stepsArr = new Array();

var jsscContent = jssc.querySelector('.jssc__content');

var jsscTempContent = jsscContent.cloneNode(true),
    jsscWaveContent = jsscContent.cloneNode(true);
jsscTempContent.insertAdjacentHTML('beforeEnd', jsscTempTemplate);
jsscWaveContent.insertAdjacentHTML('afterBegin', jsscWaveTemplate);

var jsscModal = jssc.querySelector('.jssc__modal');
jsscModal.removeChild(jsscContent);
jsscModal.appendChild(jsscTempContent);

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

function jsscToggle(isJsscActive, strArr, divider) {

	if (strArr !== undefined) {
		divider = divider === undefined ? ',' : divider;
		stepsArr = [];
		strArr = strArr.split(divider);
		for (var i = 0; i < strArr.length; i++) {
			stepsArr.push(strArr[i]);
		}
	} else {
		stepsArr = [100, 200, 300, 400, 500, 600];
	}

	if (isJsscActive) {
		jssc.style.display = 'none';
	} else {
		jssc.style.display = 'flex';
	}
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
