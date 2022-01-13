"use strict";

import { readFileSync } from 'fs';

export default class {
    constructor(client) {
        this.client = client;
    };
    async execute(oldState, newState) {
        return
        const ServData = await JSON.parse(readFileSync(`./database/server/${member.guild.id}/config.json`, 'utf8'))
        if(ServData.voice == false) return
    };
}