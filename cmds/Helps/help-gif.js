const Discord = require("discord.js");
const fs = require('fs');
var monJson = JSON.parse(fs.readFileSync('./storage/settings.json'));

module.exports.run = async (bot, message, args) => {

    let embed = new Discord.MessageEmbed()
    .setAuthor(`𝐇𝐞𝐥𝐩 𝐆𝐢𝐟 : 𝐂𝐨𝐦𝐦𝐚𝐧𝐝𝐬 𝘽𝙮 𝙇𝙪𝙧𝙜𝙧𝙞𝙙`)
    .setColor(`#000000`)
    .setDescription(`𝘛𝘰𝘶𝘵𝘦 𝘭𝘦𝘴 𝘤𝘰𝘮𝘮𝘢𝘯𝘥𝘦𝘴 de Help Gif`)
    .addField(`${monJson.luluinfo.prefix}Kiss`, `Pour faire un bisous`)
    .addField(`${monJson.luluinfo.prefix}Punch`, `Pour frapper quelqu'un`)
    .addField(`${monJson.luluinfo.prefix}Cry`, `Pour pleurer`)
    .addField(`${monJson.luluinfo.prefix}Hug`, `Pour faire un calin a quelqu'un`)
    .addField(`${monJson.luluinfo.prefix}Baiz`, `Pour baiser une personne`)
    .addField(`${monJson.luluinfo.prefix}Haikyuu`, `Pour envoier un gif de Haikyuu`)
    .setImage('https://media.giphy.com/media/wkW0maGDN1eSc/giphy.gif')  //.attachFiles(['./image/1.2.pngmob.gif']) https://media.giphy.com/media/FsvfLgI2Ksnkc/giphy.gif
                                                                             //.setImage('attachment://mob.gif')
    .attachFiles(['./image/1.2.png'])
    .setThumbnail('attachment://1.2.png')
    .setFooter(`By Lurgrid φ`,`${bot.user.avatarURL()}`);

    message.channel.send(embed)
}

module.exports.help = {
    name: "gif"
}