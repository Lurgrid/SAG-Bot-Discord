const Discord = require("discord.js");
const { MessageActionRow, MessageButton } = require('discord.js');
const fs = require('fs');
const got = require('got');

var monJson = JSON.parse(fs.readFileSync('./storage/settings.json'));

module.exports.run = (bot, message, args) => {
    if (message.deletable) message.delete();
    const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('1')
					.setLabel('1')
					.setStyle('DANGER')
			)
			.addComponents(
				new MessageButton()
					.setCustomId('2')
					.setLabel('2')
					.setStyle('SECONDARY')
			)
			
			
	message.channel.send({ content: 'Pong!', components: [row] }).then(msg => {
	const filter = i => i.user.id === message.author.id;
	const collector = message.channel.createMessageComponentCollector({ filter, time: 15000 });
	collector.on('collect', async i => {
		if (i.customId === '1') {
			msg.delete()
			return
		}
		if (i.customId === '2') {
			i.update({ content: 'A button was clicked!', components: [] });
			return
		}
		});
	collector.on('end', collected => {
		if (collected.size  === 0 ) msg.delete()
	});
})
}


module.exports.help = { name: "boutton", help:[".","."]}