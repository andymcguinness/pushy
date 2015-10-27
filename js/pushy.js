/*! Pushy - v0.9 - 2013-6-22
* Pushy is a responsive off-canvas navigation menu using CSS transforms & transitions.
* https://github.com/christophery/pushy/
* by Christopher Yee */

jQuery(function($) {
	var	body = $('body'),
		container = $('#container'), //container css class
		
		// LEFT PUSHY VARIABLES
		pushyLeft = $('.pushy-left-side'), // left-side pushy name
		pushyLeftClass = "pushy-left-open", //menu position & menu open class
		pushyLeftActiveClass = "pushy-left-active", //css class to toggle site overlay
		containerLeftClass = "container-left-push", //container open class
		siteOverlayLeft = $('.site-overlay-left'), //site overlay left
		
		// RIGHT PUSHY VARIABLES
		pushyRight = $('.pushy-right-side'), // right-side pushy name
		pushyRightClass = "pushy-right-open", // menu open class
		pushyRightActiveClass = "pushy-right-active", // css class to toggle site overlay
		containerRightClass = "container-right-push", // container open class
		siteOverlayRight = $('.site-overlay-right'), //site overlay
		
		menuBtn = $('.menu-btn'), //css class to toggle the menu
		moreBtn = $('.more-btn'), // css class to toggle right sidebar
		closeBtn = $('.close-btn'), // css class to toggle right sidebar
		menuSpeed = 100, //jQuery fallback menu speed
		menuWidth = "21.5em"; //jQuery fallback menu width

	
	// LEFT PUSHY FUNCTIONS
	function toggleLeftPushy(){
		body.toggleClass(pushyLeftActiveClass); //toggle site overlay
		pushyLeft.toggleClass(pushyLeftClass);
		container.toggleClass(containerLeftClass);
		widthFix();
	}

	function openLeftPushyFallback(){
		body.addClass(pushyLeftActiveClass);
		container.css({"position": "fixed"});
		pushyLeft.animate({left:"0"}, menuSpeed);
		container.animate({left: menuWidth}, menuSpeed);
		widthFix();
	}

	function closeLeftPushyFallback(){
		body.removeClass(pushyLeftActiveClass);
		container.css({"position": "relative"});
		pushyLeft.animate({left: "-" + menuWidth}, menuSpeed);
		container.animate({left: "0px"}, menuSpeed);
	}
	
	if($( "html" ).hasClass( "csstransforms" )){
		//toggle menu
		menuBtn.click(function() {
			toggleLeftPushy();
		});
		//close menu when clicking site overlay
		siteOverlayLeft.click(function(){ 
			toggleLeftPushy();
		});
	}else{
		//jQuery fallback
		pushyLeft.css({left: "-" + menuWidth}); //hide menu by default
		container.css({"overflow-x": "hidden"}); //fixes IE scrollbar issue

		//keep track of menu state (open/close)
		var leftState = true;

		//toggle menu
		menuBtn.click(function() {
			if (leftState) {
				openLeftPushyFallback();
				leftState = false;
			} else {
				closeLeftPushyFallback();
				leftState = true;
			}
		});

		//close menu when clicking site overlay
		siteOverlayLeft.click(function(){ 
			if (leftState) {
				openLeftPushyFallback();
				leftState = false;
			} else {
				closeLeftPushyFallback();
				leftState = true;
			}
		});
	}
	
	
	// RIGHT PUSHY FUNCTIONS
	function toggleRightPushy(){
		body.toggleClass(pushyRightActiveClass); //toggle site overlay
		pushyRight.toggleClass(pushyRightClass);
		container.toggleClass(containerRightClass);
		widthFix();
	}

	function openRightPushyFallback(){
		body.addClass(pushyRightActiveClass);
		container.css({"position": "fixed"});
		pushyRight.animate({right:"0"}, menuSpeed);
		container.animate({right: menuWidth}, menuSpeed);
		widthFix();
	}

	function closeRightPushyFallback(){
		body.removeClass(pushyRightActiveClass);
		container.css({"position": "relative"});
		pushyRight.animate({right: "-100%"}, menuSpeed);
		container.animate({right: "0px"}, menuSpeed);
	}
	
	if($( "html" ).hasClass( "csstransforms" )){
		//toggle menu
		moreBtn.click(function() {
			toggleRightPushy();
		});
		closeBtn.click(function() {
			toggleRightPushy();
		});
		//close menu when clicking site overlay
		siteOverlayRight.click(function(){
			toggleRightPushy();
		});
	}else{
		//jQuery fallback
		pushyRight.css({right: "-" + "-100%"}); //hide menu by default
		container.css({"overflow-x": "hidden"}); //fixes IE scrollbar issue

		//keep track of menu state (open/close)
		var rightState = true;

		//toggle menu
		moreBtn.click(function() {
			if (rightState) {
				openRightPushyFallback();
				rightState = false;
			} else {
				closeRightPushyFallback();
				rightState = true;
			}
		});

		closeBtn.click(function(event) {
                  event.preventDefault();
			if (rightState) {
				openRightPushyFallback();
				rightState = false;
			} else {
				closeRightPushyFallback();
				rightState = true;
			}
		});

		//close menu when clicking site overlay
		siteOverlayRight.click(function(){ 
			if (rightState) {
				openRightPushyFallback();
				rightState = false;
			} else {
				closeRightPushyFallback();
				rightState = true;
			}
		});
	}

	
	// GENERAL FUNCTIONS & FIXES
	function widthFix() {
		var pageWidth;
		if (!window.addEventListener) {
			//IE
			$( window ).resize(setPageWidth);
			
		} else {
			//modern browsers
			window.addEventListener('resize', setPageWidth);
		}
	}
	
	function closePushyOnResize(){
		var w = getWidth(); //even though page width defined above, forcing it to recalculate
		
		//close Pushy when the window gets too big
		if (w >= 768 && $( ".pushy-left-side" ).hasClass( "pushy-left-open" )) {
			toggleLeftPushy();
		} else if (w >= 865 && $( ".pushy-right-side" ).hasClass( "pushy-right-open" )) {
			toggleRightPushy();
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
