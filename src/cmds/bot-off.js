"use strict";
export default class {
    constructor(client){
        this.client = client
    }
    name = "bot-off";
    async execute(message, args, config, file) {
        if (message.deletable) message.delete();
        const log = await import(`./../functions/log.js`)
        const sleep = async (ms) => await new Promise(r => setTimeout(r, ms));
        log.default.execute(`-- BOT OFF BY ${message.author.tag} --`, "LOG.txt", true)
        await sleep(1000)
        process.exit(2);
    }
}