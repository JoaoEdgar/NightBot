module.exports = {
    name: 'remindme',
	description: 'Make the bot remind you of something!',
    aliases: ['reminder', 'remindme', 'rem'],
    usage: 'nm!remindme',
    cooldown: 5,
	async execute(message, args, client, level) {
	var time = args[0];
	var reminder = args.splice(1).join(' ');

	if (!time) return message.reply('I can\'t remember you of something if you don\'t provide a time!');
	if (!reminder) return message.reply('I can\'t remember you of something if you don\'t provide a message!');

	// This will not work if the bot is restarted or stopped

	time = await time.toString();

	if (time.indexOf('s') !== -1) { // Seconds
		var timesec = await time.replace(/s.*/, '');
		var timems = await timesec * 1000;
	} else if (time.indexOf('m') !== -1) { // Minutes
		var timemin = await time.replace(/m.*/, '');
		timems = await timemin * 60 * 1000;
	} else if (time.indexOf('h') !== -1) { // Hours
		var timehour = await time.replace(/h.*/, '');
		timems = await timehour * 60 * 60 * 1000;
	} else if (time.indexOf('d') !== -1) { // Days
		var timeday = await time.replace(/d.*/, '');
		timems = await timeday * 60 * 60 * 24 * 1000;
	}	else {
		return message.reply('Something went wrong! Quick tip: the bot only accepts [s/m/h/d]');
	}

	message.reply(`I will remind you of \`${reminder}\` in \`${time}\``);

	setTimeout(function () {
		message.reply(`You asked me to remind you of \`${reminder}\` `);
	}, parseInt(timems));

	}
}
