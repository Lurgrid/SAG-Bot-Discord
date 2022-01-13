"use strict";
import { writeFileSync } from 'fs'
import { MessageEmbed } from 'discord.js'

export default class {
    constructor(client){
        this.client = client
    }
    name = "spam"
    async execute(message, args, config, file) {
      if (message.deletable) message.delete();
      const sleep = async (ms) => await new Promise(r => setTimeout(r, ms));
      if(args[0] !== undefined && args[0].toLowerCase() == "set"){
        config.spam = args.slice(1).join(" ")
        writeFileSync(`./cmds/${file.slice(0, -3)}.config.json`, JSON.stringify(config, null , 4));
        return
      }
      if(isNaN(args[0])){
        let bug2 = new MessageEmbed()
          .setDescription("**Veuillez mettre un ou des nombre**")
          .setFooter(`By Lurgrid φ`,`${this.client.user.avatarURL()}`);
        message.channel.send({ embeds: [bug2] })
        return
      }
      for(let i = 0; i < args[0]; i++){
        await message.channel.send({ content: config.spam})
        await sleep(850)
      }
    }
}