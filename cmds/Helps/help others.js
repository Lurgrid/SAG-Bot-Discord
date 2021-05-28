const Discord = require("discord.js");
const fs = require('fs');
var monJson = JSON.parse(fs.readFileSync('./storage/settings.json'));

module.exports.run = async (bot, message, args) => {
    let embed = new Discord.MessageEmbed()
    .setAuthor(`𝐇𝐞𝐥𝐩 𝐨𝐭𝐡𝐞𝐫 : 𝐂𝐨𝐦𝐦𝐚𝐧𝐝𝐬 𝘽𝙮 𝙇𝙪𝙧𝙜𝙧𝙞𝙙`)
    .setColor(`#000000`)
    .setDescription(`𝘛𝘰𝘶𝘵𝘦 𝘭𝘦𝘴 𝘤𝘰𝘮𝘮𝘢𝘯𝘥𝘦𝘴 de 𝙷𝚎𝚕𝚙-𝚘𝚝𝚑𝚎𝚛𝚜`)
    .addField(`${monJson.luluinfo.prefix}Message`, `Pour envoyer un message styler`)
    .addField(`${monJson.luluinfo.prefix}Set-Message`, `Pour changer le message styler`)
    .addField(`${monJson.luluinfo.prefix}IR`, `Pour envoyer une image random`)
    .setImage('https://media.tenor.com/images/91d0b45d95b27080c4d0d1175d586533/tenor.gif')
    .attachFiles(['./image/1.2.png'])
    .setThumbnail('attachment://1.2.png')
    .setFooter(`By Lurgrid φ`,`${bot.user.avatarURL()}`);
    message.channel.send(embed)
}

module.exports.help = {
    name: "other"
}