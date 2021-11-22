import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import getRefs from './js/get-refs';
import API from './js/api-service';
import './css/styles.css';
import 'notiflix/dist/notiflix-3.2.2.min';

const refs = getRefs();

const DEBOUNCE_DELAY = 300;

refs.searchBox.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch() {  
    const inputData = refs.searchBox.value.trim();

    if (!inputData) {
        refs.countryList.innerHTML = '';
        return;
    } 
    API.fetchCountry(inputData).then(renderCountries).catch(onFetchError);
}

function renderCountries(countries) {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
    
    if (countries.message === "Not Found") {
        onFetchError();
        return;
    }

    if (countries.length > 10) {
        Notify.info("Too many matches found. Please enter a more specific name.");
    } 
    else if (countries.length >= 2 && countries.length <= 10) {
        const markup = countries.map(({ flags: { svg }, name }) =>
        `<div class="list-items">
            <div class="item-image"><img src="${svg}" alt="flag" width="30"></div>
            <div class="item-name">${name}</div>
        </div>`
    ).join(''); 
    refs.countryList.innerHTML = markup;
    } 
    else if (countries.length === 1) {
        const markup = countries.map(({ flags: { svg }, name, capital, population, languages }) =>
        {
            const languagesList = Object.values(languages[0]).join(', ');
            return `<div class="list-item">
                        <img src="${svg}" alt="flag" width="150">
                        <h1 class="item-title">${name}</h1>
                        <p><span class="item-property">Capital:</span> ${capital}</p>
                        <p><span class="item-property">Population:</span> ${population}</p>
                        <p><span class="item-property">Languages:</span> ${languagesList}</p>
                    </div>`
        }).join(''); 
    refs.countryInfo.innerHTML = markup;
    }
}

function onFetchError(error) {
    Notify.failure("Oops, there is no country with that name");
}