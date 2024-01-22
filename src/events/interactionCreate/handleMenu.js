const {handleBookSelection, handleBookProposal, handleBookDeletion} = require('../../utils/searchUtils');

module.exports = async (client, interaction) => {
  if (interaction.isStringSelectMenu()) {
    if (interaction.customId === 'bookSelectionMenu') {
      await handleBookSelection(interaction);
      console.log('selected menu');
    }
    if(interaction.customId === 'bookProposalMenu'){
      await handleBookProposal(interaction);
      console.log('Proposing Book');
    }
    if(interaction.customId === 'bookDeletionMenu'){
      await handleBookDeletion(interaction);
      console.log('Deleted Book')
    }
  }
  // Handle other select menu interactions...
};