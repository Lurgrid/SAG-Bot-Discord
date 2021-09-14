const Discord = require("discord.js");
const fs = require('fs');
var monJson = JSON.parse(fs.readFileSync('./storage/settings.json', 'utf8'));


module.exports.run = async (bot, message, args) => { 
    if(message.author.id !== monJson.luluinfo.owner[0]) return
    if (message.deletable) message.delete();
    if (args[0] == undefined){

        let embed1 = new Discord.MessageEmbed()
        .setAuthor(`Erreur la valeur couleur est vide vous devez mettre une couleur `)
        .setFooter(`By Lurgrid φ`,`${bot.user.avatarURL()}`);+
        message.channel.send({ embeds: [embed1] })
    } else {
        monJson.luluinfo.couleur = args[0]
        fs.writeFileSync('./storage/settings.json', JSON.stringify(monJson, null , 4));
        let embed = new Discord.MessageEmbed()
        .setAuthor(`Le nouveau préfixe est "${args[0]}" `)
        .setDescription(`Pour que la couleur vous devez mettre une couleur qui utilise le code hexadécimal (ex: #000000)`)
        .setFooter(`By Lurgrid φ`,`${bot.user.avatarURL()}`);+
        message.channel.send({ embeds: [embed] })
        console.log(`nouveau valeur de la value number "${args[0]}"`)
    }

}

module.exports.help = { name: "couleur", help:[".","."]}