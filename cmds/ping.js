const Discord = require("discord.js");
const fs = require('fs');
var monJson = JSON.parse(fs.readFileSync('./storage/settings.json', 'utf8'));


module.exports.run = async (bot, message, args) => {

    if (message.author.id === (monJson.luluinfo.owner[0]) ||message.author.id === (monJson.luluinfo.owner[1]) ) {
    message.channel.sendMessage('Pong! Your ping is `' + `${ ( message.createdTimestamp - Date.now() ) / 1000}` + ' ms`');
    }

    else {
        let embed = new Discord.MessageEmbed()
        .setAuthor(`Tu n'as pas la permission de faire la commande "${message.content}"`)

        message.channel.send(embed)
    }
}

module.exports.help = { name: ["ping"]}