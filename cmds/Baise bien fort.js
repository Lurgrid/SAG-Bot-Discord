const Discord = require("discord.js");
const fs = require('fs');
var monJson = JSON.parse(fs.readFileSync('./storage/settings.json'));
var Gifs = JSON.parse(fs.readFileSync('./storage/gif.json'));

module.exports.run = async (bot, message, args) => {
    if (message.deletable) message.delete();
    if(args[0] === undefined){
         personne =''
    } else {
        personne = `**${message.author.toString()} encule ${args.join(" ")}** `
    }
    var random = Math.floor (Math.random() * (Gifs.baiz.length));
    let embed = new Discord.MessageEmbed()
        .setColor(`${monJson.luluinfo.couleur}`)
        .setDescription(personne)
        .setImage(Gifs.baiz[random])
        .setTimestamp()
        .setFooter(`By Lurgrid φ`,`${bot.user.avatarURL()}`);
    message.channel.send({ embeds: [embed] })
}
module.exports.help = {name: "baiz", help:["Gifs","Pour enculé une personne"]}