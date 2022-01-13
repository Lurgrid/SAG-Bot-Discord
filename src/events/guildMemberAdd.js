"use strict";

import { readFileSync } from 'fs';

export default class {
    constructor(client) {
        this.client = client;
    };
    async execute(member) {
        const ServData = await JSON.parse(readFileSync(`./database/server/${member.guild.id}/config.json`, 'utf8'))
        if(ServData.auto_role != false){
            await member.roles.add(ServData.auto_role)
            let msglog = `[${member.guild.name}] Role add at ${member.user.tag}`
            console.log(msglog)
            import("./../functions/log.js").then(x => {
                x.default.execute(msglog, "LOG.txt", true)
            }) 
        }
        if(ServData.message_join != false){
            let random = Math.floor (Math.random() * (ServData.message_join.msg.length));
            member.guild.channels.cache.get(ServData.message_join.channel).send(ServData.message_join.msg[random].replace("[USER]", `<@!${member.user.id}>`))
        }
    };
}