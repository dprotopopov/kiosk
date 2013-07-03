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
				debugWrite("Ответ",jQuery("input[name*='answer']").val());
				jQuery("input[name*='doctor']").val(jQuery("input[name*='answer']").val()); 
				jQuery(this).dialog("close");
			}
		}
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
				debugWrite("tubeplayer:",e);
			}
		}
		else if (jQuery(currentVideoPage()).find(".ytplayer").length>0) {
			try {
				var ytplayer = currentYtPlayer();
				ytplayer.playVideo();
			}
			catch(e) {
				debugWrite("youtube player api:",e);
			}
		}
		else {
			try {
				var player = currentPlayer();
				player.play();
			}
			catch(e) {
				debugWrite("video html5:",e);
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
				debugWrite("tubeplayer:",e);
			}
		}
		else if (jQuery(currentVideoPage()).find(".ytplayer").length>0) {
			try {
				var ytplayer = currentYtPlayer();
				ytplayer.pauseVideo();
			}
			catch(e) {
				debugWrite("youtube player api:",e);
			}
		}
		else {
			try {
				var player = currentPlayer();
				player.pause();
			}
			catch(e) {
				debugWrite("video html5:",e);
			}
		}
	}
}

function onYouTubePlayerAPIReady() {
	debugWrite("YouTube Player API is ready!");
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
	debugWrite(event.data);
}
  
function onPlayerReady(event) {
  	hideBuffering();
}
  
