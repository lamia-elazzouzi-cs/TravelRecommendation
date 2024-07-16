const btnReset = document.getElementById('btnReset');
const btnSearch = document.getElementById('btnSearch');
const btnBookNow = document.getElementById('btnBookNow');

const countries = beaches = temples = [];

function generateTravelDestinations() {
    const destinationsDiv = document.getElementById('destinationsDiv')
    destinationsDiv.innerHTML = "";

    fetch('travel_recommendation.json')
        .then(response => response.json())
        .then(data => {
            const countries = data.countries;
            const temples = data.temples;
            const beaches = data.beaches;

            destinationsDiv.innerHTML += "<h2>Counties:</h2>";
            console.log(countries);
            for (const country of countries) {
                for (const city of country.cities) {
                    destinationsDiv.innerHTML += `<div><h2>${city.name}<button class="visitBtn">Visit</button></div></h2>`;
                    destinationsDiv.innerHTML += `<img class="destImage" src="./images/${city.imageUrl}" alt="${city.name}">`;
                    destinationsDiv.innerHTML += `<p>${city.description}</p>`;
                }
            }
            destinationsDiv.innerHTML += "<h2>Beaches:</h2>";
            console.log(beaches);
            for (const beach of beaches) {
                destinationsDiv.innerHTML += `<div><h2>${beach.name}<button class="visitBtn">Visit</button></div></h2>`;
                destinationsDiv.innerHTML += `<img class="destImage" src="./images/${beach.imageUrl}" alt="${beach.name}">`;
                destinationsDiv.innerHTML += `<p>${beach.description}</p>`;
            }
            destinationsDiv.innerHTML += "<h2>Temples:</h2>";
            console.log(temples);
            for (const temp of temples) {
                destinationsDiv.innerHTML += `<div><h2>${temp.name}<button class="visitBtn">Visit</button></div></h2>`;
                destinationsDiv.innerHTML += `<img class="destImage" src="./images/${temp.imageUrl}" alt="${temp.name}">`;
                destinationsDiv.innerHTML += `<p>${temp.description}</p>`;
            }

        })
        .catch(error => {
            console.log("Error fetching your data: ", error);
            destinationsDiv.innerHTML += `<img class="destImage" src='./images/error.jpg' alt="error">`;
        });

}

btnBookNow.addEventListener('click', generateTravelDestinations);

function generateSearchTravelDestinations() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const destinationsDiv = document.getElementById('destinationsDiv')
    destinationsDiv.innerHTML = "";
    //const searchResults = [];

    fetch('travel_recommendation.json')
        .then(response => response.json())
        .then(data => {
            console.log("input == ", searchInput);
            const searchResults = data[searchInput];
            destinationsDiv.innerHTML += `<h2>Search results for: "${searchInput}"</h2>`;
            destinationsDiv.innerHTML += `<p>Available: ${data[searchInput].length} destinations</p>`;

            if (searchInput === 'countries') {
                for (const country of searchResults) {
                    for (const city of country.cities) {
                        destinationsDiv.innerHTML += `<div><h2>${city.name}<button class="visitBtn">Visit</button></div></h2>`;
                        destinationsDiv.innerHTML += `<img class="destImage" src="./images/${city.imageUrl}" alt="${city.name}">`;
                        destinationsDiv.innerHTML += `<p>${city.description}</p>`;
                    }
                }
            } else {
                console.log("user searched for: ", searchInput);
                for (const dest of searchResults) {
                    destinationsDiv.innerHTML += `<div><h2>${dest.name}<button class="visitBtn">Visit</button></div></h2>`;
                    destinationsDiv.innerHTML += `<img class="destImage" src="./images/${dest.imageUrl}" alt="${dest.name}">`;
                    destinationsDiv.innerHTML += `<p>${dest.description}</p>`;
                }
            }

            //Object.keys(data).find(item => item.toLowerCase()

        })
        .catch(error => {
            console.log("Error fetching your data: ", error);
            destinationsDiv.innerHTML += `<img class="destImage" src='./images/error.jpg' alt="error">`;
        });
}

btnSearch.addEventListener('click', generateSearchTravelDestinations);

function clearSearchResults(){
    document.getElementById("searchInput").value = '';
    document.getElementById("destinationsDiv").innerHTML = '';
}

btnReset.addEventListener('click', clearSearchResults);