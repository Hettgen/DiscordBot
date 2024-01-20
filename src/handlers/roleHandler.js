

async function assignRoles(interaction, roleId){
  try {
    const role = interaction.guild.roles.cache.get(roleId);

    if(!role){
      console.log('role was not found');
      interaction.reply({content: `The role ${role} was not found, please contant creeper`,
      ephemeral : true});
    }

    const hasRole = interaction.member.roles.cache.has(roleId);

    console.log (hasRole);
    if(hasRole){
      await interaction.member.roles.remove(role);
      interaction.reply({content: `The role ${role} has been removed`,
      ephemeral : true});
      return;
    }
    else{
      await interaction.member.roles.add(role);
      interaction.reply({content: `The role ${role} has been added`,
      ephemeral : true});
      return;
    }

  } catch (error) {
    console.log('error in roleHandler.js: ', error);
  }
}


module.exports = {
  assignRoles
}