const {handleBookVote, handleModalSubmit} = require('../../handlers/bookVoteHandler');

module.exports = async (client, interaction) => {
  //if(!interaction.isButton()) return;

  if(interaction.customId === 'bookVote'){
    console.log('book vote');
    await handleBookVote(interaction);
  }
  if(interaction.isModalSubmit()){
    console.log('modal submit');
    await handleModalSubmit(interaction);
  }
  
}