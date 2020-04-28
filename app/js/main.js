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
});
