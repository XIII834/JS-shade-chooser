let baseJsscTemplate = '' +
'<div class="jssc__modal">' +
	'<div class="jssc__modal-close">' + 
		'<svg version="1.1" baseProfile="full" width="20" height="20"' +
		'xmlns="http://www.w3.org/2000/svg">' +
			'<line x1="0" x2="20" y1="0" y2="20" stroke="#9A9EA0"' + 
			' stroke-width="2"/>' + 
			'<line x1="0" x2="20" y1="20" y2="0" stroke="#9A9EA0"' + 
			' stroke-width="2"/>' + 
		'</svg>' +
	'</div>' +
	'<div class="jssc__content">' +

	'</div>' +
'</div>';

let jsscTempTemplate = '' +
'<div class="jssc__hat">' +
	'<div class="jssc__title">Температура, К</div>' +
	'<div class="jssc__type-link">Длина волны, λ</div>' +
'</div>' +
'<div class="jssc__color-palette">' +
	'<div class="jssc__carriage-wrapper">' +
		'<div class="jssc__count"></div>' +
		'<div class="jssc__left-arrow"></div>' +
		'<div class="jssc__carriage"></div>' +
		'<div class="jssc__right-arrow"></div>' +
	'</div>' +
'</div>' +
'<div class="jssc__marking"></div>' +
'<div class="jssc__temp-sectors">' + 
	'<span>свеча</span>' +
	'<span>лампа</span>' +
	'<span>день</span>' +
	'<span>небо</span>' +
'</div>' +
'<div class="jssc__input">' +
	'<input type="number" name="jssc__input">' +
'</div>';

let jsscWaveTemplate = '' +
'<div class="jssc__hat">' +
	'<div class="jssc__title">Длина волны, λ</div>' +
	'<div class="jssc__type-link">Температура, К</div>' +
'</div>' +
'<div class="jssc__color-palette">' +
	'<div class="jssc__carriage-wrapper">' +
		'<div class="jssc__count"></div>' +
		'<div class="jssc__left-arrow"></div>' +
		'<div class="jssc__carriage"></div>' +
		'<div class="jssc__right-arrow"></div>' +
	'</div>' +
'</div>' +
'<div class="jssc__marking"></div>' +
'<div class="jssc__input">' +
	'<input type="number" name="jssc__input">' +
'</div>';