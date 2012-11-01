(function(){

	/* -------------------------------------------- SIMPLE PARALLAX START ------------------------------------------- */

	var prevMousePosition = 0, mousePosition = 0, dir = 'stop',
		$cityFront = $('.coming-soon-city-front'), $cityBack = $('.coming-soon-city-back');


	$(document).on('mousemove', function(e){
		if(e.pageX > prevMousePosition && dir !== 'left') {
			$cityFront
				.stop()
				.animate({ 'backgroundPositionX': '-=2000' }, 10000, 'linear');
			$cityBack
				.stop()
				.animate({ 'backgroundPositionX': '-=1000' }, 10000, 'linear');

			dir = 'left';
		}
		if (e.pageX < prevMousePosition && dir !== 'right') {
			$cityFront
				.stop()
				.animate({ 'backgroundPositionX': '+=2000' }, 10000, 'linear');
			$cityBack
				.stop()
				.animate({ 'backgroundPositionX': '+=1000' }, 10000, 'linear');

			dir = 'right';
		}
		prevMousePosition = e.pageX;
	});

	setTimeout(function checkMousePosition(){
		if(mousePosition === prevMousePosition){
			dir = 'stop';
			$cityFront.stop();
			$cityBack.stop();
		}
		mousePosition = prevMousePosition;
		setTimeout(checkMousePosition, 10);
	}, 10);

	/* -------------------------------------------- SIMPLE PARALLAX END --------------------------------------------- */


	/* -------------------------------------------- TEXT ANIMATION START -------------------------------------------- */

	/* adding animation only for modern browsers */

	if($.support.opacity){

		var queue = {}, sprite;

		function addAnimation(selector, speed, delay){
			$(queue).queue('chain', function(next){
				$(selector).delay(delay || 0).animate({
					opacity: 1,
					top: 0
				}, speed, 'linear', function(){ next(); });
			});
		}

		$('.coming-soon-question, .coming-soon-promise, .coming-soon-date, .coming-soon-desc').css({opacity: 0, display: 'block'});
		$('.coming-soon-social-twitter, .coming-soon-social-google, .coming-soon-social-vk, .coming-soon-social-fb').css({opacity: 0, display: 'inline-block'});

		addAnimation('.coming-soon-question', 500, 1000);
		addAnimation('.coming-soon-promise', 500);
		addAnimation('.coming-soon-date', 500);
		addAnimation('.coming-soon-desc', 500);
		addAnimation('.coming-soon-social-twitter', 180, 250);
		addAnimation('.coming-soon-social-google', 180);
		addAnimation('.coming-soon-social-vk', 180);
		addAnimation('.coming-soon-social-fb', 180);


		/* we should start animation only after image is completely loaded */

		sprite = document.createElement('img');
		sprite.src = 'images/coming-soon-sprite.png';

		if(sprite.complete){
			$(queue).dequeue('chain');
		} else {
			$(sprite).on('load', function(){
				$(queue).dequeue('chain');
			})
		}

	}

	/* -------------------------------------------- TEXT ANIMATION END ---------------------------------------------- */


}());



