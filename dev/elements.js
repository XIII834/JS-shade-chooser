let jssc = document.createElement('div');
	jssc.insertAdjacentHTML('afterBegin', baseJsscTemplate);
	jssc.classList.add('jssc');

let stepsObj = {};

let paletteWidth, carriageWidth, paletteWaveBlockWidth,
	paletteTempBlockWidth, paletteFullWidth, cursorPosition = null,
	leftTempLimitPosition, rightTempLimitPosition, leftWaveLimitPosition, rightWaveLimitPosition;

let wavesRanges = [0, 410, 463, 493, 533, 578, 608, 683, 1000],
	gradientWaveRanges = ['000000', '7100C4', '004DFF', '00B8D9', '00C43A', 'FFFF00', 'FF8C00', 'FF0000', '000000'],
	tempsRanges = [2200, 2850, 4250, 4800, 5500, 7250, 10000, 20000],
	gradientTempRanges = ['DC841A', 'F7C16B', 'FFECC1', 'FFFAEA', 'E4F5FD', '92B9D6', '5D90BF', '0000A2'];

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