const Discord = require('discord.js')

module.exports = {
  name: 'uptime',
  description: 'Check the bot\'s uptime',
  aliases: ['uptime'],
  usage: 'nm!uptime',
  cooldown: 5,
execute(message, client, args) {

    
    function duration(ms) {
    const sec = Math.floor((ms / 1000) % 60).toString()
    const min = Math.floor((ms / (1000 * 60)) % 60).toString()
    const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString()
    const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString()
    return `${days.padStart(2, '0')} days, ${hrs.padStart(2, '0')} hours, ${min.padStart(2, '0')} minutes, ${sec.padStart(2, '0')} seconds. `
}

  let embed = new Discord.MessageEmbed()
    .setImage("https://cdn.glitch.com/80848eb5-cb08-4288-88b4-16ed8f9bd493%2F20200415_013924.jpg?v=1586904023951")
    .setAuthor("NIGHTMICE BOT")
    .setColor("RANDOM") 
    .addField("Has been online for", `${duration(client.uptime)}`)
    message.channel.send(embed)

  }
}

