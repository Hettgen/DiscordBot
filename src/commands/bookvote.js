const axios = require('axios');
const { searchBooks } = require('../utils/apiUtils');
const { createBookSelectionMenu } = require('../utils/embedUtils');
const { createBookSearchModal } = require('../utils/searchUtils');
const { readUserSubmissions } = require('../utils/readWrite');
const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');
const { searchResultsCache } = require('../utils/sharedData'); 


// Define the 'execute' function
async function execute(interaction) {
  const userId = interaction.user.id;
  const submissions = readUserSubmissions();

  if(submissions[userId]){
    await interaction.reply({content: 'You have already submitted a book.', ephemeral: true});
  } else {
    const modal = createBookSearchModal();
    await interaction.showModal(modal);
  }
}

// Define the 'handleModalSubmit' function
async function handleModalSubmit(interaction) {
  const searchQuery = interaction.fields.getTextInputValue('bookSearchInput');

  try {
    const books = await searchBooks(searchQuery);
    searchResultsCache.set(interaction.user.id, books);

    const selectionMenu = createBookSelectionMenu(books);
    await interaction.reply({content: 'Select a Book', components: [selectionMenu], ephemeral: true});
  } catch (error) {
    console.error('Error in bookvote.js:', error);
    await interaction.reply({content: 'An error occurred during the book search.', ephemeral: true});
  }
}

// Export the module
module.exports = {
  name: 'bookvote',
  description: 'Start a book voting process.',
  execute,
  handleModalSubmit
};
