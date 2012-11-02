$(function(){

	$('.simple-slider').simpleSlider();

	$('.index-page-tabs dt').on('click', function(){
		$(this)
			.siblings().removeClass('index-page-tab__selected index-page-tab-content__selected').end()
			.next().addClass('index-page-tab-content__selected').end()
			.addClass('index-page-tab__selected')
	});

});