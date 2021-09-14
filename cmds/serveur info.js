const Discord = require("discord.js");
const fs = require('fs');
var monJson = JSON.parse(fs.readFileSync('./storage/settings.json', 'utf8'));

module.exports.run = async (bot, message, args) => {

    if (message.deletable) message.delete();
    if (message.guildId === null) return;
    try{var owner = message.guild.members.cache.get(message.guild.ownerId).user.tag}catch(err){
        owner = "Donnée indisponible"
    }
    let infoEmbed = new Discord.MessageEmbed()
      .setTitle("Information du serveur")
      .setColor(monJson.luluinfo.couleur)
      .addField('**Nom** : ', message.guild.name)
      .addField('**ID** : ', message.guild.id.toString())
      .addField('**Localisation** : ', message.guild.preferredLocale)
      .addField('**Date de création** : ', message.guild.createdAt.toString())
      .addField('**Créateur** : ', owner.toString())
      .addField('**Niveau de sécurité** : ', message.guild.verificationLevel)
      .addField('**Rôles** : ', message.guild.roles.cache.size.toString())
      .addField('**Nombre de membres** : ', message.guild.memberCount.toString())
      .addField('**Salons** : ', message.guild.channels.cache.size.toString())
      .setFooter(`By Lurgrid φ`,`${bot.user.avatarURL({ size: 2048, dynamic: true })}`)
      .setTimestamp()
      .setThumbnail(message.guild.iconURL())
      message.channel.send({ embeds: [infoEmbed] }).catch(err =>  console.log(err));  
    
}
module.exports.help = { name: "serv-info si", help:["Info","Pour avoir toute les informations du serveur"]}