let jssc = document.createElement('div');
jssc.classList.add('jssc');

jssc.insertAdjacentHTML('beforeEnd', '<div class="jssc__modal">' +
	'<div class="jssc__modal-close">test</div>' +
	'</div>');

document.body.appendChild(jssc);