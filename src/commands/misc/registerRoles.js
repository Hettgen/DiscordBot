const { roleSelector } = require("../../utils/embedUtils");

module.exports = {
  name: "register",
  description: "Register server roles",
  deleted : false,

  callback: async (client, interaction) => {
    
    await roleSelector(interaction);

  },
};
