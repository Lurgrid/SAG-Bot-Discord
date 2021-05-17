const Discord = require("discord.js");
const fs = require('fs');
var monJson = JSON.parse(fs.readFileSync('./Storage/Settings.json', 'utf8'));

module.exports.run = async (bot, message, args) => {
    if (message.deletable) message.delete();
    if(!message.member.hasPermission("ADMINISTRATOR")){
        let bug = new Discord.MessageEmbed()
        .setDescription("**Vous n'avez pas la perms ADMINISTRATOR**")
        .setFooter(`By Lurgrid φ`,`${bot.user.avatarURL()}`);
        message.channel.send(bug)
        return
    }
    if(isNaN(args[0])){
        let bug2 = new Discord.MessageEmbed()
        .setDescription("**Veuillez mettre une ID de channel valide**")
        .setFooter(`By Lurgrid φ`,`${bot.user.avatarURL()}`);
        message.channel.send(bug2)
        return
    }
    if(monJson.MarvinServ.find(element => element[0] === args[0])){
        let bug3 = new Discord.MessageEmbed()
        .setDescription("**Le Channel est deja dans la liste**")
        .setFooter(`By Lurgrid φ`,`${bot.user.avatarURL()}`);
        message.channel.send(bug3)
        return
    }
    let Salon = message.guild.channels.cache.get(args[0])
    if(Salon == undefined){
        let bug2 = new Discord.MessageEmbed()
        .setDescription("**Veuillez mettre une ID de channel valide**")
        .setFooter(`By Lurgrid φ`,`${bot.user.avatarURL()}`);
        message.channel.send(bug2)
        return
    }
    monJson.MarvinServ.push([Salon.id,Salon.name])
    fs.writeFileSync('./Storage/Settings.json', JSON.stringify(monJson, null , 4))
    let good = new Discord.MessageEmbed()
        .setDescription("**Le channel a était ajouter**")
        .setFooter(`By Lurgrid φ`,`${bot.user.avatarURL()}`);
        message.channel.send(good)
        return

}

module.exports.help = {
    name: "gro"
}