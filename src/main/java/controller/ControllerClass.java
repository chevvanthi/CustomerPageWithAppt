package controller;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.simple.parser.JSONParser;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import controller.CustomerCredentials;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.appengine.labs.repackaged.org.json.JSONException;
import com.google.appengine.labs.repackaged.org.json.JSONObject;
import com.googlecode.objectify.ObjectifyService;

@Controller
public class ControllerClass {

	@RequestMapping(value="/")
	public String view(){
		System.out.println("Inside the controller");
		
	     return "index";	
		}
	@RequestMapping(value = "/LoginWithGoogle")
	public ModelAndView go() {
		return new ModelAndView(
				"redirect:https://accounts.google.com/o/oauth2/auth?redirect_uri=https://chevvanthi-146907.appspot.com/googleAuth&response_type=code&client_id=1003766481966-663412bo2mh0nl9ijnifepet0p5gcaef.apps.googleusercontent.com&approval_prompt=force&scope=email&access_type=online");
	}
	
	@RequestMapping(value="/login",method=RequestMethod.POST)
	public @ResponseBody String login(@RequestBody String userCredentials , HttpServletRequest request,HttpServletResponse response ) throws JSONException, IOException, ServletException{
	
	 
		System.out.println(userCredentials);

		ObjectMapper objMap = new ObjectMapper();
		String result = null; 
		HashMap<String,String> map = new HashMap<>();
		
		JSONObject json 	= 	new JSONObject(userCredentials);
		String userName 	= 	json.getString("userID");
		String userPassword = 	json.getString("userPassword");
		
		CustomerCredentials credentials = new CustomerCredentials();
		credentials.setUserName(userName);
		credentials.setUserPassword(userPassword);
        
		//Register the entity class to objectifyService
		ObjectifyService.register(CustomerCredentials.class);

		try{
			
			//load the entity based on the key 

			CustomerCredentials retrivedValue 	= ofy().load().type(CustomerCredentials.class).id(userName).now();
		
				String userEnteredPassword  =  credentials.getUserPassword();
				String originalPassword     =  retrivedValue.getUserPassword();
				System.out.println("retrived value " +retrivedValue );
			
			 if( retrivedValue.getUserName() != null && userEnteredPassword.equals(originalPassword)) {
				
				 HttpSession session = request.getSession(true);
				 request.getSession(true).setAttribute("userName", userName);
				 map.put("status", "success");
				
			 	}else if(userEnteredPassword !=originalPassword){
				map.put("status", "wrongPassword");
				
			 	}
		}catch(NullPointerException e){
			 
			map.put("status", "RegisterPage");
		}
				
        	result  = objMap.writeValueAsString(map);
        	return result;
       

	}
	@RequestMapping(value="/register", method=RequestMethod.POST)
	@ResponseBody
	public String register(@RequestBody String signUpCredentials,	HttpServletRequest request,HttpServletResponse response ) throws JSONException, ServletException, IOException{
		
		
		ObjectMapper objMap  = 	new ObjectMapper();
		String result		 = 	null;
		HashMap<String,String> map = new HashMap<>();
		
		
		JSONObject json 						  = 	new JSONObject(signUpCredentials);
		String userName							  = 	json.getString("userID");
		String password							  =     json.getString("userPassword");
		signUpCredentails registerDetails		  = 	new signUpCredentails();
		CustomerCredentials credentials			  =     new CustomerCredentials();

		ObjectifyService.register(signUpCredentails.class);
		ObjectifyService.register(CustomerCredentials.class);

		registerDetails.setUserName(userName);
		registerDetails.setUserPassword(password);
		
		credentials.setUserName(userName);
		credentials.setUserPassword(password);
		
		
		CustomerCredentials retrivedValue 	 		= 	ofy().load().type(CustomerCredentials.class).id(userName).now();
		signUpCredentails fetchedfromSignUp 		= 	ofy().load().type(signUpCredentails.class).id(userName).now();
		
		if(retrivedValue == null && fetchedfromSignUp == null ){
		     
			ofy().save().entity(registerDetails).now();   		// Save the user credentials.
			ofy().save().entity(credentials).now();
			HttpSession session = request.getSession(true);
			request.getSession(true).setAttribute("userName", userName);;
			
			map.put("status","success");
		      
			}else{
				map.put("status", "userNameExits");
			} 
		   if(fetchedfromSignUp != null){
			map.put("status", "userNameExits");
			}
		
		
		result = objMap.writeValueAsString(map);
		return result;
	}
	
