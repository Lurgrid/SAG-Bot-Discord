const { error } = require("console");
const Discord = require("discord.js");
const fs = require('fs');
var monJson = JSON.parse(fs.readFileSync('./storage/settings.json', 'utf8'));

module.exports.run = async (bot, message, args) => {
    for(n = 0; n <= monJson.luluinfo.owner.length; n+=1 ){
        if(message.author.id ===  monJson.luluinfo.owner[n]) break
        if(n <= monJson.luluinfo.owner.length) return;
    }
    if ((message.channel.type === "text")){
        let bug1 = new Discord.MessageEmbed()
        .setAuthor(`Le selfbot n'a pas la perm: "MANAGE_MESSAGES"`)
            if (!message.guild.member(bot.user).hasPermission("MANAGE_MESSAGES")){ 
            message.channel.send(bug1) 
            return;
            }
    }
    let bug2 = new Discord.MessageEmbed()
    .setAuthor(`Vous devez mettre un id valide`)
    message.channel.fetchMessages({around: args[0], limit: 1})
    .then(messages => {
        if(isNaN(args[0]) === true ){
            message.channel.send(bug2)
            return;}
        try{const fetchedMsg = messages.first();
            fetchedMsg.pin();
        }catch(err){
            message.channel.send(bug2)
            return;}
        const fetchedMsg = messages.first();
        fetchedMsg.pin();
      });
    if (message.deletable) message.delete();
}
module.exports.help = { name: ["pin"]}