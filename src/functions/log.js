"use strict";
import { createWriteStream } from "fs";
export default {
    async execute(msg, file, para) {
        const date = new (await import(`./../functions/FullDate.js`)).default();
        var stream = createWriteStream("./log/"+file, {flags: 'a'})
        const time = await date.execute()
        stream.once('open', x => {
            if(para){
                stream.write(time +" "+ msg+ "\n");
            }else{
                stream.write(msg+ "\n");
            }
        })
    }
}