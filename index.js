import citiesData from './navigation.json' assert {type: 'json'};


let selected;
const navDiv = document.querySelector('.nav_content');
let navMargin = parseInt(window.getComputedStyle(navDiv).marginLeft.replace('px', ''));//todo long and also regex
const underline = document.querySelector('.underline');
//todo run in other browsers  get the webkit transition properties
//todo mobile views

window.onload = () => {
    createAndAppendElements();
    instantiateUnderline();
}

window.onresize = () => {
    recalculateUnderlinePosition();
}

const createAndAppendElements = () => {
    const {cities} = citiesData;
    const navContainer = document.querySelector('.nav_container');
    cities.forEach((city, index) => {
        const a = document.createElement('a');
        a.innerText = city.label;
        if (index === 0) a.classList.add('active');
        a.classList.add('nav_item');
        a.setAttribute('tabindex', '0');
        navContainer.appendChild(a);
    });
}

const instantiateUnderline = () => {
    const navItems = document.querySelectorAll('.nav_item');
    selected = navItems[0];
    calculateUnderlinePosition(selected);
    underline.style.display = 'block';
    navItems.forEach((a) => {
        a.addEventListener('click', () => {
            handleClick(a);
        });
        a.addEventListener("keydown", (event) => {
            if (event.keyCode === 13) {
                handleClick(a);
            }
        })
    });
}

const handleClick = (newElement) => {
    selected.classList.toggle('active');
    selected = newElement;
    selected.classList.toggle('active');
    calculateUnderlinePosition(selected);
}


const calculateUnderlinePosition = (focusedElement) => {
    const {width, x} = focusedElement.getBoundingClientRect(); //TODO DOES THIS WORK IN ALL BROWSERS
    underline.style.width = `${width}px`;
    underline.style.marginLeft = `${x - navMargin}px`;
    underline.style.display = 'block';

}

const recalculateUnderlinePosition = () => {
    navMargin = parseInt(window.getComputedStyle(navDiv).marginLeft.replace('px', ''));
    calculateUnderlinePosition(selected);
}
