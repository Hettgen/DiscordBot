const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');
const { searchResultsCache } = require('./sharedData'); 
const { writeUserSubmission} = require('./readWrite');


function createBookSearchModal(){
  const modal = new ModalBuilder()
  .setCustomId('bookSearchModal')
  .setTitle('Book Search');

  const bookSearchInput = new TextInputBuilder()
  .setCustomId('bookSearchInput')
  .setLabel("Enter book title or author")
  .setStyle(TextInputStyle.Short);

  const firstActionRow = new ActionRowBuilder()
  .addComponents(bookSearchInput);

  modal.addComponents(firstActionRow);

  return modal;
}

async function handleBookSelection(interaction) {
  const selectedValue = interaction.values[0];
  const selectBookIndex = selectedValue.split('-')[1];
  const userId = interaction.user.id;

  const books = searchResultsCache.get(userId);
  if(!books || !books[selectBookIndex]){
    await interaction.reply({ content: "Error retrieving book info", ephemeral : true});
    return;
  }

  const selectedBook = books[selectBookIndex];
  writeUserSubmission(userId, selectedBook.title);
  searchResultsCache.delete(userId);

  await interaction.reply({ content: `You have selected the book: ${selectedBook.title}`, ephemeral: true });
}

module.exports = {
  createBookSearchModal,
  handleBookSelection,
}