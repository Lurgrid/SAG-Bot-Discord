"use strict";
export default class {
    constructor(client){
        this.client = client
    }
    name = "test";
    async execute(message, args, config, file) {
        message.reply(`Hi, I am <@!${this.client.user.id}>`)
    }
}