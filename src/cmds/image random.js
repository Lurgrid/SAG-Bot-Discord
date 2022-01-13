"use strict";
import { MessageEmbed } from 'discord.js';

export default class {
    constructor(client){
        this.client = client
    }
    name = "ir"
    async execute(message, args, config, file) {
        if (message.deletable) message.delete();
        const random = Math.floor (Math.random() * (100000)) +1;
        const tof = Math.floor (Math.random() * (2)) +1;
        let link
        let site
        if(tof === 1){
            link = `https://loremflickr.com/1920/1920?random=${random}`
            site = 'loremflickr.com'
        }else{
            link = `https://picsum.photos/1920/1920?random=${random}`
            site = 'picsum.photos'
        }
        let embed = new MessageEmbed()
        .setColor(`${this.client.config.color}`)
        .setDescription(site)
        .setTitle("Image Random")
        .setImage(link)
        .setFooter(`By Lurgrid φ`,`${this.client.user.avatarURL()}`)
        .setTimestamp()
        message.channel.send({ embeds: [embed] })
    }
}