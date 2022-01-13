"use strict";
import { MessageEmbed } from 'discord.js'

export default class {
    constructor(client){
        this.client = client
    }
    name = "pp"
    async execute(message, args, config, file) {
        if (message.deletable) message.delete();
        if ((message.author.id === this.client.config.admin[0]) && (args[0] !== undefined && args[0].toLowerCase() === "set")){
            let EmbedEr = new MessageEmbed()
                .setDescription(`__**Discord :**__ Tu changes d'avatar trop rapidement. Réessaie plus tard.`)
            if(args[1].startsWith("<@!")){
                this.cleint.user.setAvatar( message.mentions.users.first().avatarURL.toString()).catch(err => message.channel.send(EmbedEr))
            }else{
                this.client.user.setAvatar(args[1].toString()).catch(err => message.channel.send({ embeds: [EmbedEr] }))
            }
        }else{
            let gens = message.author
            if (args[0] !== undefined && args[0].startsWith("<@!")){
                gens = message.mentions.users.first()
            }
            let embed = new MessageEmbed()
            .setTitle(`Voici la pp de ${gens.tag}`)
            .setColor(this.client.config.color)
            .setImage(gens.avatarURL({ size: 2048, dynamic: true }))
            .setFooter(`By Lurgrid φ`,`${this.client.user.avatarURL()}`)
            .setTimestamp()
            message.channel.send({ embeds: [embed] })
        }
    }
}