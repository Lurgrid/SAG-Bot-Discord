const Discord = require("discord.js");
const fs = require('fs');
var monJson = JSON.parse(fs.readFileSync('./storage/settings.json', 'utf8'));

module.exports.run = async (bot, message, args) => {
    if (message.deletable) message.delete();
    if(args[2] == "bro"){
        var random = 100;
    }else{
    var random = Math.floor (Math.random() * 101);
    }
    if(args[0] === undefined){
        let bug = new Discord.MessageEmbed()
        .setDescription("**Veuillez faire le love calc sur une personne**")
        .setFooter(`By Lurgrid φ`,`${bot.user.avatarURL()}`);
        message.channel.send(bug)
        return
    }else if(args[1] === undefined){
        var Who = `${message.author} + ${args[0]} = __**${random}%**__ d'amour`
        var Valider = message.author.id
    }else{
        var Who = `${args[0]} + ${args[1]} = __**${random}%**__ d'amour`
        var Valider = "not good"
    }
    if(random >= 100){
        var msg = "Il y a les toilettes libre si vous voulez ;)"
        var gif = "https://media1.tenor.com/images/7cd22b8dfbe0a4162f4542cead740c74/tenor.gif?itemid=17956059"
    }else if(random > 70){
        var msg = "Pensez au mariage !"
        var gif = "https://media1.tenor.com/images/843885f3b8fd0ab3f424ab4c20604c07/tenor.gif?itemid=5372246"
    }else if(random > 50){
        var msg = "Mettez vous en couple !"
        var gif = "https://media1.tenor.com/images/5ccc34d0e6f1dccba5b1c13f8539db77/tenor.gif?itemid=17694740"
    }else if(random > 25){
        var msg = "Etre amis c'est bien. Non ?"
        var gif = "https://media1.tenor.com/images/158183b021b8cadc1f331c6721387064/tenor.gif?itemid=13127067"
    }else if(random > 1){
        var msg  = "Se voir c'est deja bien. Non ?"
        var gif = "https://media1.tenor.com/images/bd67f01a9865f798a70a0ec0ac9c3d3c/tenor.gif?itemid=13980130"
    }else{
        var msg  = "Là c'est le suicide"
        var gif = "https://media1.tenor.com/images/dfd524c923f939c3473b64c1d898bfb2/tenor.gif?itemid=21341936"
    }
    if(((Valider === "199534392824037376") || (args[0] === "Sympvthetic") || (args[0] === "sympvthetic") || (args[0] === "Sympathetic") || (args[0] === "sympathetic") || (args[0] === "Lurgrid") || (args[0] === "lurgrid") || (args[0] === "lulu") || (args[0] === "<@!199534392824037376>") || (args[1] === "Lurgrid") || (args[1] === "lurgrid") || (args[1] === "lulu") || (args[1] === "<@!199534392824037376>")) && ((args[0] === "<@!736693095286177892>") || (args[0] === "<@!397871889860788226>") || (args[0] === "<@!696773448055390248>") || (args[0] === "maia") || (args[0] === "maïa") || (args[0] ==="Maïa" ) || (args[0] === "Maia") || (args[0] === "Gridou") || (args[0] === "gridou") || (args[0] === "Ingrid") || (args[0] === "ingrid") || (args[0] === "grigri") || (args[0] === "Grigri") || (args[0] === "Emily") || (args[1] === "<@!736693095286177892>") || (args[1] === "<@!397871889860788226>") || (args[1] === "<@!696773448055390248>") || (args[1] === "maia") || (args[1] === "maïa") || (args[1] === "Maïa") || (args[1] === "Maia") || (args[1] === "Gridou") || (args[1] === "gridou") || (args[1] === "Ingrid") || (args[1] === "ingrid") || (args[1] === "grigri") || (args[1] ==="Grigri") || (args[0] === "Emily") )){
        var random = 999
    if(args[1] === undefined){
        var Who = `${message.author} + ${args[0]} = __**${random}%**__ d'amour`
    }else{
        var Who = `${args[0]} + ${args[1]} = __**${random}%**__ d'amour`
    }
    var msg = "La c'est sur c'est pour la vie et même apres"
    var gif = "https://media1.tenor.com/images/1e3b257ed111590c316c1eb10f2313c5/tenor.gif?itemid=14319672"
    }
    let embed = new Discord.MessageEmbed()
        .setAuthor(`Voici le résultat du Love Calcule <3`, 'https://cdn.discordapp.com/attachments/600516263952777218/751938559535087717/as-coeur-bal.png')
        .setTitle(msg)
        .setColor(`${monJson.luluinfo.couleur}`)
        .setDescription(Who)
        .setImage(gif)
        .setTimestamp()
        .setFooter(`By Lurgrid φ`,`${bot.user.avatarURL()}`);
    message.channel.send(embed)
}
module.exports.help = {name: ["lc"]}