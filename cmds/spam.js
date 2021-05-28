const Discord = require("discord.js");
const fs = require('fs');
var monJson = JSON.parse(fs.readFileSync('./storage/settings.json', 'utf8'));

module.exports.run = async (bot, message, args) => {
    if (message.deletable) message.delete();
    if (message.author.id !== (monJson.luluinfo.owner[0])) {return}
    nombre = args[0]
    let nspam = 0
    while(nspam < nombre){
      message.channel.send(monJson.Spam)
      nspam++;
    }
}
module.exports.help = { name: ["spam"]}