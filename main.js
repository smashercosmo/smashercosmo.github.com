_.templateSettings = {
	interpolate : /\{\{(.+?)\}\}/g
};

var router = new (Backbone.Router.extend({
	routes: {
		':category': 'showItems',
		'*path': 'showCategories'
	},
	showItems: function(category){
		eventEmitter.trigger('showItems', category);
	},
	showCategories: function(){
		eventEmitter.trigger('showCategories');
	}
}));

var spinnerConfig = {
	lines: 11, // The number of lines to draw
	length: 11, // The length of each line
	width: 5, // The line thickness
	radius: 8, // The radius of the inner circle
	rotate: 0, // The rotation offset
	color: '#000', // #rgb or #rrggbb
	speed: 1.2, // Rounds per second
	trail: 80, // Afterglow percentage
	shadow: false, // Whether to render a shadow
	hwaccel: false, // Whether to use hardware acceleration
	className: 'spinner', // The CSS class to assign to the spinner
	zIndex: 2e9, // The z-index (defaults to 2000000000)
	top: '50%', // Top position relative to parent in px
	left: '50%', // Left position relative to parent in px
	position: 'absolute'
};

var data = [{ category: 'men' }, { category: 'women' }, { category: 'kids' }, { category: 'all' }];

var eventEmitter = _.extend({}, Backbone.Events);

/* ------------------------------------------------ APPLICATION START ----------------------------------------------- */

var categoriesCollection = new (Backbone.Collection.extend({
	model: Backbone.Model.extend({
		defaults: {
			selected: false
		}
	})
}));

var itemsCollection = new (Backbone.Collection.extend({
	model: Backbone.Model.extend({})
}));

var CategoryView = Backbone.View.extend({
	tagName: 'li',
	template: _.template('<a href="#{{ category }}" title="{{ category }}">{{ category }}</a>'),
	render: function(){
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});

var CategoriesView = Backbone.View.extend({
	className: 'categories',
	initialize: function(){
		this.$list = $('<ul>');
		_.bindAll(this);
	},
	render: function(){
		this.collection.each(this.addCategory);
		this.$el.append(this.$list);
		return this;
	},
	addCategory: function(model){
		var listItem = new CategoryView({ model: model });
		this.$list.append(listItem.render().el);
	}
});

var ItemsSectionView = Backbone.View.extend({
	className: 'items-section',
	initialize: function(){
		_.bindAll(this);
		eventEmitter.on('showItems', this.scrollToSection);
		eventEmitter.on('showCategories', this.stopLoading);
		eventEmitter.on('itemsLoaded', this.resetHeight);
		eventEmitter.on('itemsLoaded', this.insertContent);
		$(window).on('scroll', this.insertContent);
		this.spinner = new Spinner(spinnerConfig);
		this.adjustHeight();
	},
	template:_.template('<span class="category-name" title="{{ category }}">{{ category }}</span><div class="items-list"></div>'),
	render: function(){
		this.$el.html(this.template(this.model.toJSON()));
		this.$itemsList = this.$el.find('.items-list');
		return this;
	},
	adjustHeight: function(){
		this.$el.css('height', $(window).height())
	},
	resetHeight: function(){
		if(this.loaded){
			this.$el.css('height', 'auto');
		}
	},
	scrollToSection: function(category){
		this.visible = true;
		if(this.model.get('category') === category){
			$(window).scrollTop(this.$el.offset().top);
		}
		this.insertContent();
	},
	insertContent: function(){
		var i = 10, that = this;
		setTimeout(function(){
			if(!that.loaded && !that.loading && that.insideViewport() && that.visible){
				that.loading = true;
				that.spinner.spin(that.el);
				that.timeout = setTimeout(function(){

					while(i--){
						that.$itemsList.append($('<div>'))
					}

					that.loaded = true;
					that.loading = false;
					that.spinner.stop();
					eventEmitter.trigger('itemsLoaded');
				}, 2000);
			}
		}, 0);
	},
	insideViewport: function(){
		var scrollPosition = $(window).scrollTop(),
			offsetPosition = this.$el.offset().top,
			height = this.$el.height();
		return (offsetPosition >= scrollPosition && offsetPosition < scrollPosition + $(window).height()) || (offsetPosition + height > scrollPosition && offsetPosition + height <= scrollPosition + $(window).height());
	},
	stopLoading: function(){
		this.visible = false;
	}
});

var ItemsView = Backbone.View.extend({
	className: 'items',
	initialize: function(){
		_.bindAll(this);
		eventEmitter.on('showItems', this.show);
		eventEmitter.on('pageLoad', this.onPageLoad);
	},
	render: function(){
		this.collection.each(this.addItemSection);
		return this;
	},
	addItemSection: function(model){
		var section = new ItemsSectionView({ model: model });
		this.$el.append(section.render().el);
	},
	show: function(){
		this.$el.show();
	},
	hide: function(){
		this.$el.hide();
	},
	onPageLoad: function(page){
		if(page === 'categories'){
			this.hide();
		}
	}
});

var PageView = Backbone.View.extend({
	el: '.container',
	initialize: function(){
		_.bindAll(this);
		eventEmitter.on('showItems', this.showItems);
		eventEmitter.on('showCategories', this.showCategories);
		this.el.addEventListener('webkitAnimationEnd', this.onTransitionEnd, false);
		this.render();
	},
	render: function(){
		/* filling collections with data */
		categoriesCollection.reset(data);
		itemsCollection.reset(data);

		/* initializing views */
		this.categoriesView = new CategoriesView({ collection: categoriesCollection });
		this.itemsView = new ItemsView({ collection: itemsCollection });

		/* appending views content to the page */
		this.$el.append(this.categoriesView.render().el);
		this.$el.append(this.itemsView.render().el);
	},
	onTransitionEnd: function(){
		eventEmitter.trigger('pageLoad', this.page);
	},
	showItems: function(){
		/* if it's a first time we load a page
		 * we don't need any transition
		 */
		if(this.page){
			this.$el
				.addClass('items-list-page')
				.removeClass('categories-page');
		}
		this.page = 'items';
	},
	showCategories: function(){
		/* if it's a first time we load a page
		 * we don't need any transition
		 */
		if(this.page){
			this.$el
				.addClass('categories-page')
				.removeClass('items-list-page');
		}
		this.page = 'categories';
	}
});

$(function(){

	new PageView();
	Backbone.history.start({ root: window.location.pathname });

});

