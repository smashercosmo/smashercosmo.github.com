$('.side-menu').on('click', '.side-menu-item-triangle', function(e){
	$(this).closest('li').andSelf().toggleClass('opened');
	e.preventDefault();
});