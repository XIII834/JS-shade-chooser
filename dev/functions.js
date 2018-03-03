function jsscContentToggle(isCurrentTemp) {

	if (isCurrentTemp) {
		jsscModal.removeChild(jsscTempContent);
		jsscModal.appendChild(jsscWaveContent);
	} else {
		jsscModal.removeChild(jsscWaveContent);
		jsscModal.appendChild(jsscTempContent);
	}
}

function jsscToggle(isJsscActive, strArr) {

	if (strArr !== undefined) {

		stepsArr = validValusConverter(strArr);
	} else {

		stepsArr = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
	}

	if (isJsscActive) {
		jssc.style.display = 'none';
	} else {
		jssc.style.display = 'flex';

		if (!paletteWidth) {
			paletteWidth = document.querySelector('.jssc__color-palette').offsetWidth;

			carriageWidth = document.querySelector('.jssc__carriage-wrapper').offsetWidth;	

			paletteBlockWidth = Math.round(paletteWidth / 8);

			minLeft = -(Math.round(carriageWidth / 2));
			maxLeft = paletteWidth - Math.round(carriageWidth / 2);

			waveCarriage.style.left = getLeft(800) + 'px';
		}

		console.log(getRange(0));
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