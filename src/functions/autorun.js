"use strict";
import { readdirSync } from "fs";
export default class {
    constructor(client) {
        this.client = client;
    };
    async execute() {
        const autoruns = readdirSync('./autoruns/').filter(file => file.endsWith(".js"));
        if(autoruns.length != 0){
            let i = 1
            for (const file of autoruns) {
                let msglog
                try{
                    let error = true 
                    const autorun = new (await import(`../autoruns/${file}`)).default(this.client);
                    await autorun.execute()
                    msglog = `Successful execution of the autorun: ${file}`
                    console.log(i+"- "+msglog)
                }catch(err){
                    msglog = `Failure of autorun execution: ${file}`
                    console.log(i+"- "+msglog)
                    import("./../functions/log.js").then(x => {
                        let msg =  " Type: \""+ err.name+"\" Message: \""+err.message+"\" Full message:\n"+err.stack+"\n"
                        x.default.execute(msg, "autoruns_error.txt", true)
                    })
                }
                import("./../functions/log.js").then(x => {
                    x.default.execute(msglog, "LOG.txt", true)
                })
                i++
            }
            console.log("-- All the autoruns were loaded. --")
        }else{
            import("./../functions/log.js").then(x => {
                x.default.execute("No autorun", "autoruns.txt", true)
            }) 
        }
    };
}