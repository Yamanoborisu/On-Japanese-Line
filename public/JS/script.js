let wrapper = document.querySelector('.wrapper');

let pageSlider = new Swiper('.page', {
	// initialise make my own classes as standart sliders classes 
	wrapperClass: "page_wrapper",
	slideClass: "page_screen",

	//slider direction 
	direction: "vertical",

	slidesPerView: "auto",

	parallax: true,

	// controls
	keyboard: {
		enabled: true,
		onlyInViewport: true,
		pageUpDown: true,
	},

	mousewheel: {
		sensitivity: 1,
	},

	// turn swiper off if not enough slides
	watchOverflow: true,

	speed: 800,

	// refresh swiper if content or parents or children content was changed
	observer: true,
	observeParents: true,
	observeSlideChildren: true,

	// navigation
	// Bullets
	pagination: {
		el: '.page_pagination',
		type: 'bullets',
		clickable: true,
		bulletClass: 'page_bullet',
		bulletActiveClass: 'page_bullet_active',

	},

	//scroll
	scrollbar: {
		el: '.page_scroll',
		dragClass: 'page_drag-scroll',
		//possibility to drag
		draggable: true,
	},

	//autoinit off
	init: false,

	// events
	on: {
		init: function () {
			menuSlider();
			setScrollType();
			wrapper.classList.add('_loaded');
			let text = document.getElementById('opacity_change').getElementsByClassName('screen_title');

			for (let index = 0; index < text.length; index++) {
				text[index].classList.add('_loaded');
			}

			document.getElementById('btn').addEventListener(
				'click', magic, false
			);
		},

		slideChange: function () {
			menuSliderRemove();
			menuLinks[pageSlider.realIndex].classList.add('_active');
			var active = this.realIndex;
			let secondApear = document.getElementsByClassName('second_appear');

			if (active == 1) {
				for (let i = 0; i < secondApear.length; i++) {
					secondApear[i].classList.add('_loaded');
				}
			}

			console.log(menuLinks);
		},


		resize: () => {
			setScrollType();
		}
	}

});

let menuLinks = document.querySelectorAll('.menu_link');


function menuSlider() {
	if (menuLinks.length > 0) {
		menuLinks[pageSlider.realIndex].classList.add('_active');
		for (let i = 0; i < menuLinks.length; i++) {
			const menuLink = menuLinks[i];
			menuLink.addEventListener("click", function (e) {
				menuSliderRemove();
				pageSlider.slideTo(i, 800);
				menuLink.classList.add('_active')
				e.preventDefault();
			})
		}
	}
}

function menuSliderRemove() {
	let menuLinkActive = document.querySelector('.menu_link._active');
	if (menuLinkActive) {
		menuLinkActive.classList.remove('_active');
	}
}

function setScrollType() {

	if (wrapper.classList.contains('_free')) {
		wrapper.classList.remove('_free');
		pageSlider.params.freeMode = false;
	}

	for (let index = 0; index < pageSlider.slides.length; index++) {
		const pageSlide = pageSlider.slides[index];
		const pageSlideContent = pageSlide.querySelector('.screen_content');
		if (pageSlideContent) {
			const pageSlideContentHeight = pageSlideContent.offsetHeight;
			if (pageSlideContentHeight > window.innerHeight) {
				wrapper.classList.add('_free');
				pageSlider.params.freeMode = true;
				break;
			}
		}

	}
}

function magic(evt) {
	evt.preventDefault();
	let appearance = document.getElementsByClassName('hidden');

	for (let i = 0; i < appearance.length; i++) {
		appearance[i].classList.remove('hidden');
	}
	document.getElementById('arrow').classList.remove('hidden');
	this.classList.add('hidden');

}

pageSlider.init();