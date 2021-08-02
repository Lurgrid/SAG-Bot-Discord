const Discord = require("discord.js");
const fs = require('fs');
var monJson = JSON.parse(fs.readFileSync('./storage/settings.json', 'utf8'));

module.exports.run = async (bot, message, args) => {
    if (message.deletable) message.delete();
    if (!message.member.hasPermission('KICK_MEMBERS')){
      let PasLaPerms = new Discord.MessageEmbed()
        .setDescription("**Vous n'avez pas la perms pour mute**")
        .setFooter(`By Lurgrid φ`,`${bot.user.avatarURL()}`);
        message.channel.send(PasLaPerms)
        return
    }
    if(args[0] === undefined || message.mentions.users.first() === undefined){
      let PasMention = new Discord.MessageEmbed()
        .setDescription("**Vous n'avez pas mentionnez une personne a mute**")
        .setFooter(`By Lurgrid φ`,`${bot.user.avatarURL()}`);
        message.channel.send(PasMention)
        return
    }
    if(message.guild.members.cache.get(message.mentions.users.first().id).roles.member.roles.cache.find(x => x.id === monJson.luluinfo.grademute)){
      message.guild.members.cache.get(message.mentions.users.first().id).roles.remove(monJson.luluinfo.grademute).catch(err => {console.log(message.mentions.users.first().tag + " A deja perdu son role")})
      return
    }
    message.guild.members.cache.get(message.mentions.users.first().id).roles.add(monJson.luluinfo.grademute).then(user =>{
      if(isNaN(args[1])){
        args[1] = 1
      }
      if(args[1] > 1440){
        args[1] = 1440
      }
      setTimeout(() => {
        message.guild.members.cache.get(message.mentions.users.first().id).roles.remove(monJson.luluinfo.grademute).catch(err => {console.log(message.mentions.users.first().tag + " A deja perdu son role")})
      }, (parseFloat(args[1])*60000))
    })

}
module.exports.help = { name: ["mute"]}