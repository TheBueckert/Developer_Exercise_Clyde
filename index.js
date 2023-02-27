import citiesData from './navigation.json' assert {type: 'json'};

const {cities} = citiesData;
//https://blog.bitsrc.io/how-to-import-json-file-as-a-module-e4965295a7b3
console.log(citiesData);
console.log(cities);
console.log('done');

const navUL = document.querySelector('.nav_ul');
cities.forEach((city) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.innerText = city.label;
    a.classList.add('nav_item');
    li.appendChild(a);
    navUL.appendChild(li);
})