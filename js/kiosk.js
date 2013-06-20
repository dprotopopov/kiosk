jQuery.noConflict();

var YtPlayers = new Array();

var currentIndex = 0;
var currentLanguage = "en";

function currentMenu() { return jQuery(".menu." + currentLanguage).get(currentIndex); }
function currentVideo() { return jQuery(".video." + currentLanguage).get(currentIndex); }
function currentPlayer() { return jQuery(currentVideo()).find("video").get(0); }
function currentStop() { return jQuery(currentVideo()).find(".stop").get(0); }
function currentYtPlayer() { return YtPlayers[jQuery(".ytplayer").index(jQuery(currentVideo()).find(".ytplayer").get(0))]; }
function currentTubePlayer() { return jQuery(currentVideo()).find(".tubeplayer").get(0); }
function nextIndex(index) { index++ ; if(index >= 5) index = 4; return index; }
function prevIndex(index) { index-- ; if(index < 0) index = 0; return index; }
function showCurrentMenu() { jQuery(currentMenu()).fadeIn("slow"); }
function hideCurrentMenu() { jQuery(currentMenu()).fadeOut("slow"); }
function showCurrentVideo() { jQuery(currentVideo()).show(); }
function hideCurrentVideo() { jQuery(currentVideo()).hide(); }
function showCurrentStop() { jQuery(currentStop()).fadeIn(); }
function hideCurrentStop() { jQuery(currentStop()).fadeOut(); }
function showBuffering() { jQuery("#buffering").show(); }
function hideBuffering() { jQuery("#buffering").hide(); }
function hideDoctor() { 
	jQuery("input[name*='doctor']").removeClass("required"); 
	jQuery("input[name*='doctor']").hide(); 
	jQuery("label[for*='doctor']").hide(); 
}
function clearForm() { 
	  jQuery("input[name*='expected_delivery_date']").val("");
	  jQuery("input[name*='due_date']").val("");
	  jQuery("input[name*='phone']").val("");
	  jQuery("input[name*='first_name']").val("");
	  jQuery("input[name*='last_name']").val("");
	  jQuery("input[name*='e_mail']").val("");
	  jQuery("input[name*='doctor']").val("");
	  jQuery("input").removeClass("error");
	  jQuery(".error").remove();
	  jQuery(".ErrorLabel").remove();
	  jQuery(".EditingFormErrorLabel").remove();
}

function playCurrentPlayer() {
	if (currentIndex < 3) {
		if (jQuery(currentVideo()).find(".tubeplayer").length>0) {
			try {
				var tubeplayer = currentTubePlayer();
				jQuery(tubeplayer).tubeplayer("play");
			}
			catch(e) {
				alert("tubeplayer:"+e);
			}
		}
		else if (jQuery(currentVideo()).find(".ytplayer").length>0) {
			try {
				var ytplayer = currentYtPlayer();
				ytplayer.playVideo();
			}
			catch(e) {
				alert("youtube player api:"+e);
			}
		}
		else {
			try {
				var player = currentPlayer();
				player.play();
			}
			catch(e) {
				alert("video html5:"+e);
			}
		}
	}
}

function pauseCurrentPlayer() {
	if (currentIndex < 3) {
		if (jQuery(currentVideo()).find(".tubeplayer").length>0) {
			try {
				var tubeplayer = currentTubePlayer();
				jQuery(tubeplayer).tubeplayer("pause");
			}
			catch(e) {
				alert("tubeplayer:"+e);
			}
		}
		else if (jQuery(currentVideo()).find(".ytplayer").length>0) {
			try {
				var ytplayer = currentYtPlayer();
				ytplayer.pauseVideo();
			}
			catch(e) {
				alert("youtube player api:"+e);
			}
		}
		else {
			try {
				var player = currentPlayer();
				player.pause();
			}
			catch(e) {
				alert("video html5:"+e);
			}
		}
	}
}
/*
function onYouTubePlayerAPIReady() {
	//alert("API is ready!");
	jQuery(".ytplayer").each(function(i,e) {
		var ytplayer;
		ytplayer = new YT.Player(jQuery(this).attr("id"), {
          	width: '1024',
			height: '768',
		  	allowfullscreen: 'true',
		  	videoId: jQuery(this).attr("videoId"),
		  	events: {
				'onReady': onPlayerReady,
				'onStateChange': onPlayerStateChange,
				'onError': onPlayerError
		  	}
		});
		YtPlayers.push(ytplayer);
	});
}

function onPlayerError(event) {
	alert(event.data);
}
  
function onPlayerReady(event) {
  	hideBuffering();
}
  
function onPlayerStateChange(event) {
//	alert("Player's new state: " + event.data);
	if (event.data == YT.PlayerState.BUFFERING)
	  showBuffering();
	
	switch(event.data) {
	case YT.PlayerState.PAUSED:
	  	hideBuffering();
		break;
	case YT.PlayerState.ENDED:
		hideCurrentVideo();
		hideBuffering();
		currentIndex = nextIndex(currentIndex);
		showCurrentMenu();
	  	break;
	case YT.PlayerState.PLAYING:
		hideBuffering();
		showCurrentVideo();
		hideCurrentMenu();
	  	break;
	}
}

jQuery.tubeplayer.defaults.afterReady = function($player){
  	hideBuffering();
}
*/

