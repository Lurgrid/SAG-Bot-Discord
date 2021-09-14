const Discord = require("discord.js");
const fs = require('fs');
var monJson = JSON.parse(fs.readFileSync('./storage/settings.json', 'utf8'));

module.exports.run = async (bot, message, args) => {
    if (message.deletable) message.delete();
    if (!message.member.hasPermission('KICK_MEMBERS')){
      let PasLaPerms = new Discord.MessageEmbed()
        .setDescription("**Vous n'avez pas la perms pour mute**")
        .setFooter(`By Lurgrid φ`,`${bot.user.avatarURL()}`);
        message.channel.send({ embeds: [PasLaPerms] })
        return
    }
    const Json = new Map(Object.entries(monJson.serv));
    let Serv = Json.get(message.guild.id)
    const gradeid = Serv.Mute
    if(args[0] === undefined || message.mentions.users.first() === undefined){
      let PasMention = new Discord.MessageEmbed()
        .setDescription("**Vous n'avez pas mentionnez une personne a mute**")
        .setFooter(`By Lurgrid φ`,`${bot.user.avatarURL()}`);
        message.channel.send({ embeds: [PasMention] })
        return
    }
    if(message.guild.members.cache.get(message.mentions.users.first().id).roles.member.roles.cache.find(x => x.id === gradeid)){
      message.guild.members.cache.get(message.mentions.users.first().id).roles.remove(gradeid).catch(err => {console.log(message.mentions.users.first().tag + " A deja perdu son role")})
      return
    }
    message.guild.members.cache.get(message.mentions.users.first().id).roles.add(gradeid).then(user =>{
      if(isNaN(args[1])){
        args[1] = 1
      }
      if(args[1] > 1440){
        args[1] = 1440
      }
      setTimeout(() => {
        message.guild.members.cache.get(message.mentions.users.first().id).roles.remove(gradeid).catch(err => {console.log(message.mentions.users.first().tag + " A deja perdu son role")})
      }, (parseFloat(args[1])*60000))
    })

}
module.exports.help = { name: "mute", help:["Serv","Pour mute une personne"]}