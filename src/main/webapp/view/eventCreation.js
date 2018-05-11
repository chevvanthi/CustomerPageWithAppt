
function hourAndMinuteFormat(hour,minute)
	{
		return hour +":"+minute;
									
	}



function slotGenerationCall() {
	 var eventData = {
				eventDate : $('#datepicker').val(),
				slotDuration : $('#slotSize option:selected').val()
		}

	$.ajax({
		    url : "/generateSlots",
		    contentType: "application/json",
		    dataType	:"json",
		    method 		: 'POST',
			data 	 : JSON.stringify(eventData),
			
			success  : function(data){
						
						console.log("inside success");
						data.forEach(function(entry) {
							
							var  hour 	= entry.hour;
							var  minute	= entry.minute;
						
							var formattedTime = hourAndMinuteFormat(hour,minute);

							
							var slot = $('<div></div>');
							slot.addClass('timeSlot')
							slot.text(formattedTime);
							 $('#generateSlots').append(slot);
							
						});
						
						
			},
			error	: function(data){
					console.log("inside error  " + data);
			}
		
	});
	 
	 
}

var eventCreate = Backbone.View.extend({
	className		: 'eventCreationDiv',
	
	events 			: {
						"click #datepicker" : "datePicker",
						"click #createEventButton" : "generateSlots",
						"change #slotSize" : "generateSlotsWithDuration",
						"click .timeSlot" : "createEvent"
					 },
	datePicker		: function(){
		
						$( "#datepicker" ).datepicker();

						
	},
	generateSlotsWithDuration : function(){
								
						$('#generateSlots').children('div').remove();
								
						slotGenerationCall();
							

	},
	createEvent     : function(){
		
	},
	generateSlots	: function(){
						console.log("create button clickd");
						
						
	},
	template	    : _.template($('#eventCreationTemplate').html()),

	
	render          : function()
					{
								this.$el.html(this.template());
								return this;
						 
					 }
	

	
});