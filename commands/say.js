const Discord = require("discord.js");

module.exports = {
    name: 'say',
	description: 'Make the bot say something!',
    aliases: ['speak'],
    usage: 'nm!say',
    cooldown: 5,
    async execute(message, args, client) {

    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{}); 
    message.channel.send(sayMessage);
    }
}

