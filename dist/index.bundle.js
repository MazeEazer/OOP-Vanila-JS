/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

;// CONCATENATED MODULE: ./src/js/modules/slider/slider.js
class Slider {
    constructor({container = null,
        btns = null,
        next = null, 
        prev = null,
        activeClass = '',
        animate,
        autoplay } = {}){
        this.container = document.querySelector(container);
        try{
            this.slides = this.container.children;

        }catch(e){}
        this.btns = document.querySelectorAll(btns);
        this.prev = document.querySelector(prev);
        this.next = document.querySelector(next);
        this.activeClass = activeClass;
        this.animate = animate;
        this.autoplay = autoplay;
        this.slideIndex = 1;
	
    }
}
;// CONCATENATED MODULE: ./src/js/modules/slider/slider-main.js


class MainSlider extends Slider {
	constructor(btns) {
		super(btns);
	}
	showSlides(n) {
		if (n > this.slides.length){
			this.slideIndex = 1;
		}
		
		if (n < 1) {
			this.slideIndex = this.slides.length;
		}
		try {
			this.hanson.style.opacity = "0";
			
			if (n === 3){
				this.hanson.classList.add('animated');
				setTimeout(() => {
					this.hanson.style.opacity = '1'; 
					this.hanson.classList.add('slideInUp');
				}, 3000);
			} else{
				this.hanson.classList.remove('slideInUp');

			}

		} catch(e){}
		

		[...this.slides].forEach(slide => {
            slide.style.display = 'none';
        });

		this.slides[this.slideIndex - 1].style.display = "block";
	}

	plusSlides(n){
		this.showSlides(this.slideIndex += n);
	};

	render () {
		if (this.container){
			
			try {
				this.hanson = document.querySelector('.hanson');
	
			} catch(e) {
	
			}
	
			this.btns.forEach((item) => {
				item.addEventListener("click", () => {
					this.plusSlides(1);
				});
	
				item.parentNode.previousElementSibling.addEventListener('click', (e) => {
					e.preventDefault();
					this.slideIndex = 1;
					this.showSlides(this.slideIndex);
	
				});
			});
			
			this.showSlides(this.slideIndex);
		
			document.querySelectorAll('.prevmodule').forEach(item => {
				item.addEventListener('click', (e) => {
					e.stopPropagation();
					e.preventDefault();

					this.plusSlides(-1);
				});

			});

			document.querySelectorAll('.nextmodule').forEach(item => {
				item.addEventListener('click', (e) => {
					e.stopPropagation();
					e.preventDefault();
					this.plusSlides(1);
				});

			});
		}
	
		 
	}



}
;// CONCATENATED MODULE: ./src/js/modules/slider/slider-mini.js


class MiniSlider extends Slider {
    constructor(container, next, prev, activeClass, animate, autoplay) {
        super(container, next, prev, activeClass, animate, autoplay);
    }

    decorizeSlides() {
        [...this.slides].forEach(slide => {
            slide.classList.remove(this.activeClass);
            if (this.animate) {
                slide.querySelector('.card__title').style.opacity = '0.4';
                slide.querySelector('.card__controls-arrow').style.opacity = '0';
            }
        });

        if (!this.slides[0].closest('button')) {
            this.slides[0].classList.add(this.activeClass);
        }
        
        if (this.animate) {
            this.slides[0].querySelector('.card__title').style.opacity = '1';
            this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
        }
    }

    nextSlide() {
        if (this.slides[1].tagName == "BUTTON" && this.slides[2].tagName == "BUTTON") {
            this.container.appendChild(this.slides[0]); // Slide
            this.container.appendChild(this.slides[1]); // Btn
            this.container.appendChild(this.slides[2]); // Btn
            this.decorizeSlides();
        } else if (this.slides[1].tagName == "BUTTON"){
            this.container.appendChild(this.slides[0]); // Slide
            this.container.appendChild(this.slides[1]); // Btn
            this.decorizeSlides();
        } else {
            this.container.appendChild(this.slides[0]);
            this.decorizeSlides();
        }
    }

    bindTriggers() {
        this.next.addEventListener('click', () => this.nextSlide());

        this.prev.addEventListener('click', () => {

            for (let i = this.slides.length - 1; i > 0; i--) {
                if (this.slides[i].tagName !== "BUTTON") {
                    let active = this.slides[i];
                    this.container.insertBefore(active, this.slides[0]);
                    this.decorizeSlides();
                    break;
                }
            }

           
        });
    }

    init() {
        try{
            this.container.style.cssText = `
            display: flex;
            flex-wrap: wrap;
            overflow: hidden;
            align-items: flex-start;
        `;

        this.bindTriggers();
        this.decorizeSlides();

        if (this.autoplay) {
            setInterval(() => this.nextSlide(), 5000);
        }
        } catch(e){
        }
    }
}
;// CONCATENATED MODULE: ./src/js/modules/playVideo.js
class VideoPlayer {
	constructor(triggers, overlay){
		this.btns = document.querySelectorAll(triggers);
		this.overlay = document.querySelector(overlay);
		this.close = this.overlay.querySelector('.close');
	}

