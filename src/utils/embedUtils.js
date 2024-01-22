const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, AttachmentBuilder } = require('discord.js');
const { readUserSubmissions } = require('./readWrite');

async function bookClubInfo(interaction, monthValue){
  try {
    const embed = new EmbedBuilder()
    .setTitle("Treehouse Book Club")
    .setDescription("This is the treehouse book club. Feel free to join by running /register and signing up for the book club role.")
    .setImage('attachment://bookclub.png')
    .addFields({name: 'Months Running', value: monthValue.toString() });

    const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
      .setCustomId('bookVote')
      .setLabel('Add a book')
      .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
      .setCustomId('bookDelete')
      .setLabel('Delete a book')
      .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
      .setCustomId('bookSearch')
      .setLabel('Browse books')
      .setStyle(ButtonStyle.Primary)
    );
    // Image attachment
    const file = new AttachmentBuilder('src/Icons/bookclub.png', { name: 'bookclub.png' });
    
    interaction.reply({ embeds: [embed], components : [row], files : [file]});
  
  } catch (error) {
    console.log(error);  
  }
}

async function roleSelector(interaction){
  try {
    const embed = new EmbedBuilder()
    .setTitle('Role Selector')
    .setDescription('Select your roles here!')
    .addFields();
  
    const rowOne = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
      .setCustomId('bookClub')
      .setLabel('Sign up for book club!')
      .setStyle(ButtonStyle.Primary),
  
      new ButtonBuilder()
      .setCustomId('bedwars')
      .setLabel('Sign up for Bedwars!')
      .setStyle(ButtonStyle.Primary),
    );
  
    interaction.reply({ embeds: [embed], components : [rowOne]})
  
  } catch (error) {
    console.log('error in roleSelector.js', error);
  }
}


// Old displaybooks
// async function displayBooks(books){
//   return books.map(book => {
//     const embed = new EmbedBuilder()
//     .setTitle(book.title)
//     .setURL(`https://openlibrary.org${book.key}`)
//     .setDescription(`Author: ${book.author_name ? book.author_name.join(', ') : 'Unknown'}`)
//     .addFields(
//       { 
//         name: 'First Publish Year',
//         value: book.first_publish_year ? book.first_publish_year.toString() : 'Unknown',
//         inline: true
//       }
//     )
//     .setColor(0x1D82B6);

//     if(book.cover_i){
//       embed.setThumbnail(`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`);
//     }

//     return embed;
//   });
// }

function createBookSelectionMenu(books) {


  const options = books.map((book, index )=> ({
    label: truncateString(book.title, 100), // Truncate to fit the limit
    description: truncateString(book.author_name ? book.author_name.join(', ') : 'Unknown', 50),
    value: truncateString(`book-${index}-${book.title,75}`, 100) // Or any unique identifier for the book
  }));

  // options.forEach(option =>{
  //   option.value = truncateString(option.value,75);
  // });
  

  const selectMenu = new StringSelectMenuBuilder()
    .setCustomId('selectBook')
    .setPlaceholder('Select a book')
    .setCustomId('bookSelectionMenu')
    .addOptions(options.slice(0, 25)); // Limit to 25 options

  const row = new ActionRowBuilder().addComponents(selectMenu);

  return row;
}

function truncateString(str, num) {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num-3) + '...';
}

async function displayBookCollection(interaction, type){
  const userId = interaction.user.id;

  const books = await readUserSubmissions(userId);

  if(!books || books.length === 0 || !Array.isArray(books)){
    interaction.reply({content : 'No books found.',
    ephemeral : true});
    return;
  }

  //console.log(books);

  // const options = books.map((books, index) => ({
  // label : book,
  // value : `book${index}`,
  // }));

  const options = books.map((book, index) => {
    return {
      label: book,
      value: `book-${index}`
    };
  });
  
  //console.log(options);

  const selectMenu = new StringSelectMenuBuilder()
  .setPlaceholder('Select a book')
  .addOptions(options.slice(0,25));

  if(type === 'propose'){
    selectMenu.setCustomId('bookProposalMenu');
  }
  if(type === 'delete'){
    selectMenu.setCustomId('bookDeletionMenu');
  }

  const row = new ActionRowBuilder().addComponents(selectMenu);

  if(type === 'propose'){
    await interaction.reply({ content : 'Choose a book you want to suggest next', components : [row]});
  }
  if(type === 'delete'){
    await interaction.reply({ content : 'Choose the book you want to remove', components : [row]});
  }

  // await interaction.reply({ content : 'Choose a book you want to suggest next', components : [row]});
}


// const options = books.map((books, index) => ({
//   label : (book.title)
// }));


module.exports = {
  bookClubInfo,
  createBookSelectionMenu,
  roleSelector,
  displayBookCollection
};