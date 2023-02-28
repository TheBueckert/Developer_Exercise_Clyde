let citiesData;
let selected, selectedMobile, navMargin;
let mainNav = document.querySelector('.main_nav');
const navDiv = document.querySelector('.nav_content');
const underline = document.querySelector('.underline');
//todo run in other browsers  get the webkit transition properties
//todo mobile views

window.onload = () => {
    loadJSON((json) => {
        citiesData = json;
    });
    calculateNavMargin();
    createAndAppendElements();
    instantiateUnderline();
    instantiateMobileMenu();
}

window.onresize = () => {
    calculateNavMargin();
    calculateUnderlinePosition(selected);
}

const createAndAppendElements = () => {
    const {cities} = citiesData;
    const navContainer = document.querySelector('.nav_container');
    const mobileContainer = document.querySelector('.menu_items');
    cities.forEach((city, index) => {
        // Desktop Nav Items
        const a = document.createElement('a');
        a.innerText = city.label;
        if (index === 0) a.classList.add('active');
        a.classList.add('nav_item');
        a.setAttribute('tabindex', '0');
        navContainer.appendChild(a);

        //Hamburger Menu Items
        const aMobile = document.createElement('a');
        aMobile.innerText = city.label;
        aMobile.classList.add('nav_item_mobile');
        aMobile.setAttribute('tabindex', '0');
        if (index === 0) aMobile.classList.add('active');
        mobileContainer.appendChild(aMobile);
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
    const selectedCityText = document.querySelector('.selected_city_mobile');
    selectedMobile = navItemsMobile[0];
    selectedCityText.innerText = selectedMobile.innerHTML;
    navItemsMobile.forEach((a) => {
        a.addEventListener('click', () => {
            handleClick(a);
            selectedCityText.innerText = a.innerText;
        });
        a.addEventListener("keydown", (event) => {
            if (event.keyCode === 13) {
                handleClick(a);
                selectedCityText.innerText = a.innerText;
            }
        });
    });
    document.querySelector('.hamburger_lines').addEventListener('keydown', (event) => {
        if (event.keyCode === 13)
            document.getElementById("checkbox").checked = !document.getElementById("checkbox").checked
    });

}

const handleClick = (selectedElement) => {
    const navItems = [...document.querySelectorAll('.nav_item')];
    const navItemsMobile = [...document.querySelectorAll('.nav_item_mobile')];
    const newElementDesktop = navItems.filter((item) => item.innerText === selectedElement.innerText);
    const newElementMobile = navItemsMobile.filter((item) => item.innerText === selectedElement.innerText);

    selected.classList.toggle('active');
    selected = newElementDesktop[0];
    selected.classList.toggle('active');

    selectedMobile.classList.toggle('active');
    selectedMobile = newElementMobile[0];
    selectedMobile.classList.toggle('active');

    calculateUnderlinePosition(selected);
    document.getElementById("checkbox").checked = false;
}

const calculateNavMargin = () => {
    let val1 = parseInt(window.getComputedStyle(mainNav).marginLeft.replace('px', ''));//todo long and also regex
    let val2 = parseInt(window.getComputedStyle(navDiv).marginLeft.replace('px', ''));//todo long and also regex
    navMargin = val1 + val2;
}


const calculateUnderlinePosition = (focusedElement) => {
    const {width, x} = focusedElement.getBoundingClientRect(); //TODO DOES THIS WORK IN ALL BROWSERS
    underline.style.width = `${width}px`;
    underline.style.marginLeft = `${x - navMargin}px`;
    underline.style.display = 'block';

}


const loadJSON = (callback) => {
    const xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', './navigation.json', false);
    xobj.onreadystatechange = () => {
        if (xobj.readyState === 4 && xobj.status === 200)
            callback(JSON.parse(xobj.responseText));
    };
    xobj.send(null);
}
