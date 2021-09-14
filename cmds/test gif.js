const Discord = require("discord.js");
const fs = require('fs');
var monJson = JSON.parse(fs.readFileSync('./storage/settings.json'));
var Gifs = JSON.parse(fs.readFileSync('./storage/gif.json'));

module.exports.run = async (bot, message, args) => {
    if (message.author.id !== (monJson.luluinfo.owner[0])) return
    if (message.deletable) message.delete();
        var n = 0
    try{ Gifs[args[0]].length}catch(err){
        let bug = new Discord.MessageEmbed()
        .setDescription("**Les gis que vous voulez tester n'existe pas**")
        .setFooter(`By Lurgrid φ`,`${bot.user.avatarURL()}`);
        message.channel.send({ embeds: [bug] })
        return;
    }
        while( n < Gifs[args[0]].length){
        let embed = new Discord.MessageEmbed()
        .setAuthor(`Test des gifs : "${args[0]}"`)
        .setDescription(Gifs[args[0]][n])
        .setImage(Gifs[args[0]][n])
        .setFooter(`By Lurgrid φ`,`${bot.user.avatarURL()}`);
    message.channel.send({ embeds: [embed] })
    var n = n + 1
    }
}
module.exports.help = {name: "test-gif", help: [".","."]} //, help: ["Test","Cette commande sert à tester les gifs des commandes"]