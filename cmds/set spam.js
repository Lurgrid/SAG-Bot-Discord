const Discord = require("discord.js");
const fs = require('fs');
var monJson = JSON.parse(fs.readFileSync('./storage/settings.json', 'utf8'));

module.exports.run = async (bot, message, args) => {
    if (message.deletable) message.delete(); 
    if (message.author.id !== (monJson.luluinfo.owner[0])){return}
        var msg = `${monJson.luluinfo.prefix}set-spam`
        var number1 = message.content.slice(msg.length + 1);
        monJson.Spam = number1
        fs.writeFileSync('./storage/settings.json', JSON.stringify(monJson, null , 4));
}

module.exports.help = { name: ["set-spam"]}