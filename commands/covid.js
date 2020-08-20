const Discord = require('discord.js')
const api = require('covidapi')
const { NovelCovid } = require("novelcovid");
const track = new NovelCovid();

module.exports = {
    name: 'covid',
	description: 'Check covid stats',
    aliases: ['corona', 'c19'],
    usage: 'nm!covid',
    cooldown: 5,
	async execute(message, args, client) {

        if(args.join(" ") === "all") {

        const covid = await api.all()

        const embed = new Discord.MessageEmbed()
        .setTitle("COVID-19 Outbreak")
        .setDescription("World-wide status")
        .addField("Cases", covid.cases, true)
        .addField("Today cases", covid.todayCases, true)
        .addField("Deaths", covid.deaths, true)
        .addField("Today deaths", covid.todayDeaths)
        .addField("Recovered", covid.recovered, true)
        .addField("Today recovered", covid.todayRecoverd, true)
        .addField("Cases active", covid.active, true)
        .addField("Critical", covid.critical)

        message.channel.send(embed)

        } else {
            let corona = await track.countries(args.join(" "))
    
            let embed = new Discord.MessageEmbed()
            .setTitle(`Corona Cases in ${corona.country}`)
            .setColor("RANDOM")
            .setDescription("Country status")
            .addField("Cases", corona.cases, true)
            .addField("Deaths", corona.deaths, true)
            .addField("Recovered", corona.recovered, true)
            .addField("Cases today", corona.todayCases, true)
            .addField("Deaths today", corona.todayDeaths, true)
            .addField("Active cases", corona.active, true)
            .addField("Critical", corona.critical, true)
    
            return message.channel.send(embed)
            message.delete()
        } 
    }
}


