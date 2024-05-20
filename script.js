const searchInput = document.getElementById("search-bar");
const searchButton = document.getElementById("go_button");
const display = document.getElementById("display");

searchButton.addEventListener("click", function() {
    let userInput = searchInput.value;
    console.log("User input:", userInput);
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${userInput}`)
        .then(response => response.json())
        .then(data => {
            display.innerHTML = "";
            data.forEach(entry => {
                const word = entry.word;
                const meanings = entry.meanings;
                for (const meaning of meanings) {
                    const partOfSpeech = meaning.partOfSpeech;
                    display.innerHTML += `<h1>${partOfSpeech}</h1>`;
                    const definitions = meaning.definitions;
                    for (const definition of definitions) {
                        const definitionText = definition.definition;
                        display.innerHTML += `<p>${definitionText}</p>`;
                    }
                }
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            display.innerHTML = "Error fetching data. Please try again later.";
        });
});
