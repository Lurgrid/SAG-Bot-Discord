"use strict";
export default class {
    constructor(client){
        this.client = client
    }
    name = "reload rl"
    async execute(message, args, config, file) {
        if(message.deletable) await message.delete()
        this.client.commands.clear()
        console.log("-- RELOAD OF ALL COMMANDS --")
        const LoadCmds = new (await import(`./../functions/LoadCmds.js`)).default(this.client);
        LoadCmds.execute();
    }
}