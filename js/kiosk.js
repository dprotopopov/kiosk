jQuery.noConflict();

var YtPlayers = new Array();

var currentIndex = 0;
var currentLanguage = "en";

function currentMenuPage() { return jQuery(".menu-page." + currentLanguage).get(currentIndex); }
function currentVideoPage() { return jQuery(".video-page." + currentLanguage).get(currentIndex); }
function currentStop() { return jQuery(currentVideoPage()).find(".stop").get(0); }
function currentVideoContact() { return jQuery(currentVideoPage()).find(".video-contact").get(0); }
function currentPlayer() { return jQuery(currentVideoPage()).find("video").get(0); }
function currentYtPlayer() { return YtPlayers[jQuery(".ytplayer").index(jQuery(currentVideoPage()).find(".ytplayer").get(0))]; }
function currentTubePlayer() { return jQuery(currentVideoPage()).find(".tubeplayer").get(0); }
function nextIndex(index) { index++ ; if(index >= 5) index = 4; return index; }
function prevIndex(index) { index-- ; if(index < 0) index = 0; return index; }
function showCurrentMenu() { jQuery(currentMenuPage()).fadeIn("slow"); }
function hideCurrentMenu() { jQuery(currentMenuPage()).fadeOut("slow"); }
function showCurrentVideo() { jQuery(currentVideoPage()).show(); }
function hideCurrentVideo() { jQuery(currentVideoPage()).hide(); }
function showCurrentStop() { jQuery(currentStop()).fadeIn(); }
function hideCurrentStop() { jQuery(currentStop()).fadeOut(); }
function showCurrentVideoContact() { jQuery(currentVideoContact()).fadeIn(); }
function hideCurrentVideoContact() { jQuery(currentVideoContact()).fadeOut(); }
function showBuffering() { jQuery("#buffering").show(); }
function hideBuffering() { jQuery("#buffering").hide(); }
function fullScreen() { jQuery("#window").fullScreen(true); }
function updateHeight() { jQuery("#window").height(jQuery(window).height()); }
function showSurveyDialog() { 
	jQuery("#surveyForm").dialog({
		minWidth: 480,
		buttons: {
			"Submit": function() {
				jQuery("input[name*='doctor']").val(jQuery("input[name*='answer']").val()); 
				jQuery(this).dialog("close");
			},
		},
	}); 
}
function hideSurveyDialog() { jQuery("#surveyForm").hide(); }

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
	  jQuery("input[name*='mail']").val("");
//	  jQuery("input[name*='doctor']").val("");
	  jQuery("input").removeClass("error");
	  jQuery(".error").remove();
	  jQuery(".ErrorLabel").remove();
	  jQuery(".EditingFormErrorLabel").remove();
}

