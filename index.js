const Discord = require("discord.js");
Client = Discord.Client;
Intents = Discord.Intents;
const fs = require('fs');
var monJson = JSON.parse(fs.readFileSync('./storage/settings.json', 'utf8'));
var prefix = monJson.luluinfo.prefix
const token = monJson.luluinfo.token

const myIntents = new Intents();
var bot = new Client({ intents: [
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
], partials: ["CHANNEL", "USER"]});

bot.on('ready', () => {
    var ladate=new Date() 
        var h=ladate.getHours();
        if (h<10) {h = "0" + h}
        var m=ladate.getMinutes();
        if (m<10) {m = "0" + m}
        var s=ladate.getSeconds();
        if (s<10) {s = "0" + s}
        var j=ladate.getDate();
        if(j<10) {j = "0" + j}
        var M=ladate.getMonth() + 1
        if (M<10) {M = "0" + M }
        var a=ladate.getFullYear();
    console.log(`[${h}:${m}:${s} | ${j}/${M}/${a}] connecté en tant que ${bot.user.tag}`);
    fs.writeFileSync('./storage/settings.json', JSON.stringify(monJson, null , 4));
            bot.user.setActivity(monJson.luluinfo.stream, { type: "LISTENING" })
            bot.user.setStatus("idle")
});

bot.commands = new Discord.Collection();

function loadCmds() {
    fs.readdir("./cmds/", (err, files) => {
        if(err) console.error(err);
        var jsFiles = files.filter(f => f.split(".").pop() === "js");
        if(jsFiles.length <= 0) {
            console.log("Aucune commande a chargé.")
            return;
        }
        console.log(`${jsFiles.length} commandes chargées.`);
        jsFiles.forEach((f, i) => {
            delete require.cache[require.resolve(`./cmds/${f}`)];
            var props = require(`./cmds/${f}`)
            console.log(`${i +1}: ${f} charger`)
            let c = props.help.name
            bot.commands.set(props.help.name, {props , f, c});
        })
    })
}; 

loadCmds()

