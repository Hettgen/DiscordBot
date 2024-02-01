const axios = require('axios');

async function searchBooks(query) {
  try {
    const response = await axios.get(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);
    return response.data.docs; // This will return an array of books
  } catch (error) {
    console.error('Error fetching data from Open Library:', error);
    throw new Error('Failed to fetch data from Open Library');
  }
}

async function getImage(bookName){
  
}

module.exports = {
  searchBooks,
  getImage
};