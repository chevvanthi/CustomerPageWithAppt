package controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Duration;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.appengine.labs.repackaged.org.json.JSONException;
import com.google.appengine.labs.repackaged.org.json.JSONObject;

@Controller
public class EventCreationController {

 static SimpleDateFormat sdf = new SimpleDateFormat("HH:mm");
 static final long oneMinute = 60000;
	
	
	
@RequestMapping(value = "/generateSlots",method= RequestMethod.POST)
@ResponseBody
 public String generateSlots(@RequestBody String eventData,HttpServletRequest request) throws ParseException, JSONException, JsonProcessingException{
	
	HttpSession session = request.getSession(true);
	String result = null;
	ObjectMapper objMap  		  	 =   new ObjectMapper();

	JSONObject json 	= 	new JSONObject(eventData);
	System.out.println("json value "+ json);
	
	String eventDateValue  	  = 	json.getString("eventDate");
	String slotDurationValue  = 	json.getString("slotDuration");
	
	int slotSize = Integer.parseInt(slotDurationValue);			

	ArrayList<LocalTime> slotList =  new ArrayList<>();
	LocalTime initialTime 		 =   LocalTime.of(0, 00);
	
	for(int i= 0;i <1440 ;i = i+slotSize){

		LocalTime slots = initialTime.plus(Duration.ofMinutes(slotSize));
		initialTime = slots;
		slotList.add(slots);
		System.out.println("slots " + slots);
		
	}
	 result = objMap.writeValueAsString(slotList);

	 return result;
 }
	
}
