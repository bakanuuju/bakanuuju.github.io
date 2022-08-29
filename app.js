// Sticky Navbar
let navbar = document.querySelector('#navHeader');
let navPos = navbar.getBoundingClientRect().top;

window.addEventListener('scroll', e => {
    let scrollPos = window.scrollY;
    if (scrollPos > navPos) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }
})

// Link Scrolling
const navHeight = document.querySelector('#navHeader').offsetHeight;
document.documentElement.style.setProperty('--scroll-padding', navHeight + 'px');

//Hamburger Menu
const navigation = document.querySelector('#navigation');
const navToggle = document.querySelector('.navToggle');

navToggle.addEventListener('click', () => {
    const visibility = navigation.getAttribute('data-visible');
    if (visibility === "false") {
        navigation.setAttribute('data-visible', true);
        navToggle.setAttribute('aria-expanded', true);
    } else {
        navigation.setAttribute('data-visible', false);
        navToggle.setAttribute('aria-expanded', false);
    }
})