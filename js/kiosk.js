jQuery.noConflict();

// Используется для YouTube Player API
//var YtPlayers = new Array();

var currentIndex = 0;
var currentLanguage = "en";

var url = false;

// Определение воспроизводимого видео
// Задаётся видео ID на YouTube и массив видео-файлов
// В дальнейшем в зависимости от способа воспроизведения видео
// будет воспроизводится либо видео с YouTube, либо из видео-файла
var videos = {
	en: {
		video1: { 
			videoId: "uuqGzMd808c",
			sources: [ 
				{ src:"video/CC_an_13.mp4", type:'video/mp4; codecs="avc1.42E01E, mp4a.40.2"' },
     			{ src:"video/CC_an_13.ogv", type:'video/ogg; codecs="theora, vorbis"' }
			]
		},
		video2: { 
			videoId: "vYdjHhDGAUI",
			sources: [ 
				{ src:"video/One-Life-Saved-FINAL.mp4", type:'video/mp4; codecs="avc1.42E01E, mp4a.40.2"' },
     			{ src:"video/One-Life-Saved-FINAL.ogv", type:'video/ogg; codecs="theora, vorbis"' }
			]
		},
		video3: { 
			videoId: "BJUN4LrXi88#!",
			sources: [ 
				{ src:"video/Cryo-Cell-Replication_Master-1280.mp4", type:'video/mp4; codecs="avc1.42E01E, mp4a.40.2"' },
     			{ src:"video/Cryo-Cell-Replication_Master-1280.ogv", type:'video/ogg; codecs="theora, vorbis"' }
			]
		}
	},
	es: {
		video1: { 
			videoId: "uuqGzMd808c",
			sources: [ 
				{ src:"video/CC_an_13.mp4", type:'video/mp4; codecs="avc1.42E01E, mp4a.40.2"' },
     			{ src:"video/CC_an_13.ogv", type:'video/ogg; codecs="theora, vorbis"' }
			]
		},
		video2: { 
			videoId: "vYdjHhDGAUI",
			sources: [ 
				{ src:"video/One-Life-Saved-Spanish-FINAL.mp4", type:'video/mp4; codecs="avc1.42E01E, mp4a.40.2"' },
     			{ src:"video/One-Life-Saved-Spanish-FINAL.ogv", type:'video/ogg; codecs="theora, vorbis"' }
			]
		},
		video3: { 
			videoId: "BJUN4LrXi88#!",
			sources: [ 
				{ src:"video/Cryo-Cell-Replication_Master-1280.mp4", type:'video/mp4; codecs="avc1.42E01E, mp4a.40.2"' },
     			{ src:"video/Cryo-Cell-Replication_Master-1280.ogv", type:'video/ogg; codecs="theora, vorbis"' }
			]
		}
	},
	ru: {
		video1: { 
			videoId: "uuqGzMd808c",
			sources: [ 
				{ src:"video/CC_an_13.mp4", type:'video/mp4; codecs="avc1.42E01E, mp4a.40.2"' },
     			{ src:"video/CC_an_13.ogv", type:'video/ogg; codecs="theora, vorbis"' }
			]
		},
		video2: { 
			videoId: "vYdjHhDGAUI",
			sources: [ 
				{ src:"video/One-Life-Saved-FINAL.mp4", type:'video/mp4; codecs="avc1.42E01E, mp4a.40.2"' },
     			{ src:"video/One-Life-Saved-FINAL.ogv", type:'video/ogg; codecs="theora, vorbis"' }
			]
		},
		video3: { 
			videoId: "BJUN4LrXi88#!",
			sources: [ 
				{ src:"video/Cryo-Cell-Replication_Master-1280.mp4", type:'video/mp4; codecs="avc1.42E01E, mp4a.40.2"' },
     			{ src:"video/Cryo-Cell-Replication_Master-1280.ogv", type:'video/ogg; codecs="theora, vorbis"' }
			]
		}
	},
	it: {
		video1: { 
			videoId: "uuqGzMd808c",
			sources: [ 
				{ src:"video/CC_an_13.mp4", type:'video/mp4; codecs="avc1.42E01E, mp4a.40.2"' },
     			{ src:"video/CC_an_13.ogv", type:'video/ogg; codecs="theora, vorbis"' }
			]
		},
		video2: { 
			videoId: "vYdjHhDGAUI",
			sources: [ 
				{ src:"video/One-Life-Saved-FINAL.mp4", type:'video/mp4; codecs="avc1.42E01E, mp4a.40.2"' },
     			{ src:"video/One-Life-Saved-FINAL.ogv", type:'video/ogg; codecs="theora, vorbis"' }
			]
		},
		video3: { 
			videoId: "BJUN4LrXi88#!",
			sources: [ 
				{ src:"video/Cryo-Cell-Replication_Master-1280.mp4", type:'video/mp4; codecs="avc1.42E01E, mp4a.40.2"' },
     			{ src:"video/Cryo-Cell-Replication_Master-1280.ogv", type:'video/ogg; codecs="theora, vorbis"' }
			]
		}
	},
	cn: {
		video1: { 
			videoId: "uuqGzMd808c",
			sources: [ 
				{ src:"video/CC_an_13.mp4", type:'video/mp4; codecs="avc1.42E01E, mp4a.40.2"' },
     			{ src:"video/CC_an_13.ogv", type:'video/ogg; codecs="theora, vorbis"' }
			]
		},
		video2: { 
			videoId: "vYdjHhDGAUI",
			sources: [ 
				{ src:"video/One-Life-Saved-FINAL.mp4", type:'video/mp4; codecs="avc1.42E01E, mp4a.40.2"' },
     			{ src:"video/One-Life-Saved-FINAL.ogv", type:'video/ogg; codecs="theora, vorbis"' }
			]
		},
		video3: { 
			videoId: "BJUN4LrXi88#!",
			sources: [ 
				{ src:"video/Cryo-Cell-Replication_Master-1280.mp4", type:'video/mp4; codecs="avc1.42E01E, mp4a.40.2"' },
     			{ src:"video/Cryo-Cell-Replication_Master-1280.ogv", type:'video/ogg; codecs="theora, vorbis"' }
			]
		}
	},
	tw: {
		video1: { 
			videoId: "uuqGzMd808c",
			sources: [ 
				{ src:"video/CC_an_13.mp4", type:'video/mp4; codecs="avc1.42E01E, mp4a.40.2"' },
     			{ src:"video/CC_an_13.ogv", type:'video/ogg; codecs="theora, vorbis"' }
			]
		},
		video2: { 
			videoId: "vYdjHhDGAUI",
			sources: [ 
				{ src:"video/One-Life-Saved-FINAL.mp4", type:'video/mp4; codecs="avc1.42E01E, mp4a.40.2"' },
     			{ src:"video/One-Life-Saved-FINAL.ogv", type:'video/ogg; codecs="theora, vorbis"' }
			]
		},
		video3: { 
			videoId: "BJUN4LrXi88#!",
			sources: [ 
				{ src:"video/Cryo-Cell-Replication_Master-1280.mp4", type:'video/mp4; codecs="avc1.42E01E, mp4a.40.2"' },
     			{ src:"video/Cryo-Cell-Replication_Master-1280.ogv", type:'video/ogg; codecs="theora, vorbis"' }
			]
		}
	}
};

