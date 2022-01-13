"use strict";

import { readFileSync } from 'fs';

export default class {
    constructor(client) {
        this.client = client;
    };
    async execute(member) {
        const ServData = await JSON.parse(readFileSync(`./database/server/${member.guild.id}/config.json`, 'utf8'))
        if(ServData.message_leave != false){
            let random = Math.floor (Math.random() * (ServData.message_leave.msg.length));
            member.guild.channels.cache.get(ServData.message_leave.channel).send(ServData.message_leave.msg[random].replace("[USER]", `**${member.user.tag}**`))
        }
    };
}