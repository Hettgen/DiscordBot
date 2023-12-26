const { bookClubInfo } = require('../utils/embedUtils');



module.exports = {
  name : 'bookclub',
  description : 'vote on books for bookclub',
  
  async execute(interaction) {
    const monthValue = 1;

    await bookClubInfo(interaction, monthValue);
  }
}