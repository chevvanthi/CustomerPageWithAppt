$(document).ready(function(){
	
	$('#addCustomer').click(function(){
		  
			if($('#contactFormWrapper').has($(".contactForm")).length ==1) {
	
				return $('#contactFormWrapper .contactForm').remove();
			
			}else{
						var contactFormView = new customerFormView();
				      	$("#contactFormWrapper").append(contactFormView.render().el);
				      	
			}
				
	});

});