// Кнопки, отображаемые на странице с видео при остановке вопроизведения видео
// Классы кнопок:
//		button
//		button-small
//		button-mini
//		button-small-mini
var videoButtons = {
	en: {
		videoStop: { buttonClass:"button-small-mini", text:"Done" },
		videoContact: { buttonClass:"button-mini", text:"Have Questions ?" }
	},
	es: {
		videoStop: { buttonClass:"button-small-mini", text:"Hecho" },
		videoContact: { buttonClass:"button-mini", text:"¿Tiene preguntas?" }
	},
	ru: {
		videoStop: { buttonClass:"button-small-mini", text:"Стоп" },
		videoContact: { buttonClass:"button-mini", text:"У Вас вопросы ?" }
	},
	it: {
		videoStop: { buttonClass:"button-small-mini", text:"Fatto" },
		videoContact: { buttonClass:"button-mini", text:"Sono domande ?" }
	},
	cn: {
		videoStop: { buttonClass:"button-small-mini", text:"完成" },
		videoContact: { buttonClass:"button-mini", text:"有疑问吗？" }
	},
	tw: {
		videoStop: { buttonClass:"button-small-mini", text:"完成" },
		videoContact: { buttonClass:"button-mini", text:"有疑問嗎？" }
	}
};

// Кнопки, отображаемые на странице меню
// Классы кнопок:
//		button
//		button-small
//		button-mini
//		button-small-mini
var menuButtons = {
	en: {
		replay: { buttonClass:"button", text:"Replay" },
		play: { buttonClass:"button", text:"" },
		prev: { buttonClass:"button-small", text:"" },
		next: { buttonClass:"button-small", text:"" },
		home: { buttonClass:"button", text:"Home" },
		contact: { buttonClass:"button", text:"Have Questions ?" },
		save: { buttonClass:"button", text:"Submit" }
	},
	es: {
		replay: { buttonClass:"button", text:"Replay" },
		play: { buttonClass:"button", text:"" },
		prev: { buttonClass:"button-small", text:"" },
		next: { buttonClass:"button-small", text:"" },
		home: { buttonClass:"button", text:"Página principal" },
		contact: { buttonClass:"button", text:"¿Tiene preguntas?" },
		save: { buttonClass:"button", text:"Enviar" }
	},
	ru: {
		replay: { buttonClass:"button", text:"Повторить" },
		play: { buttonClass:"button", text:"" },
		prev: { buttonClass:"button-small", text:"" },
		next: { buttonClass:"button-small", text:"" },
		home: { buttonClass:"button", text:"Главная" },
		contact: { buttonClass:"button", text:"У Вас вопросы ?" },
		save: { buttonClass:"button", text:"Отправить" }
	},
	it: {
		replay: { buttonClass:"button", text:"Replay" },
		play: { buttonClass:"button", text:"" },
		prev: { buttonClass:"button-small", text:"" },
		next: { buttonClass:"button-small", text:"" },
		home: { buttonClass:"button", text:"Homepage" },
		contact: { buttonClass:"button", text:"Sono domande ?" },
		save: { buttonClass:"button", text:"Invia" }
	},
	cn: {
		replay: { buttonClass:"button", text:"重播" },
		play: { buttonClass:"button", text:"" },
		prev: { buttonClass:"button-small", text:"" },
		next: { buttonClass:"button-small", text:"" },
		home: { buttonClass:"button", text:"首頁" },
		contact: { buttonClass:"button", text:"有疑问吗？ " },
		save: { buttonClass:"button", text:"提交" }
	},
	tw: {
		replay: { buttonClass:"button", text:"重播" },
		play: { buttonClass:"button", text:"" },
		prev: { buttonClass:"button-small", text:"" },
		next: { buttonClass:"button-small", text:"" },
		home: { buttonClass:"button", text:"首頁" },
		contact: { buttonClass:"button", text:"有疑問嗎？" },
		save: { buttonClass:"button", text:"提交" }
	}
};

