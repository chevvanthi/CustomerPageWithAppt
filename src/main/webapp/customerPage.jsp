
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
  <link   rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

<title>customerPage</title>
</head>
<body >
<div id='forgotPasswordContainer' class ='modal-content'></div>
<div id = 'header'>
<img src = '/image/book.jpeg' id='image'>
<div id='name'>My Contacts</div>
<button id ='addCustomer'  data-toggle="modal" class='btn btn-info btn-lg'>Add Contact</button>
<div id='userIconHolder'><img src = '/image/user.png' id='userIcon'></div>
 </div>

<div id	   ='customerPageContainer' class = ''>
 
<div id    ='customerNamesContainer'> <h3 id='nameHeader'>Contact Names</h3> </div>
<div id    ='customerDetailsContainer'></div>
</div>
<div id    ='contactFormWrapper'></div>
<div id    = 'customTemplate'></div>

   
    <script type="text/html" id = "customerFormTemplate">
		
		<div id='customerFormHeader' class = 'modal-header'><h2> New Customer Form</h2> <button type="button" class="close" >&times;</button></div>
		<div class = 'modal-body'>
		<div id='customerNameDiv'class='fieldHolder '><label>Name</label> <input type='text' placeholder='Name' id='customerName' class='inputfields'></div>
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
       	<div id='customerMobileDiv'><label>Mobile</label><select id='MobileLabel' class='lable'>
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
    	</div>
		<div class = 'modal-footer'> <button id='saveCustomerButton' class = 'btn btn-default designButton''>Save</button> <div>
	
    </script>
    
    
    <script type='text/html' id='EmailTemplate'>
		
		<div id='customerEmailDiv'  class='additionalEmails'> <select id='EmailLabel' class='lable designEmailLabel'>
            <option value = "Personal" > Personal </option>
            <option value = "Work" > Work </option>
            <option value = "Other" > Other </option>
            <option value = "customLable" class='customLabel' id='emailCustomValueId'> Custom Label </option>
			</select>
			<input type='text' placeholder='Email' class='inputfields designExtraEmail' id= 'EmailField'><button class= 'minus emailMinus'>-</button>
		</div>
    
    </script>
    
    <script type= 'text/html' id='mobileTemplate'>
    
	<div id='customerMobileDiv' class= 'additionalMobiles'><select id='MobileLabel' class='lable designMobileLabel'>
           	<option value  = "Personal" >Personal </option>
            <option value = "Work" > Work </option>
            <option value = "Other" > Other </option>
            <option value = "customLable" class='customLabel'> Custom Label </option>
			</select> 
			<input type='text' placeholder='Mobile' id='customerMobile' class='inputfields designExtraMobile' id='mobileCustomValueId' ><button class= 'minus mobileMinus'>-</button>
		</div>
    </script>
    
     <script type= 'text/html' id='customLabelTemplate'>


	<div id='customTemplateContainer' class = 'modal-content'>
		
		<h2 class='modal-header'>Enter the custom Value </h2>
		<div class ='modal-body'><input type='text' id='newCustomValue'></input></div>
		<div class = 'modal-footer'>
		<button id='saveCustomValue'>Save</button>
		<button id='CancelCustomPopUp'>Cancel</button>
		</div>

	</div>

   	</script>
   	 <script type= 'text/html' id='customerDetailsTemplate'>

	<div id='customerFormHeader'><h2> Customer Details</h2> </div>
		<div id='customerNameDivShow'class='fieldHolder'><label>Name</label> <input type='text' placeholder='Name' id='customerNameShow' class='inputfields'></div>
		<div id='EmailContainerDetails'>
		
		<div id='customerEmailDivShow'> <label>Email</label><select id='EmailLabelShow' class='lable'>
            <option value = "Personal" > Personal </option>
            <option value = "Work" > Work </option>
            <option value = "Other" > Other </option>
            <option value = "customLable" class='customLabel' id='emailCustomValueId'> Custom Label </option>
			</select>
			<input type='text' placeholder='Email' id='primaryEmailShow' class='inputfields'><button class='plus' id='primaryPlus'>+</button>
		</div>
		</div>
		
	<div id='MobileContainerDetails'>
       	
		<div id='customerMobileDivShow'><label>Mobile</label><select id='MobileLabelShow' class='lable'>
           	<option value  ="Personal" >Personal </option>
            <option value = "Work" > Work </option>
            <option value = "Other" > Other </option>
            <option value = "customLable" class='customLabel' id='mobileCustomValueId'> Custom Label </option>
			</select> 
			<input type='text' placeholder='Mobile' id='primaryMobileShow' class='inputfields' ><button class='plus' id='primaryMobileAdd'>+</button>
		</div>
		</div>

 		<div id='customerAddressDivShow' class='fieldHolder'><label>Address</label> <input type='text' placeholder='Address' id='customerAddressShow' class='inputfields'></div>
 		<div id='customerCompanyDivShow' class='fieldHolder'><label>Company</label> <input type='text' placeholder='Company' id='customerCompanyShow' class='inputfields'></div>
    	</div>
		<div > <button id='updateCustomerbutton' class = 'designButton'>Update</button> <button id='deleteCustomerButton' class = ''>Delete</button> <div>
    	
  	</script>
    
        <script type="text/html" id = "userIconTemplate">
			<div  id='my_details' class ='userInfoLi'><@= adminEmail @> </div>
			<div  id= 'forgotPasswordLink' class ='userInfoLi'>Forgot Password </div>
			<div  id='logout' class = 'userInfoLi'>Logout</div>
    	</script>
    
    
    <script type ='text/html' id='forgotPasswordTemplate'>
		<div id='forgotPasswordHeader' class='header'>ForgotPassword</div>

		<input type='text'     id='forgotPassworduseId' placeholder='Email'         class='userId'>
		<input type='password' id='newPassword'         placeholder=' New password' class='password'>
		<button id='forgotPasswordButton' class='commonButtom'>CLICK</button>

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
 
    <link   rel="stylesheet" href="/newDesign.css">
<script>
		_.templateSettings = {
		interpolate: /\<\@\=(.+?)\@\>/gim,
		evaluate: /\<\@([\s\S]+?)\@\>/gim,
		escape: /\<\@\-(.+?)\@\>/gim
	};
</script>
</body>
</html>