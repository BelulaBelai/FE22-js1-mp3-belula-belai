
let btn = document.querySelector("#searchBtn");
let populationIndex = 0;

btn.addEventListener("click", (event) => {
    event.preventDefault();
    let languageInput = document.getElementById("languages");
    let languages = languageInput.value.toLowerCase();
    languageInput.value = "";
    let countryWrapper = document.getElementById("countryWrapper");
    countryWrapper.innerText = "";
    let url = `https://restcountries.com/v3.1/lang/${languages}`;

    fetch(url).then((response) => {
        if (response.status >= 200 && response.status < 300) {
            return response.json();
        }
        else {
            throw "Error: data could not be found";
        }
    }
    ).then((countryData) => {


        countryData.forEach((country, index) => {
            if (countryData[populationIndex].population < country.population) {
                populationIndex = index;
            }
        })


        countryData.forEach((country) => {
            let countryFlags = document.createElement("img");
            countryFlags.src = country.flags.png;
            let countryInfo = document.createElement("h2");
            countryInfo.innerText =
                `Official name: ${country.name.official}
            Capital: ${country.capital}
            Population: ${country.population}
            Subregion: ${country.subregion}`;
            countryWrapper.append(countryFlags, countryInfo);

            if (country === countryData[populationIndex]) {
                countryInfo.setAttribute("id", "largestPopulation");
            }
        })
        populationIndex = 0;
    }
    ).catch((error) => {
        let errorText = document.createElement("h2");
        errorText.innerText = "Language could not be found";
        errorText.style.color = "red";
        countryWrapper.append(errorText);

    })
})