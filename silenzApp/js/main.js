(function(){
	'use strict';

	function getQueryString(){
		var keyValues = document.location.search.substr(1).split('&'),
			obj = {}, keyValue;

		for(var i = 0, l = keyValues.length; i < l; i++){
			keyValue = keyValues[i].split('=');
			obj[keyValue[0]] = keyValue[1];
		}

		return obj;
	}

	function createCookie(name, value, days) {
		var expires, date;

		if (days) {
			date = new Date();
			date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
			expires = '; expires=' + date.toGMTString();
		}
		else expires = '';

		document.cookie = name + '=' + value + expires + '; path=/';
	}

	function readCookie(name) {
		var nameEQ = name + '=',
			ca = document.cookie.split(';'), c;

		for(var i = 0; i < ca.length; i++) {
			c = ca[i];
			while (c.charAt(0) == ' ') c = c.substring(1, c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
		}

		return null;
	}

	function JSONp(u, cb) {
		var a = JSONp._c = (JSONp._c || 0) + 1,
			b = 'gdeslonjsonprequest_' + a,
			c = document,
			d = c.head,
			s = c.createElement('script');

		window[b] = function () {
			d.removeChild(s);
			cb.apply(cb, arguments);
			cb = c = d = s = null;
		};
		s.src = u.replace('{callback}', b);
		d.appendChild(s);
	}

	function main(){
		var qs = getQueryString()['aff_id'],
			aff_id = qs || readCookie('aff_id');

		if(qs) createCookie('aff_id', qs, 30);
		if(aff_id){
			JSONp('http://afternoon-reef-3203.herokuapp.com/secret/?callback={callback}&aff_id=' + aff_id, function(response) {
				alert(response.data);
			});
		}
	}

	main();

}());