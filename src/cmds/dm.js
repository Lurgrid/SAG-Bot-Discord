"use strict";
import { MessageEmbed } from 'discord.js'

export default class {
    constructor(client){
        this.client = client
    }
    name = "dm";
    async execute(message, args, config, file) {
        if (message.deletable) message.delete();
        const user = await this.client.users.fetch(args[0])
        if (user === undefined){
          const embed = new MessageEmbed()
            .setAuthor("Please put the id of a user")
          message.author.send({embeds: [embed]})
          return
        }
        let msg = args.slice(1).join(" ")
        let liste = []
        if(message.attachments !== undefined){
          message.attachments.forEach(element => {
            liste.push(element.proxyURL)
          })
          msg += " "+liste.join(" ")
        }
        user.send({ content: msg.toString()})
    }
}