const Discord = require("discord.js");
const fs = require('fs');
var monJson = JSON.parse(fs.readFileSync('./storage/settings.json'));

module.exports.run = async (bot, message, args) => {

    let embed = new Discord.MessageEmbed()
    .setAuthor(`𝐇𝐞𝐥𝐩 𝐁𝐨𝐭 : 𝐂𝐨𝐦𝐦𝐚𝐧𝐝𝐬 𝘽𝙮 𝙇𝙪𝙧𝙜𝙧𝙞𝙙`)
    .setColor(`#000000`)
    .setDescription(`𝘛𝘰𝘶𝘵𝘦 𝘭𝘦𝘴 𝘤𝘰𝘮𝘮𝘢𝘯𝘥𝘦𝘴 de Help Bot`)
    .addField(`${monJson.luluinfo.prefix}Bot-off`, `éteint le bot`)
    .addField(`${monJson.luluinfo.prefix}Reload`, `Pour recharger les commande sans eteindre le bot`)
    .addField(`${monJson.luluinfo.prefix}Prefix`, `Pour changer le préfixe (nécessite un redémarrage)`)
    .addField(`${monJson.luluinfo.prefix}Couleur`, `Pour changer la couleur des embed avec une couleur qui utilise le code hexadécimal, couleur avec un # (ne change pas la couleur des embed des help)`)
    .setImage('https://media.tenor.com/images/91d0b45d95b27080c4d0d1175d586533/tenor.gif')
    .attachFiles(['./image/1.2.png'])
    .setThumbnail('attachment://1.2.png')
    .setFooter(`By Lurgrid φ`,`${bot.user.avatarURL()}`);

    message.channel.send(embed)
}

module.exports.help = {
    name: "bot"
}