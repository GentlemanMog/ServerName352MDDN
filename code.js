window.addEventListener('devicepressure', function(event){

	var pressure = event.value;
	$(".values").html("<h2>" + pressure + "</h2>");
});