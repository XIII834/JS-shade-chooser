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

			minLeft = -(Math.round(carriageWidth / 2));
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

	let arr = atr.split(','),
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
	return paletteBlockWidth * getRange(num) + paletteBlockWidth / (wavesRanges[getRange(num) + 1] - wavesRanges[getRange(num)]) - Math.round(carriageWidth / 2);
}