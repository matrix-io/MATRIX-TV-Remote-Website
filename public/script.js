$(window).load(function() {
	// Server auto connect
	var socket = io(); 

	// Remove loading screen
	$("#loading-screen").fadeOut(1000);

	// LOG CURRENT USERS \\
	socket.on("clients connected",function(users){
		console.log("Current Users: "+users);
		document.getElementById("users-connected-update").innerHTML = users;
	});
	
	// NAVIGATION SETUP \\
	currentNav = "#nav-item2";// initial tab
	currentLayout = "#controls-layout";// initial content
	$(currentLayout).show();// reveal initial content

	$("#nav-item1").on("click", function(){changeLayout("#nav-item1","#numpad-layout");});
	$("#nav-item2").on("click", function(){changeLayout("#nav-item2","#controls-layout");});
	
	// TV REMOTE SETUP \\
	// Misc
	$( "#button-power" ).on( "click", function(){remoteCommand("power");});
	$( "#button-input" ).on( "click", function(){remoteCommand("input");});
	$( "#button-last" ).on( "click", function(){remoteCommand("last");});
	$( "#button-enter" ).on( "click", function(){remoteCommand("enter");});
	$( "#button-guide" ).on( "click", function(){remoteCommand("guide");});
	$( "#button-exit" ).on( "click", function(){remoteCommand("exit");});
	// Channel Control
	$( "#button-channel-up" ).on( "click", function(){remoteCommand("channel_up");});
	$( "#button-channel-down" ).on( "click", function(){remoteCommand("channel_down");});
	// Volume control
	$( "#button-mute" ).on( "click", function(){remoteCommand("mute");});
	$( "#button-volume-up" ).on( "click", function(){remoteCommand("volume_up");});
	$( "#button-volume-down" ).on( "click", function(){remoteCommand("volume_down");});
	// Movement Keys
	$( "#button-ok" ).on( "click", function(){remoteCommand("enter");});
	$( "#button-up" ).on( "click", function(){remoteCommand("up");});
	$( "#button-down" ).on( "click", function(){remoteCommand("down");});
	$( "#button-left" ).on( "click", function(){remoteCommand("left");});
	$( "#button-right" ).on( "click", function(){remoteCommand("right");});
	// Numpad Bindings
	for(var i = 0; i<10; i++){
		setNumPad(i);
	}

  // FUNCTIONS \\
	// - Update nav selection and buttons shown
	function changeLayout(nav, layout){
		if(currentNav != nav){
			$(currentNav).css( "background-color", "transparent" );
			currentNav = nav;
			$(currentNav).css( "background-color", "rgba(255, 255, 255, 0.50)" );

			$(currentLayout).hide();
			currentLayout = layout;
			$(currentLayout).show();
		}
	}

	// - Sets NumPad Keys
	function setNumPad(num){
		$( "#button-"+num ).on( "click", function(){remoteCommand("number_"+num);});
	}

	// - sends ir signal command
	function remoteCommand(buttonPressed){
	    socket.emit('remoteCommand', buttonPressed);
	}
});


