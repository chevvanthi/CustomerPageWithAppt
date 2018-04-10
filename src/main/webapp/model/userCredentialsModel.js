var userCredentialModel = Backbone.Model.extend({
	
	defaults : 
	{
		userID :'',
		userPassword :''
		
	},
	urlRoot : '/login'
});

var signupModel = Backbone.Model.extend({
	
	defaults : 
		{
		 userID : "",
		 userPassword : ""
		},
		urlRoot : "/register"

});