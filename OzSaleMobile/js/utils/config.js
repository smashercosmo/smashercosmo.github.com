var GlobalSettings = $('#GlobalSettings').data('settings').JsonValue;

/* to remove trailing slash from (http://cdn1.apacsale.com/ => http://cdn1.apacsale.com) */
GlobalSettings.ImageServerURL = GlobalSettings.ImageServerURL.slice(0, -1);

/* common settings for notification system */
var notifier = new Backbone.Notifier({
	baseCls: 'notifier',
	theme: 'clean',
	types: ['popup', 'wait'],
	type: null,
	dialog: true,
	title: '',
	closeBtn: true,
	ms: false,
	hideOnClick: false,
	fadeInMs: 0,
	fadeOutMs: 0,
	position: 'center',
	zIndex: 10000
});

/* overriding backbone method to fix bugs with symbol characters in urls */
(function () {
	var routeStripper = /^[#\/]/;
	Backbone.History.prototype.getFragment = function (fragment, forcePushState) {
		if (fragment == null) {
			if (this._hasPushState || !this._wantsHashChange || forcePushState) {
				fragment = this.location.pathname;
				var root = this.options.root.replace(trailingSlash, '');
				if (!fragment.indexOf(root)) fragment = fragment.substr(root.length);
			} else {
				fragment = this.getHash();
			}
		}
		/**
		 *  that how it was originally:
		 *  return encodeURIComponent((fragment.replace(routeStripper, ''));
		 */
		return (fragment.replace(routeStripper, ''));
	};
})();