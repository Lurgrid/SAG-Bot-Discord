"use strict";

import { MessageEmbed } from 'discord.js'

export default class {
    constructor(client){
        this.client = client
    }
    name = "sorry"
    async execute(message, args, config, file) {
        if (message.deletable) message.delete();
        let embed = new MessageEmbed()
            .setColor(`${this.client.config.color}`)
            .setDescription('Envoyer par : ' + message.author.username)
            .setImage(`https://cdn.discordapp.com/attachments/705477515673600100/725089136872259614/unknown.png`)
            .setTimestamp()
            .setFooter(`By Lurgrid φ`,`${this.client.user.avatarURL()}`);
        message.channel.send({ embeds: [embed] })
    }
}