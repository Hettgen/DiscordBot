require('dotenv').config();
const { Client, IntentsBitField, EmbedBuilder } = require('discord.js');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,

  ]
});

const roles = [
  {
    id : '1153201018323095662',
    label: 'Book Club',
  },
  {
    id : '774443411788136448',
    label : 'Bedwarsboy'
  },
  {
    id : '810697139021545493',
    label : 'Warzoneboy'
  },
  {
    id : '1173832784637349978',
    label : 'Proogressor'
  },

]


client.on('ready', (c) => {
  console.log(`${c.user.username} is online`);
});

client.login(Process.env.TOKEN);