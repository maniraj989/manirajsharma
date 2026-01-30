'use strict';

const preloader = document.querySelector("[data-preloader]");

window.addEventListener("DOMContentLoaded", function () {
    preloader.classList.add("loaded");
    document.body.classList.add("loaded");
});

const addEventOnElements = function (elements, eventType, callback) {
    for (let i = 0, len = elements.length; i < len; i++) {
        elements[i].addEventListener(eventType, callback);
    }
};

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navlinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

addEventOnElements(navTogglers, "click", function () {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("nav-active");
});

addEventOnElements(navlinks, "click", function () {
    navbar.classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("nav-active");
});

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
    if (header) {
        if (window.scrollY > 100) {
            header.classList.add("active");
        } else {
            header.classList.remove("active");
        }
    }
});


const tiltElements = document.querySelectorAll("[data-tilt]");

const initTilt = function (event) {
    const centerX = this.offsetWidth / 2;
    const centerY = this.offsetHeight / 2;

    const tiltPosY = ((event.offsetX - centerX) / centerX) * 10;
    const tiltPosX = ((event.offsetY - centerY) / centerY) * 10;

    this.style.transform = `perspective(1000px) rotateX(${tiltPosX}deg) rotateY(${tiltPosY - (tiltPosY * 2)}deg)`;
}

addEventOnElements(tiltElements, "mousemove", initTilt);

addEventOnElements(tiltElements, "mouseleave", function () {
    this.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
});


const tabBtns = document.querySelectorAll("[data-tab-btn]");
const tabContents = document.querySelectorAll("[data-tab-content]");
let lastActiveTabBtn = tabBtns[0];
let lastActiveTabContent = tabContents[0];

const filterContent = function () {
    if (!(lastActiveTabBtn === this)) {
        lastActiveTabBtn.classList.remove("active");
        lastActiveTabContent.classList.remove("active");

        this.classList.add("active");
        lastActiveTabBtn = this;

        const currentTabContent = document.querySelector(`[data-tab-content="${this.dataset.tabBtn}"]`);
        currentTabContent.classList.add("active");
        lastActiveTabContent = currentTabContent;


    }

}

addEventOnElements(tabBtns, "click", filterContent);

/**
 * Portfolio Slider
 */
const slider = document.querySelector("[data-slider]");
const sliderContainer = document.querySelector(".slider-container");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

let isDown = false;
let startX;
let scrollLeft;

if (slider && prevBtn && nextBtn) {
    // Button Click Events
    const getScrollAmount = () => {
        const item = slider.querySelector('.slider-item');
        return item ? item.offsetWidth + 30 : 350; // 30px is value of gap
    };

    nextBtn.addEventListener("click", () => {
        slider.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
    });

    prevBtn.addEventListener("click", () => {
        slider.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
    });

    // Optional: Mouse Drag Scrolling (for desktop)
    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('active');
    });
    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('active');
    });
    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2; // Scroll-fast
        slider.scrollLeft = scrollLeft - walk;
    });
}