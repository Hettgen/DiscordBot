const { ApplicationCommandOptionType, PermissionFlagsBits} = require('discord.js'); 

module.exports = {
  name : 'ban',
  description : 'ban a user',
  // devOnly: boolean,
  // testOnly: boolean,
  options : [
    {
      name : 'target_user',
      description : 'the user to ban',
      required : true,
      type : ApplicationCommandOptionType.Mentionable,
    },
    {
      name : 'reason',
      description : 'the reason for the ban',
      type : ApplicationCommandOptionType.String,
    }
  ],
  permissionsRequired : [PermissionFlagsBits.Administrator],

  callback: (client, interaction) => {
    interaction.reply('ban..');
  }
};