function ReloadRun(Cfile, bot , message , args) {
    if(Cfile === undefined){f = undefined}else{f = Cfile.f}
    var ladate=new Date() 
        var h=ladate.getHours();
        if (h<10) {h = "0" + h}
        var m=ladate.getMinutes();
        if (m<10) {m = "0" + m}
        var s=ladate.getSeconds();
        if (s<10) {s = "0" + s}
        var j=ladate.getDate();
        if(j<10) {j = "0" + j}
        var M=ladate.getMonth() + 1
        if (M<10) {M = "0" + M }
        var a=ladate.getFullYear();
    fs.readdir("./cmds/", (err, files) => {
        if(err) console.error(err);
        var jsFiles = files.filter(x => x === `${f}`);
        if(jsFiles.length === 0) {
            if (message.guildId === null){
            console.log(`Aucune commande n'était trouvée. [${h}:${m}:${s} | ${j}/${M}/${a}][${message.author.tag}][Message Private] Message: ${message}`)
            }else{
            console.log(`Aucune commande n'était trouvée. [${h}:${m}:${s} | ${j}/${M}/${a}][${message.author.tag}][${message.guild.name}/${message.channel.name}] Message: ${message}`)
            }
        }else{
        jsFiles.forEach((x) => {
            delete require.cache[require.resolve(`./cmds/${x}`)];
            var props = require(`./cmds/${x}`)
            if (message.guildId === null){
            console.log(`${x} re-charger et excuter. [${h}:${m}:${s} | ${j}/${M}/${a}][${message.author.tag}][Message Private] Message: ${message}`)
            }else{
            console.log(`${x} re-charger et excuter. [${h}:${m}:${s} | ${j}/${M}/${a}][${message.author.tag}][${message.guild.name}/${message.channel.name}] Message: ${message}`)
            }
            let c = props.help.name
            bot.commands.set(props.help.name, {props, f, c})
            var cmd = bot.commands.get(Cfile.c)
            cmd["props"].run(bot, message, args)
        })}
    })
};
bot.on("voiceStateUpdate",(oldState, newState) => {
    var monJson = JSON.parse(fs.readFileSync('./storage/settings.json', 'utf8'));
    const Json = new Map(Object.entries(monJson.serv));
    let voice = Json.get(oldState.guild.id).Voice
    if(voice == false) return
    if(voice.MarvinServ2.find(element => element[0] === oldState.channelId) !== undefined){
    if(voice.MarvinServ2.find(element => element[0] === oldState.channelId)[1]){
        if(oldState.channel !== null){
            setTimeout(() => {
                oldState.channel.delete().catch(err => console.log("bug salon delete"))
            }, 500);}
        let x = voice.MarvinServ2.indexOf(voice.MarvinServ.find(element => element[0] === oldState.channelId))
        voice.MarvinServ2.splice(x, 1)
        fs.writeFileSync('./storage/settings.json', JSON.stringify(monJson, null , 4))
    }else{
    voice.MarvinServ2.forEach(x => {
        if(x[1]){
        if(oldState.guild.channels.cache.find(element => element.id == x[0]).members.size == 0){
            oldState.guild.channels.cache.find(element => element.id == x[0]).delete().catch(err => console.log("bug salon delete"))
            let z = voice.MarvinServ2.indexOf(voice.MarvinServ2.find(element => element[0] === x[0]))
            voice.MarvinServ2.splice(z, 1)
            fs.writeFileSync('./storage/settings.json', JSON.stringify(monJson, null , 4))
        }
    }})
}
}
    if(voice.MarvinServ.find(element => element[0] === oldState.channelId) !== undefined){
        Member2 = oldState.guild.members.cache.find(element => element.id === oldState.id)
        if(oldState.channel.permissionOverwrites.cache.get(Member2.id) === undefined){}else{oldState.channel.permissionOverwrites.delete(Member2.id).catch(err => console.log("bug salon delete"))}
        if(oldState.channel.members.size === 0){
            if(voice.MarvinServ.find(element => element[0] === oldState.channelId)[2]){
                if(oldState.channel !== null){
                    setTimeout(() => {
                        oldState.channel.delete().catch(err => console.log("bug salon delete"))
                    }, 500);}
                let x = voice.MarvinServ.indexOf(voice.MarvinServ.find(element => element[0] === oldState.channelId))
                voice.MarvinServ.splice(x, 1)
                fs.writeFileSync('./storage/settings.json', JSON.stringify(monJson, null , 4))
            }else{
                voice.MarvinServ.forEach(x => {
                    if(x[2]){
                    if(oldState.guild.channels.cache.find(element => element.id == x[0]).members.size == 0){
                        if(oldState.guild.channels.cache.find(element => element.id == x[0]) !== null){
                        oldState.guild.channels.cache.find(element => element.id == x[0]).delete().catch(err => console.log("bug salon delete"))}
                        let z = voice.MarvinServ.indexOf(voice.MarvinServ.find(element => element[0] === x[0]))
                        voice.MarvinServ.splice(z, 1)
                        fs.writeFileSync('./storage/settings.json', JSON.stringify(monJson, null , 4))
                    }
                }})
            oldState.guild.channels.create(voice.MarvinServ.find(element => element[0] === oldState.channelId)[1], {type: 'GUILD_VOICE' ,parent: "843135489414660097",position: oldState.channel.position, bitrate: 96000, userLimit: 1})
            .then(channel => {
                if(oldState.channel !== null){
                setTimeout(() => {
                    oldState.channel.delete().catch(err => console.log("bug salon delete"))
                }, 500);}
                voice.MarvinServ.find(element => element[0] === oldState.channelId).splice(0 , 1 , channel.id)
                fs.writeFileSync('./storage/settings.json', JSON.stringify(monJson, null , 4))
            })}}}
    const fullchannel = (currentValue) => newState.guild.channels.cache.get(currentValue[0]).members.size > 0

    if(voice.MarvinServ2.every(fullchannel)){
        let y = newState.guild.channels.cache.find(element => element.id == voice.MarvinServ2[voice.MarvinServ2.length - 1][0])
        let p = y.position + 0
       newState.guild.channels.create(`🎮- Jeux #${voice.MarvinServ2.length + 1}`, {type: 'GUILD_VOICE' ,parent: "843135489414660097",position: p, bitrate: 96000})
       .then(channel => {
        voice.MarvinServ2.push([channel.id, true])
        fs.writeFileSync('./storage/settings.json', JSON.stringify(monJson, null , 4))
       })
    }
    if(voice.MarvinServ.every(fullchannel)){
        let y = newState.guild.channels.cache.find(element => element.id == voice.MarvinServ[voice.MarvinServ.length - 1][0])
        let p = y.position + 1
       newState.guild.channels.create(`❌-Privé #${voice.MarvinServ.length + 1}`, {type: 'GUILD_VOICE' ,parent: "843135489414660097",position: p, bitrate: 96000, userLimit: 1})
       .then(channel => {
        voice.MarvinServ.push([channel.id, channel.name, true])
        fs.writeFileSync('./storage/settings.json', JSON.stringify(monJson, null , 4))
       })
    }
    if(voice.MarvinServ.find(element => element[0] === newState.channelId) !== undefined){
    Member = newState.guild.members.cache.find(element => element.id === newState.id)
    if(newState.channel.members.size === 1 && voice.MarvinServ.find(element => element[0] === newState.channelId)){
        newState.channel.permissionOverwrites.create(Member.id, { MANAGE_CHANNELS: true, MUTE_MEMBERS: true, DEAFEN_MEMBERS: true, MOVE_MEMBERS: true, MANAGE_ROLES: true});
    }}
})
bot.on("guildCreate", guild => {
    var ladate=new Date() 
        var h=ladate.getHours();
        if (h<10) {h = "0" + h}
        var m=ladate.getMinutes();
        if (m<10) {m = "0" + m}
        var s=ladate.getSeconds();
        if (s<10) {s = "0" + s}
        var j=ladate.getDate();
        if(j<10) {j = "0" + j}
        var M=ladate.getMonth() + 1
        if (M<10) {M = "0" + M }
        var a=ladate.getFullYear();
    monJson.serv[guild.id] = {"Mute": false,"Join": {"Active": false,"Channel": false,"Grade": false,"Msg": false},"Voice": false}
    fs.writeFileSync('./storage/settings.json', JSON.stringify(monJson, null , 4))
    console.log(`[${h}:${m}:${s} | ${j}/${M}/${a}][${guild.name}] LE BOT A REJOIN LE SERVEUR`)
})
bot.on("guildMemberAdd", member => {
    var monJson = JSON.parse(fs.readFileSync('./storage/settings.json', 'utf8'));
    const Json = new Map(Object.entries(monJson.serv));
    let Join = Json.get(member.guild.id).Join
    if(Join.Active === false) return
    var ladate=new Date() 
        var h=ladate.getHours();
        if (h<10) {h = "0" + h}
        var m=ladate.getMinutes();
        if (m<10) {m = "0" + m}
        var s=ladate.getSeconds();
        if (s<10) {s = "0" + s}
        var j=ladate.getDate();
        if(j<10) {j = "0" + j}
        var M=ladate.getMonth() + 1
        if (M<10) {M = "0" + M }
        var a=ladate.getFullYear();
        if(Join.Msg !== false && Join.Channel !== false){
            member.guild.channels.cache.get(Join.Channel).send(`<@!${member.user.id}> ` + Join.Msg).catch(`[${h}:${m}:${s} | ${j}/${M}/${a}][${member.guild.name}] ERROR SEND MESSAGE`)
        }
        if(Join.Grade !== false){
            member.roles.add(Join.Grade).then(console.log(`[${h}:${m}:${s} | ${j}/${M}/${a}][${member.guild.name}] ` + 'Role added at : ' + member.user.tag)).catch(`[${h}:${m}:${s} | ${j}/${M}/${a}][${member.guild.name}] ERROR ADD ROLE`);
        }
})

