// Wait until the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Get the input field for the word
    const wordInput = document.getElementById('wordInput');

    // Add an event listener to the input field to detect 'Enter' key press
    wordInput.addEventListener('keydown', (event) => {
        // Check if the pressed key is 'Enter'
        if (event.key === 'Enter') {
            // Call the searchWord function to fetch the definition
            searchWord();
        }
    });
});

// Asynchronous function to search for the word's definition
async function searchWord() {
    // Get the word entered by the user
    const word = document.getElementById('wordInput').value;
    // Get the element where the definition will be displayed
    const definitionElement = document.getElementById('definition');
    // API key for Merriam-Webster Dictionary API
    const apiKey = '33c29235-3200-4837-a340-5f608cd1fd14';
    // Construct the API URL with the entered word
    const apiUrl = `https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apiKey}`;

    try {
        // Fetch the data from the API
        const response = await fetch(apiUrl);
        // Parse the JSON response
        const data = await response.json();

        // Check if the response contains data
        if (data.length === 0) {
            // Display a message if no definition is found
            definitionElement.innerHTML = `<p>No definition found for "${word}".</p>`;
        } else {
            // Get the first short definition from the response data
            const definition = data[0].shortdef ? data[0].shortdef[0] : "No short definition available.";
            // Display the word and its definition
            definitionElement.innerHTML = `<h2>${word}</h2><p>${definition}</p>`;
        }
    } catch (error) {
        // Display an error message if there's an issue with the API request
        definitionElement.innerHTML = `<p>There was an error retrieving the definition. Please try again later.</p>`;
    }
}
