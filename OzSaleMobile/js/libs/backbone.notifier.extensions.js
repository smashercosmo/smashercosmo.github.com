(function(Notifier, $){

	Notifier.regModule({
		name: 'hideOnOverlayClick',
		enabled: true,
		extend: {
			defaults: {
				'hideOnOverlayClick': true
			}
		},
		events: {
			'afterAnimateInMsgEl': function(settings, scope, msgEl, msgInner){

				if(settings.hideOnOverlayClick && msgInner.screenEl){
					msgInner.screenEl.on('click', function(){
						msgInner.destroy();
					})
				}

			}
		}
	});

	Notifier.regModule({
		name: 'hideOnEscapeClick',
		enabled: true,
		extend: {
			defaults: {
				'hideOnEscape': true
			}
		},
		events: {
			'afterAnimateInMsgEl': function(settings, scope, msgEl, msgInner){

				if(settings.hideOnEscape){
					$(document).on('keydown.notifierEscapeKey', function(e){
						if(e.keyCode === 27) msgInner.destroy();
					})
				}

			},
			'afterDestroyMsgEl': function(settings, scope, msgEl, msgInner){

				if(settings.hideOnEscape){
					$(document).off('keydown.notifierEscapeKey');
				}

			}
		}
	});

	Notifier.regModule({
		name: 'hideOnEnter',
		enabled: true,
		extend: {
			defaults: {
				'hideOnEnter': true
			}
		},
		events: {
			'afterAnimateInMsgEl': function(settings, scope, msgEl, msgInner){

				if(settings.hideOnEnter){
					$(document).on('keydown.notifierEnterKey', function(e){
						if(e.keyCode === 13)
							msgInner.destroy();
					})
				}

			},
			'afterDestroyMsgEl': function(settings, scope, msgEl, msgInner){

				if(settings.hideOnEnter){
					$(document).off('keydown.notifierEnterKey');
				}

			}
		}
	});

})(Backbone.Notifier, jQuery);