bot.on('messageCreate', message => {
    if(message.author.bot)return
    var monJson = JSON.parse(fs.readFileSync('./storage/settings.json', 'utf8'));
    var prefix = monJson.luluinfo.prefix
    var messageA = message.content
    var messageArray = messageA.split(/\s+/g);
    var args = messageArray.slice(1);
    var command = messageArray[0].toLowerCase()
    var Commande = command.slice(prefix.length)
    if (message.guildId === null && message.author.id !== monJson.luluinfo.owner[0]){
        var msg = args.slice(1).join(" ")
        let liste = []
        if(message.attachments !== undefined){
            message.attachments.forEach(element => {
                liste.push(element.proxyURL)
            })
        msg = messageA +" "+liste.join(" ")
        }
        bot.users.fetch(monJson.luluinfo.owner[0], false).then(x => {
            x.send({ content: `<@!${message.author.id.toString()}>`})
            x.send({ content: msg.toString()})
          })
    }
    if(!command.startsWith(prefix)) return;
    if (Commande === 'reload'){
        if (message.author.id !== monJson.luluinfo.owner[0]) return;
        if (message.deletable) message.delete();
        bot.commands = new Discord.Collection();
        loadCmds()
        console.log("RELOAD TERMINER")
        return;
    }
    var Cfile = bot.commands.find(element => element["props"].help.name.split(/\s+/g).includes(Commande))
    ReloadRun(Cfile , bot , message, args)
})

bot.login(token);