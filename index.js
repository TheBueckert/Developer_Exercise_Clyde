let citiesData;
let selected, selectedMobile, navMargin;
let localeOffset = localeTimeDiff.cupertino;

let mainNav = document.querySelector('.main_nav');
const navDiv = document.querySelector('.nav_content');
const underline = document.querySelector('.underline');
const secondHand = document.querySelector('.second');
const minuteHand = document.querySelector('.minute');
const hourHand = document.querySelector('.hour');
const digitalClock = document.querySelector('.digital_time');
const clock = document.querySelector('.clock_container');
const checkbox = document.getElementById("checkbox");
const selectedCityText = document.querySelector('.selected_city_mobile');

window.onload = () => {
    loadJSON((json) => {
        citiesData = json;
    });
    calculateNavMargin();
    createAndAppendElements();
    instantiateUnderline();
    instantiateMobileMenu();
    setTime();
    setInterval(setTime, 1000);
}

window.onresize = () => {
    calculateNavMargin();
    calculateUnderlinePosition(selected);
}

const createAndAppendElements = () => {
    const {cities} = citiesData;
    const desktopNavContainer = document.querySelector('.nav_container');
    const mobileNavContainer = document.querySelector('.menu_items');
    cities.forEach((city, index) => {
        const a = document.createElement('a');
        a.innerText = city.label;
        if (index === 0) a.classList.add('active');
        a.setAttribute('tabindex', '0');
        const aMobile = a.cloneNode(true);

        // Desktop Nav Items
        a.classList.add('nav_item');
        desktopNavContainer.appendChild(a);

        //Hamburger Menu Items
        aMobile.classList.add('nav_item_mobile');
        mobileNavContainer.appendChild(aMobile);
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
        });
    });
}

const instantiateMobileMenu = () => {
    const navItemsMobile = document.querySelectorAll('.nav_item_mobile');
    selectedMobile = navItemsMobile[0];
    selectedCityText.innerText = selectedMobile.innerHTML;
    navItemsMobile.forEach((a) => {
        a.addEventListener('click', () => {
            handleClick(a);
        });
        a.addEventListener("keydown", (event) => {
            if (event.keyCode === 13) {
                handleClick(a);
            }
        });
    });
    document.querySelector('.hamburger_lines').addEventListener('keydown', (event) => {
        if (event.keyCode === 13)
            checkbox.checked = !checkbox.checked;
    });

}

const handleClick = (selectedElement) => {
    const navItems = [...document.querySelectorAll('.nav_item')];
    const navItemsMobile = [...document.querySelectorAll('.nav_item_mobile')];

    selected.classList.toggle('active');
    selected = navItems.find((item) => item.innerText === selectedElement.innerText);
    selected.classList.toggle('active');

    selectedMobile.classList.toggle('active');
    selectedMobile = navItemsMobile.find((item) => item.innerText === selectedElement.innerText);
    selectedMobile.classList.toggle('active');

    calculateUnderlinePosition(selected);
    document.getElementById("checkbox").checked = false;
    selectedCityText.innerText = selectedElement.innerText;

    const {cities} = citiesData;
    const city = cities.find((city) => city.label === selectedElement.innerHTML);
    localeOffset = localeTimeDiff[city.section];
    clock.classList.toggle('swap');
    setTimeout(() => {
        clock.classList.toggle('swap');
    }, 1000);
}

const calculateNavMargin = () => {
    let val1 = getLeftMargin(mainNav);
    let val2 = getLeftMargin(navDiv);
    navMargin = val1 + val2;
}


const calculateUnderlinePosition = (focusedElement) => {
    const {width, x} = focusedElement.getBoundingClientRect();
    underline.style.width = `${width}px`;
    underline.style.marginLeft = `${x - navMargin}px`;
}

const setTime = () => {
    const today = new Date();
    const seconds = today.getUTCSeconds();
    const minutes = today.getUTCMinutes();
    let hours = today.getUTCHours() + localeOffset;
    if (hours === 0) hours = 12;
    if (hours > 12) hours -= 12;

    const secondRotation = seconds * 6;
    const minuteRotation = minutes * 6;
    const hourRotation = hours * 30;

    secondHand.style.transform = `rotate(${secondRotation}deg)`;
    minuteHand.style.transform = `rotate(${minuteRotation}deg)`;
    hourHand.style.transform = `rotate(${hourRotation}deg)`;

    digitalClock.innerText = `${hours} : ${addZero(minutes)} : ${addZero(seconds)}`;
}