// Заголовки и субтитлы отображаемые на страницах
// Задаются в виде html кода
var pages = {
	en: {
		page1: { 
			title: "Why should you store<br />your baby’s cord blood?",
			subtitle: "Watch an animated video on cord blood stem cells."
		},
		page2: {
			title: "How can cord blood save lives?",
			subtitle: "Watch a 3 minute video on one family’s story."
		},
		page3: { 
			title: "Why choose <span nowrap>Cryo-Cell</span>?",
			subtitle: "Watch a video on the world’s leading cord blood company."
		},
		page4: { 
			title: "Thank you",
			subtitle: "We hope you found these videos informative.<br />To learn more about our services, please fill in the contact form below."
		},
		page5: { 
			title: "Thank you",
			subtitle: "Your request has been sent.<br />One of our client services representatives will contact you shortly."
		}
	},
	es: {
		page1: { 
			title: "¿Por qué debe almacenar la sangre del cordón umbilical de su bebé?",
			subtitle: "Vea un breve vídeo animado sobre las células madre del cordón umbilical."
		},
		page2: {
			title: "¿Cómo puede la sangre del cordón umbilical salvar vidas?",
			subtitle: "Vea el siguiente video de 3 minutos sobre la historia de una familia."
		},
		page3: { 
			title: "¿Por qué elegir Cryo-Cell?",
			subtitle: "Vea un breve video sobre la compañía líder en la preservación de la sangre del cordón umbilical."
		},
		page4: { 
			title: "Gracias",
			subtitle: "Esperamos que haya encontrado estos breves videos muy informativos.<br />Para obtener más información acerca de nuestros servicios, por favor complete el siguiente formulario de contacto."
		},
		page5: { 
			title: "Gracias",
			subtitle: "Your request has been sent.<br />One of our client services representatives will contact you shortly."
		}
	},
	ru: {
		page1: { 
			title: "Почему Вы должны сохранить пуповинную кровь Вашего ребенка?",
			subtitle: "Смотрите анимационное видео о стволовых клетках в пуповинной крови."
		},
		page2: {
			title: "Как пуповинная кровь<br />спасает жизнь?",
			subtitle: "Смотрите 3-х минутное видео истории одной семьи."
		},
		page3: { 
			title: "Почему выбирают <span nowrap>Cryo-Cell</span>?",
			subtitle: "Смотрите видео о ведущей компании в мире, сохраняющей пуповинную кровь."
		},
		page4: { 
			title: "Спасибо",
			subtitle: "Мы надеемся, что вы нашли это видео полезным.<br />Чтобы узнать больше о наших услугах, пожалуйста, заполните форму ниже."
		},
		page5: { 
			title: "Спасибо",
			subtitle: "Ваше сообщение было отправлено.<br />Наш представитель по обслуживанию клиентов свяжется с Вами в ближайшее время."
		}
	},
	it: {
		page1: { 
			title: "Why should you store<br />your baby’s cord blood?",
			subtitle: "Watch an animated video on cord blood stem cells."
		},
		page2: {
			title: "How can cord blood save lives?",
			subtitle: "Watch a 3 minute video on one family’s story."
		},
		page3: { 
			title: "Perché scegliere <span nowrap>Cryo-Cell</span>?",
			subtitle: "Watch a video on the world’s leading cord blood company."
		},
		page4: { 
			title: "Grazie",
			subtitle: "We hope you found these videos informative.<br />To learn more about our services, please fill in the contact form below."
		},
		page5: { 
			title: "Grazie",
			subtitle: "Your request has been sent.<br />One of our client services representatives will contact you shortly."
		}
	},
	cn: {
		page1: { 
			title: "为什么您应该储存宝宝的脐带血？",
			subtitle: "请观赏一个有关脐带血干细胞的动画短视频。"
		},
		page2: {
			title: "脐带血如何能挽救生命",
			subtitle: "请观赏一个3分钟的视频：一个家庭的故事。"
		},
		page3: { 
			title: "为何选择Cryo-Cell?",
			subtitle: "请观赏一个短视频，为您介绍领先世界的脐带血公司。"
		},
		page4: { 
			title: "谢谢",
			subtitle: "希望这些短视频为您提供了翔实的资讯。<br />若想更了解我们的服务，请填写下面的联系表格。"
		},
		page5: { 
			title: "谢谢",
			subtitle: "Your request has been sent.<br />One of our client services representatives will contact you shortly."
		}
	},
	tw: {
		page1: { 
			title: "為什麼您應該儲存寶寶的臍帶血？",
			subtitle: "請觀賞一個有關臍帶血幹細胞的卡通短視頻。"
		},
		page2: {
			title: "臍帶血如何能挽救生命？",
			subtitle: "請觀賞一個3分鐘的視頻：一個家庭的故事。"
		},
		page3: { 
			title: "為何選擇Cryo-Cell？",
			subtitle: "請觀賞一個短視頻，為您介紹領先世界的臍帶血公司"
		},
		page4: { 
			title: "謝謝",
			subtitle: "希望這些短視頻為您提供了翔實的資訊。<br />若想更了解我們的服務，請填寫下面的聯繫表格。"
		},
		page5: { 
			title: "謝謝",
			subtitle: "Your request has been sent.<br />One of our client services representatives will contact you shortly."
		}
	}
};

