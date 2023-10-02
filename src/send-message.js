require('dotenv').config();
//import { JSONEncodable } from 'discord.js';

const {
  Client,
  IntentsBitField,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require('discord.js');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

async function setRoles(){
    try {
        const channel = await client.channels.cache.get('1150933925514981439');
        if (!channel) return;
    
        const row = new ActionRowBuilder();
    
        roles.forEach((role) => {
          row.components.push(
            new ButtonBuilder()
              .setCustomId(role.id)
              .setLabel(role.label)
              .setStyle(ButtonStyle.Primary)
          );
        });
    
        await channel.send({
          content: 'add or remove role',
          components: [row],
        });
        process.exit();
      } catch (error) {
        console.log(error);
      }
}
/*
client.on("ready", async (c) => {

    // Intro Message
    console.log(`${c.user.username} is online`);

  try {
    const channel = await client.channels.cache.get('1150933925514981439');
    if (!channel) return;

    const row = new ActionRowBuilder();

    roles.forEach((role) => {
      row.components.push(
        new ButtonBuilder()
          .setCustomId(role.id)
          .setLabel(role.label)
          .setStyle(ButtonStyle.Primary)
      );
    });

    await channel.send({
      content: 'add or remove role',
      components: [row],
    });
    process.exit();
  } catch (error) {
    console.log(error);
  }
});
*/

const roles = [
  {
    id: '1153201018323095662',
    label: 'Book Club',
  },
];

client.login(process.env.TOKEN);
