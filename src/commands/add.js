module.exports = {
  name: 'add',
  description: 'Adds two numbers.',
  execute(interaction) {
      const num1 = interaction.options.get('first-number').value;
      const num2 = interaction.options.get('second-number').value;
      interaction.reply(`The sum is ${num1 + num2}`);
  },
};