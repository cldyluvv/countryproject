document.addEventListener("DOMContentLoaded", function () {
    fetchEuropeCountries();});
async function fetchEuropeCountries() {
    try {
        const response = await fetch("https://restcountries.com/v3.1/all"); // Replace with your API endpoint
        const countries = await response.json();

        const europeCountries = countries.filter(country => country.region?.includes("Europe"));

        displayEuropeCountries(europeCountries);
    } catch (error) {
        console.error("Error fetching data:", error);
    }}
function displayEuropeCountries(countries) {
    const countriesListContainer = document.getElementById("countries-list");
    const table = document.createElement("table");
    table.className = "countries-table";
    let currentRow;
    let count = 0;
    countries.forEach(country => {
        if (count % 3 === 0) {
            currentRow = document.createElement("tr");
            table.appendChild(currentRow);}
        const countryCell = document.createElement("td");
        countryCell.className = "country";    
        const countryName = document.createElement("p");
        countryName.textContent = country.name.common;
        const countryFlag = document.createElement("img");
        countryFlag.src = country.flags.png;
        countryFlag.alt = `${country.name.common} Flag`;
        countryCell.appendChild(countryFlag);
        countryCell.appendChild(countryName);
        currentRow.appendChild(countryCell);
        count++;
    });
    countriesListContainer.appendChild(table);}
// -------------------------------------------------------------------------------------------------------------------------------------- //
document.addEventListener("DOMContentLoaded", function () {
    fetchAfricaCountries();});
async function fetchAfricaCountries() {
    try {
        const response = await fetch("https://restcountries.com/v3.1/all"); // Replace with your API endpoint
        const countries = await response.json();

        const africaCountries = countries.filter(country => country.region?.includes("Africa"));

        displayAfricaCountries(africaCountries);
    } catch (error) {
        console.error("Error fetching data:", error);
    }}
function displayAfricaCountries(countries) {
    const countriesListContainer = document.getElementById("countries-list2");
    const table = document.createElement("table");
    table.className = "countries-table";
    let currentRow;
    let count = 0;
    countries.forEach(country => {
        if (count % 3 === 0) {
            currentRow = document.createElement("tr");
            table.appendChild(currentRow);}
        const countryCell = document.createElement("td");
        countryCell.className = "country";
        const countryName = document.createElement("p");
        countryName.textContent = country.name.common;
        const countryFlag = document.createElement("img");
        countryFlag.src = country.flags.png;
        countryFlag.alt = `${country.name.common} Flag`;
        countryCell.appendChild(countryFlag);
        countryCell.appendChild(countryName);
        currentRow.appendChild(countryCell);
        count++;
    });
    countriesListContainer.appendChild(table);}
// -------------------------------------------------------------------------------------------------------------------------------------- //
document.addEventListener("DOMContentLoaded", function () {
    fetchNorthAmericaCountries();
});
async function fetchNorthAmericaCountries() {
    try {
        const response = await fetch("https://restcountries.com/v3.1/all"); // Replace with your API endpoint
        const countries = await response.json();
        const northamericaCountries = countries.filter(country => country.continents?.includes("North America"));
        displayNorthAmericaCountries(northamericaCountries);
    } catch (error) {
        console.error("Error fetching data:", error);
    }}
function displayNorthAmericaCountries(countries) {
    const countriesListContainer = document.getElementById("countries-list3");
    const table = document.createElement("table");
    table.className = "countries-table";
    let currentRow;
    let count = 0;
    countries.forEach(country => {
        if (count % 3 === 0) {
            currentRow = document.createElement("tr");
            table.appendChild(currentRow);
        }
        const countryCell = document.createElement("td");
        countryCell.className = "country";
        const countryName = document.createElement("p");
        countryName.textContent = country.name.common;
        const countryFlag = document.createElement("img");
        countryFlag.src = country.flags.png;
        countryFlag.alt = `${country.name.common} Flag`;
        countryCell.appendChild(countryFlag);
        countryCell.appendChild(countryName);
        currentRow.appendChild(countryCell);
        count++;
    });
    countriesListContainer.appendChild(table);
}
// -------------------------------------------------------------------------------------------------------------------------------------- //
document.addEventListener("DOMContentLoaded", function () {
    fetchOceaniaCountries();
});
async function fetchOceaniaCountries() {
    try {
        const response = await fetch("https://restcountries.com/v3.1/all"); // Replace with your API endpoint
        const countries = await response.json();
        const oceaniaCountries = countries.filter(country => country.continents?.includes("Oceania"));
        displayOceaniaCountries(oceaniaCountries);
    } catch (error) {
        console.error("Error fetching data:", error);
    }}
