const { bookClubInfo } = require("../../utils/embedUtils");



module.exports = {
  name : 'bookclub',
  description : 'vote on books for bookclub',
  // devOnly: boolean,
  // testOnly: boolean,
  // options: Object[],

  callback: async(interaction) => {
    const monthValue = 1;

    await bookClubInfo(interaction, monthValue);
  }
};