var customerDetailsModel = Backbone.Model.extend({
    

	   defaults : 	{
				        customerName 	 : "",
					    customerAddress  : "",
					    customerCompany  : "",
					    customerEmail    :"",
					    customerMobile   :"",
					    randomId 		 :  "",
					    adminId			 : ""
		   
  				   },
  		  		
	  idAttribute : "ID",
	  getCustomUrl: function (method) {

	  		    switch (method) {
	  	        case 'delete':
	  	            return '/deleteCustomer/'+this.id ;
	  	            break;
	  	        case 'create':
	  	            return '/saveCustomerDetails';
	  	            break;
	  	    }
	  	},
	  	sync: function (method, model, options) {
	  	    options || (options = {});
	  	    options.url = this.getCustomUrl(method.toLowerCase());
	  	    
	  	    return Backbone.sync.apply(this, arguments);
	  	}

		  
}); 