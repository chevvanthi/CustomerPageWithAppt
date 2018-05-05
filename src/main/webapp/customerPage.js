$(document).ready(function(){
	
	$('#addCustomer').click(function(){
		  
			if($('#contactFormWrapper').has($(".contactForm")).length ==1) {
				$("#customerPageContainer").removeClass("background_fade");

				return $('#contactFormWrapper .contactForm').remove();

			
			}else{
						$("#customerPageContainer").addClass("background_fade");

						var contactFormView = new customerFormView();
				      	$("#contactFormWrapper").append(contactFormView.render().el);
				      	
				      	
			}
				
	});
	
	
	var retriveModel  = new retriveCustomerData({ID:adminId});
	console.log(retriveModel);
	
	retriveModel.fetch({
		success : function(customerData){
					
					 customerDetails = customerData.attributes;
					 delete customerDetails.ID;
					
					$.each(customerDetails,function(key,value){
						
						var customerValues = {
							
							customerName	: value.customerName,
							customerAddress : value.customerAddress,
							customerCompany : value.customerCompany,
							customerEmail	: value.customerEmail,
							customerMobile  : value.customerMobile,
							randomId		: value.randomId,
							adminId			: value.adminId
						}
						
						var customerModel = new customerDetailsModel(customerValues);
						customerCollections.add(customerModel);
						
						
						var singleCustomerView = new customerNameView(customerModel);
						$('#customerNamesContainer').append(singleCustomerView.render().el);
						
					});
					
					
						var nameContainer 	=   document.getElementById("customerNamesContainer");

						if(nameContainer.children.length!=0)
						{
							
							var customerValues = {
								
								 customerName 		: 	nameContainer.childNodes[3].getAttribute("customerName"),
								 customerAddress	:  	nameContainer.childNodes[3].getAttribute("customerAddress"),
								 customerCompany 	:  	nameContainer.childNodes[3].getAttribute("customerCompany"),
								 customerEmail		:  	nameContainer.childNodes[3].getAttribute("customerEmail"),
								 customerMobile		:   nameContainer.childNodes[3].getAttribute("customerMobile"),
								 randomId			: 	nameContainer.childNodes[3].getAttribute("randomId"),
								 adminId			:   adminId
							}
							
							 var customerModel = new customerDetailsModel(customerValues);
							
							 var email = JSON.parse(customerValues.customerEmail);
							 var mobile = JSON.parse(customerValues.customerMobile);
							 
							 var emailArray  = [];
							 var mobileArray = [];
							 
							 emailArray.push(email);
							 mobileArray.push(mobile);
							 
							 
							 var customerDetailsShow = new customerDetailsView(customerModel);
			 		   		 $('#customerDetailsContainer').html(customerDetailsShow.render().el);
			 		   		 
			 		   		$('#customerNameShow').val(customerValues.customerName);
		 					$('#customerAddressShow').val(customerValues.customerAddress);
		 					$('#customerCompanyShow').val(customerValues.customerCompany);
		 					$('#primaryEmailShow'). val(email[0].email);
			    			$('#primaryMobileShow').val(mobile[0].mobile);


		    				var emailLabel = email[0].label;
		    				
		    				if($("#EmailContainerDetails div:last")[0].querySelector('option[value="'+ emailLabel + '"]')!= null){
			    				$("#EmailContainerDetails div:last")[0].querySelector('option[value="'+ emailLabel + '"]').setAttribute('selected','selected');		
			    				}else {
			    					$("#EmailContainerDetails div:last #EmailLabelShow").append($("<option  selected='selected' value = " +emailLabel+">"+emailLabel+"</option>"));
			    				}
			    				
		    				var mobileLabel = mobile[0].label;
		    				
		    				
		    				
		    				if($("#MobileContainerDetails div:last")[0].querySelector('option[value="'+ mobileLabel + '"]')!= null){
			    				$("#MobileContainerDetails div:last")[0].querySelector('option[value="'+ mobileLabel + '"]').setAttribute('selected','selected');		
			    				}else {
			    					$("#MobileContainerDetails div:last #MobileLabelShow").append($("<option  selected='selected' value = " +mobileLabel+">"+mobileLabel+"</option>"));
			    				}
		    				
		    				
		    				if(emailArray[0].length > 1){
	    						
	    						$.each(emailArray[0],function(key,value){
	    							
	    							if(key == 0){
	    								console.log("don't append");
	    							}else{
	    									var label = value.label;
			    							var email = value.email;
			    							id++;
			    							var emailTemplate =  _.template($('#EmailTemplate').html());
			    							$('#EmailContainerDetails').append(emailTemplate);
			    							
			    							$("#EmailContainerDetails div:last input:last").attr('id', 'customerEmailShow' + id).val(email);
			    							
			    							if($("#EmailContainerDetails div:last")[0].querySelector('option[value="'+ label + '"]')!= null){
			    			    				$("#EmailContainerDetails div:last")[0].querySelector('option[value="'+ label + '"]').setAttribute('selected','selected');		
			    			    				}else {
			    			    					$("#EmailContainerDetails div:last #EmailLabel").append($("<option  selected='selected' value = " +label+">"+label+"</option>"));
			    			    				}
	    							}

	    						  });

	    					}
		    				
							
		    				if(mobileArray[0].length > 1){
	    						
	    						$.each(mobileArray[0],function(key,value){
	    							
	    							if(key == 0){
	    								console.log("don't append");
	    							}else{
		    							var label = value.label;
		    							var mobile = value.mobile;
		    							
		    							var mobileTemplate =  _.template($('#mobileTemplate').html());
		    							$('#MobileContainerDetails').append(mobileTemplate);
		    							
		    							$("#MobileContainerDetails div:last input:last").attr('id', 'customerMobileShow' + id).val(mobile);
		    							

		    							if($("#MobileContainerDetails div:last")[0].querySelector('option[value="'+ label + '"]')!= null){
		    			    				$("#MobileContainerDetails div:last")[0].querySelector('option[value="'+ label + '"]').setAttribute('selected','selected');		
		    			    				}else {
		    			    					$("#MobileContainerDetails div:last #MobileLabel").append($("<option  selected='selected' value = " +label+">"+label+"</option>"));
		    			    				}	    							}
	    						  });

	    					}	
			    			
						}
					
			
		},
		error    : function(){
			console.log('inside the error call')

		}
		
		
	});
	 
	 $('#userIcon').click(function(){
		 
		 if($('#userIconHolder').has($(".userIconPopup")).length ==1) {

				return $('#userIconHolder .userIconPopup').remove();
		 }else{
		 
		 var userIcon  = new userIconView();
		 $('#userIconHolder').append(userIcon.render().el);
		 }
		 
	 });
	
});