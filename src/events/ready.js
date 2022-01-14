"use strict";
export default class {
    constructor(client) {
        this.client = client;
    };
    async execute() {
        const date = new (await import(`./../functions/FullDate.js`)).default();
        console.log(`${await date.execute()} BOT ${this.client.user.tag} is started.`);
        this.client.user.setActivity(this.client.config.activity, { type: "LISTENING" });
        this.client.user.setStatus("idle");
    };
}