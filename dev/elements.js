let jssc = document.createElement('div');
	jssc.insertAdjacentHTML('afterBegin', baseJsscTemplate);
	jssc.classList.add('jssc');

let stepsObj = {};

let paletteWidth, carriageWidth, paletteBlockWidth, minLeft, maxLeft,
	paletteFullWidth, cursorPosition = null;

let wavesRanges = [0, 410, 463, 493, 533, 578, 608, 683, 1000],
	gradientRanges = ['000000', '7100C4', '004DFF', '00B8D9', '00C43A', 'FFFF00', 'FF8C00', 'FF0000', '000000'];

let jsscContent = jssc.querySelector('.jssc__content');

let	jsscTempContent = jsscContent.cloneNode(true),
	jsscWaveContent = jsscContent.cloneNode(true);
jsscTempContent.insertAdjacentHTML('beforeEnd', jsscTempTemplate);
jsscWaveContent.insertAdjacentHTML('afterBegin', jsscWaveTemplate);

let jsscModal = jssc.querySelector('.jssc__modal');
jsscModal.removeChild(jsscContent);
jsscModal.appendChild(jsscTempContent);

let waveCarriage = jsscWaveContent.querySelector('.jssc__carriage-wrapper'),
	tempCarriage = jsscTempContent.querySelector('.jssc__carriage-wrapper');

document.body.appendChild(jssc);