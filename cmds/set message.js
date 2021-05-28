const Discord = require("discord.js");
const fs = require('fs');
var monJson = JSON.parse(fs.readFileSync('./storage/settings.json', 'utf8'));

module.exports.run = async (bot, message, args) => {
   
    if (message.author.id === (monJson.luluinfo.owner[0]) ||message.author.id === (monJson.luluinfo.owner[1]) ) {
        if (message.deletable) message.delete();
        var msg = `${monJson.luluinfo.prefix}set-message`
        var jsp = message.content.slice(msg.length + 1);
        monJson.Message = jsp
        fs.writeFileSync('./storage/settings.json', JSON.stringify(monJson, null , 4));
}   else {
    let embed = new Discord.MessageEmbed()
    .setAuthor(`Tu n'as pas la permission de faire la commande "${message.content}"`)

    message.channel.send(embed)
}

}

module.exports.help = { name: ["set-message"]}