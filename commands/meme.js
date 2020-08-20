const Discord = require('discord.js')
const randomPuppy = require('random-puppy')


module.exports = {
    name: 'meme',
	description: 'Get a meme from reddit\'s most famous subreddits',
    aliases: ['rmeme'],
    usage: 'nm!meme',
    cooldown: 5,
	async execute(message, args, client) {


    const subReddits = ["dankmeme", "meme", "me_irl", "memes"];
    const random = subReddits[Math.floor(Math.random() * subReddits.length)];
    const img = await randomPuppy(random);
    const embed = new Discord.MessageEmbed()
        .setColor(0xffffff)
        .setImage(img)
        .setTitle(`From r/${random}`)
        .setURL(`https://reddit.com/r/${random}`);

        message.channel.send(embed);
    }
}

