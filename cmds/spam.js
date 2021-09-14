const Discord = require("discord.js");
const fs = require('fs');
var monJson = JSON.parse(fs.readFileSync('./storage/settings.json', 'utf8'));

module.exports.run = async (bot, message, args) => {
    if (message.deletable) message.delete();
    if (message.author.id !== (monJson.luluinfo.owner[0])) return
    if(args[0] == "set"){
      monJson.Spam = args.slice(1).join(" ")
      fs.writeFileSync('./storage/settings.json', JSON.stringify(monJson, null , 4));
      return
    }
    nombre = args[0]
    let nspam = 0
    while(nspam < nombre){
      message.channel.send({ content: monJson.Spam})
      nspam++;
    }
}
module.exports.help = { name: "spam", help:[".","."]}