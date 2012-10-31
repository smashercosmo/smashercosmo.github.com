$(function(){
	$('.show-hide-navigation').on('click', 'span', function(e){
		var index = 0,
			nav = $(e.delegateTarget),
			$this = $(this),
			$spans = nav.find('span'),
			$hidden = nav.next().find('> div');

		index = $spans.index($this);
		$hidden.add($spans).removeClass('selected');
		$this.addClass('selected');
		$hidden.eq(index).addClass('selected');
	});

	$('.choose-resort').on('click', 'li:first-child', function(e){
		$('.choose-resort').toggleClass('choose-resort-opened');
		e.preventDefault();
		e.stopPropagation();
	});

	$(document).on('click keydown', function(e){
		var chr = $('.choose-resort');
		if(e.type === 'click'){ chr.removeClass('choose-resort-opened'); }
		if(e.type === 'keydown' && e.keyCode === 27) { chr.removeClass('choose-resort-opened'); }

	});

	$('.ad-gallery img').each(function(){
		$(this).data('ad-desc', $(this).parent().attr('title'));
	});

	var galleries = $('.ad-gallery').adGallery({
		description_wrapper: $('.ad-description'),
		display_next_and_prev: true,
		display_back_and_forward: true,
		callbacks: {
			afterImageVisible: function() {
				$('.ad-image-description').show();
			},
			beforeImageVisible: function() {
				$('.ad-image-description').hide();
			}
		}
	});

});