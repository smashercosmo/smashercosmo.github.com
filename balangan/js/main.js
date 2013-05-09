// toggle side menu sections
$('.side-menu').on('click', '.side-menu__item__triangle', function(e){
	$(this).closest('li').andSelf().toggleClass('opened');
	e.preventDefault();
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
