const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder } = require('discord.js');

async function bookClubInfo(interaction, monthValue){
  try {
    const embed = new EmbedBuilder()
    .setTitle("Book Club")
    .setDescription("Treehouse Book Club!")
    .addFields({name: 'Months Running', value: monthValue.toString() });

    const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
      .setCustomId('bookVote')
      .setLabel('Vote for your book!')
      .setStyle(ButtonStyle.Primary)
    );

    interaction.reply({ embeds: [embed], components : [row] });
  
  } catch (error) {
    console.log(error);  
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
    value: `book-${index}-${truncateString(book.title,100)}` // Or any unique identifier for the book
  }));

  const selectMenu = new StringSelectMenuBuilder()
    .setCustomId('selectBook')
    .setPlaceholder('Select a book')
    .addOptions(options.slice(0, 25)); // Limit to 25 options

  const row = new ActionRowBuilder().addComponents(selectMenu);

  return row;
}

function truncateString(str, num) {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + '...';
}

// Modal Search 



module.exports = {
  bookClubInfo,
  createBookSelectionMenu,
};