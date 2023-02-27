import citiesData from './navigation.json' assert {type: 'json'};

const {cities} = citiesData;

const navDiv = document.querySelector('.nav_content');
let navMargin = parseInt(window.getComputedStyle(navDiv).marginLeft.replace('px', ''));//todo long and also regex

//todo instantiate function and refactor
//todo make it so the nav is tabbable and accessible
//todo run in other browsers  get the webkit transition properties
//todo mobile views
const navContainer = document.querySelector('.nav_container');
cities.forEach((city, index) => {
    const a = document.createElement('a');
    a.innerText = city.label;
    if (index === 0) a.classList.add('active');
    a.classList.add('nav_item');
    navContainer.appendChild(a);
});
window.onresize = () => {
    navMargin = parseInt(window.getComputedStyle(navDiv).marginLeft.replace('px', ''));
    const {width, x} = selected.getBoundingClientRect();
    underline.style.width = `${width}px`;
    underline.style.marginLeft = `${x - navMargin}px`;
}
const underline = document.querySelector('.underline');
const navItems = document.querySelectorAll('.nav_item');
let selected = navItems[0];
const {width, x} = selected.getBoundingClientRect();
underline.style.width = `${width}px`;
underline.style.marginLeft = `${x - navMargin}px`;
underline.style.display = 'block';

navItems.forEach((a) => {
    a.addEventListener('click', () => {
        selected.classList.toggle('active');
        selected = a;
        selected.classList.toggle('active');
        const {width, x} = selected.getBoundingClientRect();
        underline.style.width = `${width}px`;
        underline.style.marginLeft = `${x - navMargin}px`;
    })
})