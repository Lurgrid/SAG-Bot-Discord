"use strict";

import { MessageEmbed } from 'discord.js'

export default class {
    constructor(client){
        this.client = client
    }
    name = "server-info si"
    async execute(message, args, config, file) {
        if (message.deletable) message.delete();
        if (message.guildId === null) return;
        let owner
        try{
            owner = message.guild.members.cache.get(message.guild.ownerId).user.tag
        }catch(err){
            owner = "Donnée indisponible"
        }
        let infoEmbed = new MessageEmbed()
        .setTitle("Information du serveur")
        .setColor(this.client.config.color)
        .addField('**Nom** : ', message.guild.name)
        .addField('**ID** : ', message.guild.id.toString())
        .addField('**Localisation** : ', message.guild.preferredLocale)
        .addField('**Date de création** : ', message.guild.createdAt.toString())
        .addField('**Créateur** : ', owner.toString())
        .addField('**Niveau de sécurité** : ', message.guild.verificationLevel)
        .addField('**Rôles** : ', message.guild.roles.cache.size.toString())
        .addField('**Nombre de membres** : ', message.guild.memberCount.toString())
        .addField('**Salons** : ', message.guild.channels.cache.size.toString())
        .setFooter(`By Lurgrid φ`,`${this.client.user.avatarURL({ size: 2048, dynamic: true })}`)
        .setTimestamp()
        .setThumbnail(message.guild.iconURL())
        message.channel.send({ embeds: [infoEmbed] })
    
    }
}