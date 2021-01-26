let wrapper = document.querySelector('.wrapper');
const call_tomorrow = document.getElementById('call_tomorrow');
const call_ASAP = document.getElementById('call_ASAP');

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

			//listen for button click on 3rd screen
			document.getElementById('btn').addEventListener(
				'click', magic, false
			);

			//input mask in Contact Form on 4th screen
			let phoneMask = document.getElementById('phone');
			new IMask(phoneMask, {
				mask: '+{7}(000)000-00-00',
			});

			setInterval(clock, 1000);
			setInterval(colonBlinking, 1000);
			setInterval(contactForm_message_toggle, 1000);
		},

		slideChange: function () {
			menuSliderRemove();
			menuLinks[pageSlider.realIndex].classList.add('_active');
			let active = this.realIndex;
			let secondApear = document.getElementsByClassName('second_appear');

			if (active == 1) {
				for (let i = 0; i < secondApear.length; i++) {
					secondApear[i].classList.add('_loaded');
				}
			}

			if (pageSlider.realIndex == 3) {
				document.getElementById('telegram_icon').classList.add('go_down');
			}
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
	document.getElementById('question').style.display = 'none';
	this.style.display = 'none';
}

function clock() {
	let current_time = new Date();
	let h = current_time.getUTCHours() + 9;
	let m = current_time.getUTCMinutes();
	if (m < 10) {
		m = `0${m}`
	}

	let hour_span = document.getElementById('hours');
	let minute_span = document.getElementById('minutes');
	hour_span.innerHTML = h;
	minute_span.innerHTML = m;
}

function colonBlinking() {
	document.getElementById('colon').classList.toggle('hidden');
}

function contactForm_message_toggle() {
	let hour = document.getElementById('hours').innerHTML
	if (hour > 22 & hour < 8) {
		call_ASAP.style.display = 'none';
	} else {
		call_tomorrow.style.display = 'none';
	}
}

pageSlider.init();