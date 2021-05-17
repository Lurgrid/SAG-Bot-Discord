const Discord = require("discord.js");
const fs = require('fs');
var monJson = JSON.parse(fs.readFileSync('./Storage/Settings.json', 'utf8'));

module.exports.run = async (bot, message, args) => {
    if (message.deletable) message.delete(); 
    if (message.author.id === (monJson.luluinfo.owner[0]) ||message.author.id === (monJson.luluinfo.owner[1]) ) {
        message.delete(1)
        var msg = `${monJson.luluinfo.prefix}set`
        var number1 = message.content.slice(msg.length + 1);
        monJson.SAG = number1
        fs.writeFileSync('./Storage/Settings.json', JSON.stringify(monJson, null , 4));
}   else {
    let embed = new Discord.RichEmbed()
    .setAuthor(`Tu n'as pas la permission de faire la commande "${message.content}"`)

    message.channel.send(embed)
}

}

module.exports.help = {
    name: "set"
}