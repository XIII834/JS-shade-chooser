let jssc = document.createElement('div');
	jssc.insertAdjacentHTML('afterBegin', baseJsscTemplate);
	jssc.classList.add('jssc');

let stepsArr = new Array();

let jsscContent = jssc.querySelector('.jssc__content');

let	jsscTempContent = jsscContent.cloneNode(true),
	jsscWaveContent = jsscContent.cloneNode(true);
jsscTempContent.insertAdjacentHTML('beforeEnd', jsscTempTemplate);
jsscWaveContent.insertAdjacentHTML('afterBegin', jsscWaveTemplate);

let jsscModal = jssc.querySelector('.jssc__modal');
jsscModal.removeChild(jsscContent);
jsscModal.appendChild(jsscTempContent);


document.body.appendChild(jssc);