	@RequestMapping(value="/customerPage", method=RequestMethod.GET)
	public ModelAndView home(HttpServletRequest request, HttpServletResponse response  ) throws JSONException, JsonProcessingException{
		
		ModelAndView view = null;
		if(request.getSession(false) !=null)
		 view = new ModelAndView("customerPage");
		else
		 view = new ModelAndView("index");
			
		return view;
				
	}
@RequestMapping(value="/forgotPassword",method= RequestMethod.POST)
@ResponseBody
	public String forgotPassword(@RequestBody String userCredentials) throws JSONException, JsonProcessingException{
	System.out.println(userCredentials);
	
	ObjectMapper objMap = new ObjectMapper();
	String result = null; 
	HashMap<String,String> map = new HashMap<>();
	
	JSONObject json 	= 	new JSONObject("{" +userCredentials.replace("&", ",") + "}");
	String userName 	= 	json.getString("userID");
	String userPassword = 	json.getString("userPassword");
	String newUserId = userName.replace("%40", "@");
	System.out.println("changed name " + newUserId);
	
	CustomerCredentials credentials = new CustomerCredentials();
	credentials.setUserName(newUserId);
	credentials.setUserPassword(userPassword);
	
	ObjectifyService.register(CustomerCredentials.class);

	try{
		
		//load the entity based on the key 

		CustomerCredentials retrivedValue = ofy().load().type(CustomerCredentials.class).id(newUserId).now();
		System.out.println("retrived value inside forgot password" + retrivedValue.getUserName());
		 
		if( retrivedValue.getUserName().equals(newUserId)) {
				ofy().save().entity(credentials).now();
			    map.put("status", "success");
			
		 	}else {
		 		map.put("status", "userIdNotFound");
			
		 	}
	}catch(NullPointerException e){
		 
		map.put("status", "userIdNotFound");
	}
	result  = objMap.writeValueAsString(map);
	System.out.println("the result " + result);
	return result;

 }

@RequestMapping(value="/googleAuth")
public String googleAuthLogin(HttpServletRequest request) throws IOException, JSONException{
	
		// code for getting authorization_code
		
		String auth_code	= request.getParameter("code");
		System.out.println("successfully came back...");
		System.out.println(auth_code);
		System.out.println("Before");
		
		URL url = new URL(
				
				"https://www.googleapis.com/oauth2/v3/token?"
				+ "client_id=1003766481966-663412bo2mh0nl9ijnifepet0p5gcaef.apps.googleusercontent.com"
				+ "&client_secret=PSFzZQB7u5EuCOrAt16hmerW&" 
				+ "redirect_uri=https://chevvanthi-146907.appspot.com/googleAuth&"
				+ "grant_type=authorization_code&" 
				+ "code=" + auth_code);
		
		
		
		System.out.println("aFter"); 
		
		
		HttpURLConnection connection =  (HttpURLConnection) url.openConnection();
		
		connection.setRequestMethod("POST");
		connection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");

		connection.setDoOutput(true);
		
		BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
			
			String inputLine;
			String response = "";
			while ((inputLine = in.readLine()) != null) {
				response += inputLine;
			}
			in.close();
			
		System.out.println(response.toString());
		JSONParser parser = new JSONParser();
		JSONObject json_access_token = null;
		
		try {
			json_access_token = new JSONObject(response);
		} catch (JSONException e) {

			e.printStackTrace();
		}
		String access_token = null;
		try {
			access_token = (String) json_access_token.get("access_token");
		} catch (JSONException e1) {
			e1.printStackTrace();
		}
		
		System.out.println("Access token =" + access_token);

		// code for getting user details by sending access token.......

			URL urlObj			   =   new URL("https://www.googleapis.com/oauth2/v3/userinfo?access_token=" + access_token);
			HttpURLConnection conn =   (HttpURLConnection) urlObj.openConnection();
			BufferedReader in1     =  new BufferedReader(new InputStreamReader(conn.getInputStream()));
			String inputLine1;
			String responsee = "";
		
			while ((inputLine1 = in1.readLine()) != null) {
				responsee += inputLine1;
			}
		in1.close();
		System.out.println(responsee.toString());
		JSONObject json_user_details = null;
		try {
			json_user_details = new JSONObject(responsee);
		} catch (JSONException e) {
			e.printStackTrace();
		}

		 String emailId = (String)json_user_details.get("email");
		System.out.println("user email address " + emailId);
	
	
	return "";
	
}
@RequestMapping(value="/saveCustomerDetails")
@ResponseBody
public String storeCustomers(@RequestBody String customerDetails,HttpServletRequest request ) throws JSONException, JsonParseException, JsonMappingException, IOException{
	
	
		System.out.println("store customer " + customerDetails);
		customerDetailsPOJO customerDetail	 =   new customerDetailsPOJO();
		ObjectMapper objMap  		  	 =   new ObjectMapper();
		String result		 		   	 =   null;
		HashMap<String,String> map 	   	 =   new HashMap<>();
		HashMap<String,String> hashmap 	 =   new HashMap<>();
		JSONObject json 			     =   new JSONObject(customerDetails);
		HttpSession session 			 =  request.getSession(false);

		String customerName		    	=  json.getString("customerName");
		String customerAddress			=  json.getString("customerAddress");
		String customerCompany			=  json.getString("customerCompany");
		String customerEmail			=  json.getString("customerEmail");
		String customerMobile			=  json.getString("customerMobile");
		String randomId 				=  json.getString("randomId");
		String adminId					=  json.getString("adminId");
		
		
		ObjectifyService.register(customerDetailsPOJO.class);
		customerDetail.setCustomerName(customerName);
		customerDetail.setCustomerAddress(customerAddress);
		customerDetail.setCustomerCompany(customerCompany);
		customerDetail.setCustomerEmail(customerEmail);
		customerDetail.setCustomerMobile(customerMobile);
		customerDetail.setAdminId(adminId);
		customerDetail.setRandomId(randomId);
		
		ofy().save().entity(customerDetail).now();
		map.put("status", "saved");
		result = objMap.writeValueAsString(map);
		return result;
}

@RequestMapping(value="/deleteCustomer/{randomId:.+}")
@ResponseBody
public String deleteCustomer(@PathVariable String randomId,HttpServletRequest request){
	System.out.println("insode the delete cusromer " + randomId);
	
	
	ObjectMapper objMap  		  	 =   new ObjectMapper();
	String result		 		   	 =   null;
	HashMap<String,Object> map 	   	 =   new HashMap<>();
	HttpSession session 			 =  request.getSession(false);


	ObjectifyService.register(customerDetailsPOJO.class);
	ofy().delete().type(customerDetailsPOJO.class).id(randomId);    // asynchronous

	return "deleted";
}


	
}
