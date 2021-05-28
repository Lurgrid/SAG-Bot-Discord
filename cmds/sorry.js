const Discord = require("discord.js");
const fs = require('fs');
var monJson = JSON.parse(fs.readFileSync('./storage/settings.json'));

module.exports.run = async (bot, message, args) => {
    if (message.deletable) message.delete();
    let embed = new Discord.MessageEmbed()
        .setColor(`${monJson.luluinfo.couleur}`)
        .setDescription('Envoyer par : ' + message.author.username)
        .setImage(`https://cdn.discordapp.com/attachments/705477515673600100/725089136872259614/unknown.png`)
        .setTimestamp()
        .setFooter(`By Lurgrid φ`,`${bot.user.avatarURL()}`);
    message.channel.send(embed)
}
module.exports.help = { name: ["sorry"]}