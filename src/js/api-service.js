const BASE_URL = 'https://restcountries.com/v2';

function fetchCountry(countryName) {
  return fetch(`${BASE_URL}/name/${countryName}`).then(response => {
    if (!response.ok) {
        return Promise.reject(error);
    //   throw new Error(response.status);
    }
    return response.json();
    })
};

    export default { fetchCountry };