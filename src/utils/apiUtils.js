const axios = require('axios');

async function searchBooks(query) {
  try {
    const response = await axios.get(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);
    const books = response.data.docs;

    let groupedBooks = {};
    books.forEach(book => {
      const key = book.title + '|' + (book.author_name ? book.author_name.join(', ') : '');
      if(!groupedBooks[key]){
        groupedBooks[key] = book;
      }
    });

    return Object.values(groupedBooks);

  } catch (error) {
    console.error('Error fetching data from Open Library:', error); 
    throw new Error('Failed to fetch data from Open Library');
  }
}


module.exports = {
  searchBooks,
};