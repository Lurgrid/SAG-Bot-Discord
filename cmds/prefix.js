const Discord = require("discord.js");
const fs = require('fs');
var monJson = JSON.parse(fs.readFileSync('./storage/settings.json', 'utf8'));


module.exports.run = async (bot, message, args) => {
    if(!monJson.luluinfo.owner.includes(message.author.id)) return
    if (message.deletable) message.delete();
    if (args[0] == undefined){

        let embed1 = new Discord.MessageEmbed()
        .setAuthor(`Erreur le préfixe est vide vous devez mettre un préfixe `)
        .setFooter(`By Lurgrid φ`,`${bot.user.avatarURL()}`);+
        
        message.channel.send({ embeds: [embed1] })
    } else {
        monJson.luluinfo.prefix = args[0]
        fs.writeFileSync('./storage/settings.json', JSON.stringify(monJson, null , 4));
        let embed = new Discord.MessageEmbed()
        .setAuthor(`Le nouveau préfixe est "${args[0]}"`)
        .setFooter(`By Lurgrid φ`,`${bot.user.avatarURL()}`);+
        message.channel.send({ embeds: [embed] })

    }
}

module.exports.help = { name: "prefix", help:[".","."]}