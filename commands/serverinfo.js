const Discord = require('discord.js');
const config = require('../config.json')

module.exports = {
    name: 'serverinfo',
    description: 'Check the server\'s info!',
    aliases: ['sinfo', 'si'],
    usage: 'nm!serverinfo',
    cooldown: 5,
    async execute(message, args, client) {

    function checkBots(guild) {
        let botCount = 0;
        guild.members.cache.forEach(member => {
            if(member.user.bot) botCount++;
        });
        return botCount;
    }
    
    function checkMembers(guild) {
        let memberCount = 0;
        guild.members.cache.forEach(member => {
            if(!member.user.bot) memberCount++;
        });
        return memberCount;
    }

    function checkOnlineUsers(guild) {
        let onlineCount = 0;
        guild.members.cache.forEach(member => {
            if(member.user.presence.status === "online")
                onlineCount++; 
        });
        return onlineCount;
    }
    let guild = message.guild.name;

    let sicon = guild.iconURL;
    let serverembed = new Discord.MessageEmbed()
        .setAuthor(`${message.guild.name} - Informações`, guild.iconURL)
        .setColor("#15f153")
        .addField('👑 Server owner', message.guild.owner, true)
        .addField('🌎 Server region', message.guild.region, true)
        .setThumbnail(sicon)
        .addField("Server name", message.guild.name)
        .addField('📝 Channel quantity', message.guild.channels.cache.size, true)
        .addField(':busts_in_silhouette: Total members', message.guild.memberCount)
        .addField('💁 Humans', checkMembers(message.guild), true)
        .addField('🤖 Bots', checkBots(message.guild), true)
        .addField('Online', checkOnlineUsers(message.guild))
        .addField('You joined at' )
        .setFooter(':date: Server created at:')
        .setTimestamp(message.guild.createdAt);

    return message.channel.send(serverembed);

    
    }    
}

