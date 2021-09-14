const Discord = require("discord.js");
const fs = require('fs');
var monJson = JSON.parse(fs.readFileSync('./storage/settings.json'));

module.exports.run = async (bot, message, args) => {
    if (message.deletable) message.delete();
    if (message.author.id !== (monJson.luluinfo.owner[0])) return
    monJson.luluinfo.stream = args.join(" ")
    fs.writeFileSync('./storage/settings.json', JSON.stringify(monJson, null , 4));
    bot.user.setActivity(monJson.luluinfo.stream, {
        type: "STREAMING",
        url: "https://www.twitch.tv/pewdiepie"
      })
}
module.exports.help = {name: "statu", help:[".","."]}