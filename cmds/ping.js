const Discord = require("discord.js");
const fs = require('fs');
var monJson = JSON.parse(fs.readFileSync('./storage/settings.json', 'utf8'));

module.exports.run = async (bot, message, args) => {
    if(!monJson.luluinfo.owner.includes(message.author.id)) return
    if (message.deletable) message.delete();
    message.channel.send({ content: `Le message a mis ${Date.now() - message.createdTimestamp}ms à s'envoyer. Le ping de l'API est de ${Math.round(bot.ws.ping)}ms`});
    }

module.exports.help = { name: "ping", help:["Test","Pour savoir le ping du bot"]}