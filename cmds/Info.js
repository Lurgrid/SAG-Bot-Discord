const Discord = require("discord.js");
const fs = require('fs');
var monJson = JSON.parse(fs.readFileSync('./storage/settings.json', 'utf8'));

module.exports.run = async (bot, message, args) => {
    if (message.deletable) message.delete();
    if (args[0] === undefined){var gens = message.author}else{var gens = message.mentions.users.first()}
    var embed = new Discord.MessageEmbed()
      .setTitle("Information compte de la personne mentionné")
      .addField('\u200b', '\u200b')
      .setColor(monJson.luluinfo.couleur)
      .addField("Pseudo :", `${gens.username}`)
      .addField("Date de création du compte :", gens.createdAt.toString())
      .addField("Tag :", '#' + gens.discriminator.toString())
      .addField("ID :", gens.id.toString())
      .addField("Pseudo + tag :", gens.tag)
      .addField('\u200b', '\u200b')
      .addField("Photo de profils :", "Image")
      .setImage(gens.avatarURL({ size: 2048, dynamic: true }))
      .setFooter(`By Lurgrid φ`,`${bot.user.avatarURL()}`)
      .setTimestamp()
      message.channel.send({ embeds: [embed] }).catch(err => console.log(err));}
module.exports.help = { name: "info", help:["Info","Pour avoir les informations d'un compte discord demander"]}