/**
 * Toggle current state for navigation items
 */

$('.b-list').on('click', '.b-list__item', function(){
	$(this)
		.siblings()
		.removeClass('b-list__item_type_current')
		.end()
		.addClass('b-list__item_type_current')
});