const Discord = require("discord.js");
const fs = require('fs');
var monJson = JSON.parse(fs.readFileSync('./storage/settings.json'));

module.exports.run = async (bot, message, args) => {

    let embed = new Discord.MessageEmbed()
    .setAuthor(`𝐇𝐞𝐥𝐩 𝐓𝐞𝐬𝐭 : 𝐂𝐨𝐦𝐦𝐚𝐧𝐝𝐬 𝘽𝙮 𝙇𝙪𝙧𝙜𝙧𝙞𝙙`)
    .setColor(`#000000`)
    .setDescription(`𝘛𝘰𝘶𝘵𝘦 𝘭𝘦𝘴 𝘤𝘰𝘮𝘮𝘢𝘯𝘥𝘦𝘴 de Help Test`)
    .addField(`${monJson.luluinfo.prefix}Ping`, `Pour tester le bot`)
    .setImage('https://media.giphy.com/media/FsvfLgI2Ksnkc/giphy.gif')
    .attachFiles(['./image/1.2.png'])
    .setThumbnail('attachment://1.2.png')
    .setFooter(`By Lurgrid φ`,`${bot.user.avatarURL()}`);

    message.channel.send(embed)
}

module.exports.help = {
    name: "test"
}