function playCurrentPlayer() {
	if (currentIndex < 3) {
		if (jQuery(currentVideoPage()).find(".tubeplayer").length>0) {
			try {
				var tubeplayer = currentTubePlayer();
				jQuery(tubeplayer).tubeplayer("play");
			}
			catch(e) {
				alert("tubeplayer:"+e);
			}
		}
		else if (jQuery(currentVideoPage()).find(".ytplayer").length>0) {
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
		if (jQuery(currentVideoPage()).find(".tubeplayer").length>0) {
			try {
				var tubeplayer = currentTubePlayer();
				jQuery(tubeplayer).tubeplayer("pause");
			}
			catch(e) {
				alert("tubeplayer:"+e);
			}
		}
		else if (jQuery(currentVideoPage()).find(".ytplayer").length>0) {
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

function onYouTubePlayerAPIReady() {
	//alert("API is ready!");
	jQuery(".ytplayer").each(function(i,e) {
		var ytplayer;
		ytplayer = new YT.Player(jQuery(this).attr("id"), {
          	width: "100%",
			height: '648',
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
		showCurrentStop();
		showCurrentVideoContact();
		break;
	case YT.PlayerState.ENDED:
		hideCurrentStop();
		hideCurrentVideoContact();
		hideCurrentVideo();
		hideBuffering();
		currentIndex = nextIndex(currentIndex);
		showCurrentMenu();
	  	break;
	case YT.PlayerState.PLAYING:
		hideBuffering();
		hideCurrentStop();
		hideCurrentVideoContact();
		showCurrentVideo();
		hideCurrentMenu();
	  	break;
	}
}


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
	  	  
jQuery.tubeplayer.defaults.afterReady = function($player){
	hideBuffering();
}

jQuery(document).ready(function(e) {

	// Разбор строки запроса на элементы
	var url = jQuery.url(jQuery(location).attr("href"));
	
	// Выбор способа воспроизведения видео
	// Для KioskPro, используется HTML5 video 
	// Для остальных случаев воспроизводим с YouTube
	if(typeof kioskpro_id === 'undefined') {
		jQuery("video").remove();
	} else {
		jQuery(".tubeplayer,.ytplayer").remove();
	}

	// Проверка для Kentico
	// Открываем окно с неуспешным результатом отправки формы
	// Убрать когда точно не будем использовать Kentico
	if(jQuery("input[name*='url']").val()==jQuery(location).attr('href')) {
		currentIndex = 3;
	} else {
		currentIndex = 0;
	}
	
	// Проверка для Kentico
	// Открываем окно с успешным результатом отправки формы
	// Убрать когда точно не будем использовать Kentico
	if(jQuery(".InfoLabel").length) {
		jQuery(".InfoLabel").remove();
		currentIndex = 4;
		clearForm();
	}		
	
	jQuery("video").each(function(i,e) {
		var player = this;
			
		player.addEventListener("ended", function(e){
			hideCurrentStop();
			hideCurrentVideoContact();
			hideCurrentVideo();
			hideBuffering();
			currentIndex = nextIndex(currentIndex);
			showCurrentMenu();
		}, false);
		player.addEventListener("playing", function(e){
			hideBuffering();
			hideCurrentStop();
			hideCurrentVideoContact();
			showCurrentVideo();
			hideCurrentMenu();
		}, false);
		player.addEventListener("pause", function(e){
			showCurrentStop();
			showCurrentVideoContact();
		}, false);
		player.addEventListener("waiting", function(e){
			showBuffering();
		}, false);
		player.addEventListener("error", function(e){
			alert("an error in playback.");
		}, false);
	});

	jQuery(".tubeplayer").each(function(i,e) {
		jQuery(this).tubeplayer({
			width: "100%", // the width of the player
			height: 648, // the height of the player
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
				showCurrentStop();
				showCurrentVideoContact();
			}, // when the player returns a state of unstarted
			onPlayerEnded: function(){
				hideCurrentStop();
				hideCurrentVideoContact();
				hideCurrentVideo();
				hideBuffering();
				currentIndex = nextIndex(currentIndex);
				showCurrentMenu();
			}, // when the player returns a state of ended
			onPlayerPlaying: function(){
				hideBuffering();
				hideCurrentStop();
				hideCurrentVideoContact();
				showCurrentVideo();
				hideCurrentMenu();
			}, //when the player returns a state of playing
			onPlayerPaused: function(){
				hideBuffering();
				showCurrentStop();
				showCurrentVideoContact();
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

	// Инициализация для YouTube Player API
	if (jQuery(".ytplayer").length>0) {	
		// Load the IFrame Player API code asynchronously.
		var tag = document.createElement('script');
		tag.src = "https://www.youtube.com/player_api";
		var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	}
/*
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

	// Заполняем элементы ввода значениями переданными в параметрах
	url.attr("query").split("&").forEach(function (value,index) {
		var ar = value.split("=");
		jQuery("input[name*='"+ar[0]+"']").val(ar[1]);
	});

	// Проверка встроенной поддержки для <input type="date">
	// Если нет встроенной поддержки для <input type="date">,
	// то заменяем <input type="date"> на <input type="text">
	if (!Modernizr.inputtypes.date) {
		jQuery("input[type='date']").attr("type","text");
	}
	
	// Обработка поля due_date если нет встроенной поддержки для <input type="date">
	jQuery("input[name*='due_date'][type='text']").focus(function(event) { 
		jQuery( "input[name*='due_date']" ).datepicker( 
			"dialog", 
			jQuery("input[name*='due_date']").val() , 
			function (date, inst) {
				jQuery("input[name*='due_date']").val(date);
			},
			{
				showButtonPanel: true
			}
		);
	});
	jQuery("input[name*='phone']").mask("(999) 999-9999");
	hideDoctor();
	
	jQuery("form").validate();
	
	jQuery(".stop").hide();
	jQuery(".video-contact").hide();
	jQuery(".video-page").hide();
	jQuery(".menu-page").hide();
	updateHeight();
	showCurrentMenu();
	hideBuffering();
	hideSurveyDialog();

	jQuery(window).resize(function() {
		updateHeight();
	});
	
	fullScreen();
	
	// Открытие формы вопроса перед началом использования сайта
	// Условие - либо нет iPadID, либо в строке адреса нет параметров
	if(((typeof kioskpro_id === 'undefined') || !kioskpro_id.toString().split(" ").join(""))
	&& !url.attr("query") && !url.attr("fragment")) {
		showSurveyDialog();
	}
	
	jQuery(".save").click(function(event) {
		if (event.preventDefault) { event.preventDefault(); } else { event.returnValue = false; }
		if (jQuery('#callbackForm').valid()) {
			jQuery('#callbackForm').ajaxSubmit({
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
		hideCurrentStop();
		hideCurrentVideoContact();
		hideCurrentVideo();
		showCurrentMenu();
	});

	jQuery(".video-contact").click(function(event) {
		if (event.preventDefault) { event.preventDefault(); } else { event.returnValue = false; }
		pauseCurrentPlayer();
		hideCurrentStop();
		hideCurrentVideoContact();
		hideCurrentVideo();
		currentIndex = 3;
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
//		showBuffering();
		hideCurrentMenu();
		showCurrentStop();
		showCurrentVideoContact();
		showCurrentVideo();
		playCurrentPlayer();
	});

	jQuery(".replay").click(function(event) {
		if (event.preventDefault) { event.preventDefault(); } else { event.returnValue = false; }
		hideCurrentMenu();
//		showBuffering();
		currentIndex = prevIndex(currentIndex);
		showCurrentStop();
		showCurrentVideoContact();
		showCurrentVideo();
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
});
