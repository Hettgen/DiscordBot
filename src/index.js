require('dotenv').config();
const { Client, IntentsBitField, EmbedBuilder, ActionRowBuilder, Collection } = require('discord.js');
const fs = require('fs');
const { searchBooks } = require('./utils/apiUtils');
const bookvote = require('./handlers/bookVoteHandler');
const { handleBookSelection } = require('./utils/searchUtils');
const cron = require('node-cron');
const eventHandler = require('./handlers/eventHandler');

const mongoose = require('mongoose');



const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,

  ]
});



// client.commands = new Collection();

// const commandFiles = fs.readdirSync('src/commands').filter(file => file.endsWith('.js'));

// for (const file of commandFiles) {
//   const command = require(`./commands/${file}`);
//   client.commands.set(command.name, command);
// }

// cron.schedule('0 0 1 * *', () => {
//   selectAndAnnounceBook();
// });
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

client.on('messageCreate', (message) => {
  if (message.content === 'Summon Bot') {
    message.reply('I have been Sumooooned!');
  }
});

    eventHandler(client);


(async () => {
  
  try {
    await mongoose.connect(process.env.MONGODB_URI, );
    console.log('connected to database');

    
  } catch (error) {
    console.log(error);
  }
})();


client.login(process.env.TOKEN);
