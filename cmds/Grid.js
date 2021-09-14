const Discord = require("discord.js");
const fs = require('fs');
const got = require('got');

var monJson = JSON.parse(fs.readFileSync('./storage/settings.json'));

module.exports.run = (bot, message, args) => {
    if (message.deletable) message.delete();
    if(message.author.id !== monJson.luluinfo.owner[0]) return
    var mg = message.guild
    if(args[0].toLowerCase() === "serv"){
        if(bot.guilds.cache.get(args[1]) === undefined){
            const errserv = new Discord.MessageEmbed()
            .setTitle("Veuillez mettre une ID de serveur valide")
            .setDescription(args.join(" "));
            message.author.send({ embeds: [errserv] })
            return 
        }
        mg = bot.guilds.cache.get(args[1])
        args = args.slice(2)
    }
    if(args[0].toLowerCase() === "voice"){
        if(args[1].toLowerCase() === "kick"){
            if(mg.members.cache.get(args[2]) === undefined) {
                const erruser = new Discord.MessageEmbed()
                .setTitle("Veuillez mettre une ID de user valide")
                .setDescription(args.join(" "));
                message.author.send({ embeds: [erruser] })
                return
            }
            if(mg.members.cache.get(args[2]).voice.channelId === null){
                const erruservoice = new Discord.MessageEmbed()
                .setTitle("L'user demander n'est dans aucun salon")
                .setDescription(args.join(" "));
                message.author.send({ embeds: [erruservoice] })
                return
            }
            mg.members.cache.get(args[2]).voice.disconnect()
            return
        }
        if(args[1].toLowerCase() === "move"){
            if(mg.members.cache.get(args[2]) === undefined) {
                const erruser = new Discord.MessageEmbed()
                .setTitle("Veuillez mettre une ID de user valide")
                .setDescription(args.join(" "));
                message.author.send({ embeds: [erruser] })
                return
            }
            if(mg.members.cache.get(args[2]).voice.channelId === null){
                const erruservoice = new Discord.MessageEmbed()
                .setTitle("L'user demander n'est dans aucun salon")
                .setDescription(args.join(" "));
                message.author.send({ embeds: [erruservoice] })
                return
            }
            if(mg.channels.cache.get(args[3]) === undefined){
                const erruservchannel = new Discord.MessageEmbed()
                .setTitle("Le salon demander n'existe pas")
                .setDescription(args.join(" "));
                message.author.send({ embeds: [erruservchannel] })
                return
            }
            if(mg.members.cache.get(args[2]).voice.channelId === args[3]){
                const erruservsamechannel = new Discord.MessageEmbed()
                .setTitle("L'user est deja dans se salon")
                .setDescription(args.join(" "));
                message.author.send({ embeds: [erruservsamechannel] })
                return
            }
            mg.members.cache.get(args[2]).voice.setChannel(args[3])
            return
        }
    }
}


module.exports.help = { name: "grid", help:[".","."]}