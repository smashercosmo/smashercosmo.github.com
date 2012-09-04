$(function(){
	$.ajax({
		url: 'data/shop.json',
		dataType: 'json',
		success: function(data){
			$('.sales').html(Handlebars.templates.shopSection(data.d));
		}
	});
});



