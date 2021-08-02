const Discord = require("discord.js");
const fs = require('fs');
var monJson = JSON.parse(fs.readFileSync('./storage/settings.json', 'utf8'));
const got = require('got');

module.exports.run = async (bot, message, args) => {
    if (args[1] === undefined){
      let Buguser = new Discord.MessageEmbed()
      .setDescription("**Merci de mettre un Pseudo d'un joueur LOL**")
      .setFooter(`By Lurgrid φ`,`${bot.user.avatarURL()}`);
      message.channel.send(Buguser)
      return
    }
    var monLol = JSON.parse(fs.readFileSync('./storage/Lol.json'));
    var arg = args.slice(1)
    got(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${arg.join("%20")}?api_key=`+monLol.key).then(response => {
      const user = JSON.parse(response.body)
      got(`https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${user.id}?api_key=`+monLol.key).then(response2 => {
      const userLol = JSON.parse(response2.body)
      let rank = "No Rank"
      let rank2 = "No Rank"
      if(userLol[1] !== undefined){
        rank2 = userLol[1].tier +" "+ userLol[1].rank +" "+ ((parseFloat(userLol[1].wins)/(parseFloat(userLol[1].wins)+parseFloat(userLol[1].losses)))*100).toFixed(2) + "%"
      }
      if(userLol[0] !== undefined){
        rank = userLol[0].tier +" "+ userLol[0].rank +" "+ ((parseFloat(userLol[0].wins)/(parseFloat(userLol[0].wins)+parseFloat(userLol[0].losses)))*100).toFixed(2) + "%"
      }
      var embed = new Discord.MessageEmbed()
      .setTitle("Information du compte LOL de la personne demandé")
      .setColor(monJson.luluinfo.couleur)
      .addField("Pseudo :", `${user.name}`,true)
      .addField("Level:", user.summonerLevel,true)
      .addField('\u200b', '\u200b', true)
      .addField("Rank Flex:", rank2 ,true)
      .addField("Rank Solo/Duo:", rank ,true)
      .addField('\u200b', '\u200b')
      .addField("Photo de profils :", "\u200b")
      .setImage("http://ddragon.leagueoflegends.com/cdn/11.13.1/img/profileicon/"+ user.profileIconId+".png")
      .setFooter(`By Lurgrid φ`,`${bot.user.avatarURL()}`)
      .setTimestamp()
      message.channel.send(embed).catch(err => console.log(err));
    })
    }).catch(err =>{
      let Buguser = new Discord.MessageEmbed()
      .setDescription("**Merci de mettre un Pseudo d'un joueur Lol**")
      .setFooter(`By Lurgrid φ`,`${bot.user.avatarURL()}`);
      message.channel.send(Buguser)
    })
    }
module.exports.help = { name: "info"}