function displayOceaniaCountries(countries) {
    const countriesListContainer = document.getElementById("countries-list4");
    const table = document.createElement("table");
    table.className = "countries-table";
    let currentRow;
    let count = 0;
    countries.forEach(country => {
        if (count % 3 === 0) {
            currentRow = document.createElement("tr");
            table.appendChild(currentRow);}
        const countryCell = document.createElement("td");
        countryCell.className = "country";
        const countryName = document.createElement("p");
        countryName.textContent = country.name.common;
        const countryFlag = document.createElement("img");
        countryFlag.src = country.flags.png;
        countryFlag.alt = `${country.name.common} Flag`;
        countryCell.appendChild(countryFlag);
        countryCell.appendChild(countryName);
        currentRow.appendChild(countryCell);
        count++;
    });
    countriesListContainer.appendChild(table);}
// ------------------------------------------------------------------------------------------------------------------------------------ //
document.addEventListener("DOMContentLoaded", function () {
    fetchSouthAmericaCountries();
});
async function fetchSouthAmericaCountries() {
    try {
        const response = await fetch("https://restcountries.com/v3.1/all"); // Replace with your API endpoint
        const countries = await response.json();

        const southamericaCountries = countries.filter(country => country.continents?.includes("South America"));

        displaySouthAmericaCountries(southamericaCountries);
    } catch (error) {
        console.error("Error fetching data:", error);
    }}
function displaySouthAmericaCountries(countries) {
    const countriesListContainer = document.getElementById("countries-list5");
    const table = document.createElement("table");
    table.className = "countries-table";
    let currentRow;
    let count = 0;
    countries.forEach(country => {
        if (count % 3 === 0) {
            currentRow = document.createElement("tr");
            table.appendChild(currentRow);
        }
        const countryCell = document.createElement("td");
        countryCell.className = "country";
        const countryName = document.createElement("p");
        countryName.textContent = country.name.common;
        const countryFlag = document.createElement("img");
        countryFlag.src = country.flags.png;
        countryFlag.alt = `${country.name.common} Flag`;
        countryCell.appendChild(countryFlag);
        countryCell.appendChild(countryName);
        currentRow.appendChild(countryCell);
        count++;
    });
    countriesListContainer.appendChild(table);
}
// -------------------------------------------------------------------------------------------------------------------------------------- //
document.addEventListener("DOMContentLoaded", function () {
    fetchAsiaCountries();
});
async function fetchAsiaCountries() {
    try {
        const response = await fetch("https://restcountries.com/v3.1/all"); // Replace with your API endpoint
        const countries = await response.json();
        const asiaCountries = countries.filter(country => country.continents?.includes("Asia"));
        displayAsiaCountries(asiaCountries);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
function displayAsiaCountries(countries) {
    const countriesListContainer = document.getElementById("countries-list6");
    const table = document.createElement("table");
    table.className = "countries-table";
    let currentRow;
    let count = 0;
    countries.forEach(country => {
        if (count % 3 === 0) {
            currentRow = document.createElement("tr");
            table.appendChild(currentRow);
        }
        const countryCell = document.createElement("td");
        countryCell.className = "country";
        const countryName = document.createElement("p");
        countryName.textContent = country.name.common;
        const countryFlag = document.createElement("img");
        countryFlag.src = country.flags.png;
        countryFlag.alt = `${country.name.common} Flag`;
        countryCell.appendChild(countryFlag);
        countryCell.appendChild(countryName);
        currentRow.appendChild(countryCell);
        count++;
    });
    countriesListContainer.appendChild(table);
}
// -------------------------------------------------------------------------------------------------------------------------------------- //
document.addEventListener("DOMContentLoaded", function () {
    fetchAntarcticaCountries();
});
async function fetchAntarcticaCountries() {
    try {
        const response = await fetch("https://restcountries.com/v3.1/all"); // Replace with your API endpoint
        const countries = await response.json();
        const antarcticaCountries = countries.filter(country => country.continents?.includes("Antarctica"));
        displayAntarcticaCountries(antarcticaCountries);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
function displayAntarcticaCountries(countries) {
    const countriesListContainer = document.getElementById("countries-list7");
    const table = document.createElement("table");
    table.className = "countries-table";
    let currentRow;
    let count = 0;
    countries.forEach(country => {
        if (count % 3 === 0) {
            currentRow = document.createElement("tr");
            table.appendChild(currentRow);
        }
        const countryCell = document.createElement("td");
        countryCell.className = "country";
        const countryName = document.createElement("p");
        countryName.textContent = country.name.common;
        const countryFlag = document.createElement("img");
        countryFlag.src = country.flags.png;
        countryFlag.alt = `${country.name.common} Flag`;
        countryCell.appendChild(countryFlag);
        countryCell.appendChild(countryName);
        currentRow.appendChild(countryCell);
        count++;
    });
    countriesListContainer.appendChild(table);}



