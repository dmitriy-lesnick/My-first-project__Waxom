const header = document.querySelector('.header');
window.addEventListener('scroll', scrollHeader);
function scrollHeader() {
    if (window.pageYOffset > 50) {
        header.classList.add('header_active');
    } else {
        header.classList.remove('header_active');
    }
}
let allSliders = document.querySelectorAll('.hero__slide');
let allPagination = document.querySelectorAll('.pagination__dot');
let current = 0;
document.querySelector('.arrow-right').addEventListener('click', movRight);
document.querySelector('.arrow-left').addEventListener('click', movLeft);
function movRight() {
    for (let i = 0; i < allSliders.length; i++) {
        allSliders[i].classList.add('slider-opacity');
    }
    if (current == allSliders.length) {
        current = 0;
        allSliders[current].classList.remove('slider-opacity');
    } else {
        movPaginationRight();
        allSliders[current].classList.remove('slider-opacity');
    }
}
function movLeft() {
    for (let i = 0; i < allSliders.length; i++) {
        allSliders[i].classList.add('slider-opacity');
    }
    if (current == -1) {
        current = allSliders.length - 1;
        allSliders[current].classList.remove('slider-opacity');
    } else {
        movPaginationLeft();
        allSliders[current].classList.remove('slider-opacity');
    }
}
function movPaginationRight() {
    for (let i = 0; i < allPagination.length; i++) {
        allPagination[i].classList.remove('pagination__dot_focus');
    }
    if (current + 1 == allPagination.length) {
        current = 0;
        allPagination[current].classList.add('pagination__dot_focus');
    } else {
        current = current + 1;
        allPagination[current].classList.add('pagination__dot_focus');
    }
}
function movPaginationLeft() {
    for (let i = 0; i < allPagination.length; i++) {
        allPagination[i].classList.remove('pagination__dot_focus');
    }
    if (current - 1 == -1) {
        current = allPagination.length - 1;
        allPagination[current].classList.add('pagination__dot_focus');
    } else {
        current = current - 1;
        allPagination[current].classList.add('pagination__dot_focus');
    }
}
const slidePagination = document.querySelector('.hero__pagination');
slidePagination.addEventListener('click', selectDot);
function selectDot(event) {
    if (event.target.className !== 'pagination__dot') {
        return;
    }
    if (event.target.dataset.item == 'first-dot' && allPagination[0].classList != 'pagination__dot pagination__dot_focus') {
        current = 0;
        changeDotClick(current);
    }
    if (event.target.dataset.item == 'second-dot' && allPagination[1].classList != 'pagination__dot pagination__dot_focus') {
        current = 0;
        current = +1;
        changeDotClick(current);
    }
    if (event.target.dataset.item == 'third-dot' && allPagination[2].classList != 'pagination__dot pagination__dot_focus') {
        current = 0;
        current = +2;
        changeDotClick(current);
    }
    if (event.target.dataset.item == 'fourth-dot' && allPagination[3].classList != 'pagination__dot pagination__dot_focus') {
        current = 0;
        current = +3;
        changeDotClick(current);
    }
}
function changeDotClick(current) {
    for (let i = 0; i < allPagination.length; i++) {
        allPagination[i].classList.remove('pagination__dot_focus');
        allSliders[i].classList.add('slider-opacity');
    }
    allPagination[current].classList.add('pagination__dot_focus');
    allSliders[current].classList.remove('slider-opacity');
}
document.querySelectorAll('.logo-link').forEach(el => {
    el.addEventListener('click', function (event) {
        event.preventDefault();
        window.scrollBy({
            top: document.querySelector('#home').getBoundingClientRect().top,
            behavior: "smooth"
        });
    });
});
const navLinks = document.querySelectorAll('.header__link');
navLinks.forEach(link => link.addEventListener('click', function (event) {
    event.preventDefault();
    const href = this.getAttribute('href').substring(1);
    scrollByTarget(href);
    if (!document.querySelector('.header__nav-active')) {
        return;
    }
    if (document.querySelector('.header__nav-active')) {
        navBar.classList.remove('header__nav-active');
        navBar.classList.add('header__nav-close');
        setTimeout(() => navBar.classList.remove('header__nav-close'), 500);
    }
    for (i = 0; i < menuBurgerLines.length; i++) {
        menuBurgerLines[i].classList.remove('header__nav-close-line');
    }
}));
const searchForm = document.querySelectorAll('.header__search');
const searchInput = document.querySelector('.search__input');
searchForm.forEach(el => {
    el.addEventListener('submit', findElement);
    el.firstElementChild.addEventListener('click', () => {
        el.firstElementChild.classList.remove('search_blur');
        el.firstElementChild.classList.add('search_focus');
    });
    el.firstElementChild.addEventListener('blur', () => {
        el.firstElementChild.classList.remove('search_focus');
        el.firstElementChild.classList.add('search_blur');
        el.firstElementChild.value = "";
    });
});
function findElement(event) {
    event.preventDefault();
    let enteredWord = this.firstElementChild.value;
    if (document.getElementById(enteredWord)) {
        scrollByTarget(enteredWord);
        this.firstElementChild.value = "";
        return;
    }
    {
        this.firstElementChild.value = "not found";
    }
}
function scrollByTarget(id) {
    const headerElHeight = document.querySelector('.header').clientHeight;
    const scrollTarget = document.getElementById(id);
    const elementPosition = scrollTarget.getBoundingClientRect().top - headerElHeight;
    window.scrollBy({
        top: elementPosition,
        behavior: "smooth"
    });
}
const menuBurger = document.querySelector('.header__burger');
let menuBurgerLines = document.querySelectorAll('.burger__line');
const navBar = document.querySelector('.header__nav');
menuBurger.addEventListener('click', openNav);
function openNav() {
    if (document.querySelector('.header__nav-active')) {
        navBar.classList.remove('header__nav-active');
        navBar.classList.add('header__nav-close');
        setTimeout(() => navBar.classList.remove('header__nav-close'), 500);
        for (i = 0; i < menuBurgerLines.length; i++) {
            menuBurgerLines[i].classList.remove('header__nav-close-line');
        }
    } else {
        navBar.classList.add('header__nav-active');
        navBar.classList.remove('header__nav-close');
        for (i = 0; i < menuBurgerLines.length; i++) {
            menuBurgerLines[i].classList.add('header__nav-close-line');
        }
    }
}
const demoVideo = document.querySelector('.video__element');
const buttonVideo = document.querySelector('.demo__button');
const videoDescript = document.querySelector('.demo__descript');
buttonVideo.addEventListener('click', playVideo);
function playVideo() {
    if (demoVideo.paused) {
        demoVideo.play();
        demoVideo.controls = true;
        videoDescript.classList.add('display-none');
    } else {
        demoVideo.pause();
    }
}
document.querySelectorAll('.mobile__item-btn').forEach(el => {
    el.addEventListener('click', function () {
        let textElement = this.parentNode.lastElementChild;
        if (this.firstElementChild.classList != 'mobile__item-marker mobile__item-marker-open') {
            this.firstElementChild.classList.add('mobile__item-marker-open');
            textElement.classList.add('mobile__item-txt-open');
            textElement.style.maxHeight = textElement.scrollHeight + 'px';
        } else {
            textElement.style.maxHeight = null;
            this.firstElementChild.classList.remove('mobile__item-marker-open');
            textElement.classList.remove('mobile__item-txt-open');
        }
    });
});
const sliders = document.querySelectorAll('.recent-slide');
const sliderLine = document.querySelector('.recente-slider-line');
let count = 0;
let width;
adaptationSize();
window, addEventListener('resize', init);
function init() {
    adaptationSize();
    rollSlider();
}
const recentBtnRight = document.querySelector('.recent__arrow-right');
const recentBtnleft = document.querySelector('.recent__arrow-left');
recentBtnRight.addEventListener('click', function () {
    if (count == 0) {
        recentBtnleft.classList.remove('recent__arrow-opacity');
    }
    count++;
    if (count < sliders.length - 1) {
        rollSlider();
    } else {
        rollSlider();
        recentBtnRight.classList.add('recent__arrow-opacity');
    }
});
recentBtnleft.addEventListener('click', function () {
    if (count == 2) {
        recentBtnRight.classList.remove('recent__arrow-opacity');
    }
    count--;
    if (count > 0) {
        rollSlider();
    } else {
        rollSlider();
        recentBtnleft.classList.add('recent__arrow-opacity');
    }
});
function adaptationSize() {
    width = document.querySelector('.recente-slider').offsetWidth;
    sliderLine.style.width = width * sliders.length + "px";
    sliders.forEach(item => {
        item.style.width = width + "px";
        item.style.height = 'auto';
    });
}
function rollSlider() {
    sliderLine.style.transform = 'translate(-' + count * width + 'px)';
}