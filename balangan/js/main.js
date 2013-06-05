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

	var up = $('.counter__field__control_up'),
		down = $('.counter__field__control_down'),
		input = $('.counter__field__input'),
		reset = $('.counter__reset'),
		total = $('.counter__total__value');

	function count(e){
		var val = parseFloat(input.val()),
			index = e.data.dir === 'up' ? 1 : -1;

		if(val || val === 0) {
			input.val(val + index);
			total.html((val + index) * PRICE);
		}
	}

	reset.on('click', function(){
		input.val(0);
		total.html(0);
	});

	up.on('click', { dir: 'up' }, count);
	down.on('click', { dir: 'down' }, count);

	input.on('change', function(){
		var val = parseFloat(input.val());
		if(val || val === 0) total.html(val * PRICE);
	})

}());
