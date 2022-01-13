"use strict";

import { mkdirSync, copyFileSync, writeFileSync } from 'fs';

export default class {
    constructor(client) {
        this.client = client;
    };
    async execute(guild) {
        mkdirSync(`./database/server/${guild.id}`)
        copyFileSync(`./database/server/default/config_serv.json`, `./database/server/${guild.id}/config.json`)
        const date = new (await import(`./../functions/FullDate.js`)).default();
        let msglog = `${await date.execute()} ${this.client.user.tag} join ${guild.name}`
        console.log(msglog)
        import("./../functions/log.js").then(x => {
            x.default.execute(msglog, "LOG.txt", false)
        })
    };
}