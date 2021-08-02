const Discord = require("discord.js");
const fs = require('fs');
var monJson = JSON.parse(fs.readFileSync('./storage/settings.json', 'utf8'));


module.exports.run = async (bot, message, args) => {

    if (message.author.id === (monJson.luluinfo.owner[0]) ||message.author.id === (monJson.luluinfo.owner[1]) ) {
        message.channel.send(`Le message a mis ${Date.now() - message.createdTimestamp}ms à s'envoyer. Le ping de l'API est de ${Math.round(bot.ws.ping)}ms`);
    }

    else {
        let embed = new Discord.MessageEmbed()
        .setAuthor(`Tu n'as pas la permission de faire la commande "${message.content}"`)

        message.channel.send(embed)
    }
}

module.exports.help = { name: ["ping"]}