$(function() {
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
});
