document.addEventListener("DOMContentLoaded", function () {
    // Get the country name from the URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const countryName = urlParams.get('name');
    // Update the page with the country name
    document.getElementById('countryName').textContent = countryName;
    // Use the REST Countries API to fetch details about the country
    fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}`)
        .then(response => response.json())
        .then(data => {
            const countryInfoElement = document.getElementById('countryInfo');
            // Assuming the response is an array with a single item
            const countryData = data[0];
            // Display the map using Leaflet
            if (countryData.latlng && countryData.latlng.length === 2) {
                const mapElement = document.createElement("div");
                mapElement.id = "countryMap";
                countryInfoElement.appendChild(mapElement);
                // Create a Leaflet map
                initMap(mapElement, countryData.latlng);
                function initMap(mapContainer, latlng) {
                    const map = L.map(mapContainer).setView(latlng, 5);
                    // Add a tile layer for the map
                    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    }).addTo(map);
                    // Add a marker for the country
                    L.marker(latlng).addTo(map)
                        .bindPopup(`<b>${countryName}</b>`)
                        .openPopup();
                }
            }
            // Display region, subregion, latlng, and area in a table
            countryInfoElement.innerHTML += `
            <table>
                <tr>
                    <th>Region</th>
                    <td>${countryData.region || 'N/A'}</td>
                </tr>
                <tr>
                    <th>Subregion</th>
                    <td>${countryData.subregion || 'N/A'}</td>
                </tr>
                <tr>
                    <th>Latitude and Longitude</th>
                    <td>${countryData.latlng ? countryData.latlng.join(', ') : 'N/A'}</td>
                </tr>
                <tr>
                    <th>Area</th>
                    <td>${countryData.area ? countryData.area.toLocaleString() + ' sq km' : 'N/A'}</td>
                </tr>
            </table>
            `;
        })
        .catch(error => {
            console.error("Error fetching country details:", error);
        });
});

