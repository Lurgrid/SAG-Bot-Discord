"use strict";
import { MessageEmbed } from 'discord.js'
import { readFileSync, writeFileSync } from 'fs'

export default class {
    constructor(client){
        this.client = client
    }
    name = "grid";
    async execute(message, args, config, file) {
        if (message.deletable) message.delete();
        let tmp, tmpNB
        // ------- Set Serveur ------- //
        let Serv = message.guild
        tmp = args.find(arg => arg.toLowerCase() == "-serv")
        tmpNB = args.indexOf(tmp) + 1
        if(tmp){
            Serv = this.client.guilds.cache.get(args[tmpNB])
            if(Serv === undefined){
                const errserv = new MessageEmbed()
                    .setTitle("Veuillez mettre une ID de serveur valide")
                    .setDescription(message.content);
                message.author.send({ embeds: [errserv] })
                return 
            }
        }
        // ------- Set Serveur ------- //

        // ------- Set User ------- //
        let User = message.author.id
        tmp = args.find(arg => arg.toLowerCase() === "-user")
        tmpNB = args.indexOf(tmp) + 1
        if(tmp){
            if(this.client.users.cache.get(args[tmpNB]) === undefined){
                const erruser = new MessageEmbed()
                .setTitle("Veuillez mettre une ID de user valide")
                .setDescription(message.content);
                message.author.send({ embeds: [erruser] })
                return 
            }else{
                User = args[tmpNB]
            }
        }
        // ------- Set User ------- //

        // ------- Set Channel ------- //
        let Channel = undefined
        tmp = args.find(arg => arg.toLowerCase() === "-channel")
        tmpNB = args.indexOf(tmp) + 1
        if(tmp){
            if(Serv.channels.cache.get(args[tmpNB]) === undefined){
                const erruser = new MessageEmbed()
                .setTitle("Veuillez mettre une ID de channel valide")
                .setDescription(message.content);
                message.author.send({ embeds: [erruser] })
                return 
            }else{
                Channel = args[tmpNB]
            }
        }
        // ------- Set Channel ------- //

        // ------- Set Role ------- //
        let Grade = undefined
        tmp = args.find(arg => arg.toLowerCase() === "-grade")
        tmpNB = args.indexOf(tmp) + 1
        if(tmp){
            if(Serv.roles.cache.get(args[tmpNB]) === undefined){
                const erruser = new MessageEmbed()
                .setTitle("Veuillez mettre une ID de grade valide")
                .setDescription(message.content);
                message.author.send({ embeds: [erruser] })
                return 
            }else{
                Grade = args[tmpNB]
            }
        }
        // ------- Set Role ------- //

        // ------- Command ------- //
        tmp = args.find(arg => arg.toLowerCase() == "-ac")
        if(tmp == undefined){
            const erraction = new MessageEmbed()
                .setTitle("Veuillez mettre une action")
                .setDescription(message.content);
            message.author.send({ embeds: [erraction] })
            return 
        }
        tmpNB = args.indexOf(tmp) + 1
        if( args[tmpNB] === undefined) args[tmpNB] = ""
        if(args[tmpNB].toLowerCase() === "voice"){
            tmpNB++
            if( args[tmpNB] === undefined) args[tmpNB] = ""
            if (Serv === null){
                const errserv = new MessageEmbed()
                    .setTitle("Veuillez mettre une ID de serveur vu que nous somme dans des MP")
                    .setDescription(message.content);
                message.author.send({ embeds: [errserv] })
                return 
            }
            switch(args[tmpNB].toLowerCase()){
                case "kick":
                    Serv.members.cache.get(User).voice.disconnect()
                    return
                case "move":
                    if(Channel === undefined){
                        const errchannel = new MessageEmbed()
                            .setTitle("Veuillez mettre une ID de channel")
                            .setDescription(message.content);
                        message.author.send({ embeds: [errchannel] })
                        return 
                    }
                    Serv.members.cache.get(User).voice.setChannel(Channel).catch(err => {
                        const errus = new MessageEmbed()
                            .setTitle("Le User selectionné n'est pas dans un channel vocal")
                            .setDescription(message.content);
                        message.author.send({ embeds: [errus] })
                    })
                    return
                default:
                    const errchannel = new MessageEmbed()
                            .setTitle("Veuillez mettre une sous action valide")
                            .setDescription(message.content);
                        message.author.send({ embeds: [errchannel] })
                        return
            }
        }else if(args[tmpNB].toLowerCase() === "serv"){
            tmpNB++
            if (User === message.author.id){
                const errus = new MessageEmbed()
                    .setTitle("Vous ne pouvez pas vous kick/ban")
                    .setDescription(message.content);
                message.author.send({ embeds: [errus] })
                return
            }
            if (Serv === null){
                const errserv = new MessageEmbed()
                    .setTitle("Veuillez mettre une ID de serveur vu que nous somme dans des MP")
                    .setDescription(message.content);
                message.author.send({ embeds: [errserv] })
                return 
            }
            switch(args[tmpNB].toLowerCase()){
                case "kick":
                    Serv.members.cache.get(User).kick("Wola c une très bonne raison").catch(err => {
                        const errus = new MessageEmbed()
                            .setTitle("Missing Permission du BOT")
                            .setDescription(message.content);
                        message.author.send({ embeds: [errus] })
                    })
                    return
                case "ban":
                    Serv.members.cache.get(User).ban("Wola c une très bonne raison").catch(err => {
                        const errus = new MessageEmbed()
                            .setTitle("Missing Permission du BOT")
                            .setDescription(message.content);
                        message.author.send({ embeds: [errus] })
                    })
                default:
                    const errchannel = new MessageEmbed()
                            .setTitle("Veuillez mettre une sous action valide")
                            .setDescription(message.content);
                        message.author.send({ embeds: [errchannel] })
                        return
            }
        }else if(args[tmpNB].toLowerCase() === "grade"){
            if(Grade === undefined){
                const errus = new MessageEmbed()
                    .setTitle("Veuillez mettre une ID de grade")
                    .setDescription(message.content);
                message.author.send({ embeds: [errus] })
                return
            }
            if (Serv === null){
                const errserv = new MessageEmbed()
                    .setTitle("Veuillez mettre une ID de serveur vu que nous somme dans des MP")
                    .setDescription(message.content);
                message.author.send({ embeds: [errserv] })
                return 
            }
            tmpNB++
            switch(args[tmpNB].toLowerCase()){
                case "add":
                    Serv.members.cache.get(User).roles.add(Grade).catch(err => {
                        const errus = new MessageEmbed()
                            .setTitle("Missing Permission du BOT")
                            .setDescription(message.content);
                        message.author.send({ embeds: [errus] })
                    })
                    return
                case "remove":
                    Serv.members.cache.get(User).roles.remove(Grade).catch(err => {
                        const errus = new MessageEmbed()
                            .setTitle("Missing Permission du BOT")
                            .setDescription(message.content);
                        message.author.send({ embeds: [errus] })
                    })
                    return
                default:
                    const errchannel = new MessageEmbed()
                            .setTitle("Veuillez mettre une sous action valide")
                            .setDescription(message.content);
                    message.author.send({ embeds: [errchannel] })
                    return
            }
        }else if(args[tmpNB].toLowerCase() === "activity"){
            tmpNB++
            let config = JSON.parse(readFileSync('./config/client.json', 'utf8'));
            switch(args[tmpNB].toLowerCase()){
                case "set":
                    args = args.slice(tmpNB+1)
                    this.client.config.activity = args.join(" ")
                    config.activity = args.join(" ")
                    await writeFileSync('./config/client.json', JSON.stringify(config, null , 4));
                    this.client.user.setActivity(this.client.config.activity, { type: "LISTENING" });
                    
                    return
                case "remove":
                    this.client.config.activity = ""
                    config.activity = ""
                    await writeFileSync('./config/client.json', JSON.stringify(config, null , 4));
                    this.client.user.setActivity(this.client.config.activity);
                    return
                default:
                    const errchannel = new MessageEmbed()
                            .setTitle("Veuillez mettre une sous action valide")
                            .setDescription(message.content);
                    message.author.send({ embeds: [errchannel] })
                    return
            }
        }else{
            const erracti = new MessageEmbed()
                .setTitle("Veuillez mettre une action valide")
                .setDescription(message.content);
            message.author.send({ embeds: [erracti] })
            return
        }
        // ------- Command ------- //
    }
}