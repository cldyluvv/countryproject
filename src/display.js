document.addEventListener("DOMContentLoaded", function () {
    // Function to get URL parameters
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
        var results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
    // Get the country parameter from the URL
    var selectedCountry = getUrlParameter("country");
    // Update the h2 element with the selected country
    document.getElementById("countryName").textContent = selectedCountry;
    // Fetch detailed information about the selected country
    fetchCountryInfo(selectedCountry);
});
function fetchCountryInfo(countryName) {
    // Fetch data for the selected country from the API
    fetch(`https://api.weatherbit.io/v2.0/current?city=${countryName}&key=620a48ab40db4660bf5e4c6ffe0336bc`)
        .then(response => response.json())
        .then(weatherData => {
            // Fetch country information
            fetch('https://restcountries.com/v3.1/all?fields=name,flags,capital,borders,continents,timezones')
                .then(response => response.json())
                .then(data => {
                    // Find the selected country in the data
                    const selectedCountryInfo = data.find(country => country.name.common === countryName);
                    // Check if the selected country is found
                    if (selectedCountryInfo) {
                        // Display detailed information about the selected country
                        displayCountryInfo(selectedCountryInfo);
                        // Display weather information
                        displayWeatherInfo(weatherData.data[0]);
                        // Display country flag
                        displayCountryFlag(selectedCountryInfo.flags.svg);
                    } else {
                        // Handle the case where the selected country is not found
                        console.error('Selected country not found:', countryName);
                    }
                })
                .catch(error => {
                    console.error('Error fetching country information:', error);
                });
        })
        .catch(error => {
            console.error('Error fetching weather information:', error);
        });
}
function displayCountryFlag(flagUrl) {
    try {
        const flagContainer = document.getElementById('flagContainer');
        flagContainer.style.width = '100%';
        flagContainer.style.marginLeft = '25%';
        flagContainer.innerHTML = ''; // Clear previous content
        // Display country flag
        const flagImg = document.createElement('img');
        flagImg.src = flagUrl;
        flagImg.alt = 'Country Flag';
        flagImg.style.width = '50%'; // Adjust the width as needed
        flagContainer.appendChild(flagImg);
    } catch (error) {
        console.error('Error displaying country flag:', error);
    }
}
function displayCountryInfo(country) {
    try {
        const countryInformationContainer = document.getElementById('countryInfoContainer');
        countryInformationContainer.innerHTML = ''; // Clear previous content
        // Create a table element
        const infoTable = document.createElement('table');
        // Display common and official names in the table
        addToTable(infoTable, 'Common Name', country.name.common);
        addToTable(infoTable, 'Official Name', country.name.official);
        // Display capital city in the table
        addToTable(infoTable, 'Capital City', country.capital);
        // Display borders in the table
        if (country.borders && country.borders.length > 0) {
            addToTable(infoTable, 'Borders', country.borders.join(', '));
        } else {
            addToTable(infoTable, 'Borders', 'No Borders');
        }
        // Display continent in the table
        addToTable(infoTable, 'Continent', country.continents);
        // Display timezones in the table
        addToTable(infoTable, 'Timezones', country.timezones.join(', '));
        // Append the table to the information container
        countryInformationContainer.appendChild(infoTable);
    } catch (error) {
        console.error('Error displaying country information:', error);
    }
}
// Helper function to add rows to the table
function addToTable(table, label, value) {
    const row = table.insertRow();
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    cell1.textContent = label;
    cell2.textContent = value;
}
function displayWeatherInfo(weather) {
    try {
        const weatherInfoContainer = document.getElementById('weatherInfoContainer');
        weatherInfoContainer.innerHTML = ''; // Clear previous content
        // Display weather information
        const weatherContainer = document.createElement('div');
        // Assuming weather.temp is an array, get the first temperature value
        const temperature = Array.isArray(weather.temp) ? weather.temp[0] : weather.temp;
        // Display temperature first
        const temperatureText = document.createElement('div');
        temperatureText.textContent = `Temperature: ${temperature}°C`;
        weatherContainer.appendChild(temperatureText);
        // Display weather description below temperature
        const weatherDescriptionText = document.createElement('div');
        weatherDescriptionText.textContent = `Weather: ${weather.weather.description}`;
        weatherContainer.appendChild(weatherDescriptionText);
        // Append the weatherContainer to the weatherInfoContainer
        weatherInfoContainer.appendChild(weatherContainer);
    } catch (error) {
        console.error('Error displaying weather information:', error);
    }
}
document.addEventListener("DOMContentLoaded", function () {
    fetchCountryInfo(selectedCountry);
});
// Function to handle search
function searchCountry() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.trim();
    if (searchTerm !== "") {
        // Redirect to display.html with the searched country as a query parameter
        window.location.href = `display.html?country=${encodeURIComponent(searchTerm)}`;
    } else {
        // Handle empty search term if needed
        console.error('Empty search term');
    }
}
