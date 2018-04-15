var customerNameView = Backbone.View.extend({
tagName 	: 'ul',
events		:{
				"click #deleteCustomer " : "deleteCustomer",
			 },
deleteCustomer : function(){
	
				var target = $(event.currentTarget).parent();
				var randomId = target[0].children[0].getAttribute('randomid')

				
				var deleteModel = new customerDetailsModel({ID:randomId});
				customerCollections.remove(deleteModel);
				target.remove();
				
				deleteModel.destroy({
						
				    success: function (model, respose, options) {
				    	alert('contact deleted succesfully');
				    },
				    error: function (model, xhr, options) {
				        console.log("Something went wrong while deleting the model");
				    }
				});				

	
	
},
render    	: function(){
				
				
				customerCollections.forEach(function(model){
					console.log(model.get('customerName'));
					customerName = model.get('customerName');
				})
				
				this.$el.append($("<li id='customerName-li'>" + customerName +"</li>"))
				this.$el.append($("<button id='deleteCustomer'>X</button>"));
				return this;
}

});


var customerDetailsView = Backbone.View.extend({

tagName : 'div',
id :'customerDetailsShow',
template  : _.template($('#customerFormTemplate').html()),

render	  : function(){
				
				this.$el.html(this.template());
				return this;

}

	
});