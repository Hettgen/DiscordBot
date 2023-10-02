require("dotenv").config();
//import { JSONEncodable } from 'discord.js';

const { Client, IntentsBitField, EmbedBuilder } = require("discord.js");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});



client.on("messageCreate", (message) => {
  if (message.content === "Summon Bot") {
    message.reply("I have been Sumooooned!");
  }
});

// Command Listener
client.on("interactionCreate", async (interaction) => {
  //if (interaction.isChatInputCommand()) return;

  if (interaction.commandName === "add") {
    const num1 = interaction.options.get("first-number").value;
    const num2 = interaction.options.get("second-number").value;

    interaction.reply(`The sum is ${num1 + num2}`);
  }

  if (interaction.commandName === "d20") {
    interaction.reply(`${Math.floor(Math.random() * 21)}`);
  }

  if (interaction.commandName === "embed") {
    const embed = new EmbedBuilder()
      .setTitle("Book Club")
      .setDescription("Monthly book club back at it again!")
      .setColor("Red")
      .addFields(
        {
          name: "Name",
          value: "Bookname",
          inline: true,
        },
        {
          name: "Book Description",
          value: "Book description",
          inline: true,
        }
      );

    interaction.reply({ embeds: [embed] });
  }

  if(interaction.commandName === 'register'){
    setRoles();
  }

  try {
    if (interaction.isButton()) {
      await interaction.deferReply({ ephemeral: true });
      const role = interaction.guild.roles.cache.get(interaction.customId);
      if (!role) {
        interaction.edit({
          content: "I couldnt find that role",
        });
        return;
      }
  
      const hasRole = interaction.member.roles.cache.has(role.id);
  
      if (hasRole){
        await interaction.member.roles.remove(role);
        await interaction.editReply(`The role ${role} has been removed.`);
        return;
      }
  
      await interaction.member.roles.add(role);
      await interaction.editReply(`The role ${role} has been added.`);
    }
  } catch (error) {
    console.log(error);
  }
});

client.login(process.env.TOKEN);
