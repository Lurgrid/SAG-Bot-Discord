"use strict";

import { rmSync} from 'fs';

export default class {
    constructor(client) {
        this.client = client;
    };
    async execute(guild) {
        rmSync(`./database/server/${guild.id}`,  { recursive: true, force: true })
        const date = new (await import(`./../functions/FullDate.js`)).default();
        let msglog = `${await date.execute()} ${this.client.user.tag} leave ${guild.name}`
        console.log(msglog)
        import("./../functions/log.js").then(x => {
            x.default.execute(msglog, "LOG.txt", false)
        })
    };
}