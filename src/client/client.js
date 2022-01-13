"use strict";
import { Client, Collection, GuildMember, Intents } from "discord.js";
import { readFileSync } from "fs";

let config = JSON.parse(readFileSync('./config/client.json', 'utf8'));

const myIntents = new Intents();
myIntents.add(
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Intents.FLAGS.GUILD_INTEGRATIONS,
    Intents.FLAGS.GUILD_WEBHOOKS,
    Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGE_TYPING
    );


export class client extends Client {
    constructor() {
        super({ intents: myIntents, partials: ["CHANNEL", "USER"] });
        this.config = config;
        this.commands = new Collection();
    }

    async execute() {
        const ready = new (await import(`./../events/ready.js`)).default(this);
        const messageCreate = new (await import(`./../events/messageCreate.js`)).default(this);
        const guildCreate = new (await import(`./../events/guildCreate.js`)).default(this);
        const guildDelete = new (await import(`./../events/guildDelete.js`)).default(this);
        const guildMemberAdd = new (await import(`./../events/guildMemberAdd.js`)).default(this);
        const guildMemberRemove = new (await import(`./../events/guildMemberRemove.js`)).default(this);
        const voiceStateUpdate = new (await import(`./../events/voiceStateUpdate.js`)).default(this);
        const LoadCmds = new (await import(`./../functions/LoadCmds.js`)).default(this);

        const autorun = new (await import(`./../functions/autorun.js`)).default(this);
        
        this.once('ready', (client) => {
            import("./../functions/log.js").then(x => {
                x.default.execute("-- BOT START --", "LOG.txt", true)
            })
            ready.execute(client).then(x =>{
                LoadCmds.execute(client).then(x => {
                    autorun.execute()
                })
            })
        });
        this.on('messageCreate', (client, message)=> {
            messageCreate.execute(client, message).catch(err => {
                console.log(`--- ${err.name} | file: ${err.file} | message: ${err.message} ---`)
                import("./../functions/log.js").then(x => {
                    let msg =  " Type: \""+ err.err.name+"\" Message: \""+err.err.message+"\" Full message:\n"+err.err.stack+"\n"
                    if(err.err == undefined){
                        msg =  " Type: \""+ err.name+"\" Message: \""+err.message+"\" Full message:\n"+err.stack+"\n"
                    }
                    x.default.execute(msg, "CmdError.txt", true)
                })
            })
        });
        this.on("guildCreate", guild => {
            guildCreate.execute(guild).catch(err => {
                import("./../functions/log.js").then(x => {
                    let msg =  " Type: \""+ err.name+"\" Message: \""+err.message+"\" Full message:\n"+err.stack+"\n"
                    x.default.execute(msg, "guildCreate.txt", true)
                })
            })
        });
        this.on("guildDelete", guild => {
            guildDelete.execute(guild).catch(err => {
                import("./../functions/log.js").then(x => {
                    let msg =  " Type: \""+ err.name+"\" Message: \""+err.message+"\" Full message:\n"+err.stack+"\n"
                    x.default.execute(msg, "guildDelete.txt", true)
                })
            })
        });
        this.on("guildMemberAdd", (member) => {
            guildMemberAdd.execute(member).catch(err => {
                import("./../functions/log.js").then(x => {
                    let msg =  " Type: \""+ err.name+"\" Message: \""+err.message+"\" Full message:\n"+err.stack+"\n"
                    x.default.execute(msg, "guildMemberAdd.txt", true)
                })
            })
        })
        this.on("guildMemberRemove", (member) => {
            guildMemberRemove.execute(member).catch(err => {
                import("./../functions/log.js").then(x => {
                    let msg =  " Type: \""+ err.name+"\" Message: \""+err.message+"\" Full message:\n"+err.stack+"\n"
                    x.default.execute(msg, "guildMemberRemove.txt", true)
                })
            })
        })
        this.on("voiceStateUpdate", (oldState, newState) => {
            voiceStateUpdate.execute(oldState, newState).catch(err => {
                import("./../functions/log.js").then(x => {
                    let msg =  " Type: \""+ err.name+"\" Message: \""+err.message+"\" Full message:\n"+err.stack+"\n"
                    x.default.execute(msg, "voiceStateUpdate.txt", true)
                })
            })
        })

        await this.login(config.token)
    }
}