// Названия полей формы обратной связи
// Задаются в виде обычного текста
var formLabels = {
	en: {
		first_name: "First Name",
		last_name: "Last Name",
		due_date: "Expected Delivery Date",
		phone_number: "Phone Number",
		email: "Email",
		doctor: "Doctor"
	},
	es: {
		first_name: "Nombre",
		last_name: "Apellido",
		due_date: "Fecha estimada de parto",
		phone_number: "Teléfono",
		email: "Correo electrónico",
		doctor: "Médico"
	},
	ru: {
		first_name: "Имя",
		last_name: "Фамилия",
		due_date: "Ожидаемая дата",
		phone_number: "Номер телефона",
		email: "Email",
		doctor: "Доктор"
	},
	it: {
		first_name: "Nome",
		last_name: "Cognome",
		due_date: "Data di arrivo",
		phone_number: "Numero di telefono",
		email: "Email",
		doctor: "Doctor"
	},
	cn: {
		first_name: "名",
		last_name: "姓",
		due_date: "预产期",
		phone_number: "电话号码",
		email: "电子邮件",
		doctor: "醫生"
	},
	tw: {
		first_name: "名",
		last_name: "姓",
		due_date: "預產期",
		phone_number: "電話號碼",
		email: "電子郵件",
		doctor: "醫生"
	}
};

// Заголовок и вопрос в форме, открываемой при отсутствии параметров в адресной строке
// Заголовок задаётся в виде html кода
// Вопрос задаётся в виде обычного теста
var surveys = {
	en: {
		title: "<strong>Welcome to the Cord Blood<br />Education Program</strong>",
		label: "Please enter below the name of the Ob/Gyn practice or doctor where you heard about these videos:"
	},
	es: {
		title: "<strong>Bienvenido al programa de Educación de la Sangre del Cordón Umbilical</strong>",
		label: "Por favor de ingresar el nombre del  consultorio o de su médico obstetra / ginecólogo:"
	},
	ru: {
		title: "<strong>Добро пожаловать в программу обучения<br />по сохранению пуповинной крови</strong>",
		label: "Пожалуйста, укажите генекологическую практику или доктора, где или от которого Вы узнали об этом видео:"
	},
	it: {
		title: "<strong>Welcome to the Cord Blood<br />Education Program</strong>",
		label: "Please enter below the name of the Ob/Gyn practice or doctor where you heard about these videos:"
	},
	cn: {
		title: "<strong>欢迎观赏这个脐带血教育节目</strong>",
		label: "请在下面输入您的妇产科医生或诊所的名称:"
	},
	tw: {
		title: "<strong>歡迎觀賞這個臍帶血教育節目</strong>",
		label: "請在下面輸入您的婦產科醫生或診所的名稱:"
	}
};

// Список поддерживаемых языков
var languages = {
	en: "English",
	es: "Español",
	ru: "Русский",
	cn: "简体中文",
	tw: "繁體中文"
};

