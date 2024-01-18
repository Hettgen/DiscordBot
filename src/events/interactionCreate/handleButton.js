const {handleBookVote, handleModalSubmit} = require('../../handlers/bookVoteHandler');

module.exports = async (client, interaction) => {
  //if(!interaction.isButton()) return;

  if(interaction.customId === 'bookVote'){
    await handleBookVote(interaction);
  }
  if(interaction.isModalSubmit()){
    console.log(' handlebutton.js : modal submit');
    await handleModalSubmit(interaction);
  }

}