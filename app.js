'use strict';

const inputSearch = document.querySelector('.input-search');
const searchBtn = document.querySelector('.search-btn');

searchBtn.addEventListener('click', async () => {
  const countryName = inputSearch.value.trim().toLowerCase();

  if (!countryName) {
    alert('Please enter a country name.');
    return;
  }

  try {
    // Fetching the country data from the API
    const response = await fetch(`https://restcountries.com/v3.1/all`);
    if (!response.ok) throw new Error('Failed to fetch countries data');

    // Extracting data
    const data = await response.json();

    // Finding the exact match for the country name
    const country = data.find(c => c.name.common.toLowerCase() === countryName);
    if (!country) throw new Error('Country not found');

    // Extracting languages, currencies, and capital
    const languages = Object.values(country.languages).join(', ');
    const currencies = Object.values(country.currencies)
      .map(currency => currency.name)
      .join(', ');
    const capital = country.capital ? country.capital[0] : 'No capital available';

    // Creating HTML for the country card
    const htmlCard = `
      <div class="countries-card">
        <img src="${country.flags.svg}" alt="Country Flag" />
        <div class="countries-data">
          <h3 class="countries-name">${country.name.common}</h3>
          <h4 class="countries-region">${country.region}</h4>
          <p class="countries-capital"><span class="emoji">🏛️</span> Capital: ${capital}</p>
          <p class="countries-population"><span class="emoji">👨‍👨‍👧‍👦</span> ${(country.population / 1_000_000).toFixed(1).toLocaleString()} million</p>
          <p class="countries-language"><span class="emoji">🗣️</span> ${languages}</p>
          <p class="countries-money"><span class="emoji">💰</span> ${currencies}</p>
        </div>
      </div>
    `;

    // Inserting the new country card into the page without replacing existing cards
    const countries = document.querySelector('.countries');
    countries.insertAdjacentHTML('beforeend', htmlCard);

  } catch (error) {
    console.log('Error fetching country data:', error);
    alert('Could not fetch country data. Please try again.');
  }
});