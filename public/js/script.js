document.addEventListener('DOMContentLoaded', function() {
    // Check if the search button exists
    const searchButton = document.getElementById('search-button');
    if (searchButton) {
        // Add event listener to the search button
        searchButton.addEventListener('click', function(event) {
            event.preventDefault();
            const searchTerm = document.getElementById('search-input').value;
            searchBooks(searchTerm);
        });
    }
});


function searchBooks(searchTerm) {
    // Make a request to the server to search for books based on the searchTerm
    fetch(`/search?term=${encodeURIComponent(searchTerm)}`)
        .then(response => response.json())
        .then(data => {
            // Call function to display search results
            displaySearchResults(data);
        })
        .catch(error => {
            console.error('Error searching for books:', error);
        });
}

function displaySearchResults(books) {
    const resultsContainer = document.getElementById('search-results');

    // Clear previous search results
    resultsContainer.innerHTML = '';

    // Check if any books were found
    if (books.length === 0) {
        resultsContainer.innerHTML = '<p>No books found.</p>';
        return;
    }

    // Loop through each book and create HTML elements to display them
    books.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');

        const titleHeading = document.createElement('h3');
        titleHeading.textContent = book.title;

        const authorPara = document.createElement('p');
        authorPara.textContent = 'Author: ' + book.author;

        // Add book cover image if available
        if (book.coverImage) {
            const coverImg = document.createElement('img');
            coverImg.src = book.coverImage;
            coverImg.alt = 'Book Cover';
            bookDiv.appendChild(coverImg);
        }

        bookDiv.appendChild(titleHeading);
        bookDiv.appendChild(authorPara);
        resultsContainer.appendChild(bookDiv);
    });
}
