
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
String userName = session.getAttribute("userName").toString();
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<title>customerPage</title>
</head>
<body>
<button id ='addCustomer'  data-toggle="modal" class='btn btn-info btn-lg'>Add Customer</button>
 
<div id	   ='customerPageContainer'>
<div id    ='contactFormWrapper' ></div>
<div id    ='customerNamesContainer'></div>
<div id='customerDetailsContainer'></div>
</div>
   
    <script type="text/html" id = "customerFormTemplate">
		<div id='customerFormHeader'><h2>New Customer Form</h2> <button type="button" class="close" >&times;</button></div>
		<div id='customerNameDiv'class='fieldHolder'><label>Name</label> <input type='text' placeholder='Name' id='customerName' class='inputfields'></div>
		<div id='EmailContainer'>
		
		<div id='customerEmailDiv'> <label>Email</label><select id='EmailLabel' class='lable'>
            <option value = "Personal" > Personal </option>
            <option value = "Work" > Work </option>
            <option value = "Other" > Other </option>
            <option value = "customLable" class='customLabel' id='emailCustomValueId'> Custom Label </option>
			</select>
			<input type='text' placeholder='Email' id='primaryEmail' class='inputfields'><button class='plus' id='primaryPlus'>+</button>
		</div>
		</div>
		
	<div id='MobileContainer'>
       	<div id='customerMobileDiv' class='fieldHolder'><label>Mobile</label><select id='MobileLabel' class='lable'>
           	<option value  ="Personal" >Personal </option>
            <option value = "Work" > Work </option>
            <option value = "Other" > Other </option>
            <option value = "customLable" class='customLabel' id='mobileCustomValueId'> Custom Label </option>
			</select> 
			<input type='text' placeholder='Mobile' id='primaryMobile' class='inputfields' ><button class='plus' id='primaryMobileAdd'>+</button>
		</div>
		</div>

 		<div id='customerAddressDiv' class='fieldHolder'><label>Address</label> <input type='text' placeholder='Address' id='customerAddress' class='inputfields'></div>
 		<div id='customerCompanyDiv' class='fieldHolder'><label>Company</label> <input type='text' placeholder='Company' id='customerCompany' class='inputfields'></div>
    	
		<button id='saveCustomerButton'>Save</button>
    </script>
    
    
    <script type='text/html' id='EmailTemplate'>
		<br>
		<div id='customerEmailDiv' class='fieldHolder' class='additionalEmails'> <label>Email</label><select id='EmailLabel' class='lable'>
            <option value = "Personal" > Personal </option>
            <option value = "Work" > Work </option>
            <option value = "Other" > Other </option>
            <option value = "customLable" class='customLabel' id='emailCustomValueId'> Custom Label </option>
			</select>
			<input type='text' placeholder='Email' class='inputfields'><button class= 'minus emailMinus''>-</button>
		</div>
    
    </script>
    
    <script type= 'text/html' id='mobileTemplate'>
    
	<div id='customerMobileDiv' class='fieldHolder'><label>Mobile</label><select id='MobileLabel' class='lable'>
           	<option value  = "Personal" >Personal </option>
            <option value = "Work" > Work </option>
            <option value = "Other" > Other </option>
            <option value = "customLable" class='customLabel'> Custom Label </option>
			</select> 
			<input type='text' placeholder='Mobile' id='customerMobile' class='inputfields'id='mobileCustomValueId' ><button class= 'minus mobileMinus'>-</button>
		</div>
    </script>
    
     <script type= 'text/html' id='customLabelTemplate'>


	<div id='customTemplateContainer'>
		
		<h2>Enter the custom Value </h2>
		<input type='text' id='newCustomValue'></input>
		<button id='saveCustomValue'>Save</button>
		<button id='CancelCustomPopUp'>Cancel</button>

	</div>
		

   	</script>
   	
    	
  	
    
    <script type ="text/javascript">
	 adminId = '<%= userName %>';
    </script>
    
   
    <script src ="./libs/jquery-3.2.1.min.js"></script>
    <script src ="./libs/underscore-min.js"></script>
    <script src ="./libs/backbone-min.js"></script>
    <script src ="./model/userCredentialsModel.js"></script>
    <script src = "./model/customerDetailsModel.js"></script>
    <script src = "./collection/customerCollection.js"></script>
   
    <script src ="./view/customerNameView.js"></script>
    
    <script src ="./view/contactForm.js"></script>

    <script src="./customerPage.js"></script>
 
   
<script>
		_.templateSettings = {
		interpolate: /\<\@\=(.+?)\@\>/gim,
		evaluate: /\<\@([\s\S]+?)\@\>/gim,
		escape: /\<\@\-(.+?)\@\>/gim
	};
</script>
</body>
</html>