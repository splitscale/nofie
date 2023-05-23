require('dotenv').config(); // Add this line at the top of your bot.js file

const express = require('express');
const bodyParser = require('body-parser');
const Discord = require('discord.js');

const bot = new Discord.Client();
const app = express();
const port = 3000; // Choose the port number you want to use

app.use(bodyParser.json());

app.post('/notifications', (req, res) => {
  const notification = req.body;

  const channel = bot.channels.cache.get(process.env.YOUR_CHANNEL_ID); // Use the environment variable for the channel ID

  // Format the notification payload
  const notificationMessage = JSON.stringify(notification, null, 2);

  // Send the notification as a message
  channel.send(notificationMessage);

  res.status(200).send('Notification received and sent to Discord.');
});

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}`);
});

bot.login(process.env.BOT_TOKEN); // Use the environment variable for the bot token

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
