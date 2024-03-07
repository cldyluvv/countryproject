// ------------------------------------------ script scrollbar ------------------------------------------------------ //
// Check if the browser is Firefox
const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
// Apply specific styles for Firefox
if (isFirefox) {
    const tooltip = document.getElementById('countryListTooltip');
    tooltip.classList.add('firefox-scrollbar');
}
// -------------------------------------------- fetch country ------------------------------------------------------- //
function showCountryList() {
    const tooltip = document.getElementById('countryListTooltip');
    tooltip.style.display = 'block';
    // Fetch data from the API
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => {
            // Sort the countries in ascending order
            const sortedCountries = data.sort((a, b) => a.name.common.localeCompare(b.name.common));
            // Process the data and display country names only on the tooltip
            displayCountryDataInTooltip(sortedCountries);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}
// -------------------------------------------- fetch Continents -------------------------------------------------------- //
function showContinentList() {
    const tooltip = document.getElementById('continentListTip');
    tooltip.style.display = 'block';
    // Fetch data for continents from the API
    fetch('https://restcountries.com/v3.1/all?fields=continents')
        .then(response => response.json())
        .then(data => {
            // Extract continent names from the response
            const continents = data.map(country => country.continents).flat().filter(continent => continent !== undefined);
            // Process the data and display continent names only on the tooltip
            displayContinentDataInTooltip(continents);
        })
        .catch(error => {
            console.error('Error fetching continent data:', error);
        });
}
// ------------------------------------------- fetch Flags ----------------------------------------------------------- //
// Function to show country flags
function showCountryFlags() {
    // Fetch data for flags from the API
    fetch('https://restcountries.com/v3.1/all?fields=name,flags')
        .then(response => response.json())
        .then(data => {
            // Process the data and display country flags in the container
            displayCountryFlags(data);
        })
        .catch(error => {
            console.error('Error fetching country flags:', error);
        });
}
function displayCountryFlags(countries) {
    const flagsContainer = document.getElementById('flagsContainer');
    flagsContainer.style.display = 'grid';
    flagsContainer.style.gridTemplateColumns = 'repeat(4, 1fr)';
    flagsContainer.style.gap = '10px';
    countries.sort((a, b) => a.name.common.localeCompare(b.name.common));
    countries.forEach(country => {
        const flagBox = document.createElement('div');
        flagBox.className = 'flag-box';
        flagsContainer.appendChild(flagBox);
        const flagImage = document.createElement('img');
        flagImage.src = country.flags.png;
        flagImage.className = 'flag-image';
        flagBox.appendChild(flagImage);
        const countryName = document.createElement('div');
        countryName.textContent = country.name.common;
        countryName.className = 'country-name';
        flagBox.appendChild(countryName);
        // Add an event listener to each flag box
        flagBox.addEventListener('click', () => {
            navigateToDisplayPage(country);
        });
        // Add favorite icon
        const favoriteIcon = document.createElement('i');
        favoriteIcon.className = 'fa fa-star';
        favoriteIcon.style.color = 'gray'; // Initially set to unselected
        flagBox.appendChild(favoriteIcon);
        // Add click event for the favorite icon
        favoriteIcon.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevents the click event from propagating to the flag box
            toggleFavorite(country, favoriteIcon);
        });
    });
}
// Function to toggle the favorite status of a country
function toggleFavorite(country, favoriteIcon) {
    // You can implement your logic to save/unsave the country as a favorite
    // For now, let's just toggle the color of the favorite icon
    const isFavorite = favoriteIcon.style.color === 'yellow';
    favoriteIcon.style.color = isFavorite ? 'gray' : 'yellow';
    // You can also perform additional actions here, such as updating the user's favorites list
}
// Function to navigate to the "display.html" page with country data
function navigateToDisplayPage(country) {
    // Construct the URL with query parameters
    const displayPageUrl = `display.html?country=${encodeURIComponent(country.name.common)}`;
    // Redirect to the display page
    window.location.href = displayPageUrl;
}
// -------------------------------------- fetch currency ----------------------------------------------------------- //
// Function to fetch currency options from the API
function fetchCurrencyOptions() {
    // Fetch data for currency options from the API
    fetch('https://v6.exchangerate-api.com/v6/9367c723a8a715328c4e7841/latest/MYR')
        .then(response => response.json())
        .then(data => {
            // Assuming the API returns an object with currency codes nested inside 'conversion_rates'
            const currencyOptions = Object.keys(data.conversion_rates);
            // Populate the 'fromCurrency' dropdown
            populateDropdown('fromCurrency', currencyOptions);
            // Populate the 'toCurrency' dropdown
            populateDropdown('toCurrency', currencyOptions);
        })
        .catch(error => {
            console.error('Error fetching currency options:', error);
        });
}
// Function to populate a dropdown with options
function populateDropdown(dropdownId, options) {
    const dropdown = document.getElementById(dropdownId);
    // Clear previous options
    dropdown.innerHTML = '';
    // Iteate through options and create dropdown items
    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        dropdown.appendChild(optionElement);
    });
}
function convertAndDisplay() {
    // Get the selected currencies and amount
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    // Fetch the conversion rate from the API
    fetch(`https://v6.exchangerate-api.com/v6/9367c723a8a715328c4e7841/latest/${fromCurrency}`)
        .then(response => response.json())
        .then(data => {
            // Calculate the converted amount
            const conversionRate = data.conversion_rates[toCurrency];
            const convertedAmount = amount * conversionRate;
            // Display the converted result in the 'convertedResult' div
            const resultDiv = document.getElementById('convertedResult');
            resultDiv.innerHTML = `<p class="converted-text">${amount} ${fromCurrency} is equal to ${convertedAmount.toFixed(2)} ${toCurrency}</p>`;
        })
        .catch(error => {
            console.error('Error converting currency:', error);
        });
}
// ------------------------------------------- maps page --------------------------------------------------------- //
document.addEventListener("DOMContentLoaded", function () {
    fetchCountryList();
});
function fetchCountryList() {
    const column1Element = document.getElementById("column1");
    const column2Element = document.getElementById("column2");
    const column3Element = document.getElementById("column3");
    // Use the REST Countries API to fetch all countries
    fetch("https://restcountries.com/v3.1/all")
        .then(response => response.json())
        .then(data => {
            // Sort the data by country name in ascending order
            data.sort((a, b) => {
                const countryNameA = a.name.common.toUpperCase();
                const countryNameB = b.name.common.toUpperCase();
                return countryNameA.localeCompare(countryNameB);
            });
            // Iterate through the sorted data and add each country to the columns
            data.forEach((country, index) => {
                const countryName = country.name.common;
                const flagUrl = country.flags.svg;
                const modifiedCountryName = countryName + " Map";
                // Create a list item
                const listItem = document.createElement("li");
                // Create an anchor element for the link to the detailed country page
                const linkElement = document.createElement("a");
                linkElement.href = `country.html?name=${encodeURIComponent(countryName)}`; // Pass country name as a parameter
                linkElement.addEventListener("click", function (event) {
                    event.preventDefault(); // Prevent default link behavior
                    // You can add additional logic here before redirecting if needed
                    window.location.href = linkElement.href;
                });
                // Create an image element for the flag
                const flagImage = document.createElement("img");
                flagImage.src = flagUrl;
                flagImage.alt = countryName + " Flag";
                flagImage.className = "flag";
                // Create a span element for the country name
                const countrySpan = document.createElement("span");
                countrySpan.textContent = modifiedCountryName;
                // Append the flag and country name to the link element
                linkElement.appendChild(flagImage);
                linkElement.appendChild(countrySpan);
                // Append the link element to the list item
                listItem.appendChild(linkElement);
                // Distribute items to columns based on the index
                if (index % 3 === 0) {
                    column1Element.appendChild(listItem);
                } else if (index % 3 === 1) {
                    column2Element.appendChild(listItem);
                } else {
                    column3Element.appendChild(listItem);
                }
            });
        })
        .catch(error => {
            console.error("Error fetching country list:", error);
        });
}
// ----------------------------------------- fetch country populations ------------------------------------------------ //
document.addEventListener("DOMContentLoaded", function () {
    // Function to fetch and display country data
    function fetchCountries() {
        fetch('https://restcountries.com/v3.1/all')
            .then(response => response.json())
            .then(data => displayCountries(data))
            .catch(error => console.error('Error fetching countries:', error));
    }
    // Function to display countries in a 3-column table on the webpage
    function displayCountries(countries) {
        const countryListPeople = document.getElementById('countryListPeople');
        // Clear existing content
        countryListPeople.innerHTML = '';
        // Sort countries by name in ascending order
        const sortedCountries = countries.sort((a, b) => {
            const nameA = a.name.common || 'N/A';
            const nameB = b.name.common || 'N/A';
            return nameA.localeCompare(nameB);
        });
        // Create a table with 3 columns
        const table = document.createElement('table');
        table.id = 'countryTable'; // Add an id to the table for styling
        const numRows = Math.ceil(sortedCountries.length / 3);
        for (let i = 0; i < numRows; i++) {
            const row = table.insertRow();
            for (let j = 0; j < 3; j++) {
                const countryIndex = i * 3 + j;
                if (countryIndex < sortedCountries.length) {
                    const country = sortedCountries[countryIndex];
                    const countryName = country.name.common || 'N/A';
                    const cell = row.insertCell();
                    // Add a link to the country name
                    cell.innerHTML = `<a href="afghanistan.html"><p>${countryName}</p></a>`;
                }
            }
        }
        // Append the table to the countryListPeople div
        countryListPeople.appendChild(table);
    }
    // Call the fetchCountries function when the page is loaded
    fetchCountries();
});
// --------------------------------------- fetch population ------------------------------------------------ //
document.addEventListener("DOMContentLoaded", function () {
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => {
            // Extract and sort country names
            const countries = data.sort((a, b) => a.name.common.localeCompare(b.name.common));
            // Define an array of background colors
            const colors = ['#c4c7c9'];
            // Display countries in boxes with population and colored backgrounds
            const countryListDiv = document.getElementById('countryListi');
            countries.forEach((country, index) => {
                const countryBox = document.createElement('div');
                countryBox.style.border = '1px solid #ccc';
                countryBox.style.padding = '10px';
                countryBox.style.margin = '20px 0 0 25px';
                countryBox.style.width = '200px';
                countryBox.style.textAlign = 'center';
                countryBox.style.backgroundColor = colors[index % colors.length]; // Assign color based on index
                const countryName = document.createElement('p');
                countryName.textContent = country.name.common;
                const population = document.createElement('p');
                population.textContent = `Population: ${country.population || 'N/A'}`;
                countryBox.appendChild(countryName);
                countryBox.appendChild(population);
                countryListDiv.appendChild(countryBox);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});
// ---------------------------------------- fetch language ------------------------------------------------ //
document.addEventListener("DOMContentLoaded", function () {
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => {
            // Extract and sort country names
            const countries = data.sort((a, b) => a.name.common.localeCompare(b.name.common));
            // Define an array of background colors
            const colors = ['#c4c7c9'];
            // Display countries in boxes with population and colored backgrounds
            const countryListDiv = document.getElementById('countryLanguage');
            countries.forEach((country, index) => {
                const countryBox = document.createElement('div');
                countryBox.style.border = '1px solid #ccc';
                countryBox.style.padding = '10px';
                countryBox.style.margin = '20px 0 0 25px';
                countryBox.style.width = '200px';
                countryBox.style.textAlign = 'center';
                countryBox.style.backgroundColor = colors[index % colors.length]; // Assign color based on index
                const countryName = document.createElement('p');
                countryName.textContent = country.name.common;
                const languages = document.createElement('p');
                languages.textContent = 'Official language: ' + getLanguageNames(country.languages);
                countryBox.appendChild(countryName);
                countryBox.appendChild(languages);
                countryListDiv.appendChild(countryBox);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});
// Function to extract language names from an object of language codes and names
function getLanguageNames(languages) {
    if (languages && typeof languages === 'object') {
        const languageNames = Object.values(languages);
        return languageNames.join(', ');
    } else {
        return 'N/A';
    }
}
// Trigger the function to fetch currency options when the page loads
window.onload = function () {
    showCountryFlags(); // Assuming you have this function for displaying country flags
    fetchCurrencyOptions(); // Fetch and populate currency options
};