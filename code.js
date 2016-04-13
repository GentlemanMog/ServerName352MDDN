window.addEventListener('devicetemperature', function(event){

	var pressure = event.value;
	$(".values").html("<h2>" + pressure + "</h2>");
});

window.addEventListener('devicelight', function(event){
	// alert(e.value);
	var luminosity = event.value;
	// showLuminosity(luminosity);

	if(luminosity <= 5){
		$(".values").css("opticity", "0.7");
		$(".values").html("<h2>" + luminosity + " Lux</h2> <h2>" + magneticflux + " MgFlux</h2>");
		// document.getElementById("sensor").addClass("veryDark");
		// document.body.className = "veryDark";
	}else if(luminosity <= 20){
		$(".values").css("opticity", "0.5");
		$(".values").html("<h2>" + luminosity + " Lux</h2> <h2>" + magneticflux + " MgFlux</h2>");
		// document.getElementById("sensor").addClass("lighter");
		// document.body.className = "lighter"
	}else if (luminosity <= 50) {
		$(".values").css("opticity", "0.3");
		$(".values").html("<h2>" + luminosity + " Lux</h2> <h2>" + magneticflux + " MgFlux</h2>");
		// document.getElementById("sensor").addClass("toobright");
		// document.body.className = "toobright";
    }else{
		// document.body.className = ""
		$(".values").css("opticity", "0");
    }
    // luminosity = luminOver;
});