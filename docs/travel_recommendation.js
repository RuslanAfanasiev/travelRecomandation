let travelData = {};


fetch('./travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
        travelData = data;
        console.log("Data loaded:", data);
    })
    .catch(error => console.error("Error loading JSON:", error));



function searchRecommendations() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    if (input.includes("beach")) {
        travelData.beaches.forEach(place => {
            displayCard(place.name, place.imageUrl, place.description);
        });
    }

    else if (input.includes("temple")) {
        travelData.temples.forEach(place => {
            displayCard(place.name, place.imageUrl, place.description);
        });
    }

    else if (input.includes("country")) {

        travelData.countries.forEach(country => {

            country.cities.forEach(city => {
                displayCard(city.name, city.imageUrl, city.description);
            });

        });
    }

    else {
        resultsDiv.innerHTML = "<p>No results found.</p>";
    }
}



function displayCard(name, imageUrl, description) {

    const resultsDiv = document.getElementById("results");

    const card = `
        <div class="card">
            <img src="${imageUrl}" alt="${name}">
            <h3>${name}</h3>
            <p>${description}</p>
        </div>
    `;

    resultsDiv.innerHTML += card;
}



function clearResults() {
    document.getElementById("results").innerHTML = "";
    document.getElementById("searchInput").value = "";
}