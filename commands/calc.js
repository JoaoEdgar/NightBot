const Discord = require('discord.js')
const mathjs = require('mathjs')

module.exports = {
    name: 'calc',
	description: 'Make a math calculation',
    aliases: ['calculate', 'calculator'],
    usage: 'nm!calc 2+2',
    cooldown: 5,
	execute(message, args, client) {

    if (!args[0]) return message.reply("Please provide something to math!")
    let resp;
    try {
        resp = mathjs.evaluate(args.join(" "));
        
    } catch (e) {
        return message.channel.send("Something went wrong!" + " " + e)
    }
    message.channel.send(`☑️ | The answer to \`\`${args.join(' ')}\`\` is \`\`${resp}\`\``)

}
}
