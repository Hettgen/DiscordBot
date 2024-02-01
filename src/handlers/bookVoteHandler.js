const axios = require('axios');
const { searchBooks } = require('../utils/apiUtils');
const { createBookSelectionMenu } = require('../utils/embedUtils');
const { createBookSearchModal } = require('../utils/searchUtils');
const { hasActiveSubmission } = require('../utils/readWrite');
const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');
const { searchResultsCache } = require('../utils/sharedData'); 


// Define the 'execute' function
async function handleBookVote(interaction) {
  const userId = interaction.user.id;
  // const activeSubmission = hasActiveSubmission;


    const modal = createBookSearchModal();
    await interaction.showModal(modal);
  
}

// Define the 'handleModalSubmit' function
async function handleModalSubmit(interaction) {
  const inputQuery = interaction.fields.getTextInputValue('bookSearchInput');
  const searchQuery = truncateString(inputQuery, 25);
  await interaction.deferReply({ephemeral : true});

  try {
    const books = await searchBooks(searchQuery);
    searchResultsCache.set(interaction.user.id, books);

    const selectionMenu = await createBookSelectionMenu(books, interaction);
    await interaction.editReply({content: 'Select a Book', components: [selectionMenu], ephemeral: true});
  } catch (error) {
    console.error('Error in bookVoteHandler.js:', error);
    await interaction.editReply({content: 'An error occurred during the book search.', ephemeral: true});
  }
}

function truncateString(str, num) {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num-3) + '...';
}

// Export the module
module.exports = {
  handleBookVote,
  handleModalSubmit
};