function currentCallbackForm() { return jQuery("#callbackForm",currentMenuPage()); }
function currentMenuPage() { return jQuery(".menu-page." + currentLanguage).get(currentIndex); }
function currentVideoPage() { return jQuery(".video-page." + currentLanguage).get(currentIndex); }
function currentVideoStop() { return jQuery(currentVideoPage()).find(".videoStop").get(0); }
function currentVideoContact() { return jQuery(currentVideoPage()).find(".videoContact").get(0); }
function currentPlayer() { return jQuery(currentVideoPage()).find("video").get(0); }
function currentYtPlayer() { return YtPlayers[jQuery(".ytplayer").index(jQuery(currentVideoPage()).find(".ytplayer").get(0))]; }
function currentTubePlayer() { return jQuery(currentVideoPage()).find(".tubeplayer").get(0); }
function nextIndex(index) { index++ ; if(index >= 5) index = 4; return index; }
function prevIndex(index) { index-- ; if(index < 0) index = 0; return index; }
function showCurrentMenu() { jQuery(currentMenuPage()).fadeIn("slow"); }
function hideCurrentMenu() { jQuery(currentMenuPage()).fadeOut("slow"); }
function showCurrentVideo() { jQuery(currentVideoPage()).show(); }
function hideCurrentVideo() { jQuery(currentVideoPage()).hide(); }
function showCurrentVideoStop() { jQuery(currentVideoStop()).fadeIn(); }
function hideCurrentVideoStop() { jQuery(currentVideoStop()).fadeOut(); }
function showCurrentVideoContact() { jQuery(currentVideoContact()).fadeIn(); }
function hideCurrentVideoContact() { jQuery(currentVideoContact()).fadeOut(); }
function showBuffering() { jQuery("#buffering").show(); }
function hideBuffering() { jQuery("#buffering").hide(); }
function fullScreen() { jQuery("#window").fullScreen(true); }
function updateHeight() { jQuery("#window").height(jQuery(window).height()); }
function showSurveyDialog() { 
	jQuery("#surveyForm." + currentLanguage +"").keypress(function(event) {
		if (event.keyCode == jQuery.ui.keyCode.ENTER) {
			if (event.preventDefault) { event.preventDefault(); } else { event.returnValue = false; }
			debugWrite("event.keyCode","ENTER");
			debugWrite("Ответ",jQuery("." + currentLanguage +" input[name*='answer']").val());
			jQuery("input[name*='doctor']").val(jQuery("." + currentLanguage +" input[name*='answer']").val()); 
			jQuery(this).dialog("close");
		}
	});
	jQuery("#surveyForm." + currentLanguage +"").dialog({
		minWidth: 480,
		buttons: {
			"Submit": function() {
				debugWrite("Ответ",jQuery("." + currentLanguage +" input[name*='answer']").val());
				jQuery("input[name*='doctor']").val(jQuery("." + currentLanguage +" input[name*='answer']").val()); 
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
//	jQuery("input[name*='doctor']").val("");
	jQuery("input").removeClass("error");
	jQuery(".error").remove();
	jQuery(".ErrorLabel").remove();
	jQuery(".EditingFormErrorLabel").remove();
}

function playCurrentPlayer() {
	if (currentIndex < 3) {
		if (jQuery(currentVideoPage()).find(".tubeplayer").length) {
			try {
				var tubeplayer = currentTubePlayer();
				jQuery(tubeplayer).tubeplayer("play");
			}
			catch(e) {
				debugWrite("tubeplayer:",e);
			}
		}
		else if (jQuery(currentVideoPage()).find(".ytplayer").length) {
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
		if (jQuery(currentVideoPage()).find(".tubeplayer").length) {
			try {
				var tubeplayer = currentTubePlayer();
				jQuery(tubeplayer).tubeplayer("pause");
			}
			catch(e) {
				debugWrite("tubeplayer:",e);
			}
		}
		else if (jQuery(currentVideoPage()).find(".ytplayer").length) {
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

/*
// Событие инициализации YouTube Player API
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
		showCurrentVideoStop();
		showCurrentVideoContact();
		break;
	case YT.PlayerState.ENDED:
		hideCurrentVideoStop();
		hideCurrentVideoContact();
		hideCurrentVideo();
		hideBuffering();
		currentIndex = nextIndex(currentIndex);
		showCurrentMenu();
	  	break;
	case YT.PlayerState.PLAYING:
		hideBuffering();
		hideCurrentVideoStop();
		hideCurrentVideoContact();
		showCurrentVideo();
		hideCurrentMenu();
	  	break;
	}
}
*/

// Определение ID, заданного в Kiosk Pro
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

// Событие инициализации tubeplayer	  	  
jQuery.tubeplayer.defaults.afterReady = function($player){
	hideBuffering();
}

// Процедура кросс-доменной отправки содержимого формы ввода
// Параметр - отправляемая форма ввода
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

// Функция вывода сообщений трассировки
// Обработка try-catch требуется для совместимости с IE
function debugWrite(a,b) {
	try {
		console.log(a,b);
	} catch (e) {
	}
}

// Создание формы вопроса на указанном языке
function createSurveyForm(lang) {
	debugWrite("createSurveyForm","start");
	debugWrite("lang",lang);
	var form = jQuery(".survey-form-template").clone();
	form.appendTo(jQuery("body")).removeClass("survey-form-template").addClass("survey-form");
	form.addClass(lang);
	form.find("#title").html(surveys[lang].title);
	form.find("#label").text(surveys[lang].label);
	debugWrite("createSurveyForm","end");
}

// Создание видео-страницы на указанном языке
function createVideoPage(lang, pageId) {
	debugWrite("createVideoPage","start");
	debugWrite("pageId",pageId);
	debugWrite("lang",lang);
	var page = jQuery(".video-page-template").clone();
	page.appendTo(jQuery("#center-vertical")).removeClass("video-page-template").addClass("video-page");
	page.attr("id",pageId)
	page.addClass(lang);
	
	// В зависимости от способа воспроизведения видео
	// создаём либо div элемент для tubeplayer,
	// либо html5 video таг
	if(typeof kioskpro_id === 'undefined') {
		var tubeplayer = "<div videoId='"+videos[lang][pageId].videoId+"' class='tubeplayer'></div>";
		page.append(tubeplayer);
		debugWrite("tubeplayer",tubeplayer);
		
	} else {
		var video = "<video width='1024px' height='648px' controls>";
		videos[lang][pageId].sources.forEach(function(value,index) {
			video += "<source src='"+value.src+"' type='"+value.type+"'>";
		});
		video += "This browser does not support HTML5 video";
		video += "</video>";
		page.append(video);
		debugWrite("video",video);
	}
	
	// Добавляем кнопки, отображаемые на странице видео при остановке вопроизведения видео
	for(var btn in videoButtons[lang]) {
		var lnk = "<a class='"+btn+" "+videoButtons[lang][btn].buttonClass+"' href='#'><div class='"+btn+"-icon'></div>"+videoButtons[lang][btn].text+"</a>";
		page.append(lnk)
		debugWrite("lnk",lnk);
	}
	
	// Выбор способа воспроизведения видео
	// Для KioskPro, используется HTML5 video 
	// Для остальных случаев воспроизводим с YouTube
	debugWrite("Выбор способа воспроизведения видео","start");
	if(typeof kioskpro_id === 'undefined') {
		page.find("video").remove();
	} else {
		page.find(".tubeplayer,.ytplayer").remove();
	}
	debugWrite("Выбор способа воспроизведения видео","end");

	debugWrite("Инициализация html5 video","start");
	page.find("video").each(function(i,e) {
		var player = this;
			
		player.addEventListener("ended", function(e){
			hideCurrentVideoStop();
			hideCurrentVideoContact();
			hideCurrentVideo();
			hideBuffering();
			currentIndex = nextIndex(currentIndex);
			showCurrentMenu();
		}, false);
		player.addEventListener("playing", function(e){
			hideBuffering();
			hideCurrentVideoStop();
			hideCurrentVideoContact();
			showCurrentVideo();
			hideCurrentMenu();
		}, false);
		player.addEventListener("pause", function(e){
			showCurrentVideoStop();
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
	page.find(".tubeplayer").each(function(i,e) {
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
				showCurrentVideoStop();
				showCurrentVideoContact();
			}, // when the player returns a state of unstarted
			onPlayerEnded: function(){
				hideCurrentVideoStop();
				hideCurrentVideoContact();
				hideCurrentVideo();
				hideBuffering();
				currentIndex = nextIndex(currentIndex);
				showCurrentMenu();
			}, // when the player returns a state of ended
			onPlayerPlaying: function(){
				hideBuffering();
				hideCurrentVideoStop();
				hideCurrentVideoContact();
				showCurrentVideo();
				hideCurrentMenu();
			}, //when the player returns a state of playing
			onPlayerPaused: function(){
				hideBuffering();
				showCurrentVideoStop();
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

	page.find(".videoStop").click(function(event) {
		if (event.preventDefault) { event.preventDefault(); } else { event.returnValue = false; }
		pauseCurrentPlayer();
		hideCurrentVideoStop();
		hideCurrentVideoContact();
		hideCurrentVideo();
		showCurrentMenu();
		return false;
	});

	page.find(".videoContact").click(function(event) {
		if (event.preventDefault) { event.preventDefault(); } else { event.returnValue = false; }
		pauseCurrentPlayer();
		hideCurrentVideoStop();
		hideCurrentVideoContact();
		hideCurrentVideo();
		currentIndex = 3;
		showCurrentMenu();
		return false;
	});

	debugWrite("createVideoPage","end");
}

var oDropdowns = Array();
function closeDropdowns() {
	for(var i=0; i<oDropdowns.length; i++) {
		oDropdowns[i].close();
	}
}

function createMenuPage(lang, pageId) {
	debugWrite("createMenuPage","start");
	debugWrite("pageId",pageId);
	debugWrite("lang",lang);
	var page = jQuery(".menu-page-template#"+pageId).clone();
	page.appendTo(jQuery("#center-vertical")).removeClass("menu-page-template").addClass("menu-page");
	page.attr("id",pageId)
	page.addClass(lang);
	
	page.find("#title").html(pages[lang][pageId].title);
	page.find("#subtitle").html(pages[lang][pageId].subtitle);
	
	for(var lblFor in formLabels[lang]) {
		page.find("label[for='"+lblFor+"']").text(formLabels[lang][lblFor]);
	}
	
	for(var btn in menuButtons[lang]) {
		var lnk = "<a class='"+btn+" "+menuButtons[lang][btn].buttonClass+"' href='#'><div class='"+btn+"-icon'></div>"+menuButtons[lang][btn].text+"</a>";
		page.append(lnk);
		debugWrite("lnk",lnk);
	}

	var languageSelector = "<div class='languageSelector'><select id='languageSelector-"+lang+"-"+pageId+"' name='languageSelector' style='width:180px'>";
	for(var lng in languages) {
		var selected = (lng==lang)?"selected":"";
		var option = "<option "+selected+" value='"+lng+"' data-image='intl/flag-"+lng+".png'>"+languages[lng]+"</option>";
		languageSelector += option;
	}
	languageSelector += "</select></div>";
	page.append(languageSelector);

	var oDropdown = jQuery("#languageSelector-"+lang+"-"+pageId+"",page).msDropdown({rowHeight:32}).data("dd");
	oDropdown.visibleRows(languages.length);
	oDropdowns.push(oDropdown);
	oDropdown.on("change", function(event) {
		debugWrite("this.value",this.value);
		hideCurrentMenu();
		currentLanguage = this.value;
		for(var i=0; i<oDropdowns.length; i++) {
			oDropdowns[i].setIndexByValue(currentLanguage);
		}
		closeDropdowns();
		createPagesIfNotExists(currentLanguage);
		showCurrentMenu();
	});
	
	// Проверка встроенной поддержки для <input type="date">
	// Если нет встроенной поддержки для <input type="date">,
	// то заменяем <input type="date"> на <input type="text">
	debugWrite("Проверка встроенной поддержки для <input type='date'>","start");
	if (!Modernizr.inputtypes.date) {
		try {
			page.find("input[type='date']").attr("type","text");
		} catch (e) {
			debugWrite('page.find("input[type=\'date\']").attr("type","text") error',e);
		}
	}
	debugWrite("Проверка встроенной поддержки для <input type='date'>","end");
	
	// Обработка поля due_date если нет встроенной поддержки для <input type="date">
	debugWrite("Обработка поля due_date если нет встроенной поддержки для <input type='date'>","start");
	page.find("input[name*='due_date'][type='text']").data("lang",lang);
	page.find("input[name*='due_date'][type='text']").focus(function(event) { 
		var lang = jQuery(this).data("lang");
		jQuery(this).datepicker( 
			"dialog", 
			jQuery("."+currentLanguage+" input[name*='due_date']").val() , 
			function (date, inst) {
				jQuery("input[name*='due_date']").val(date);
			},
			jQuery.extend({
				showButtonPanel: true
			}, jQuery.datepicker.regional[ lang ] )
		);
	});
	debugWrite("Обработка поля due_date если нет встроенной поддержки для <input type='date'>","end");

	debugWrite("Установка маски ввода (999) 999-9999","start");
	try {
		page.find("input[name*='phone']").mask("(999) 999-9999");
	} catch (e) {
		debugWrite('page.find("input[name*=\'phone\']").mask("(999) 999-9999") error',e);
	}
	debugWrite("Установка маски ввода (999) 999-9999","end");

	debugWrite("Установка валидации форм","start");
	try {
		page.find("form").validate();
	} catch (e) {
		debugWrite('page.find("form").validate() error',e);
	}
	debugWrite("Установка валидации форм","end");

	page.find("input").change(function(event) {
		jQuery("input[name='"+jQuery(this).attr("name")+"']").val(jQuery(this).val());
	});
	
	page.find(".save").click(function(event) {
		if (event.preventDefault) { event.preventDefault(); } else { event.returnValue = false; }
		closeDropdowns();
		var isValid = false;
		debugWrite("Валидация формы обратной связи","start");
		try {
			var form = currentCallbackForm();
			debugWrite('form',form.html());
			isValid = form.valid();
		} catch (e) {
			debugWrite('form.valid() error',e);
			debugWrite("Ручная валидация формы обратной связи","start");
			jQuery("input").removeClass("error");
			jQuery(".error").remove();
			jQuery(".ErrorLabel").remove();
			jQuery(".EditingFormErrorLabel").remove();
			isValid = true;
			var form = currentCallbackForm();
			form.find("input.required").each(function(index, element) {
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
				var form = currentCallbackForm();
				form.ajaxSubmit({
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
						crossDomainSubmit(currentCallbackForm());
						debugWrite("Ручная отправка кросс-доменной формы обратной связи","end");
						
						hideCurrentMenu();
						currentIndex = 4;
						clearForm();
						showCurrentMenu();
					}
				});
			} catch (e) {
				debugWrite('currentCallbackForm().ajaxSubmit error',e);
				debugWrite("Ручная отправка кросс-доменной формы обратной связи Попытка №2","start");
				try {
					crossDomainSubmit(currentCallbackForm());
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
		return false;
	});
			
	page.find(".next").click(function(event) {
		if (event.preventDefault) { event.preventDefault(); } else { event.returnValue = false; }
		closeDropdowns();
		hideCurrentMenu();
		currentIndex = nextIndex(currentIndex);
        clearForm();
		showCurrentMenu();
		return false;
	});

	page.find(".prev").click(function(event) {
		if (event.preventDefault) { event.preventDefault(); } else { event.returnValue = false; }
		closeDropdowns();
		hideCurrentMenu();
		currentIndex = prevIndex(currentIndex);
        clearForm();
		showCurrentMenu();
		return false;
	});

	page.find(".play").click(function(event) {
		if (event.preventDefault) { event.preventDefault(); } else { event.returnValue = false; }
		closeDropdowns();
//		showBuffering();
		hideCurrentMenu();
		showCurrentVideoStop();
		showCurrentVideoContact();
		showCurrentVideo();
		playCurrentPlayer();
		return false;
	});

	page.find(".replay").click(function(event) {
		if (event.preventDefault) { event.preventDefault(); } else { event.returnValue = false; }
		closeDropdowns();
		hideCurrentMenu();
//		showBuffering();
		currentIndex = prevIndex(currentIndex);
		showCurrentVideoStop();
		showCurrentVideoContact();
		showCurrentVideo();
		playCurrentPlayer();
		return false;
	});

	page.find(".home").click(function(event) {
		if (event.preventDefault) { event.preventDefault(); } else { event.returnValue = false; }
		closeDropdowns();
		hideCurrentMenu();
		currentIndex = 0;
		showCurrentMenu();
		return false;
	});

	page.find(".contact").click(function(event) {
		if (event.preventDefault) { event.preventDefault(); } else { event.returnValue = false; }
		closeDropdowns();
		hideCurrentMenu();
		currentIndex = 3;
		showCurrentMenu();
		return false;
	});
	
	page.find("select#languageSelector").change(function(event) {
		if (event.preventDefault) { event.preventDefault(); } else { event.returnValue = false; }
		closeDropdowns();
		hideCurrentMenu();
		currentLanguage = jQuery(this).val();
		jQuery("select#languageSelector").val(currentLanguage);
		createPagesIfNotExists(currentLanguage);
		showCurrentMenu();
		return false;
	});

	debugWrite("createMenuPage","end");
}

function createPagesIfNotExists(lang) {
	debugWrite("createPagesIfNotExists","start");
	debugWrite("lang",lang);
	if (jQuery(".video-page."+lang).length==0) {
		// Создание видео-страниц
		debugWrite("Создание видео-страниц","start");
		for(var pageId in videos[lang]) {
			createVideoPage(lang, pageId);
		}
		debugWrite("Создание видео-страниц","end");
	}
	
	if (jQuery(".menu-page."+lang).length==0) {
		// Создание страниц меню
		debugWrite("Создание страниц меню","start");
		for(var pageId in pages[lang]) {
			createMenuPage(lang, pageId);
		}
		debugWrite("Создание страниц меню","end");
	}
	
	debugWrite("Выключение отображения элементов","start");
	try {
		jQuery(".videoStop").hide();
		jQuery(".videoContact").hide();
		jQuery(".video-page").hide();
		jQuery(".menu-page").hide();
	} catch (e) {
		debugWrite('error',e);
	}
	debugWrite("Выключение отображения элементов","end");
	
	debugWrite("createPagesIfNotExists","end");
}

jQuery(document).ready(function(e) {

	// Переадресация на мобильную версию
	debugWrite("Переадресация на мобильную версию","start");
	if(jQuery.browser.mobile) {
		window.location.hostname = "m.safeguardingstemcells.com";
	}
	debugWrite("Переадресация на мобильную версию","end");

	// Использование языка браузера в качестве начального языка страниц
	debugWrite("Использование языка браузера в качестве начального языка страниц","start");
	var userLang = navigator.language || navigator.userLanguage; 
	userLang = userLang.substr(0,2);
 	debugWrite("The language is: ",userLang);
	if (languages[userLang]) {
		currentLanguage = userLang;
	}
	debugWrite("Использование языка браузера в качестве начального языка страниц","end");
 
	debugWrite("Выключение отображения элементов","start");
	try {
		hideBuffering();
		hideSurveyDialog();
	} catch (e) {
		debugWrite('error',e);
	}
	debugWrite("Выключение отображения элементов","end");
	
	debugWrite("hideDoctor","start");
	hideDoctor();
	debugWrite("hideDoctor","end");
	
	// Создание страниц для текущего языка
	debugWrite("Создание страниц для текущего языка","start");
	createPagesIfNotExists(currentLanguage);
	debugWrite("Создание страниц для текущего языка","end");
		
	// Разбор строки запроса на элементы
	debugWrite("Разбор строки запроса на элементы","start");
	try {
		url = jQuery.url(window.location.toString());
	} catch (e) {
		debugWrite("jQuery.url error",e);
	}
	debugWrite("Разбор строки запроса на элементы","end");
	
	
	// Проверка для Kentico
	// Открываем окно с неуспешным результатом отправки формы
	// Убрать когда точно не будем использовать Kentico
	debugWrite("Проверка для Kentico","start");
	try {
		if(jQuery("."+currentLanguage+" input[name*='url']").val()==window.location.toString()) {
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
	
/*
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
*/	
	
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
	
	debugWrite("Изменение размера элементов под размер экрана","start");
	try {
		updateHeight();
	} catch (e) {
		debugWrite('updateHeight error',e);
	}
	jQuery(window).resize(function() {
		updateHeight();
	});
	debugWrite("Изменение размера элементов под размер экрана","start");
	
	debugWrite("Отображение текущего меню","start");
	showCurrentMenu();
	debugWrite("Отображение текущего меню","end");

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
			createSurveyForm(currentLanguage);
			showSurveyDialog();
		}
	} catch (e) {
		debugWrite('error',e);
	}
	debugWrite("Проверка и открытие формы вопроса","end");
	
});
