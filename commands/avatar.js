const Discord = require('discord.js');

module.exports = {
    name: 'avatar',
	description: 'Get the avatar URL of the tagged user(s), or your own avatar.',
    aliases: ['avatar', 'icon', 'pfp'],
    usage: 'nm!avatar',
    cooldown: 5,
	execute(message, args, client) {
    let pessoa = message.mentions.users.first() || message.guild.members.cache.get(args[0])
    const autor = message.author.tag
    const autA = message.author.avatarURL({ dynamic: true, format: 'png', size: 2048 });
    
    if(pessoa) {
        const pessA = pessoa.user
        const embed1 = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(`Avatar from ${pessoa.tag}.`)
        .setImage(`${pessoa.avatarURL({ dynamic: true, format: 'png', size: 2048 })}`)
        .setTimestamp()
        .setFooter("NIGHTMICE BOT")
        .setDescription(`[Download the photo here!](${pessoa.avatarURL({ dynamic: true, format: 'png', size: 2048 })})`)
        message.channel.send(embed1)
}
    if(!pessoa) {
        const embed2 = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(`Your avatar ${autor}.`)
        .setImage(`${autA}`)
        .setTimestamp()
        .setDescription(`[Download the photo here!](${autA})`)
        message.channel.send(embed2)
    }
}
}
