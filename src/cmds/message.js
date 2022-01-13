import { writeFileSync } from 'fs';

"use strict";
export default class {
    constructor(client){
        this.client = client
    }
    name = "message msg"
    async execute(message, args, config, file) {
      if (message.deletable) message.delete();
      if(args[0] != undefined && args[0].toLowerCase() == "set"){
        config.message = args.slice(1).join(" ")
        writeFileSync(`./cmds/${file.slice(0, -3)}.config.json`, JSON.stringify(config, null , 4));
        return
      }
      message.channel.send(config.message)
    }
}