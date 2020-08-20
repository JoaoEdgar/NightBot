const Discord = require("discord.js")

module.exports = {
    name: 'invite',
	description: 'Get a invite of the server',
    aliases: ['inv'],
    usage: 'nm!invite',
    cooldown: 5,
	execute(message, args, client) {

        const Embed = new Discord.MessageEmbed()
        .setTitle("Hey! 👋")
        .setDescription("Here is a invite for the NightMice server!")
        .addField("Are you going to invite someone? ❤️", `[Click here to open the invite](https://discord.gg/tk5ZVaE)`)
        
        message.channel.send(Embed)

    }
}