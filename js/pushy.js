/*! Pushy - v0.9 - 2013-6-22
* Pushy is a responsive off-canvas navigation menu using CSS transforms & transitions.
* https://github.com/christophery/pushy/
* by Christopher Yee */

jQuery(function($) {
	var pushy = $('.pushy'), //menu css class
		body = $('body'),
		container = $('#container'), //container css class
		siteOverlay = $('.site-overlay'), //site overlay
		pushyClass = "pushy-open", //menu position & menu open class
		pushyActiveClass = "pushy-active", //css class to toggle site overlay
		containerClass = "container-push", //container open class
		menuBtn = $('.menu-btn'), //css classes to toggle the menu
		menuSpeed = 100, //jQuery fallback menu speed
		menuWidth = "21.5em"; //jQuery fallback menu width

	function togglePushy(){
		body.toggleClass(pushyActiveClass); //toggle site overlay
		pushy.toggleClass(pushyClass);
		container.toggleClass(containerClass);
		widthFix();
	}

	function openPushyFallback(){
		body.addClass(pushyActiveClass);
		container.css({"position": "fixed"});
		pushy.animate({left:"0"}, menuSpeed);
		container.animate({left: menuWidth}, menuSpeed);
		widthFix();
	}

	function closePushyFallback(){
		body.removeClass(pushyActiveClass);
		container.css({"position": "relative"});
		pushy.animate({left: "-" + menuWidth}, menuSpeed);
		container.animate({left: "0px"}, menuSpeed);
	}

	function widthFix() {
		var pageWidth;
		setPageWidth();
		
		function setPageWidth(){
			pageWidth = getWidth() + "px";
			
			var w = getWidth();
			if (w < 768) { // fixes some screwy behavior above 768px
				container.css({"width": pageWidth});
			} else {
				container.css({"width": "auto"});
			}
		}
		
		if (!window.addEventListener) {
			//IE
			$( window ).resize(setPageWidth);
			
		} else {
			//modern browsers
			window.addEventListener('resize', setPageWidth);
		}
	}
	
	if($( "html" ).hasClass( "csstransforms" )){
		//toggle menu
		menuBtn.click(function() {
			togglePushy();
		});
		//close menu when clicking site overlay
		siteOverlay.click(function(){ 
			togglePushy();
		});
	}else{
		//jQuery fallback
		pushy.css({left: "-" + menuWidth}); //hide menu by default
		container.css({"overflow-x": "hidden"}); //fixes IE scrollbar issue

		//keep track of menu state (open/close)
		var state = true;

		//toggle menu
		menuBtn.click(function() {
			if (state) {
				openPushyFallback();
				state = false;
			} else {
				closePushyFallback();
				state = true;
			}
		});

		//close menu when clicking site overlay
		siteOverlay.click(function(){ 
			if (state) {
				openPushyFallback();
				state = false;
			} else {
				closePushyFallback();
				state = true;
			}
		});
	}
	
	function closePushyOnResize(){
		var w = getWidth(); //even though page width defined above, forcing it to recalculate
		
		//close Pushy when the window gets too big
		if (w >= 768 && $( ".pushy" ).hasClass( "pushy-open" )) {
			togglePushy();
		}
	}
	
	if (!window.addEventListener) {
		//IE
		$( window ).resize(closePushyOnResize);
		
	} else {
		//modern browsers
		window.addEventListener('resize', closePushyOnResize);
	}
	
	function getWidth() {
		var w = 0;
		//IE
		if(!window.innerWidth){
			if(!(document.documentElement.clientWidth == 0)){
			//strict mode
				w = document.documentElement.clientWidth;
			} else{
			//quirks mode
				w = document.body.clientWidth;
			}
		} else {
			//w3c
			w = window.innerWidth;
		}
		return w;
	}
});