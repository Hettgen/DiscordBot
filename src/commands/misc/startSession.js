const { displayMonthlyBook } = require("../../utils/embedUtils");
const {createBookClubSession, getActiveBooks, checkActiveSession, setBookSelected} = require('../../utils/readWrite');
const {selectMonthlyBook} = require('../../utils/searchUtils');





module.exports = {
    name : 'start',
    description : 'Start bookclub session',
    deleted : false,
    devOnly : true,

  callback: async(client, interaction) =>{

      // const session = await createBookClubSession();
    try {
      const alreadyActive = await checkActiveSession();
      if(!alreadyActive){
        await createBookClubSession();
        }
        interaction.reply({content : 'Book club session has been started'});
    } catch (error) {
      console.log('error in startSession command: ', error);
    }
  }
};