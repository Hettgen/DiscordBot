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
      .setLabel('Select Book')
      .setStyle(ButtonStyle.Primary)
    );
    // Image attachment
    const file = new AttachmentBuilder('src/Icons/bookclub.png', { name: 'bookclub.png' });
    
    await interaction.reply({ embeds: [embed], components : [row], files : [file]});
  
  } catch (error) {
    console.log(error);  
  }
}

async function displayMonthlyBook(client, bookName, username){
  try {
    const description = bookName + " As suggested by " + username;
    const embed = new EmbedBuilder()
    .setTitle('Book of the Month')
    .setDescription(description);

    const file = new AttachmentBuilder('src/Icons/bookclub.png', { name: 'bookclub.png' });
    channel = await client.channels.fetch('1197925438928986112');
    if(!channel){
      console.log('no channel found');
      return;
    }
    
    await channel.send({ embeds : [embed]});
    const thread = await channel.threads.create({
          name : bookName,
        });
  } catch (error) {
    console.log('error in displayMonthlyBook, embedUtils.js: ', error);
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



async function createBookSelectionMenu(books, interaction) {


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
    await interaction.reply({ content : 'Choose a book you want to suggest next', components : [row], ephemeral : true});
  }
  if(type === 'delete'){
    await interaction.reply({ content : 'Choose the book you want to remove', components : [row], ephemeral : true});
  }

  // await interaction.reply({ content : 'Choose a book you want to suggest next', components : [row]});
}





module.exports = {
  bookClubInfo,
  createBookSelectionMenu,
  roleSelector,
  displayBookCollection,
  displayMonthlyBook
};