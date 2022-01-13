"use strict";
import { MessageEmbed } from "discord.js";
import got from 'got'

export default class {
    constructor(client){
        this.client = client
    }
    name = "mc"
    async execute(message, args, config, file) {
        if (message.deletable) message.delete();
        const errserver = new MessageEmbed()
            .setTitle("Veuillez mettre une IP de serveur valide");
        if(args[0] === undefined) {
            message.channel.send({ embeds: [errserver] })
            return
        }
        const response = await got("https://api.mcsrvstat.us/2/"+args[0])
        const serv = JSON.parse(response.body)
        if(serv.debug.dns !== undefined){
            const neverserver = new MessageEmbed()
                .setTitle("L'ip "+ args[0]+" ne correspond a aucun serveur");
            message.channel.send({ embeds: [neverserver] })
            return
        }
        if(!serv.online){
            const offserver = new MessageEmbed()
                .setTitle("Le serveur "+ args[0]+" est actuellement éteint");
            message.channel.send({ embeds: [offserver] })
            return
        }
        const infoserver = new MessageEmbed()
            .setAuthor(`Les informations du serveur ${args[0]}`)
            .setColor(`#33CC00`)
            .setDescription("Joueurs connectés "+serv.players.online.toString()+"/"+serv.players.max.toString())
            .setTitle(serv.ip+":"+serv.port + " " + serv.version)
            .setTimestamp()
            .setFooter(`By Lurgrid φ`,`${this.client.user.avatarURL()}`);
        if(serv.motd.clean[1] === undefined){
            infoserver.addField(serv.motd.clean[0].toString(), "\u200b")
        }else{
            infoserver.addField(serv.motd.clean[0].toString(), serv.motd.clean[1].toString())
        }
        if(serv.icon !== undefined){
            infoserver.setImage("https://mc-api.net/v3/server/favicon/"+args[0])                      
        }else{
            infoserver.setImage("https://cdn.discordapp.com/attachments/600516263952777218/884444735169789992/32a2e4ba6c5ef7eb.png")
        }
        message.channel.send({ embeds: [infoserver] })
    }
}