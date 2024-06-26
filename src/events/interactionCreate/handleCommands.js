const {devs, testServer} = require('../../../config.json'); 
const getLocalCommands = require('../../utils/getLocalCommands');

module.exports = async (client, interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const localCommands = getLocalCommands();

  try {
    const commandObject = localCommands.find(
      (cmd) => cmd.name === interaction.commandName
    );

    if (!commandObject) return; 

    if(commandObject.devOnly){ 
      if (!devs.includes(interaction.member.id)){
        interaction.reply({
        content : 'only devs can use this command',
        ephemeral : true,
        });
        return;
      }
    }
    if(commandObject.testOnly){ 
      if (!(interaction.guild.id === testServer)){
        interaction.reply({
        content : 'this command cannot be run outside the test server',
        ephemeral : true,
        });
        return;
      }
    }
    if (commandObject.permissionsRequired?.length){
      for(const permission of commandObject.permissionsRequired){
        if (!interaction.member.permissions.has(permission)){
          interaction.reply({
            content : 'You do not have permission to run this command',
            ephemeral : true,
          });
          return;
        }
      }
    }
    if(commandObject.botPermissions?.length){
      for (const permission of commandObject.botPermissions){
        const bot = interaction.guild.members.me;

        if(!bot.permission.has(permission)){
          interaction.reply({
            content : 'I do not have permission to run this command',
            ephemeral : true,
          });
          break;
        }
      }
    }

    await commandObject.callback(client, interaction)
    

  } catch (error) {
    console.log("There was an error: " + error);
  }

};