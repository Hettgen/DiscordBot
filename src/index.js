require('dotenv').config();
//import { JSONEncodable } from 'discord.js';


const {Client, IntentsBitField} = require('discord.js');


const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,

    ]
});



client.on('ready', (c) => {
    console.log(`${c.user.username} is online`);
});

client.on('messageCreate', (message) => {
    if (message.content === 'Summon Bot' ){
        message.reply('I have been Sumooooned!');
    }
});

client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'hey'){
        interaction.reply('hey!');
    }
    if (interaction.commandName === 'ping'){
        interaction.reply('pong');
    }
});


client.login(process.env.TOKEN);