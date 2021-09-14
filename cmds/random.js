const Discord = require("discord.js");
const fs = require('fs');
const { cpuUsage } = require("process");
const { isNumber } = require("util");
var monJson = JSON.parse(fs.readFileSync('./storage/settings.json'));

module.exports.run = async (bot, message, args) => {
    if (message.deletable) message.delete();
    if(args[0] === undefined){
        let bug = new Discord.MessageEmbed()
        .setDescription("**Veuillez mettre un ou des argument**")
        .setFooter(`By Lurgrid φ`,`${bot.user.avatarURL()}`);
        message.channel.send({ embeds: [bug] })
        return;
    }
    if(args[0].toLowerCase() === "number"){
        if(isNaN(args[1]) === true ){
            let bug2 = new Discord.MessageEmbed()
        .setDescription("**Veuillez mettre un ou des nombre**")
        .setFooter(`By Lurgrid φ`,`${bot.user.avatarURL()}`);
        message.channel.send({ embeds: [bug2] })
        return;
        }else{
            if(args[2] === undefined){
                min = Math.ceil(0)
                max = Math.floor(args[1])
                var random = Math.floor (Math.random() * (max - min + 1)) + min;
                var resultat = `**Le random number a choisi ce nombre: ${random}**`
                var choix = `Tout les nombres qu'il avait jusqu'a ${args[1]} avec le 0 compris`
            }else{
                if(parseFloat(args[1]) > parseFloat(args[2])){
                    min = Math.ceil(args[2])
                    max = Math.floor(args[1])
                    var random =  Math.floor(Math.random() * (max - min + 1)) + min
                    var resultat = `**Le random number a choisi ce nombre: ${random}**`
                    var choix = `Tout les nombres qu'il avait de ${args[2]} à ${args[1]}`
                }else{
                    min = Math.ceil(args[1])
                    max = Math.floor(args[2])
                    var random =  Math.floor(Math.random() * (max - min + 1)) + min
                    var resultat = `**Le random number a choisi ce nombre: ${random}**`
                    var choix = `Tout les nombres qu'il avait de ${args[1]} à ${args[2]}`
                }}}
    }else{
        var random = Math.floor (Math.random() * (args.length));
        var resultat = `**Le random a choisi cet argument: ${args[random]}**`
        var choix = args.join(" - ")
    }
    let embed = new Discord.MessageEmbed()
        .setDescription(resultat)
        .addField(`Les choix qu'il y avait :`,choix)
        .setColor(monJson.luluinfo.couleur)
        .setFooter(`By Lurgrid φ`,`${bot.user.avatarURL()}`);
    message.channel.send({ embeds: [embed] })
}
module.exports.help = {name: "random", help:["Random","Pour tiré un nombre et choisir entre different mots"]}