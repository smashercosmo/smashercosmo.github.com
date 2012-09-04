/**
 * Base namespace for the kos utils functions.  Checks to see kos is
 * already defined in the current scope before assigning to prevent
 * clobbering if kos.js is loaded more than once.
 *
 * @const
 */
var kos = kos || {};

/**
 * Method that encode long guid to base64 hash
 * 064ac530-7d41-4a9c-affb-cda341f497f0 => MMVKBkF9nEqv_82jQfSX8A
 *
 * @param {String} guid Guid to convert
 * @return {String} coverted guid
 */
kos.guidToBase64 = function(guid) {
	if(!guid) return '';

	var bytes = [], i = 16, chars,
		g = guid.replace(/-/g , '');

	bytes[0] = parseInt(g.substr(3 * 2, 2), 16);
	bytes[1] = parseInt(g.substr(2 * 2, 2), 16);
	bytes[2] = parseInt(g.substr(1 * 2, 2), 16);
	bytes[3] = parseInt(g.substr(0 * 2, 2), 16);

	bytes[4] = parseInt(g.substr(5 * 2, 2), 16);
	bytes[5] = parseInt(g.substr(4 * 2, 2), 16);

	bytes[6] = parseInt(g.substr(7 * 2, 2), 16);
	bytes[7] = parseInt(g.substr(6 * 2, 2), 16);

	while (i < g.length - 1) {
		bytes[i / 2] = parseInt(g.substr(i, 2), 16);
		i += 2;
	}

	chars = String.fromCharCode.apply(null, bytes);
	return window.btoa(chars).replace( /\//g , '-').replace( /\+/g , '_').substr(0, 22);
};

/**
 * Method that decodes hashed guid
 * MMVKBkF9nEqv_82jQfSX8A => 064ac530-7d41-4a9c-affb-cda341f497f0
 *
 * @param {String} guid Guid to decode
 * @return {String} decoded guid
 */
kos.guidFromBase64 = function(guid) {
	if(!guid) return '';

	var chars = window.atob(guid.replace(/-/g, '/').replace(/_/g, '+') + '==').split(''),
		bytes = [], i, result = '';

	for (i = 0; i < chars.length; i++) {
		bytes[i] = chars[i].charCodeAt(0);
	}

	function addLeadingZero(number) {
		if (number.toString().length === 2) { return number; }
		else { return '0' + number; }
	}

	result += addLeadingZero(bytes[3].toString(16));
	result += addLeadingZero(bytes[2].toString(16));
	result += addLeadingZero(bytes[1].toString(16));
	result += addLeadingZero(bytes[0].toString(16));
	result += '-';
	result += addLeadingZero(bytes[5].toString(16));
	result += addLeadingZero(bytes[4].toString(16));
	result += '-';
	result += addLeadingZero(bytes[7].toString(16));
	result += addLeadingZero(bytes[6].toString(16));
	result += '-';
	result += addLeadingZero(bytes[8].toString(16));
	result += addLeadingZero(bytes[9].toString(16));
	result += '-';

	for (i = 10; i < chars.length; i++) {
		result += addLeadingZero(bytes[i].toString(16));
	}

	return result;
};

kos.ajax = function(options) {

	var waitDialog = null;

	var xhr = $.ajax({
		type: 'POST',
		dataType: 'json',
		contentType: 'application/json',
		url: options.url,
		data: JSON.stringify(options.data || {}),
		beforeSend: function(){
			if(options.wait) waitDialog = kos.dialog.wait();
			if($.isFunction(options.beforeSend)) { options.beforeSend() }
		},
		complete: function(){
			if(options.wait) waitDialog.destroy();
			if($.isFunction(options.complete)) { options.complete() }
		}
	});

	xhr.done(function (data) {
		data = data.d;
		if (data.Result) {
			if($.isFunction(options.success)) { options.success(data) }
		} else {
			if($.isFunction(options.error)) { options.error(data) }

			/* striping html tags from error messages */
			var message = data.Message.replace(/(<([^>]+)>)/ig, '');

			/* message should start with capital letter */
			message = message.charAt(0).toUpperCase() + message.slice(1);

			/* showing error message */
			if(!options.hideErrors) kos.dialog.error({ title: 'Error', message: message });
		}
	});

	return xhr;
};

/**
 * Base namespace for the kos dialog methods
 *
 * @const
 */
kos.dialog = {};

kos.dialog.popup = function (options) {

	options = $.extend({}, {
		type: 'popup',
		modal: true,
		closeBtn: true
	}, options);

	return notifier.notify(options);
};

kos.dialog.wait =  function(options){

	options = $.extend({}, {
		type: 'wait',
		hideOnEnter: false,
		hideOnEscape: false,
		message: 'Please wait...',
		closeBtn: false,
		loader: true
	}, options);

	return notifier.notify(options);
};