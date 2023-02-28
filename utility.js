const localeTimeDiff = {
    "cupertino": 16,
    "new-york-city": 5,
    "london": 0,
    "amsterdam": 1,
    "tokyo": 9,
    "hong-kong": 8,
    "sydney": 11
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

const addZero = (number) =>
    number < 10 ? `0${number}` : number;


const getLeftMargin = (element) =>
    parseInt(window.getComputedStyle(element).marginLeft.replace('px', ''));
