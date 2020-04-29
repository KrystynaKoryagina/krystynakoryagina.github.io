$(function() {
	//init WOW.js
	var wow = new WOW({
		mobile: false
	});
	wow.init();

	// Mobile Menu
	$('.burger').on('click', function() {
		var menu = $('.header__menu');

		$(this).toggleClass('burger--active');

		if (menu.hasClass('header__menu--active')) {
			menu.removeClass('header__menu--active')
					.addClass('header__menu--hide');
		} else {
			menu.removeClass('header__menu--hide')
					.addClass('header__menu--active');
		}
	});

	// Header
	$(window).on('scroll resize', function() {
		var header = $('.header'),
				headerTopPosition = header.offset().top;

		if(headerTopPosition > 0) {
			header.addClass('header--shadow');
		}	else {
			header.removeClass('header--shadow');
		}
	});

	// Scrollto
	$('[data-scroll]').on('click', function(e) {
		e.preventDefault();

		var targetSection = $(this).data('scroll'),
				headerH = $('.header').innerHeight(),
				distance = $(targetSection).offset().top - headerH;
				
		$('html,body').animate({
			scrollTop: distance
		}, 1000, 'swing');

		$('.header__menu').removeClass('header__menu--active');
		$('.menu-btn').removeClass('menu-btn--active');
	});

	// ArrowTop
	$(window).on('scroll resize', function() {
		var arrow = $('.arrow-up'),
				bannerH = $('.banner').outerHeight(),
				wScroll = $(window).scrollTop();

		if(wScroll > bannerH) {
			arrow.addClass('arrow-up--active');
		}	else {
			arrow.removeClass('arrow-up--active');
		}
	});

	// Services Slider
	$(window).on('load resize orientationchange', function() {
		$('.services__slider').each(function() {
			var slider = $(this);

			if ($(window).width() > 768) {
				if (slider.hasClass('slick-initialized')) {
					slider.slick('unslick');
				}
			} else {
				if (!slider.hasClass('slick-initialized')) {
					slider.slick({
							arrows: false,
							dots: true,
							variableWidth: true,
							slideToScroll: 1
					});				
				}
			}
		});
	});

	// Coaches Slider
	var sliderWrap = $('.coaches__slider');
	var currentSliderBox = $('.coaches__slider-current');
	var totalSliderBox = $('.coaches__slider-total');

	sliderWrap.on('init afterChange', function(event, slick) {
		setCounter(slick);
	});

	sliderWrap.slick({
		infinite: false,
		initialSlide: 0, 
		slidesToShow: 2,
		slidesToScroll: 2,
		appendArrows: '.coaches__slider-counter',
		prevArrow: '<a class="arrow-prev"><i class="icon icon-arrow-prev"</a>',
		nextArrow: '<a class="arrow-next"><i class="icon icon-arrow-next"</a>',
		responsive: [
			{
				breakpoint: 952,
				settings: {
					slidesToShow: 1.6,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 769,
				settings: {
					slidesToShow: 2.4,
					arrows: false,
					dots: true
				}
			},
			{
				breakpoint: 620,
				settings: {
					slidesToShow: 2.2,
					dots: true
				}
			},
			{
				breakpoint: 520,
				settings: {
					slidesToShow: 1.6,
					slidesToScroll: 1,
					dots: true
				}
			},
			{
				breakpoint:	400,
				settings: {
					slidesToShow: 1.3,
					slidesToScroll: 1,
					dots: true
				}
			}
		]
	});

	function setCounter(slick) {
		var slides = slick.slideCount,
				slidesToShow = Math.floor(slick.options.slidesToShow),
				slideToScroll = slick.options.slidesToScroll,
				currentSlide =  (slick.currentSlide + slideToScroll) / slideToScroll;

		var totalSlidesList;

		if (slides > slidesToShow) {
			totalSlidesList = Math.ceil((slides - slidesToShow) / slideToScroll + 1);
			
		} else {
			totalSlidesList = currentSlide;
		}

		currentSliderBox.text(currentSlide);
		totalSliderBox.text(totalSlidesList);
	}
});
