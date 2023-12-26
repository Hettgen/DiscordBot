require('dotenv').config();
const { Client, IntentsBitField, EmbedBuilder, ActionRowBuilder, Collection } = require('discord.js');
const fs = require('fs');
const { searchBooks } = require('./utils/apiUtils');
const bookvote = require('./commands/bookvote');
const { handleBookSelection } = require('./utils/searchUtils');



const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,

  ]
});

client.commands = new Collection();

const commandFiles = fs.readdirSync('src/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}


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

client.on('messageCreate', (message) => {
  if (message.content === 'Summon Bot') {
    message.reply('I have been Sumooooned!');
  }
});

client.on('interactionCreate', async (interaction) => {
  
  if (interaction.isChatInputCommand()){
    const command = client.commands.get(interaction.commandName);
    console.log(command);

    if(!command) return;
    try {
      await command.execute(interaction);
    } catch (error) {
      console.log(error);
      await interaction.reply({content: 'Error executing comamnd. Please message creeper', ephemeral:true});
    }
  }

  if (interaction.isStringSelectMenu()) {
    if(interaction.customId === 'selectBook'){
      await handleBookSelection(interaction);
    }
  }

  if (interaction.isButton()){
    
    
    if (interaction.customId === 'bookVote'){
      const bookVoteCommand = client.commands.get('bookvote');
        if(bookVoteCommand){
          await bookVoteCommand.execute(interaction);
        }
    }
  }
  
  if (interaction.isModalSubmit()){
    if(interaction.customId === 'bookSearchModal'){
      const bookVoteCommand = client.commands.get('bookvote');

      if(bookVoteCommand && bookVoteCommand.handleModalSubmit){
        try {
          await bookVoteCommand.handleModalSubmit(interaction);
        } catch (error) {
          console.log(error);
          await interaction.reply({content: 'Modal submit brokie. idk why :(', ephemeral:true});
        }
      }

    }
  }
  

});


client.login(process.env.TOKEN);