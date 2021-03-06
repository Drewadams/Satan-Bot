const commando = require('discord.js-commando');
const path = require('path');
const aws = require('aws-sdk');
const config = require('./config.json');

const client = new commando.Client({
    owner: config.owner,
    commandPrefix: 'stn.',
    unknownCommandResponse: false,
    disableEveryone: true
});

client.registry
  .registerGroups([
    ['text', 'Text Commands'],
    ['twitch', 'Twitch Commands']
])
  .registerDefaults()
  .registerCommandsIn(path.join(__dirname, "commands"));

// Ready to launch
client.on('ready', () => {
  console.log('Logged in as Satan Bot.')
});

client.on('message', message => {
  let msgCollect = message.content;
  let msg = msgCollect.toLowerCase();
  if (msg.includes('nigger') || msg.includes('n word') || msg.includes('n1gger') || msg.includes('n i g g e r')) {
    message.delete();
    console.log(`just deleted this message: ${msgCollect}`);
    message.channel.send('Fuck off you racist cunt.');
  }
});

// Bot login
client.login(config.token);
