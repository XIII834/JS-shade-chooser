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
	'<div class="jssc__title"><span>Температура, К</span></div>' +
	'<div class="jssc__item-information">' + 
		'<a class="jssc__item-title" href="#"></a>' +
		'<span class="jssc__item-article"></span>' +
	'</div>' +
	'<div class="jssc__type-link">' + 
		'<span>Длина волны, λ</span>' +
		'<div class="jssc__type-link-img jssc__type-link-img_wave"></div>' +
	'</div>' +
'</div>' +
'<div class="jssc__color-palette jssc__color-palette_temp">' +
	'<div class="jssc__left-limit-position">' + 
		'<div class="jssc__min-limit-value"><span></span></div>' +
	'</div>' +
	'<div class="jssc__carriage-wrapper">' +
		'<div class="jssc__count"><span>400</span></div>' +
		'<div class="jssc__left-arrow-wrapper">' + 
			'<div class="jssc__left-arrow"></div>' +
		'</div>' +
		'<div class="jssc__carriage"></div>' +
		'<div class="jssc__right-arrow-wrapper">' + 
			'<div class="jssc__right-arrow"></div>' +
		'</div>' +
		'<div class="jssc__bottom-arrow-wrapper">' +
			'<div class="jssc__bottom-arrow"></div>' +
		'</div>' +
	'</div>' +
	'<div class="jssc__right-limit-position">' + 
		'<div class="jssc__max-limit-value"><span></span></div>' +
	'</div>' +
'</div>' +
'<div class="jssc__marking">' + 
	'<span>2200к</span>' +
	'<span>2700-3000к</span>' +
	'<span>4000-4500к</span>' +
	'<span>4800к</span>' +
	'<span>5000-6000к</span>' +
	'<span>7000-7500к</span>' +
	'<span>10000к</span>' +
	'<span>20000к</span>' +
'</div>' +
'<div class="jssc__temp-sectors">' + 
	'<span>свеча</span>' +
	'<span>лампа</span>' +
	'<span>день</span>' +
	'<span>небо</span>' +
'</div>' +
'<div class="jssc__input">' +
	'<input type="text" name="jssc__input" placeholder="Поле для ввода">' +
	'<div class="jssc__input-error"><span>Введите значение температуры (в кельвинах) вручную, или используйте селектор цвета.</span></div>' +
'</div>';

let jsscWaveTemplate = '' +
'<div class="jssc__hat">' +
	'<div class="jssc__title"><span>Длина волны, λ</span></div>' +
	'<div class="jssc__item-information">' + 
		'<a class="jssc__item-title" href="#"></a>' +
		'<span class="jssc__item-article"></span>' +
	'</div>' +
	'<div class="jssc__type-link">' + 
		'<span>Температура, К</span>' +
		'<div class="jssc__type-link-img jssc__type-link-img_temp"></div>' +
	'</div>' +
'</div>' +
'<div class="jssc__color-palette jssc__color-palette_wave">' +
	'<div class="jssc__left-limit-position">' + 
		'<div class="jssc__min-limit-value"><span></span></div>' +
	'</div>' +
	'<div class="jssc__carriage-wrapper">' +
		'<div class="jssc__count"><span></span></div>' +
		'<div class="jssc__left-arrow-wrapper">' + 
			'<div class="jssc__left-arrow"></div>' +
		'</div>' +
		'<div class="jssc__carriage"><span></span></div>' +
		'<div class="jssc__right-arrow-wrapper">' + 
			'<div class="jssc__right-arrow"></div>' +
		'</div>' +
		'<div class="jssc__bottom-arrow-wrapper">' +
			'<div class="jssc__bottom-arrow"></div>' +
		'</div>' +
	'</div>' +
	'<div class="jssc__right-limit-position">' + 
		'<div class="jssc__max-limit-value"><span></span></div>' +
	'</div>' +
'</div>' +
'<div class="jssc__marking">' + 
	'<span>УФ</span>' +
	'<span>380-440нм</span>' +
	'<span>440-485нм</span>' +
	'<span>485-500нм</span>' +
	'<span>500-565нм</span>' +
	'<span>565-590нм</span>' +
	'<span>590-625нм</span>' +
	'<span>625-740нм</span>' +
	'<span>ИК</span>' +
'</div>' +
'<div class="jssc__input">' +
	'<input type="text" name="jssc__input" placeholder="Поле для ввода">' +
	'<div class="jssc__input-error"><span>Введите значение длины волны (в нм) вручную, или используйте селектор цвета.</span></div>' +
'</div>';