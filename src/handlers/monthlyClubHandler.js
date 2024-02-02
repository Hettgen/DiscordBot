const {checkActiveSession, endBookClubSession, setBookSelected, fillBookClubSession} = require('../utils/readWrite');
const {displayMonthlyBook} = require('../utils/embedUtils');
const {selectMonthlyBook} = require('../utils/searchUtils');
const cron = require('node-cron');


async function executeMonthly(client){
  // cron.schedule('0 0 1 * *', async () => {
    const checkActive = await checkActiveSession();
    if(checkActive){
      try {
        const book = await selectMonthlyBook();
        console.log()
          if(!book){
            console.log('error, books array null in startNewBookClubSession, searchUtils.js');
            await endBookClubSession();
            return;
          }
          const userId = book.userID;
          const bookName = book.bookName;
          const user = await client.users.fetch(userId);
          const username = user.username;
          await fillBookClubSession(book);
          console.log('done');
          await setBookSelected(book, true);
          await displayMonthlyBook(client, bookName, username);


          
      } catch (error) {
        console.log('error in executeMonthly in handlers: ', error);
      }
    }
  // });
}


module.exports = {
  executeMonthly,
}