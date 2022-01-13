import { MessageEmbed } from 'discord.js'
import { readFileSync } from 'fs';

"use strict";
export default class {
    constructor(client){
        this.client = client
    }
    name = "haikyuu"
    async execute(message, args, config, file) {
        if (message.deletable) message.delete();
        let personne
        if(args[0] === undefined){
            personne = ''
       } else {
           personne = `**Un gif de Haikyuu pour ${args.join(" ")}** `
       }
       const gif = await JSON.parse(readFileSync("./database/gif/haikyuu.json", "utf8"))
       let random = Math.floor (Math.random() * (gif.length));
        let embed = new MessageEmbed()
            .setColor(`${this.client.config.color}`)
            .setDescription(personne)
            .setImage(gif[random])
            .setTimestamp()
            .setFooter(`By Lurgrid φ`,`${this.client.user.avatarURL()}`);
        message.channel.send({ embeds: [embed] })
    }
}