// toggle side menu sections
$('.side-menu').on('click', '.side-menu__item__triangle', function(e){
	$(this).closest('li').andSelf().toggleClass('opened');
	e.preventDefault();
});

// toggle catalog eye
$('.catalog__item__look').on('click', function(){
    $(this).toggleClass('catalog__item__look_disabled');
});

// Buy points slider
(function(){

	var POINTS_EXCHANGE_RATE = 43;

	var moneyInput = $('.buy-points__control__field__input_money'),
		pointsInput = $('.buy-points__control__field__input_points'),
		leftArrow = $('.buy-points__control__slider__arrow_left'),
		rightArrow = $('.buy-points__control__slider__arrow_right'),
		slider = $('.buy-points__control__slider__range').slider({
			orientation: 'horizontal',
			range: 'min',
			animate: false,
			slide: bindInputs,
			change: bindInputs
		});

	function bindInputs(event, ui){
		moneyInput.val(ui.value);
		pointsInput.val(ui.value * POINTS_EXCHANGE_RATE);
	}

	slider.slider('value', slider.data('value'));

	moneyInput.on('change', function() {
		slider.slider('value', moneyInput.val() );
	});

	pointsInput.on('change', function() {
		slider.slider('value', pointsInput.val() / POINTS_EXCHANGE_RATE );
	});

	leftArrow.on('click', function(){
		slider.slider('value', slider.slider('value') - 1 );
	});

	rightArrow.on('click', function(){
		slider.slider('value', slider.slider('value') + 1 );
	});

}());

// counter
(function(){

	/* this is fake constant. just for demo purposes. feel free to delete and change logic */
	var PRICE = 200;

	var counter = $('.counter');

	function count(e){
		var input = $(e.delegateTarget).find('.counter__field__input'),
			total = $(e.delegateTarget).find('.counter__total__value'),
			val = parseFloat(input.val()), newVal,
			index = e.data.dir === 'up' ? 1 : -1;

		if(val || val === 0) {
			newVal = val + index;
			if(newVal >= 0){
				input.val(newVal);
				total.html(newVal * PRICE);
			}
		}
	}

	counter.on('click', '.counter__reset', function(e){
		$(e.delegateTarget).find('.counter__field__input').val(0);
		$(e.delegateTarget).find('.counter__total__value').html(0);
	});

	counter.on('click', '.counter__field__control_up', { dir: 'up' }, count);
	counter.on('click', '.counter__field__control_down', { dir: 'down' }, count);

	counter.on('change', '.counter__field__input', function(e){
		var val = parseFloat($(this).val());
		if(val || val === 0) $(e.delegateTarget).find('.counter__total__value').html(val * PRICE);
	})

}());

// counter-input
(function(){

	var counter = $('.counter-input');

	function count(e){
		var input = $(e.delegateTarget).find('input'),
			val = parseFloat(input.val()), newVal,
			index = e.data.dir === 'up' ? 1 : -1;

		if(val || val === 0) {
			newVal = val + index;
			if(newVal >= 0) input.val(newVal);
		}
	}

	counter.on('click', '.counter-input__control_up', { dir: 'up' }, count);
	counter.on('click', '.counter-input__control_down', { dir: 'down' }, count);

}());

var cityPopup = $('#cityPopup').dialog({
	autoOpen: true,
	modal: true,
	dialogClass: 'popup',
	width: 500,
	open: function(e){
		$(e.target).find('.popup__close').on('click', function(){
			cityPopup.dialog('close');
		})
	}
});


