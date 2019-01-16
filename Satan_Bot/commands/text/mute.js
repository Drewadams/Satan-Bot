const commando = require('discord.js-commando');

class muteCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'mute',
      group: 'text',
      memberName: 'mute',
      userPermissions: ['MANAGE_MESSAGES'],
      description: 'Gives a mute role for a user supplied amount of time. Time is in minutes.',
      examples: ['stn.mute @trippayye 1440']
    });
  }

  // stn.mute @ time
  async run(message, args) {
      // All the variables
      const muteRole = message.guild.roles.find(role => role.name === "Muted")

      if (!muteRole) { // Checks to see if the mute role exists
        message.say('You need to create the Muted role first!')
      }

      let commandText = message.content.split(" ");
      console.log(commandText)
      let time = Number(commandText[2]) * 1000 * 60;
      let announceTime = Number(commandText[2]);
      let name = message.mentions.members.first();
      console.log(name.roles);
      console.log(name + ' ' + time);

      // checking for proper entry of the command
      if (!name || !time) {
        message.say('You put in the command wrong you fucking idiot.');
        message.say('Real talk though. Proper use: "Command @ Time". Time is in minutes. A day is 1440 minutes. Fuck you.');
      } else if (name.roles.has(muteRole.id)) {
        message.say('They are already muted.')
      } else {
        name.addRole(muteRole);
        message.say(`${name} has been sent to hell for ${announceTime} minutes. Stop being a dick.`);

        // removes the role after the set amount of time
        setTimeout(function() {
          name.removeRole(muteRole);
          message.say(`${name} has been unmuted. Still a cunt though.`)
          console.log(`Muted role removed from ${name}.`)
        }, time);
      }
    }
  }

  module.exports = muteCommand;
