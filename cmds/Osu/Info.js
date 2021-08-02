const Discord = require("discord.js");
const fs = require('fs');
var monJson = JSON.parse(fs.readFileSync('./storage/settings.json', 'utf8'));

module.exports.run = async (bot, message, args, osuApi) => {
    if (args[1] === undefined){
      let Buguser = new Discord.MessageEmbed()
      .setDescription("**Merci de mettre un Pseudo d'un joueur Osu**")
      .setFooter(`By Lurgrid φ`,`${bot.user.avatarURL()}`);
      message.channel.send(Buguser)
      return
    }
    osuApi.getUser({ u: args[1] }).then(user => {
      let totalSeconds = user.secondsPlayed;
      let hours = Math.floor(totalSeconds / 3600);
      totalSeconds %= 3600;
      let minutes = Math.floor(totalSeconds / 60);
      let seconds = totalSeconds % 60;
    var embed = new Discord.MessageEmbed()
      .setTitle("Information du compte OSU de la personne demandé")
      .setColor(monJson.luluinfo.couleur)
      .addField("Pseudo :", `${user.name}`,true)
      .addField("ID :", user.id, true)
      .addField("Level:", user.level,true)
      .addField("Date de création du compte (UTC+0):", user.raw_joinDate,true)
      .addField("Temps de jeu :", hours + " h " + minutes + " min " + seconds + " sec",true)
      .addField("Précision :", user.accuracy,true)
      .addField("Score en ranked :", user.scores.ranked,true)
      .addField("Score en total :", + user.scores.total, true)
      .addField("Pays :", user.country,true)
      .addField("Rank Mondial :", user.pp.rank,true)
      .addField("Rank National :", user.pp.countryRank,true)
      .addField("PP :", user.pp.raw,true)
      .addField('\u200b', '\u200b')
      .addField("Photo de profils :", "\u200b")
      .setImage("http://s.ppy.sh/a/"+ user.id)
      .setFooter(`By Lurgrid φ`,`${bot.user.avatarURL()}`)
      .setTimestamp()
      message.channel.send(embed).catch(err => console.log(err));
    }).catch(err =>{
      let Buguser = new Discord.MessageEmbed()
      .setDescription("**Merci de mettre un Pseudo d'un joueur Osu**")
      .setFooter(`By Lurgrid φ`,`${bot.user.avatarURL()}`);
      message.channel.send(Buguser)
    })
    }
module.exports.help = { name: "info"}