Handlebars.registerHelper('saleImage', function(sale) {
	return [ GlobalSettings.ImageServerURL, 'Sales', sale.ID, sale.ImageID, sale.File].join('/');
});