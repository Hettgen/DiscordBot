const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');
const { searchResultsCache } = require('./sharedData'); 
const { writeUserSubmission, hasActiveSubmission, changeBookStatus, readUserSubmissions, deleteBook, getActiveBooks, checkAlreadySubmitted} = require('./readWrite');


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
  //console.log('searchUtils.js : handling book selection');
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

    const selectedValue = interaction.values[0];
    const selectedIndex = selectedValue.split('-')[1];
    const userBooks = await readUserSubmissions(userId);
    const selectedBookTitle = userBooks[selectedIndex];

    const hasSubmission = await hasActiveSubmission(userId);
    console.log('Selected Value: ',selectedBookTitle);
    
    await interaction.deferReply();
    const alreadySubmitted = await checkAlreadySubmitted(userId, selectedBookTitle);

    if(alreadySubmitted){
      await interaction.editReply('This book was already submitted, re-submissions are not allowed');
      return;
    }


    if(hasSubmission[0] === selectedBookTitle){
      await interaction.editReply({content : 'You have already selected this book', ephemeral : true});
      return;
    }

    if(hasSubmission.length > 0 && hasSubmission[0] != selectedBookTitle){
      await changeBookStatus(hasSubmission, userId, false);
      await interaction.editReply({content : 'Selected book replaced', ephemeral : true});
      //console.log(hasSubmission);
    }
    else{
      await changeBookStatus(selectedBookTitle, userId, true);
      await interaction.editReply({content : 'Book selected', ephemeral : true});
    }



    // console.log('nothing found for you');
  } catch (error) {
    console.log('error in handleBookProposal: searchUtils.js: ', error);
  }
}

async function handleBookDeletion(interaction){
  try {
    const userId = interaction.user.id;

    const selectedValue = interaction.values[0];
    const selectedIndex = selectedValue.split('-')[1];
    const userBooks = await readUserSubmissions(userId);
    const bookTitle = userBooks[selectedIndex];


    console.log('Selected Value: ',bookTitle);
    
    await interaction.deferReply();

    if(bookTitle === null){
      await interaction.editReply({content : 'Didnt find shit, your shit borken',
      ephemeral : true});
      return;
    }

    await deleteBook(userId, bookTitle);
    await interaction.editReply({content: 'Book sucessfully deleted',
    ephemeral : true});

    // console.log('nothing found for you');
  } catch (error) {
    console.log('error in handleBookDeletion : searchUtils.js: ', error);
  }
}

async function selectMonthlyBook(){
  
  const books = await getActiveBooks();
  
  const randomIndex = Math.floor(Math.random() * books.length);

  console.log(books[randomIndex]);

}


module.exports = {
  createBookSearchModal,
  handleBookSelection,
  handleBookProposal,
  handleBookDeletion,
  selectMonthlyBook
}