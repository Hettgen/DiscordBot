const {handleBookVote, handleModalSubmit} = require('../../handlers/bookVoteHandler');
const {assignRoles} = require('../../handlers/roleHandler');
const {displayBookCollection} = require('../../utils/embedUtils');

const roles = [
  { 
    id: "1153201018323095662",
    label: "Book Club",
  },
  {
    id: "774443411788136448",
    label: "Bedwarsboy",
  },
  {
    id: "810697139021545493",
    label: "Warzoneboy",
  },
  {
    id: "1173832784637349978",
    label: "Proogressor",
  },
];

var bookClubRole = {id : "1153201018323095662", label: "Book Club",}



module.exports = async (client, interaction) => {
  //if(!interaction.isButton()) return;

  if(interaction.isButton()){
    if(interaction.customId === 'bookVote'){
        await handleBookVote(interaction);
    }
    if(interaction.customId === 'bookClub'){
      await assignRoles(interaction ,"1153201018323095662");
    }
    if(interaction.customId === 'bookSearch'){
      await displayBookCollection(interaction, 'propose');
    }
    if(interaction.customId === 'bookDelete'){
      await displayBookCollection(interaction, 'delete')
    }




  }
  
  if(interaction.isModalSubmit()){
    console.log(' handlebutton.js : modal submit');
    await handleModalSubmit(interaction);
  }

}