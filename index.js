const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);

}

client.on('ready', async () => {

let status = [
	{name: `${client.users.cache.size} users on the NightMice PreLaunch!`},
	{name: `Use nm!help for help!`},
	{name: `Watching over ${client.users.cache.size} users!`},
	{name: "My creator is Lua! One of the members of LuaCrew"},
	{name: "Some days until the NightMice launchs!", type: 'WATCHING'}
	]

	function setStatus() {
        let randomStatus = status[Math.floor(Math.random()*status.length)]
        client.user.setPresence({activity: randomStatus})
    }
     setStatus();
     setInterval(() => setStatus(), 150000)

});

client.on('messageDelete', async (messageDelete) => {

  await Discord.Util.delayFor(900);

  const fetchedLogs = await messageDelete.guild.fetchAuditLogs({
    limit: 6,
    type: 'MESSAGE_DELETE'
  }).catch(() => ({
    entries: []
  }));

  const auditEntry = fetchedLogs.entries.find(a =>
    a.target.id === messageDelete.author.id &&
    a.extra.channel.id === messageDelete.channel.id &&
    Date.now() - a.createdTimestamp < 20000
  );

  const executor = auditEntry ? auditEntry.executor.tag : 'Unknown';


  const DeleteEmbed = new Discord.MessageEmbed()
    .setTitle("DELETED MESSAGE")
    .setColor("#fc3c3c")
    .addField("Author", messageDelete.author.tag, true)
    .addField("Deleted By", executor, true)
	.addField("Channel", messageDelete.channel, true)
	.addField("Message Content", messageDelete.content, true)
	const canal = client.channels.cache.find(channel => channel.id === '736977250808889355')
	if(!canal) return;
	//canal.send(DeleteEmbed)
})

client.on('guildMemberAdd', member => {

	const embed = new Discord.MessageEmbed()
	.setTitle("Hello and welcome!")
	.setDescription(`Welcome to **NightMice** server! The Official Discord server for NightMice! \n If you wish to see my commands, use \`\`nm!help\`\` \n Read the rules to not get in trouble!`)
	member.send(embed)
	console.log(`I sent the joining message to user ${member.user.tag}, his id is ${member.id} `)

})

client.on('guildMemberRemove', member => {

	const embed = new Discord.MessageEmbed()
	.setTitle("Awh!")
	.setDescription("It\'s sad to see you leaving! Please come back soon!")
	.addField("Here is our invite!", '[Here is the invite link!](https://discord.gg/tk5ZVaE)')
	member.send(embed)
	console.log(`I sent the leaving message to user ${member.user.tag}, his id is ${member.id} `)
})


const cooldowns = new Discord.Collection();

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply('I can\'t execute that command inside DMs!');
	}

	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`).then(msg => msg.delete({timeout: 3000}))
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args, client);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

client.login(token);