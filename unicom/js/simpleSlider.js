/*
 * simpleSlider
 * Author: @smashercosmo
 * Licensed under the MIT license
 *
 */

;(function ( $ ) {

	'use strict';

	/**
	 * @constructor
	 */
	function SimpleSlider(element, options) {
		this.element = element;
		this.$element = $(element);
		this.$navigation = this.$element.find('.simple-slider-navigation');
		this.$slidesContainer = this.$element.find('.simple-slider-slides');
		this.$slides = this.$slidesContainer.find('.simple-slider-slide');
		this.slidesNumber = this.$slides.length;
		this._init(options);
	}

	SimpleSlider.prototype = SimpleSlider.fn = {
		_init: function(options){
			this.options = $.extend({}, $.fn.simpleSlider.defaults);
			this._renderNavigation();
		},
		_renderNavigation: function(){
			var $fragment = $(document.createDocumentFragment());
			for(var i = 0; i < this.slidesNumber; i++){
				$fragment.append(this._renderNavigationItem(i));
			}
			this.$navigation.append($fragment);
		},
		_renderNavigationItem: function(index){
			var $item = $('<span>').data('index', index).addClass('simple-slider-navigation-item'),
				slider = this;

			if(index === 0) $item.addClass('simple-slider-navigation-item__selected');

			$item.on('click', function(){
				slider.$slidesContainer.css('left', -$(this).data('index') * 100 + '%');
				$(this).siblings().removeClass('simple-slider-navigation-item__selected');
				$(this).addClass('simple-slider-navigation-item__selected');
			});

			return $item;
		}
	};

	$.fn.simpleSlider = function (options) {

		return this.each(function(){
			var instance = $.data(this, 'simpleSlider');
			if (!instance) {
				instance = new SimpleSlider(this, options);
				$.data(this, 'simpleSlider', instance);
			}
		});

	};

	$.fn.simpleSlider.defaults = {

	};

})( jQuery );