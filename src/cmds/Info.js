"use strict";
import { MessageEmbed } from 'discord.js';

export default class {
    constructor(client){
        this.client = client
    }
    name = "info"
    async execute(message, args, config, file) {
      if (message.deletable) message.delete();
      let gens
      if (args[0] === undefined){
        gens = message.author
      }else{
        gens = message.mentions.users.first()
      }
      let embed = new MessageEmbed()
        .setTitle("Information compte de la personne mentionné")
        .addField('\u200b', '\u200b')
        .setColor(this.client.config.color)
        .addField("Pseudo :", `${gens.username}`)
        .addField("Date de création du compte :", gens.createdAt.toString())
        .addField("Tag :", '#' + gens.discriminator.toString())
        .addField("ID :", gens.id.toString())
        .addField("Pseudo + tag :", gens.tag)
        .addField('\u200b', '\u200b')
        .addField("Photo de profils :", "Image")
        .setImage(gens.avatarURL({ size: 2048, dynamic: true }))
        .setFooter(`By Lurgrid φ`,`${this.client.user.avatarURL()}`)
        .setTimestamp()
      message.channel.send({ embeds: [embed] })
    }
}