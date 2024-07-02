document.addEventListener('DOMContentLoaded', () => {
    const wordInput = document.getElementById('wordInput');
    
    wordInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            searchWord();
        }
    });
});

async function searchWord() {
    const word = document.getElementById('wordInput').value;
    const definitionElement = document.getElementById('definition');
    const apiKey = '33c29235-3200-4837-a340-5f608cd1fd14';
    const apiUrl = `https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.length === 0) {
            definitionElement.innerHTML = `<p>No definition found for "${word}".</p>`;
        } else {
            const definition = data[0].shortdef ? data[0].shortdef[0] : "No short definition available.";
            definitionElement.innerHTML = `<h2>${word}</h2><p>${definition}</p>`;
        }
    } catch (error) {
        definitionElement.innerHTML = `<p>There was an error retrieving the definition. Please try again later.</p>`;
    }
}
