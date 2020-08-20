const Discord = require("discord.js");

module.exports = {
  name: 'clear',
  description: 'Clear messages!',
  aliases: ['cl'],
  usage: 'nm!clear 99',
  cooldown: 5,
  async execute(message, args, client) {

    if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.reply("You do not have perms to use this command!").then(msg => msg.delete({timeout: 5000}))
  const deleteCount = parseInt(args[0], 10);
  if (!deleteCount || deleteCount < 1 || deleteCount > 99)
    return message.reply("**Please provide at least **99 messages**").then(msg => msg.delete({timeout: 5000}))

  const fetched = await message.channel.messages.fetch({
    limit: deleteCount + 1
  });
  message.delete;
  message.channel.bulkDelete(fetched);
  message.channel
    .send(`**${args[0]} messages removed from this channel!**`).then(msg => msg.delete({timeout: 5000}))
    .catch(error =>
      console.log(`Couldnt delete! Error: ${error}`)
    )
}
}
