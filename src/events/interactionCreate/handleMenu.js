const {handleBookSelection} = require('../../utils/searchUtils');

module.exports = async (client, interaction) => {
  if (interaction.isStringSelectMenu()) {
    if (interaction.customId === 'bookSelectionMenu') {
      await handleBookSelection(interaction);
      console.log('selected menu');
    }
  }
  // Handle other select menu interactions...
};