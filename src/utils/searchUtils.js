const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');
const { searchResultsCache } = require('./sharedData'); 
const { writeUserSubmission, hasActiveSubmission, changeBookStatus} = require('./readWrite');


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
  console.log('searchUtils.js : handling book selection');
  const selectedValue = interaction.values[0];
  const selectBookIndex = selectedValue.split('-')[1];
  const userId = interaction.user.id;
  const username = interaction.user.username;

  const books = searchResultsCache.get(userId);
  if(!books || !books[selectBookIndex]){
    await interaction.reply({ content: "Error retrieving book info", ephemeral : true});
    return;
  }

  const selectedBook = books[selectBookIndex];

  try {
    writeUserSubmission(userId, username, selectedBook.title);
    searchResultsCache.delete(userId);

    await interaction.deferUpdate();

    await interaction.editReply({ 
    content: `You have selected the book: ${selectedBook.title}`,
    components: [],
  });

  } catch (error) {
    console.log('error in handleBookSelection function (searchUtils.js): ', error);
    await interaction.reply({ content: "There was an error processing your selection.", ephemeral: true });
  }
    
  // await originalMessage.edit({
  // content: `You have selected the book: ${selectedBook.title}`,
  // components: [] });

  
}

async function handleBookProposal(interaction){
  try {
    const userId = interaction.user.id;

    const hasSubmission = await hasActiveSubmission(userId);
    console.log('its being printed here' ,hasSubmission);

    if(hasActiveSubmission != null){
      await changeBookStatus(hasSubmission, userId, false);
      console.log(hasSubmission);
    }


    // console.log('nothing found for you');
  } catch (error) {
    console.log('error in handleBookProposal: searchUtils.js: ', error);
  }
}

module.exports = {
  createBookSearchModal,
  handleBookSelection,
  handleBookProposal,
}