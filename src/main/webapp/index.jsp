<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<title>Insert title here</title>
</head>
<body>

<div id='container'>
<div id='print' class='errorMsg'></div>
<div id='wrongPasswordErrorMsg' class='errorMsg'></div>
<div id='userIdErroMsg' class='errorMsg' ></div>
<div id='resetPasswordSuccess' class='errorMsg'></div>



<div id='loginContainer' class ='holder'>
<form id='loginForm' class='form'>
<div  id='Loginheader' class='header'>Login</div>

<div  id='LoginuserIdContainer'  class='userIdContainer'>   		<input  type='text'      id='userId'       placeholder = 'Email'    class='userId'>    </div>
<div  id='LoginpasswordContainer' class ='passwordContainer'> 		<input  type='password'  id='userPassword' placeholder = 'password' class='password'></div>
<div  id ='loginButtonDiv' class='button'>							<button id='login' class='commonButtom'> Login</button></div>
<div  id='loginWithGoogleDiv'><a href = "/LoginWithGoogle" id='loginwithGoogle'> SignIn Google  </a></div>




<a href='#' > <span id='forgotPassword'>Forgot Password</span></a>
<div id='registerPage' class='anotherPage'><a href='#' id='signUpPage'>Don't have account ? signUp</a></div>

</form>
</div>

<div id='signUpContainer' class='holder'>
<form id='signUpForm'     class='form'>
<div  id='signUpHeader'   class='header'>Register</div>

<div  id='RegisteruserIdContainer' class='userIdContainer'>   		<input  type='text'      id='RegisteruserId'       placeholder = 'Email'    class='userId'>    </div>
<div  id='RegisterpasswordContainer'class ='passwordContainer'> 	<input  type='password'  id='RegisteruserPassword' placeholder = 'password' class='password'></div>
<div  id ='signUpButtonDiv' class='button'><button id='register' class='commonButtom'> Register</button></div>

<div id='LoginPage' class='anotherPage'><a href='#' id='loginPage'>Go Back to Login Page</a></div>

</form>

</div>

<div id='forgotPasswordContainer' class='holder'>
<div id='forgotPasswordHeader'    class='header'>Enter your Email Address</div>

<input type='text'     id='forgotPassworduseId' placeholder='Email'         class='userId'>
<input type='password' id='newPassword'         placeholder=' New password' class='password'>
<button id='forgotPasswordButton' class='commonButtom'>CLICK</button>
<button id='BacktoLoginPage' class='commonButtom'>Login Page</button>
</div>

</div>
    <script src="./libs/jquery-3.2.1.min.js"></script>
    <script src="./libs/underscore-min.js"></script>
    <script src="./libs/backbone-min.js"></script>
    <script src="./model/userCredentialsModel.js"></script>

    <script src="./main.js"></script>
   <link rel = "stylesheet" type="text/css" href = "/design.css" /> 

</body>

</html>