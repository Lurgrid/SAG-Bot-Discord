"use strict";

import { MessageEmbed } from "discord.js";

export default class {
    constructor(client){
        this.client = client
    }
    name = "ping"

    async execute(message, args, config, file) {
    if (message.deletable) message.delete();
    const embed = new MessageEmbed()
        .setAuthor(`The ping to the discord API is ${Math.round(this.client.ws.ping)}ms`)
        .setColor("#36393f")
    message.channel.send({ embeds: [embed]});
    }

}