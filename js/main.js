const header = document.querySelector('.header')
const navList = document.querySelector('.header__list')
const navElemsTarget = document.querySelectorAll('[data-elem= "elem-target"]')
const navLinks = [...document.querySelectorAll('.header__link')]
let scrollTimeout


navList.addEventListener('click', (e) => {
    e.preventDefault()
    if (!e.target.classList.contains('header__link')) {
        return
    } else {
        let elemTarget = document.querySelector(`${e.target.hash}`)
        adaptiveScroll(elemTarget)
        toggleActiveNavBar()
    }
})


function adaptiveScroll(elem) {
    let coord = elem.getBoundingClientRect().top - header.clientHeight
    scrollByY(coord)
}


window.addEventListener('scroll', () => {
    if (scrollY > 50) {
        header.classList.add('header_active')
    }
    else {
        header.classList.remove('header_active')
    }

    clearTimeout(scrollTimeout)

    scrollTimeout = setTimeout(() => {
        setActiveNavLink()
    }, 100);

})


document.querySelectorAll('.logo-link').forEach(el => {
    el.addEventListener('click', function (e) {
        e.preventDefault()
        scrollByY(-scrollY)
    })

})


function scrollByY(coord) {
    window.scrollBy({
        top: coord,
        behavior: "smooth"
    })
}




function setActiveNavLink() {
    navLinks.forEach(e => e.classList.remove('link--active'))
    if ((innerHeight + scrollY >= document.documentElement.scrollHeight - 15)) {
        navLinks[navLinks.length - 1].classList.add('link--active')
        return
    } else if (scrollY >= 0 && scrollY < navElemsTarget[0].clientHeight) {
        navLinks[0].classList.add('link--active')
        return
    } else {
        for (let i = navElemsTarget.length - 2; i > 0; i--) {
            if (scrollY > navElemsTarget[i].getBoundingClientRect().top + scrollY - header.clientHeight - 2) {
                let targetLink = document.querySelector(`[href="#${navElemsTarget[i].id}"]`)
                targetLink.classList.add('link--active')
                break
            }
        }
    }
}




//------------------------HeroSlider-start--------------------------------------

class HeroSlider {
    constructor() {
        this.slides = [...document.querySelectorAll('.visual-slider__slide')]
        this.paginationWrp = document.querySelector('.visual-slider__pagination')
        this.paginations = [...document.querySelectorAll('.pagination__dot')]
        this.current = 0
        this.btnPrev = document.querySelector('.visual-slider__button_left')
        this.btnNext = document.querySelector('.visual-slider__button_right')
        this.btnPrev.addEventListener('click', () => { this.prev() })
        this.btnNext.addEventListener('click', () => { this.next() })
        this.paginationWrp.addEventListener('click', (e) => { this.clickOnPagination(e) })
    }

    clickOnPagination(e) {
        if (!e.target.classList.contains('pagination__dot')) {
            return
        } else {
            let currentHide = this.current
            this.paginations[this.current].classList.remove('dot--active')
            e.target.classList.add('dot--active')
            this.current = Number(e.target.dataset.index)
            let currentShow = this.current
            this.toggleActiveSlide(currentHide, currentShow)
        }
    }

    prev() {
        let currentHide = this.current
        this.current = this.current === 0 ? this.current = this.slides.length - 1 : --this.current
        let currentShow = this.current
        this.toggleActiveSlide(currentHide, currentShow)
        this.changeActivePaginaton(currentHide, currentShow)
    }

    next() {
        let currentHide = this.current
        this.current = this.current === this.slides.length - 1 ? this.current = 0 : ++this.current
        let currentShow = this.current
        this.toggleActiveSlide(currentHide, currentShow)
        this.changeActivePaginaton(currentHide, currentShow)
    }

    toggleActiveSlide(currentHide, currentShow) {
        let slideHide = this.slides[currentHide]
        slideHide.classList.remove('slide--active')
        let slideShow = this.slides[currentShow]
        slideShow.classList.add('slide--active')
    }

    changeActivePaginaton(currentHide, currentShow) {
        this.paginations[currentHide].classList.remove('dot--active')
        this.paginations[currentShow].classList.add('dot--active')
    }

}

new HeroSlider()


//--------------------------------HeroSlider-end----------------------------------------------


//-------------search-start---------------

let searchForm = document.querySelector('.search__form')
let searchInput = document.querySelector('.search__input')

searchInput.addEventListener('click', () => {
    toggleOpenSearch(true)
})

searchInput.addEventListener('focusout', () => {
    toggleOpenSearch(false)
})

function toggleOpenSearch(isOpen) {
    if (isOpen) {
        searchInput.classList.add('search__input--active')
        searchForm.classList.add('search__form--active')
    } else {
        searchInput.classList.remove('search__input--active')
        searchForm.classList.remove('search__form--active')
    }
}

//-------------search-end---------------

//-------------burger-start------------------

const menuBurger = document.querySelector('.header__burger')

let menuBurgerLines = menuBurger.querySelectorAll('.burger__line')

let resizeTimeout

const navBar = document.querySelector('.header__nav')

menuBurger.addEventListener('click', toggleActiveNavBar)

