const Discord = require("discord.js");
const fs = require('fs');
var monJson = JSON.parse(fs.readFileSync('./storage/settings.json', 'utf8'));

module.exports.run = async (bot, message, args) => {
    if (message.deletable) message.delete();
    if(typeof args[0] === "undefined"){args[0] = ""}
    if ((message.author.id === monJson.luluinfo.owner[0]) && ( args[0].toLowerCase() === "set")){
        var EmbedEr = new Discord.MessageEmbed()
            .setDescription(`__**Discord :**__ Tu changes d'avatar trop rapidement. Réessaie plus tard.`)
        if(args[1].startsWith("<@!")){
            bot.user.setAvatar( message.mentions.users.first().avatarURL.toString()).catch(err => message.channel.send(EmbedEr))
        }else{
            bot.user.setAvatar(args[1].toString()).catch(err => message.channel.send({ embeds: [EmbedEr] }))
        }
    }else{
    if (args[0].startsWith("<@!")){var gens = message.mentions.users.first()}else{var gens = message.author}
    var embed = new Discord.MessageEmbed()
      .setTitle(`Voici la pp de ${gens.tag}`)
      .setColor(monJson.luluinfo.couleur)
      .setImage(gens.avatarURL({ size: 2048, dynamic: true }))
      .setFooter(`By Lurgrid φ`,`${bot.user.avatarURL()}`)
      .setTimestamp()
      message.channel.send({ embeds: [embed] }).catch(err => console.log(err));   }
    }
module.exports.help = { name: "pp", help:["Info","Pour avoir la photo de profile de la personne demander"]}