function onPlayerStateChange(event) {
	debugWrite("Player's new state: ",event.data);
	switch(event.data) {
	case YT.PlayerState.BUFFERING:
//		showBuffering();
		break;
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

function crossDomainSubmit(item) {
  // Add the iframe with a unique name
  var uniqueString = "crossDomainForm-"+jQuery("iframe").length;
  var iframe = document.createElement("iframe");
  document.body.appendChild(iframe);
  iframe.style.display = "none";
  try {
  	iframe.contentWindow.name = uniqueString;
  } catch(e) {
  	debugWrite('iframe.contentWindow.name error',e);
  }
  debugWrite('iframe.contentWindow.name',iframe.contentWindow.name);

  // construct a form with hidden inputs, targeting the iframe
  var form = document.createElement("form");
  form.target = iframe.contentWindow.name;
  debugWrite('form.target',form.target);
  debugWrite('item.attr("action")',item.attr("action"));
  form.action = item.attr("action");
  debugWrite('form.action',form.action);
  debugWrite('item.attr("method")',item.attr("method"));
  form.method = item.attr("method");
  debugWrite('form.method',form.method);

  // repeat for each parameter
  item.find("input").each(function(index, element) {
	  var input = document.createElement("input");
	  input.type = "hidden";
  	  debugWrite("element.name",element.name);
	  input.name = element.name;
  	  debugWrite("input.name",input.name);
  	  debugWrite("element.value",element.value);
	  input.value = element.value;
  	  debugWrite("input.value",input.value);
	  form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();
}
function urldecode (str) {
  // http://kevin.vanzonneveld.net
  // +   original by: Philip Peterson
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +      input by: AJ
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // +      input by: travc
  // +      input by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Lars Fischer
  // +      input by: Ratheous
  // +   improved by: Orlando
  // +      reimplemented by: Brett Zamir (http://brett-zamir.me)
  // +      bugfixed by: Rob
  // +      input by: e-mike
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // %        note 1: info on what encoding functions to use from: http://xkr.us/articles/javascript/encode-compare/
  // %        note 2: Please be aware that this function expects to decode from UTF-8 encoded strings, as found on
  // %        note 2: pages served as UTF-8
  // *     example 1: urldecode('Kevin+van+Zonneveld%21');
  // *     returns 1: 'Kevin van Zonneveld!'
  // *     example 2: urldecode('http%3A%2F%2Fkevin.vanzonneveld.net%2F');
  // *     returns 2: 'http://kevin.vanzonneveld.net/'
  // *     example 3: urldecode('http%3A%2F%2Fwww.google.nl%2Fsearch%3Fq%3Dphp.js%26ie%3Dutf-8%26oe%3Dutf-8%26aq%3Dt%26rls%3Dcom.ubuntu%3Aen-US%3Aunofficial%26client%3Dfirefox-a');
  // *     returns 3: 'http://www.google.nl/search?q=php.js&ie=utf-8&oe=utf-8&aq=t&rls=com.ubuntu:en-US:unofficial&client=firefox-a'
  return decodeURIComponent((str + '').replace(/\+/g, '%20'));
}
function debugWrite(a,b) {
	try {
		console.log(a,b);
	} catch (e) {
	}
}

jQuery(document).ready(function(e) {

	// Переадресация на мобильную версию
	debugWrite("Переадресация на мобильную версию","start");
	if(jQuery.browser.mobile) {
		window.location.hostname = "m.safeguardingstemcells.com";
	}
	debugWrite("Переадресация на мобильную версию","end");
	
	// Разбор строки запроса на элементы
	debugWrite("Разбор строки запроса на элементы","start");
	var url = false;
	try {
		url = jQuery.url(window.location.toString());
	} catch (e) {
		debugWrite("jQuery.url error",e);
	}
	debugWrite("Разбор строки запроса на элементы","end");
	
	
	// Выбор способа воспроизведения видео
	// Для KioskPro, используется HTML5 video 
	// Для остальных случаев воспроизводим с YouTube
	debugWrite("Выбор способа воспроизведения видео","start");
	if(typeof kioskpro_id === 'undefined') {
		jQuery("video").remove();
	} else {
		jQuery(".tubeplayer,.ytplayer").remove();
	}
	debugWrite("Выбор способа воспроизведения видео","end");

	// Проверка для Kentico
	// Открываем окно с неуспешным результатом отправки формы
	// Убрать когда точно не будем использовать Kentico
	debugWrite("Проверка для Kentico","start");
	try {
		if(jQuery("input[name*='url']").val()==window.location.toString()) {
			currentIndex = 3;
		} else {
			currentIndex = 0;
		}
	} catch(e) {
		debugWrite("error",e);
	}
	debugWrite("Проверка для Kentico","end");
	
	// Проверка для Kentico
	// Открываем окно с успешным результатом отправки формы
	// Убрать когда точно не будем использовать Kentico
	debugWrite("Проверка для Kentico","start");
	if(jQuery(".InfoLabel").length) {
		jQuery(".InfoLabel").remove();
		currentIndex = 4;
		clearForm();
	}		
	debugWrite("Проверка для Kentico","end");
	
	debugWrite("Инициализация html5 video","start");
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
			debugWrite("an error in playback.");
		}, false);
	});
	debugWrite("Инициализация html5 video","end");

	debugWrite("Инициализация tubeplayer","start");
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
				debugWrite("tubeplayer","a video cant be found");
			}, // if a video cant be found
			onErrorNotEmbeddable: function(){
				debugWrite("tubeplayer","a video isnt embeddable");
			}, // if a video isnt embeddable
			onErrorInvalidParameter: function(){
				debugWrite("tubeplayer","we've got an invalid param");
			} // if we've got an invalid param
		});
	});
	debugWrite("Инициализация tubeplayer","end");

	// Инициализация для YouTube Player API
	debugWrite("Инициализация YouTube Player API","start");
	if (jQuery(".ytplayer").length) {	
		// Load the IFrame Player API code asynchronously.
		var tag = document.createElement('script');
		tag.src = "https://www.youtube.com/player_api";
		var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	}
	debugWrite("Инициализация YouTube Player API","end");
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
	debugWrite("Инициализация переменных","start");
	try {
		jQuery("input[name*='ipad_id']").val(getID());
		jQuery("input[name*='url']").val(window.location.toString());
	} catch(e) {
		debugWrite("error",e);
	}
	debugWrite("Инициализация переменных","end");

	// Заполняем элементы ввода значениями переданными в параметрах
	debugWrite("Заполняем элементы ввода значениями переданными в параметрах","start");
	try {
		url.attr("query").split("&").forEach(function (value,index) {
			var ar = value.split("=");
			debugWrite(ar[0],ar[1]);
			jQuery("input[name*='"+ar[0]+"']").val(urldecode(ar[1]));
		});
	} catch (e) {
		debugWrite('url.attr("query").split("&").forEach error',e);
	}
	debugWrite("Заполняем элементы ввода значениями переданными в параметрах","end");

	// Проверка встроенной поддержки для <input type="date">
	// Если нет встроенной поддержки для <input type="date">,
	// то заменяем <input type="date"> на <input type="text">
	debugWrite("Проверка встроенной поддержки для <input type='date'>","start");
	if (!Modernizr.inputtypes.date) {
		try {
			jQuery("input[type='date']").attr("type","text");
		} catch (e) {
			debugWrite('jQuery("input[type=\'date\']").attr("type","text") error',e);
		}
	}
	debugWrite("Проверка встроенной поддержки для <input type='date'>","end");
	
	// Обработка поля due_date если нет встроенной поддержки для <input type="date">
	debugWrite("Обработка поля due_date если нет встроенной поддержки для <input type='date'>","start");
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
	debugWrite("Обработка поля due_date если нет встроенной поддержки для <input type='date'>","end");

	debugWrite("Установка маски ввода (999) 999-9999","start");
	try {
		jQuery("input[name*='phone']").mask("(999) 999-9999");
	} catch (e) {
		debugWrite('jQuery("input[name*=\'phone\']").mask("(999) 999-9999") error',e);
	}
	debugWrite("Установка маски ввода (999) 999-9999","end");

	debugWrite("hideDoctor","start");
	hideDoctor();
	debugWrite("hideDoctor","end");
	
	debugWrite("Установка валидации форм","start");
	try {
		jQuery("form").validate();
	} catch (e) {
		debugWrite('jQuery("form").validate() error',e);
	}
	debugWrite("Установка валидации форм","end");
	
	debugWrite("Выключение отображения элементов","start");
	try {
		jQuery(".stop").hide();
		jQuery(".video-contact").hide();
		jQuery(".video-page").hide();
		jQuery(".menu-page").hide();
		hideBuffering();
		hideSurveyDialog();
	} catch (e) {
		debugWrite('error',e);
	}
	debugWrite("Выключение отображения элементов","end");
	
	debugWrite("Изменение размера элементов под размер экрана","start");
	try {
		updateHeight();
	} catch (e) {
		debugWrite('updateHeight error',e);
	}
	debugWrite("Изменение размера элементов под размер экрана","start");
	
	debugWrite("Отображение текущего меню","start");
	showCurrentMenu();
	debugWrite("Отображение текущего меню","end");

	jQuery(window).resize(function() {
		updateHeight();
	});
	
	debugWrite("Попытка включения полноэкранного режима","start");
	try {
		fullScreen();
	} catch (e) {
		debugWrite('fullScreen error',e);
	}
	debugWrite("Попытка включения полноэкранного режима","end");
	
	// Открытие формы вопроса перед началом использования сайта
	// Условие - либо нет iPadID, либо в строке адреса нет параметров
	debugWrite("Проверка и открытие формы вопроса","start");
	try {
		if(((typeof kioskpro_id === 'undefined') || !kioskpro_id.toString().split(" ").join(""))
		&& (!url || (!url.attr("query") && !url.attr("fragment")))) {
			showSurveyDialog();
		}
	} catch (e) {
		debugWrite('error',e);
	}
	debugWrite("Проверка и открытие формы вопроса","end");
	
	jQuery(".save").click(function(event) {
		if (event.preventDefault) { event.preventDefault(); } else { event.returnValue = false; }
		var isValid = false
		debugWrite("Валидация формы обратной связи","start");
		try {
			isValid = jQuery("#callbackForm").valid();
		} catch (e) {
			debugWrite('jQuery("#callbackForm").valid() error',e);
			debugWrite("Ручная валидация формы обратной связи","start");
			jQuery("input").removeClass("error");
			jQuery(".error").remove();
			jQuery(".ErrorLabel").remove();
			jQuery(".EditingFormErrorLabel").remove();
			isValid = true;
			jQuery("#callbackForm").find("input.required").each(function(index, element) {
				debugWrite("Валидация элемента",element.getAttribute("name"));
                if(!element.value) {
					debugWrite("Элемент не валидный",element);
					isValid = false;
					debugWrite("Добавление сообщения об ошибке","start");
					//$(element).addClass("error");
 					var error = document.createElement("label");
					error.setAttribute("for",element.getAttribute("name"));
					error.className = 'error';
					element.parentNode.appendChild(error);
					debugWrite("Добавление сообщения об ошибке","end");
				}
            });
			debugWrite("Ручная валидация формы обратной связи","end");
		}
		debugWrite("Валидация формы обратной связи","end");
		if (isValid) {
			debugWrite("Отправка формы обратной связи","start");
			try {
				jQuery("#callbackForm").ajaxSubmit({
					timeout:   3000,
					dataFilter: function( data, type ) {
						debugWrite("data:",data);
						debugWrite("type:",type);
					},
					success:    function() { 
						hideCurrentMenu();
						currentIndex = 4;
						clearForm();
						showCurrentMenu();
					},
					beforeSend:		function(xhr, settings) {
						debugWrite("xhr:",xhr);
						debugWrite("settings:",settings);
					},
					error:		function(xhr, textStatus, thrownError) {
						// Here's where you handle an error response.
						// Note that if the error was due to a CORS issue,
						// this function will still fire, but there won't be any additional
						// information about the error.
						debugWrite("#callbackForm","Error to send form");
						debugWrite("xhr:",xhr);
						debugWrite("textStatus:",textStatus);
						debugWrite("thrownError:",thrownError);
						debugWrite("Ручная отправка кросс-доменной формы обратной связи","start");
						crossDomainSubmit(jQuery('#callbackForm'));
						debugWrite("Ручная отправка кросс-доменной формы обратной связи","end");
						
						hideCurrentMenu();
						currentIndex = 4;
						clearForm();
						showCurrentMenu();
					}
				});
			} catch (e) {
				debugWrite('jQuery("#callbackForm").ajaxSubmit error',e);
				debugWrite("Ручная отправка кросс-доменной формы обратной связи Попытка №2","start");
				try {
					crossDomainSubmit(jQuery('#callbackForm'));
				} catch(e) {
					debugWrite("crossDomainSubmit error",e);
				}
				debugWrite("Ручная отправка кросс-доменной формы обратной связи Попытка №2","end");
				
				hideCurrentMenu();
				currentIndex = 4;
				clearForm();
				showCurrentMenu();
			}
			debugWrite("Отправка формы обратной связи","end");
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
