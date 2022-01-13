"use strict";
import { readdirSync, statSync } from "fs";
export default class {
    constructor(client) {
        this.client = client;
    };
    async execute() {
        const commands = readdirSync('./cmds/').filter(file => file.endsWith(".js"));
        if(commands.length == 0){
            console.log("No commande is detected")
        }else{
            let i = 1;
            for (const file of commands) {
                try{
                    let stats = statSync(`./cmds/${file}`);
                    const command = new (await import(`../cmds/${file}#${stats.mtimeMs}`)).default(this);
                    this.client.commands.set(command.name, file);
                    console.log(`${i}- Loaded ${file} command.`);
                }catch(err){
                    console.log(`${i}- Can't load this file : ${file}`);
                    import("./../functions/log.js").then(x => {
                        let msg =  " Type: \""+ err.name+"\" Message: \""+err.message+"\" Full message:\n"+err.stack+"\n"
                        x.default.execute(msg, "LoadCmd.txt", true)
                    })
                }
                i++
            }
            console.log("-- All the commands were loaded. --")
        } 
    };
}