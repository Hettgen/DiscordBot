const {checkActiveSession, endBookClubSession} = require('../../utils/readWrite');
const cron = require('node-cron');


async function executeMonthly(client){
  cron.schedule('0 0 1 * *', async () => {
    const checkActive = await checkActiveSession();
    if(checkActive ){
      try {
        const book = await selectMonthlyBook();
          if(!book){
            console.log('error, books array null in startNewBookClubSession, searchUtils.js');
            await endBookClubSession();
            return;
          }
          const userId = book.userID;
          const bookName = book.bookName;
          const user = await client.users.fetch(userId);
          const username = user.username;
          // await fillBookClubSession(book);
          await setBookSelected(book, false);
          await displayMonthlyBook(client, bookName, username);


          
      } catch (error) {
        
      }
    }
  });
}

module.exports = {
  executeMonthly,
}