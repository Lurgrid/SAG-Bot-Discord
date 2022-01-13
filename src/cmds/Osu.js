import { MessageEmbed } from 'discord.js';
import { readdirSync, readFileSync } from 'fs';
import { Api } from 'node-osu'
import { statSync } from 'fs';

"use strict";
export default class {
    constructor(client){
        this.client = client
    }
    name = "osu"
    async execute(message, args, config, file) {
        if (message.deletable) message.delete();
        let monOsu = JSON.parse(readFileSync('./config/Osu.json'));
        const osuApi = new Api(monOsu.key, {
            notFoundAsError: true, // Throw an error on not found instead of returning nothing. (default: true)
            completeScores: true, // When fetching scores also fetch the beatmap they are for (Allows getting accuracy) (default: false)
            parseNumeric: false // Parse numeric values into numbers/floats, excluding ids
        });
        if (args[0] !== undefined && readdirSync("./cmds/Osu/").filter(file => file == args[0].toLowerCase()+".js")) {
            let stats = statSync(`./cmds/Osu/${args[0].toLowerCase()}.js`);
            const command = new (await import(`../cmds/Osu/${args[0].toLowerCase()+".js"}#${stats.mtimeMs}`)).default(this.client);  
            command.execute(message, args, osuApi).catch(err => {
                import("./../functions/log.js").then(x => {
                    let msg =  " Type: \""+ err.name+"\" Message: \""+err.message+"\" Full message:\n"+err.stack+"\n"
                    x.default.execute(msg, "osu.txt", true)
                })
            })  
        }else{
            let connectt
            if(osuApi.apiKey !== undefined) {
                connectt = "Le bot est bien connecter a l'API de Osu"
            }else{
                connectt = "Le bot est pas connecter a l'API de Osu !"
            }

        let embed = new MessageEmbed()
        .setAuthor(`𝐎𝐬𝐮 : 𝐂𝐨𝐦𝐦𝐚𝐧𝐝𝐬 𝘽𝙮 𝙇𝙪𝙧𝙜𝙧𝙞𝙙`)
        .setColor(this.client.config.color)
        .setDescription(connectt)
        .setImage('https://cdn.discordapp.com/attachments/600516263952777218/847901170503516170/steamuserimages-a.akamaihd.net.gif')
        .setTimestamp()
        .setFooter(`By Lurgrid φ`,`${this.client.user.avatarURL()}`);

        const commands = await readdirSync("./cmds/Osu/")
        for(const cmd of commands){
            embed.addField(`${this.client.config.prefix}Osu ${cmd.slice(0, -3)} [OsuUser]`,'\u200b')
        }

        message.channel.send({ embeds: [embed] })
        }
    }
}