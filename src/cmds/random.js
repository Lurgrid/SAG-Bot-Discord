"use strict";
import { MessageEmbed } from 'discord.js'

export default class {
    constructor(client){
        this.client = client
    }
    name = "random rdm"
    async execute(message, args, config, file) {
        if (message.deletable) message.delete();
        let embed = new MessageEmbed()
            .setColor(this.client.config.color)
            .setFooter(`By Lurgrid φ`,`${this.client.user.avatarURL()}`);
        if(args[0] === undefined){
            let bug = new MessageEmbed()
                .setDescription("**Veuillez mettre un ou des argument**")
                .setFooter(`By Lurgrid φ`,`${this.client.user.avatarURL()}`);
            message.channel.send({ embeds: [bug] })
            return;
        }
        if(args[0].toLowerCase() === "number"){
            if(isNaN(args[1]) === true ){
            let bug2 = new MessageEmbed()
                .setDescription("**Veuillez mettre un ou des nombre**")
                .setFooter(`By Lurgrid φ`,`${this.client.user.avatarURL()}`);
            message.channel.send({ embeds: [bug2] })
            return;
            }else{
                let resultat
                let choix
                if(args[2] === undefined){
                    let min = Math.ceil(0)
                    let max = Math.floor(args[1])
                    let random = Math.floor (Math.random() * (max - min + 1)) + min;
                    resultat = `**Le random number a choisi ce nombre: ${random}**`
                    choix = `Tout les nombres qu'il avait jusqu'a ${args[1]} avec le 0 compris`
                }else{
                    if(parseFloat(args[1]) > parseFloat(args[2])){
                        let min = Math.ceil(args[2])
                        let max = Math.floor(args[1])
                        let random =  Math.floor(Math.random() * (max - min + 1)) + min
                        resultat = `**Le random number a choisi ce nombre: ${random}**`
                        choix = `Tout les nombres qu'il avait de ${args[2]} à ${args[1]}`
                    }else{
                        let min = Math.ceil(args[1])
                        let max = Math.floor(args[2])
                        let random =  Math.floor(Math.random() * (max - min + 1)) + min
                        resultat = `**Le random number a choisi ce nombre: ${random}**`
                        choix = `Tout les nombres qu'il avait de ${args[1]} à ${args[2]}`
                    }
                }
                embed.setDescription(resultat)
                embed.addField(`Les choix qu'il y avait :`,choix)
            }
        }else{
            let random = Math.floor (Math.random() * (args.length));
            let choix = args.join(" - ")
            let resultat = `**Le random a choisi ce nombre: ${args[random]}**`
            embed.setDescription(resultat)
            embed.addField(`Les choix qu'il y avait :`,choix)
        }       
        message.channel.send({ embeds: [embed] })
    }
}