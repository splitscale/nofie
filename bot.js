require('dotenv').config(); // Add this line at the top of your bot.js file

const express = require('express');
const bodyParser = require('body-parser');
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');

const bot = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

const app = express();
const port = 3000; // Choose the port number you want to use

app.use(bodyParser.json());

app.post('/notifications', (req, res) => {
  const { title, content } = req.body;

  const channel = bot.channels.cache.get(process.env.DISCORD_CHANNEL_ID); // Use the environment variable for the channel ID

  const status = content.status.toUpperCase();

  // Create a MessageEmbed for the rich message
  const embed = new EmbedBuilder()
    .setTitle(title)
    .setDescription(content.info)
    .addFields({ name: 'Status', value: `**${status}**`, inline: true })
    .setTimestamp();

  // Customize the embed based on the status
  switch (content.status) {
    case 'passed':
      embed.setColor('#36a64f'); // Green
      break;
    case 'fail':
      embed.setColor('#ff0000'); // Red
      break;
    case 'done':
      embed.setColor('#f1c40f'); // Yellow
      break;
    case 'deployed':
      embed.setColor('#3498db'); // Blue
      break;
    default:
      embed.setColor('#000000'); // Black
      break;
  }

  // Send the embed as a message
  channel.send({ embeds: [embed] });

  res.status(200).send('Notification received and sent to Discord.');
});

app.post('/github', (req, res) => {
  const body = req.body;

  // Send the embed as a message
  console.log(body);

  res.status(200).send('All is good');
});

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}`);
});

bot.login(process.env.DISCORD_BOT_TOKEN); // Use the environment variable for the bot token

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
