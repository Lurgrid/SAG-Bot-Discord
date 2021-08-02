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
    osuApi.getUserRecent({ u: args[1] }).then(scores => {
      if(scores[0].perfect){
        scores[0].perfect = "Oui"
      }else{
        scores[0].perfect = "Non"
      }
      if(scores[0].pp === null){
        scores[0].pp = "0"
      }
      if(scores[0].raw_mods !== 0){
        scores[0].mods.splice(-1,1)
        scores[0].mods.splice(-1,1)
        var modee = scores[0].mods.join(" | ")
      }else{
        var modee = "Aucun mode"
      }
    var embed = new Discord.MessageEmbed()
      .setTitle("Information de la dernière game OSU de la personne demandé")
      .setColor(monJson.luluinfo.couleur)
      .addField("Pseudo :", args[1],true)
      .addField("Score :", scores[0].score,true)
      .addField("Date (UTC+0):", scores[0].raw_date,true)
      .addField("Perfect :", scores[0].perfect,true)
      .addField("Rank :", scores[0].rank,true)
      .addField("PP :", scores[0].pp,true)
      .addField("Mode de jeu :", scores[0]._beatmap.mode,true)
      .addField("Mode :", modee,true)
      .addField("Combo/MaxCombo :", scores[0].maxCombo+" / "+scores[0]._beatmap.maxCombo,true)
      .addField('\u200b', '\u200b')
      .addField("Nom de la map :", scores[0]._beatmap.title,true)
      .addField("Source de la map :", scores[0]._beatmap.source,true)
      .addField("Difculté :", scores[0]._beatmap.difficulty.rating,true)
      .setImage("https://assets.ppy.sh/beatmaps/"+ scores[0]._beatmap.beatmapSetId +"/covers/cover.jpg")
      .setFooter(`By Lurgrid φ`,`${bot.user.avatarURL()}`)
      .setTimestamp()
      message.channel.send(embed).catch(err => console.log(err));
    }).catch(err =>{
      let Buguser = new Discord.MessageEmbed()
      .setDescription("**Merci de mettre un Pseudo d'un joueur Osu || Ou le joueur demandé n'a pas jouer récemment**")
      .setFooter(`By Lurgrid φ`,`${bot.user.avatarURL()}`);
      message.channel.send(Buguser)
    })
    }
module.exports.help = { name: "recent"}