	bindTriggers() {
		this.btns.forEach(btn => {
			btn.addEventListener('click', () => {
				if (document.querySelector('iframe#frame')) {
					this.overlay.style.display = 'flex';

				} else{
					const path = btn.getAttribute('data-url');
					this.createPlayer(path);
	
				}  
				
			});
		});

	}
	bindCloseBtn(){
		this.close.addEventListener('click', () => {
			this.overlay.style.display = 'none';
			this.player.stopVideo();
		});
	}

	createPlayer(url){
		this.player = new YT.Player('frame', {
			height: '100%',
			width: '100%',
			videoId: `${url}`,
		  });
		  this.overlay.style.display = 'flex';

		  console.log(this.player);
		}
	
	
	init() {
		var tag = document.createElement('script');

		tag.src = "https://www.youtube.com/iframe_api";
		var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
		
		this.bindTriggers();
		this.bindCloseBtn();
	}


}
;// CONCATENATED MODULE: ./src/js/modules/slider/difference.js
class difference {
	constructor (oldOfficer, newOfficer, items) {
		try{
			this.oldOfficer = document.querySelector(oldOfficer);
			this.newOfficer = document.querySelector(newOfficer);
			this.oldItems = this.oldOfficer.querySelectorAll(items);
			this.newItems = this.newOfficer.querySelectorAll(items);
			this.items = items;
			this.oldCounter = 0;
			this.newCounter = 0;
		} catch(e){}
		
	};

	bindTriggers(container, items, counter) {
		container.querySelector('.plus').addEventListener('click', () => {
			if (counter !== items.length - 2){
				items[counter].style.display = 'flex';
				counter++;
			} else {
				items[counter].style.display = 'flex';
				items[items.length - 1].remove();

			}
		});

	
	};

	hideItems(items){
		items.forEach((item,i, arr) => {
			if (i !== arr.length - 1) {
				item.style.display = 'none';
			}
		});
		items.forEach((item,i, arr) => {
			if (i !== arr.length - 1) {
				item.style.display = 'none';
			}
		});
	};

	init() {
		try{
			this.hideItems(this.oldItems);
			this.hideItems(this.newItems);
			this.bindTriggers(this.oldOfficer, this.oldItems, this.oldCounter);  
			this.bindTriggers(this.newOfficer, this.newItems, this.newCounter);  
		}
		catch(e){}

	}
};
;// CONCATENATED MODULE: ./src/js/modules/slider/showinfo.js
class ShowInfo{
	constructor(triggers){
		this.btns = document.querySelectorAll(triggers);
	}

	init(){
		this.btns.forEach(btn => {
			btn.addEventListener('click', () => {
				const sibling = btn.closest('.module__info-show').nextElementSibling;
				
				sibling.classList.toggle('msg');
				sibling.style.marginTop = '20px';
			});
		});

	}
}
;// CONCATENATED MODULE: ./src/js/modules/slider/download.js
class Download {
	constructor(triggers){
		this.btns = document.querySelectorAll(triggers);
		this.path = 'assets/img/mainbg.jpg';
	}

	downloadItem(path){
		const element = document.createElement('a');
		
		element.setAttribute('href', path);
		element.setAttribute('download','nice_picture');
		
		element.style.display = 'none';
		document.body.appendChild(element);

		
		element.click();

		document.body.removeChild(element);
	}

	init(){
		this.btns.forEach(item => {
			item.addEventListener('click', () => {
				this.downloadItem(this.path);
			})
		})
	}
}
;// CONCATENATED MODULE: ./src/js/index.js






window.addEventListener('DOMContentLoaded', () => {
    const slider = new MainSlider({btns: '.next', container: '.page'});
    slider.render();

    const modulePageSlider = new MainSlider({container: '.moduleapp', btns: '.next'});
    modulePageSlider.render();
    
    const showUpSlider = new MiniSlider({
        container: '.showup__content-slider',
        prev: '.showup__prev',
        next: '.showup__next',
        activeClass: 'card-active',
        animate: true


    });
    showUpSlider.init();

    const modulesSlider = new MiniSlider({
        container: '.modules__content-slider',
        prev: '.modules__info-btns .slick-prev',
        next: '.modules__info-btns .slick-next',
        activeClass: 'card-active',
        animate: true,
        autoplay: true
    });
    modulesSlider.init();

    const feedSlider = new MiniSlider({
        container: '.feed__slider',
        prev: '.feed__slider .slick-prev',
        next: '.feed__slider .slick-next',
        activeClass: 'feed__item-active'
    });
    feedSlider.init();

    const player = new VideoPlayer('.showup .play', '.overlay');
    player.init();

    new difference('.officerold', '.officernew', '.officer__card-item').init();

    new ShowInfo('.plus__content').init();

    new Download('.download').init();
});
/******/ })()
;