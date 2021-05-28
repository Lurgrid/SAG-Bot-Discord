const Discord = require("discord.js");
const fs = require('fs');
var monJson = JSON.parse(fs.readFileSync('./storage/settings.json', 'utf8'));

module.exports.run = async (bot, message, args) => {  
    if (message.author.id === monJson.luluinfo.owner[0]) {
        if (message.deletable) message.delete();
        process.exit(2);
    }}
module.exports.help = {name: ["bot-off"]}