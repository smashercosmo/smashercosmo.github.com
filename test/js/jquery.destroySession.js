;(function ( $ ) {

	/**
	 *
	 *
	 * @param {Array} events Array of the event names
	 * @param {String} ns Namespace
	 * @returns {String} String of namespaced events
	 */
	function namespaceEvents(events, ns){
		var res = [];
		for(var i = 0, l = events.length; i < l; i++){
			res.push([events[i], ns].join('.'))
		}
		return res.join(' ');
	}

	/**
	 * Function that removes cookie
	 * from the browser
	 *
	 * @param {String} name Cookie name
	 */
	function eraseCookie(name) {
		createCookie(name, '', -1);
	}

	/**
	 *
	 * @param {String} authCookie Cookie name
	 * @param {Number} sessionDuration
	 */
	$.destroySession = function(authCookie, sessionDuration){
		var timeout = null,
			guid = Math.floor(1000 + Math.random() * 9000),
			ns = ['destroySession', guid].join(),
			events = namespaceEvents(['mousedown', 'mousemove', 'keydown'], ns);

		function destroySession(){
			$(document).off(events);
			eraseCookie(authCookie);
		}

		$(document).on(events, function(){
			clearTimeout(timeout);
			timeout = setTimeout(destroySession, sessionDuration);
		});

	};

})( jQuery );