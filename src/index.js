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

    if (interaction.commandName === 'add'){
        const num1 = interaction.options.get('first-number').value;
        const num2 = interaction.options.get('second-number').value;

        interaction.reply(`The sum is ${num1 + num2}`);

    }
    
    if (interaction.commandName === 'd20'){
        interaction.reply(`${Math.floor(Math.random() * 21)}`);
    }
});


client.login(process.env.TOKEN);