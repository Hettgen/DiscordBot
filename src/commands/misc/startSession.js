const { executeMonthly } = require("../../handlers/monthlyClubHandler");
const { displayMonthlyBook } = require("../../utils/embedUtils");
const {createBookClubSession, getActiveBooks, checkActiveSession, setBookSelected} = require('../../utils/readWrite');
const {selectMonthlyBook} = require('../../utils/searchUtils');





module.exports = {
    name : 'start',
    description : 'Start bookclub session',
    deleted : false,
    devOnly : true,

  callback: async(client, interaction) =>{
    await interaction.deferReply({ephemeral : true});
      // const session = await createBookClubSession();
    try {
      const alreadyActive = await checkActiveSession();
      if(!alreadyActive){
        await createBookClubSession();
          await interaction.editReply({content : 'Book club session has been started'});
          return;
        }

        await executeMonthly(client);
        await interaction.editReply({content : 'Book club continued for the month',
        ephemeral : true});

        
    } catch (error) {
      console.log('error in startSession command: ', error);
    }
  }
};