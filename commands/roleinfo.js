const Discord = require('discord.js');

module.exports = {
    name: 'roleinfo',
    description: 'Check the role\'s info!',
    aliases: ['rinfo', 'ri'],
    usage: 'nm!roleinfo',
    cooldown: 5,
    async execute(message, args, client) {

        

        const role = message.mentions.roles.first()  || message.guild.roles.cache.get(args[0])

        if(!role) return message.channel.send("Hey, i need a role to provide info about!")
        try {

        const Embed = new Discord.MessageEmbed()
        .setTitle(`Role info`)
        .setDescription("All the information you need to know!")
        .addField("Role name", role.name, true)
        .addField("Role created at", role.createdAt, true)
        .addField("HEX Color", role.hexColor, true)
        .addField("Role ID", role.id, true)
        .addField("Role position", role.position, true)

    message.channel.send(Embed)

        } catch (e) {
            console.log(e)
        }
    }
}