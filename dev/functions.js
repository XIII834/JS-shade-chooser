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
		divider = (divider === undefined) ? ',' : divider;
		stepsArr = [];
		strArr = strArr.split(divider);
		for (let i = 0; i < strArr.length; i++) {
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