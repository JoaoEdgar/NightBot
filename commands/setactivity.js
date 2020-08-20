const Discord = require('discord.js')

module.exports = {
    name: 'setactivity',
	description: 'Changes the bot\'s activity',
    aliases: ['sba', 'sa'],
    usage: 'nm!setactivity',
    cooldown: 5,
	async execute(message, args, client) {

    const msg = args.join(" ")

    if(!message.member.hasPermission("ADMINISTRATOR")) return;  
    
    const m = await message.channel.send(`☑️ | My activity was changed to **${msg}** by **${message.author.tag}**!`) 
        client.user.setActivity(`${msg}`);
    }
}
