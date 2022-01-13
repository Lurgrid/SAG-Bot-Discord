"use strict";
import { MessageEmbed } from 'discord.js'

export default class {
    constructor(client){
        this.client = client
    }
    async execute(message, args, osuApi) {
      if (args[1] === undefined){
        let Buguser = new MessageEmbed()
        .setDescription("**Merci de mettre un Pseudo d'un joueur Osu**")
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
        let modee
        if(scores[0].raw_mods !== 0){
          scores[0].mods.splice(-1,1)
          scores[0].mods.splice(-1,1)
          modee = scores[0].mods.join(" | ")
        }else{
          modee = "Aucun mode"
        }
        let embed = new MessageEmbed()
          .setTitle("Information de la dernière game OSU de la personne demandé")
          .setColor(this.client.config.color)
          .addField("Pseudo :", args[1],true)
          .addField("Score :", scores[0].score.toString(),true)
          .addField("Date (UTC+0):", scores[0].raw_date,true)
          .addField("Perfect :", scores[0].perfect.toString(),true)
          .addField("Rank :", scores[0].rank.toString(),true)
          .addField("PP :", scores[0].pp.toString(),true)
          .addField("Mode de jeu :", scores[0]._beatmap.mode,true)
          .addField("Mode :", modee,true)
          .addField("Combo/MaxCombo :", scores[0].maxCombo.toString()+" / "+scores[0]._beatmap.maxCombo.toString(),true)
          .addField('\u200b', '\u200b')
          .addField("Nom de la map :", scores[0]._beatmap.title,true)
          .addField("Source de la map :", scores[0]._beatmap.source,true)
          .addField("Difculté :", scores[0]._beatmap.difficulty.rating.toString(),true)
          .setImage("https://assets.ppy.sh/beatmaps/"+ scores[0]._beatmap.beatmapSetId.toString() +"/covers/cover.jpg")
          .setFooter(`By Lurgrid φ`,`${this.client.user.avatarURL()}`)
          .setTimestamp()
          message.channel.send({ embeds: [embed] })
        }).catch(err =>{
          let Buguser = new MessageEmbed()
          .setDescription("**Merci de mettre un Pseudo d'un joueur Osu || Ou le joueur demandé n'a pas jouer récemment**")
          message.channel.send({ embeds: [Buguser] })
        })
      }
  }