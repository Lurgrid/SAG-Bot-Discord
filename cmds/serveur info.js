const Discord = require("discord.js");
const fs = require('fs');
var monJson = JSON.parse(fs.readFileSync('./storage/settings.json', 'utf8'));

module.exports.run = async (bot, message, args) => {

    if (message.deletable) message.delete();
    if ((message.channel.type === "dm") || (message.channel.type === "group")) return;
    try{var owner = message.guild.owner.user.tag}catch(err){
        owner = "Donnée indisponible"
    }
    let infoEmbed = new Discord.MessageEmbed()
      .setTitle("Information du serveur")
      .setColor(monJson.luluinfo.couleur)
      .addField('**Nom** : ', message.guild.name)
      .addField('**ID** : ', message.guild.id)
      .addField('**Localisation** : ', message.guild.region)
      .addField('**Date de création** : ', message.guild.createdAt)
      .addField('**Créateur** : ', owner)
      .addField('**Niveau de sécurité** : ', message.guild.verificationLevel)
      .addField('**Rôles** : ', message.guild.roles.size)
      .addField('**Nombre de membres** : ', message.guild.memberCount)
      .addField('**Salons** : ', message.guild.channels.size)
      .setFooter(`By Lurgrid φ`,`${bot.user.avatarURL()}`)
      .setTimestamp()
      .setThumbnail(message.guild.iconURL)
      message.channel.send(infoEmbed).catch(err =>  console.log(err));  
    
}
module.exports.help = { name: ["serv-info"]}