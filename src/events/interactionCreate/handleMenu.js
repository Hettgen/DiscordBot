const {handleBookSelection, handleBookProposal} = require('../../utils/searchUtils');

module.exports = async (client, interaction) => {
  if (interaction.isStringSelectMenu()) {
    if (interaction.customId === 'bookSelectionMenu') {
      await handleBookSelection(interaction);
      console.log('selected menu');
    }
    if(interaction.customId === 'bookProposalMenu'){
      await handleBookProposal(interaction);
      console.log('Book proposal');
    }
  }
  // Handle other select menu interactions...
};