"use strict"
import {statSync, readFileSync} from 'fs'
export default class {
    constructor(client) {
        this.client = client;
    };
    async execute(message) {
        if(message.author.bot) return;
        let msg = message.content.split(" ");
        let cmd = msg[0].slice(this.client.config.prefix.length).toLowerCase();
        let args = msg.slice(1);
        if (message.guildId === null && message.author.id !== this.client.config.admin[0]){
            let dm = message.content
            let liste = []
            if(message.attachments !== undefined){
                message.attachments.forEach(element => {
                    liste.push(element.proxyURL)
                })
                dm += " "+liste.join(" ")
            }
            this.client.users.fetch(this.client.config.admin[0]).then(x => {
                x.send({ content: `<@!${message.author.id.toString()}> - ${message.author.id.toString()} - ${message.author.tag}`})
                x.send({ content: dm.toString()})
              })
        }
        if(!message.content.startsWith(this.client.config.prefix)) return;
        if(cmd == "") cmd = undefined
        const date = new (await import(`./../functions/FullDate.js`)).default();
        const getcmd = Array.from(this.client.commands.keys()).find(element => element.includes(cmd));
        if (getcmd == undefined){
            if (message.guildId === null){
                console.log(`No command was executed. ${await date.execute()}[${message.author.tag}][Message Private] Message: ${message}`)
                }else{
                console.log(`No command was executed. ${await date.execute()}[${message.author.tag}][${message.guild.name}/${message.channel.name}] Message: ${message}`)
                }
            return
        }
        const file = this.client.commands.get(getcmd);
        let msglog = `${file} was executed. ${await date.execute()}[${message.author.tag}]`
        let config = true
        let allow = true
        try{
            config = await JSON.parse(readFileSync(`./cmds/${file.slice(0, -3)}.config.json`, 'utf8'))

            const verif = (config) => {
                if(config.authorization.allow.users.includes(message.author.id)){
                    return true
                }else if(message.guild !== null && config.authorization.allow.servers.includes(message.guild.id)){
                    return true
                }
                if(this.client.config.admin.includes(message.author.id)){
                        return true
                }
                if(config.authorization.deny){
                    return false
                }
                return true
            }
            allow = verif(config)
            msglog += "[With Config File]"
        }catch(err){
            msglog += "[No Config File]"
        }
        const stats = statSync(`./cmds/${file}`);
        let cmds
        const error = await import(`./../functions/error.js`)
        let HaveError = true
        try{
            cmds = new (await import(`./../cmds/${file}#${stats.mtimeMs}`)).default(this.client)
        }catch(err){
            HaveError = {message: "ERROR when load command", file, name:"COMMAND ERROR", err}
        }
        if(!allow){
            msglog += '[PERMISSION DENIED]'
        }
        if (message.guildId === null){
            msglog += `[Message Private] Message: ${message}`
        }else{
            msglog += `[${message.guild.name}/${message.channel.name}] Message: ${message}`
        }
        console.log(msglog)
        import("./../functions/log.js").then(x => {
            x.default.execute(msglog, "LOG.txt", false)
        })

        if(!allow){
            return
        }
        await cmds.execute(message, args, config, file).catch(err => {
            HaveError = {message: "ERROR when excute command", file, name:"COMMAND ERROR", err}
        })
        if(HaveError != true){
            throw new error.error(HaveError.message, HaveError.file, HaveError.name, HaveError.err)
        }
    };
}
