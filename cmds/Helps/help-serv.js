const Discord = require("discord.js");
const fs = require('fs');
var monJson = JSON.parse(fs.readFileSync('./storage/settings.json'));

module.exports.run = async (bot, message, args) => {

    let embed = new Discord.MessageEmbed()
    .setAuthor(`𝐇𝐞𝐥𝐩 𝐒𝐞𝐫𝐯𝐞𝐮𝐫 : 𝐂𝐨𝐦𝐦𝐚𝐧𝐝𝐬 𝘽𝙮 𝙇𝙪𝙧𝙜𝙧𝙞𝙙`)
    .setColor(`#000000`)
    .setDescription(`𝘛𝘰𝘶𝘵𝘦 𝘭𝘦𝘴 𝘤𝘰𝘮𝘮𝘢𝘯𝘥𝘦𝘴 de Help 𝚂𝚎𝚛𝚟𝚎𝚞𝚛`)
    .addField(`${monJson.luluinfo.prefix}add-role`, `Pour ajouter un role a une personne`)
    .addField(`${monJson.luluinfo.prefix}Serv-Info`, `Pour donner les info du serv`)
    .addField(`${monJson.luluinfo.prefix}Info`, `Pour donner les info d'un gens`)
    .addField(`${monJson.luluinfo.prefix}PP`, `Pour avoir la pp d'un gens`)
    .setImage('https://media.giphy.com/media/xUNda7dFmFjGmOpVv2/giphy.gif')  //.attachFiles(['./image/1.2.pngmob.gif'])
                                                                             //.setImage('attachment://mob.gif')
    .attachFiles(['./image/1.2.png'])
    .setThumbnail('attachment://1.2.png')
    .setFooter(`By Lurgrid φ`,`${bot.user.avatarURL()}`);

    message.channel.send(embed)
}

module.exports.help = {
    name: "serv"
}