function getID() {
	if(typeof kioskpro_id === 'undefined') {
      return "kioskpro_id is not set";
    } else {
      var iPadID = kioskpro_id.toString().split(" ").join("");
      if (!iPadID || iPadID == "") {
           return "iPadID is not set";
      } else {
           return iPadID;
      }
 	}
}
	  	  
jQuery(document).ready(function(e) {

//	alert(jQuery(window).width()+"x"+jQuery(window).height());
	if(jQuery("input[name*='url']").val()==jQuery(location).attr('href')) {
		currentIndex = 3;
	} else {
		currentIndex = 0;
	}
	
	if(jQuery(".InfoLabel").length) {
		jQuery(".InfoLabel").remove();
		currentIndex = 4;
		clearForm();
	}		
	
	jQuery("video").each(function(i,e) {
		var player = this;
			
		player.addEventListener("ended", function(e){
			hideCurrentStop();
			hideCurrentVideo();
			hideBuffering();
			currentIndex = nextIndex(currentIndex);
			showCurrentMenu();
		}, false);
		player.addEventListener("playing", function(e){
			hideBuffering();
			hideCurrentStop();
			showCurrentVideo();
			hideCurrentMenu();
		}, false);
		player.addEventListener("pause", function(e){
			showCurrentStop();
		}, false);
		player.addEventListener("waiting", function(e){
			showBuffering();
		}, false);
		player.addEventListener("error", function(e){
			alert("an error in playback.");
		}, false);
	});
/*	
	jQuery(".tubeplayer").each(function(i,e) {
		jQuery(this).tubeplayer({
			width: 1024, // the width of the player
			height: 768, // the height of the player
			allowFullScreen: "true", // true by default, allow user to go full screen
			initialVideo: jQuery(this).attr("videoId"), // the video that is loaded into the player
			start: 0, 
			preferredQuality: "default",// preferred quality: default, small, medium, large, hd720
			showControls: 1, // whether the player should have the controls visible, 0 or 1
			showRelated: 0, // show the related videos when the player ends, 0 or 1 
			autoPlay: false, // whether the player should autoplay the video, 0 or 1
			autoHide: true, 
			theme: "dark", // possible options: "dark" or "light"
			color: "red", // possible options: "red" or "white"
			showinfo: false, // if you want the player to include details about the video
			modestbranding: true, // specify to include/exclude the YouTube watermark
			// the location to the swfobject import for the flash player, default to Google's CDN
			wmode: "transparent", // note: transparent maintains z-index, but disables GPU acceleration
			swfobjectURL: "http://ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js",
			loadSWFObject: true, // if you include swfobject, set to false
			// HTML5 specific attrs
			iframed: true, // iframed can be: true, false; if true, but not supported, degrades to flash
			onPlay: function(id){}, // after the play method is called
			onPause: function(){}, // after the pause method is called
			onStop: function(){}, // after the player is stopped
			onSeek: function(time){}, // after the video has been seeked to a defined point
			onMute: function(){}, // after the player is muted
			onUnMute: function(){}, // after the player is unmuted
			onPlayerUnstarted: function(){
				hideBuffering();
			}, // when the player returns a state of unstarted
			onPlayerEnded: function(){
				hideCurrentVideo();
				hideBuffering();
				currentIndex = nextIndex(currentIndex);
				showCurrentMenu();
			}, // when the player returns a state of ended
			onPlayerPlaying: function(){
				hideBuffering();
				showCurrentVideo();
				hideCurrentMenu();
			}, //when the player returns a state of playing
			onPlayerPaused: function(){
				hideBuffering();
			}, // when the player returns a state of paused
			onPlayerCued: function(){
				hideBuffering();
			}, // when the player returns a state of cued
			onPlayerBuffering: function(){
				showBuffering();
			}, // when the player returns a state of buffering
			onErrorNotFound: function(){
				alert("a video cant be found");
			}, // if a video cant be found
			onErrorNotEmbeddable: function(){
				alert("a video isnt embeddable");
			}, // if a video isnt embeddable
			onErrorInvalidParameter: function(){
				alert("we've got an invalid param");
			} // if we've got an invalid param
		});
	});

	jQuery("input[name*='expected_delivery_date']").attr("type","date");
	jQuery("input[name*='due_date']").attr("type","date");
	jQuery("input[name*='phone']").attr("type","tel");
	jQuery("input[name*='e_mail']").attr("type","email");

	jQuery("label[id*='url']").parent().hide();
	jQuery("label[id*='ipad_id']").parent().hide();
	jQuery("input[id*='url']").parent().hide();
	jQuery("input[id*='ipad_id']").parent().hide();
*/
	jQuery("input[name*='ipad_id']").val(getID());
	jQuery("input[name*='url']").val(jQuery(location).attr('href'));

	jQuery("input[name*='phone']").mask("(999) 999-9999");
	var url = jQuery.url(jQuery(location).attr("href"));
	if(((!(typeof kioskpro_id === 'undefined')) && kioskpro_id.toString().split(" ").join(""))
	|| url.attr("query") || url.attr("fragment")) {
		hideDoctor();
	}
	
	jQuery("form").validate();
	
	jQuery(".stop").hide();
	jQuery(".video").hide();
	jQuery(".menu").hide();
	showCurrentMenu();
	hideBuffering();

	jQuery(".save").click(function(event) {
		if (event.preventDefault) { event.preventDefault(); } else { event.returnValue = false; }
		if (jQuery('form').valid()) {
			jQuery('form').ajaxSubmit({
				timeout:   3000, 
				success:    function() { 
					hideCurrentMenu();
					currentIndex = 4;
        			clearForm();
					showCurrentMenu();
				},
				error:		function() {
					alert("Error to send form");
					hideCurrentMenu();
					currentIndex = 3;
					showCurrentMenu();
				}
			});
		}
	});
			
	jQuery(".stop").click(function(event) {
		if (event.preventDefault) { event.preventDefault(); } else { event.returnValue = false; }
		pauseCurrentPlayer();
		hideCurrentVideo();
		showCurrentMenu();
	});

	jQuery(".next").click(function(event) {
		if (event.preventDefault) { event.preventDefault(); } else { event.returnValue = false; }
		hideCurrentMenu();
		currentIndex = nextIndex(currentIndex);
        clearForm();
		showCurrentMenu();
	});

	jQuery(".prev").click(function(event) {
		if (event.preventDefault) { event.preventDefault(); } else { event.returnValue = false; }
		hideCurrentMenu();
		currentIndex = prevIndex(currentIndex);
        clearForm();
		showCurrentMenu();
	});

	jQuery(".play").click(function(event) {
		if (event.preventDefault) { event.preventDefault(); } else { event.returnValue = false; }
		showBuffering();
		playCurrentPlayer();
	});

	jQuery(".replay").click(function(event) {
		if (event.preventDefault) { event.preventDefault(); } else { event.returnValue = false; }
		hideCurrentMenu();
		showBuffering();
		currentIndex = prevIndex(currentIndex);
		playCurrentPlayer();
	});

	jQuery(".home").click(function(event) {
		if (event.preventDefault) { event.preventDefault(); } else { event.returnValue = false; }
		hideCurrentMenu();
		currentIndex = 0;
		showCurrentMenu();
	});

	jQuery(".contact").click(function(event) {
		if (event.preventDefault) { event.preventDefault(); } else { event.returnValue = false; }
		hideCurrentMenu();
		currentIndex = 3;
		showCurrentMenu();
	});
	
	jQuery(".en-locale").click(function(event) {
		if (event.preventDefault) { event.preventDefault(); } else { event.returnValue = false; }
		hideCurrentMenu();
		currentLanguage = "en";
		showCurrentMenu();
	});
	jQuery(".es-locale").click(function(event) {
		if (event.preventDefault) { event.preventDefault(); } else { event.returnValue = false; }
		hideCurrentMenu();
		currentLanguage = "es";
		showCurrentMenu();
	});
/*
	// Load the IFrame Player API code asynchronously.
	var tag = document.createElement('script');
	tag.src = "https://www.youtube.com/player_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
*/
});
