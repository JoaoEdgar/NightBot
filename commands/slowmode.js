const Discord = require('discord.js')

module.exports = {
    name: 'slowmode',
	description: 'Changes the channel\'s slowmode or add one',
    aliases: ['slow', 'sm'],
    usage: 'nm!slowmode',
    cooldown: 5,
    async execute(message, args, client) {

    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You do not have perms for that!");

    const args1 = args.join(' ')
    const channel = message.channel
    channel.setRateLimitPerUser(args1)
    message.channel.send(`☑️ | The cooldown has been set to ${args1} seconds!`)
    }
}

