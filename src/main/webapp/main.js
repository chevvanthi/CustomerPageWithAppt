$(document).ready(function(){
	
	$('#signUpContainer').hide();
	$('#forgotPasswordContainer').hide();
	
	$('#signUpPage').click(function(){
			
			$('#print').show();

			$('#wrongPasswordErrorMsg').hide();
			$('#loginContainer').hide();
			$('#signUpContainer').show();

	});
	
	$('#loginPage').click(function(){
			
			$('#print').hide();
			$('#signUpContainer').hide();
			$('#userId').empty();
			$('#userPassword').empty();
			$('#loginContainer').show();


	});
	
	$('#forgotPassword').click(function(){
		$('#forgotPasswordContainer').show();
		$('#loginContainer').hide();
		
	});
	
	$('#BacktoLoginPage').click(function(){
		$('#resetPasswordSuccess').hide();
		$('#loginContainer').show();
		$('#forgotPasswordContainer').hide();

	});
	
	var validateEmail = function (email) {
						
						var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
						return re.test(email);
					}

	
	$('#login').click(function(event){
	       
			event.preventDefault();
			event.stopPropagation();

			var userCredentials =
			  	   {
						userID         : $('#userId').val(),
						userPassword   : $("#userPassword").val(),
			  	   }					  
 
			 var loginModel = new userCredentialModel(userCredentials);
		   
		       if(userCredentials.userId == ""||null){
		    	   alert("please enter your email");
		       }else if(userCredentials.userPassword ==""|| null){
		    	   alert("enter the password");
		       }else if(!validateEmail(userCredentials.userID)){
		    	   alert("please enter valid email adderss");
		       }
		       
	       else{
	      
	    	   loginModel.save({},{
	    		   success : function(model,xhr,option){
	    			   			console.log("insode the success call " + JSON.stringify(xhr));
	    			   			
	    			   			if(xhr.status =="RegisterPage"){
	    			   				document.getElementById('print').innerHTML = 'Please register First'
	    			   				$('#loginContainer').hide();
	    			   				$('#signUpContainer').show();

	    			   			}else if(xhr.status == "success"){
	    			   				$('#wrongPasswordErrorMsg').hide();
        		   					window.location.href='/customerPage';
	    			   					
	    			   			}else if(xhr.status == "wrongPassword"){
	    			   				console.log('inside the wrong password');
	    			   				document.getElementById('wrongPasswordErrorMsg').innerHTML = 'OOPS!!! Wrong Password';
	    			   			}
	    		   			},
	    		   	error  : function(model,xhr,option){
			   					console.log("insode the error call " + JSON.stringify(xhr));

	    		   			}
	    	 });
	       }
	
	});
	
	$('#register').click(function(){
		event.preventDefault();
		event.stopPropagation();

		
		var customerRegisterCredentials	=
		{
				userID 		 : $('#RegisteruserId').val(),
				userPassword : $('#RegisteruserPassword').val()
					
		}
		
		var signUpModel = new signupModel(customerRegisterCredentials);
		
		
		if(customerRegisterCredentials.customerRegisterEmail == "" ||null){
			alert("please ente the email")
		}else if(customerRegisterCredentials.customerRegisterPassword == ""||null ){
			alert("please enter the password")
		}else if(!validateEmail(customerRegisterCredentials.userID)){
			alert("please enter the valid email address");
		}
		
		else{
			
			signUpModel.save({},{
	        	   
	        	   dataType : "	json",
	        	   success	:  function(model,xhr,option)
	        	   				{	
	        		   				if(xhr.status == "success"){
	        		   					window.location.href='/customerPage';
	        		   				}else if(xhr.status =="userNameExits"){
	        		   					alert("userId already there");
	        		   					document.getElementById('userIdErroMsg').innerHTML ="Email id already exist";
	        		   				}

	        	   				},
	        	   	error    : function(model,xhr,option){
	        	   			
	        	   				}
			});
		}
		
		});
	
	$('#forgotPasswordButton').click(function(){
		
		var userCredentials = {
				userCredentials   : $('#forgotPassworduseId').val(),
				 userPassword     : $('#newPassword').val()
			}
			
		
		
		if(userCredentials.userID == "" ||null){
			alert("please ente the email")
		}else if(userCredentials.userPassword == ""||null ){
			alert("please enter the password")
		}else if(!validateEmail(userCredentials.userCredentials)){
			alert("please enter the valid email address");
		}

		
		console.log(JSON.stringify(userCredentials))
		$.ajax({
			url 	 : '/forgotPassword',
			method	 : 'POST',
		    contentType: "application/json",
		    dataType	:"json",
			data 	 : userCredentials,
			success  : function(data){
					   console.log('inside the forgot password success call ' + JSON.stringify(data))

						if(data.status == 'success'){
							document.getElementById('resetPasswordSuccess').innerHTML ='Successfully changed';
						}else if(data.status == 'userIdNotFound'){
							
							document.getElementById('resetPasswordSuccess').innerHTML ='Email address not found';

							alert('user id not there');
						}
						},
			error 	 : function(model,xhr,option){
				
						}
			
			
		});
		
	});
	
	function onSignIn(googleUser) {
		  var profile = googleUser.getBasicProfile();
		  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
		  console.log('Name: ' + profile.getName());
		  console.log('Image URL: ' + profile.getImageUrl());
		  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
		  
		  
		  
		  var xhr = new XMLHttpRequest();
		  xhr.open('POST', 'googleAuth');
		  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		  xhr.onload = function() {
		    console.log('Signed in as: ' + xhr.responseText);
		  };
		  xhr.send('idtoken=' + id_token);
		  
		}
	$('#signInwithGoogle').click(function(){
		
		
	});
	
	
	
});