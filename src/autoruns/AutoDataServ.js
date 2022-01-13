"use strict";

import { readdirSync } from 'fs';

export default class {
    constructor(client) {
        this.client = client;
    };
    async execute() {
        const Dataservlist = readdirSync('./database/server/')
        const guildCreate = new (await import(`../events/guildCreate.js`)).default(this.client);
        this.client.guilds.cache.forEach(element => {
            if (!Dataservlist.includes(element.id)){
                guildCreate.execute(element)
            }
        });
    };
}