window.addEventListener('load', () => { menuBurgerInit() })

window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout)
    resizeTimeout = setTimeout(() => {
        menuBurgerInit()
    }, 150);
})

function menuBurgerInit() {
    if (window.innerWidth <= 765) {
        menuBurger.classList.add('header__burger--display-block')
    } else {
        menuBurger.classList.remove('header__burger--display-block')
    }
}

function toggleActiveNavBar() {
    if (!document.querySelector('.header__burger--display-block')) { return }
    if (navBar.classList.contains('header__nav-active')) {
        let animCloseNavBar = navBar.animate([{ transform: 'translate(100%)' }], { duration: 200 })
        animCloseNavBar.addEventListener('finish', function () {
            navBar.classList.remove('header__nav-active')
        })
        isOpen = false
    } else {
        navBar.classList.add('header__nav-active')
        isOpen = true
    }

    for (i = 0; i < menuBurgerLines.length; i++) {
        if (isOpen) {
            menuBurgerLines[i].classList.add('header__nav-close-line')
        } else {
            menuBurgerLines[i].classList.remove('header__nav-close-line')
        }
    }

}

//---------------burger-end-----------------------

const demoVideo = document.querySelector('.video__element')

const buttonVideo = document.querySelector('.demo__button')

const videoDescript = document.querySelector('.demo__descript')

buttonVideo.addEventListener('click', playVideo)

function playVideo() {
    if (demoVideo.paused) {
        demoVideo.play()
        demoVideo.controls = true
        videoDescript.classList.add('display-none')
    } else {
        demoVideo.pause()
    }
}


//------------------mobile-start--------------------------

let mobileDeviceWrp = document.querySelector('.mobile-wrp')
mobileDeviceWrp.addEventListener('click', (e) => toggleMobileDevItem(e))

function toggleMobileDevItem(e) {
    if (!e.target.classList.contains('mobile__item-btn')) {
        return
    } else {
        let item = e.target.closest('.mobile__item')
        let icon = item.querySelector('.mobile__item-marker')
        let textElem = item.querySelector('.mobile__item-txt')

        if (textElem.classList.contains('mobile__item-txt-open')) {
            icon.classList.remove('mobile__item-marker-open')
            textElem.classList.remove('mobile__item-txt-open')
            textElem.style.maxHeight = null
        } else {
            icon.classList.add('mobile__item-marker-open')
            textElem.classList.add('mobile__item-txt-open')
            textElem.style.maxHeight = textElem.scrollHeight + 'px'
        }
    }
}

//-------------mobile-end---------


//-----------RecentSlider--start-----

class AdaptiveSlider {
    constructor() {
        this.slider = document.querySelector('.recente-slider')
        this.slides = [...document.querySelectorAll('.recent__item')]
        this.sliderLine = document.querySelector('.recente-slider-line')
        this.current = 0
        this.sliderWidth
        this.timeout
        this.buttonNext = document.querySelector('.recent__arrow-right')
        this.buttonPrev = document.querySelector('.recent__arrow-left')
        this.numVisibleSlides
        this.buttonNext.addEventListener('click', () => this.next())
        this.buttonPrev.addEventListener('click', () => this.prev())

        this.sliderInit()

        window.addEventListener('resize', () => {
            clearTimeout(this.timeout)
            this.timeout = setTimeout(() => {
                this.sliderInit()
            }, 150);
        })
    }

    sliderInit() {
        this.numVisibleSlides = this.setNumVisibleSlides()
        this.adaptationSize()
        this.rollSlider()
    }

    prev() {
        if (this.current === 0) { return }

        if (this.current === this.slides.length - this.numVisibleSlides) { this.toggleActiveButton(this.buttonNext, true) }

        if (--this.current === 0) { this.toggleActiveButton(this.buttonPrev, false) }

        this.rollSlider()
    }

    next() {
        if (this.current === this.slides.length - this.numVisibleSlides) { return }

        if (this.current === 0) { this.toggleActiveButton(this.buttonPrev, true) }

        if (++this.current === this.slides.length - this.numVisibleSlides) {
            this.toggleActiveButton(this.buttonNext, false)
        }

        this.rollSlider()
    }

    toggleActiveButton(button, isActive) {
        isActive == true ? button.classList.remove('recent__arrow-opacity') : button.classList.add('recent__arrow-opacity')
    }

    adaptationSize() {
        this.sliderWidth = this.slider.clientWidth
        this.sliderLine.style.width = this.sliderWidth / this.numVisibleSlides * this.slides.length + "px"
        this.slides.forEach(el => {
            el.style.width = this.sliderWidth / this.numVisibleSlides + "px"
            el.style.height = 'auto'
        })
    }

    setNumVisibleSlides() {
        return window.innerWidth < 850 && window.innerWidth >= 650 ? 2 : window.innerWidth < 650 ? 1 : 3
    }

    rollSlider() {
        this.sliderLine.style.transform = 'translate(-' + this.current * (this.sliderWidth / this.numVisibleSlides) + 'px)'
    }

}


let recentSlider = new AdaptiveSlider()


//-----------RecentSlider--end-----