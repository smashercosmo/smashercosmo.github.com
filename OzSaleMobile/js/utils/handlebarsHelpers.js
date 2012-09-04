Handlebars.registerHelper('saleImage', function(sale) {
	return [ GlobalSettings.ImageServerURL, 'Sales', sale.ID, sale.NormalImageID, sale.NormalFile].join('/');
});