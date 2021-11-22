export default function getRefs() {
    return {
      searchBox: document.querySelector('input#search-box'),
      countryList: document.querySelector('.country-list'),
      countryInfo: document.querySelector('.country-info'),
    };
  }