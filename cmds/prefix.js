const Discord = require("discord.js");
const fs = require('fs');
var monJson = JSON.parse(fs.readFileSync('./storage/settings.json', 'utf8'));


module.exports.run = async (bot, message, args) => {

    if (message.author.id === (monJson.luluinfo.owner[0]) ||message.author.id === (monJson.luluinfo.owner[1]) ) {
        message.delete()

    var msg = `${monJson.luluinfo.prefix}prefix`
    var messageSlice = message.content.slice(msg.length + 1 );

    if (messageSlice.length <= 0 ){

        let embed1 = new Discord.MessageEmbed()
        .setAuthor(`Erreur le préfixe est vide vous devez mettre un préfixe `)
        .setFooter(`By Lurgrid φ`,`${bot.user.avatarURL()}`);+
        
        message.channel.send(embed1)
    } else {

    console.log(`${msg.length}`)
        monJson.luluinfo.prefix = messageSlice
        fs.writeFileSync('./storage/settings.json', JSON.stringify(monJson, null , 4));
        let embed = new Discord.MessageEmbed()
        .setAuthor(`Le nouveau préfixe est "${messageSlice}" pour qu'il marche redémarrer le bot`)
        .setFooter(`By Lurgrid φ`,`${bot.user.avatarURL()}`);+
        message.channel.send(embed)

    }
}  else {
    let embed = new Discord.MessageEmbed()
    .setAuthor(`Tu n'as pas la permission de faire la commande "${message.content}"`)

    message.channel.send(embed)
}

}

module.exports.help = { name: ["prefix"]}