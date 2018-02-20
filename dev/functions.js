function jsscContentToggle(isCurrentTemp) {

	if (isCurrentTemp) {
		jsscModal.removeChild(jsscTempContent);
		jsscModal.appendChild(jsscWaveContent);
	} else {
		jsscModal.removeChild(jsscWaveContent);
		jsscModal.appendChild(jsscTempContent);
	}
}

function jsscToggle(isJsscActive, arr) {

	if (arr !== undefined) {
		stepsArr = [];
		arr.forEach((elem) => {
			stepsArr.push(elem);
		});
	}

	if (isJsscActive) {
		jssc.style.display = 'none';
	} else {
		jssc.style.display = 'flex';
	}
}