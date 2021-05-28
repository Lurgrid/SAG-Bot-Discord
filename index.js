const Discord = require("discord.js");
const fs = require('fs');
var monJson = JSON.parse(fs.readFileSync('./storage/settings.json', 'utf8'));
var prefix = monJson.luluinfo.prefix
const token = monJson.luluinfo.token

const bot = new Discord.Client();

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
            bot.user.setActivity(monJson.luluinfo.stream, {
        type: "STREAMING",
        url: "https://www.twitch.tv/Marvin est gay"
      })
});

bot.commands = new Discord.Collection();
bot.nom = new Discord.Collection();

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
            bot.commands.set(props.help.name, props);
            bot.nom.set(props.help.name, f);
        })
    })
}; 

loadCmds()

function ReloadRun(Jsp, bot , message , args) {
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
        var jsFiles = files.filter(x => x === `${Jsp}`);
        if(jsFiles.length === 0) {
            if ((message.channel.type === "dm") || (message.channel.type === "group")){
            console.log(`Aucune commande n'était trouvée. [${h}:${m}:${s} | ${j}/${M}/${a}][${message.author.tag}][Message Private] Message: ${message}`)
            }else{
            console.log(`Aucune commande n'était trouvée. [${h}:${m}:${s} | ${j}/${M}/${a}][${message.author.tag}][${message.guild.name}/${message.channel.name}] Message: ${message}`)
            }
        }else{
        jsFiles.forEach((x) => {
            delete require.cache[require.resolve(`./cmds/${x}`)];
            var props = require(`./cmds/${x}`)
            if ((message.channel.type === "dm") || (message.channel.type === "group")){
            console.log(`${x} re-charger et excuter. [${h}:${m}:${s} | ${j}/${M}/${a}][${message.author.tag}][Message Private] Message: ${message}`)
            }else{
            console.log(`${x} re-charger et excuter. [${h}:${m}:${s} | ${j}/${M}/${a}][${message.author.tag}][${message.guild.name}/${message.channel.name}] Message: ${message}`)
            }
            bot.commands.set(props.help.name, props)
            var cmd = bot.commands.get(props.help.name)
            cmd.run(bot, message, args,)
        })}
    })
};
bot.on("voiceStateUpdate",(oldMember, newMember) => {
    var monJson = JSON.parse(fs.readFileSync('./storage/settings.json', 'utf8'));
    if(monJson.MarvinServ2.find(element => element[0] === oldMember.channelID) !== undefined){
    if(monJson.MarvinServ2.find(element => element[0] === oldMember.channelID)[1]){
        if(oldMember.channel !== null){
            setTimeout(() => {
                oldMember.channel.delete().catch(err => console.log("bug salon delete"))
            }, 500);}
        let x = monJson.MarvinServ2.indexOf(monJson.MarvinServ.find(element => element[0] === oldMember.channelID))
        monJson.MarvinServ2.splice(x, 1)
        fs.writeFileSync('./storage/settings.json', JSON.stringify(monJson, null , 4))
    }else{
    monJson.MarvinServ2.forEach(x => {
        if(x[1]){
        if(oldMember.guild.channels.cache.find(element => element.id == x[0]).members.size == 0){
            oldMember.guild.channels.cache.find(element => element.id == x[0]).delete().catch(err => console.log("bug salon delete"))
            let z = monJson.MarvinServ2.indexOf(monJson.MarvinServ2.find(element => element[0] === x[0]))
            monJson.MarvinServ2.splice(z, 1)
            fs.writeFileSync('./storage/settings.json', JSON.stringify(monJson, null , 4))
        }
    }})
}
}
    if(monJson.MarvinServ.find(element => element[0] === oldMember.channelID) !== undefined){
        Member2 = oldMember.guild.members.cache.find(element => element.id === oldMember.id)
        if(oldMember.channel.permissionOverwrites.find(element => element.id === Member2.id) === undefined){}else{oldMember.channel.permissionOverwrites.find(element => element.id === Member2.id).delete().catch(err => console.log("bug salon delete"))}
        if(oldMember.channel.members.size === 0){
            if(monJson.MarvinServ.find(element => element[0] === oldMember.channelID)[2]){
                if(oldMember.channel !== null){
                    setTimeout(() => {
                        oldMember.channel.delete().catch(err => console.log("bug salon delete"))
                    }, 500);}
                let x = monJson.MarvinServ.indexOf(monJson.MarvinServ.find(element => element[0] === oldMember.channelID))
                monJson.MarvinServ.splice(x, 1)
                fs.writeFileSync('./storage/settings.json', JSON.stringify(monJson, null , 4))
            }else{
                monJson.MarvinServ.forEach(x => {
                    if(x[2]){
                    if(oldMember.guild.channels.cache.find(element => element.id == x[0]).members.size == 0){
                        if(oldMember.guild.channels.cache.find(element => element.id == x[0]) !== null){
                        oldMember.guild.channels.cache.find(element => element.id == x[0]).delete().catch(err => console.log("bug salon delete"))}
                        let z = monJson.MarvinServ.indexOf(monJson.MarvinServ.find(element => element[0] === x[0]))
                        monJson.MarvinServ.splice(z, 1)
                        fs.writeFileSync('./storage/settings.json', JSON.stringify(monJson, null , 4))
                    }
                }})
            oldMember.guild.channels.create(monJson.MarvinServ.find(element => element[0] === oldMember.channelID)[1], {type: "voice" ,parent: "843135489414660097",position: oldMember.channel.position, bitrate: 96000, userLimit: 1})
            .then(channel => {
                if(oldMember.channel !== null){
                setTimeout(() => {
                    oldMember.channel.delete().catch(err => console.log("bug salon delete"))
                }, 500);}
                monJson.MarvinServ.find(element => element[0] === oldMember.channelID).splice(0 , 1 , channel.id)
                fs.writeFileSync('./storage/settings.json', JSON.stringify(monJson, null , 4))
            })}}}   
    const fullchannel = (currentValue) => newMember.guild.channels.cache.find(element => element.id === currentValue[0]).members.size > 0
    if(monJson.MarvinServ2.every(fullchannel)){
        let y = newMember.guild.channels.cache.find(element => element.id == monJson.MarvinServ2[monJson.MarvinServ2.length - 1][0])
        let p = y.position + 0
       newMember.guild.channels.create(`🎮- Jeux #${monJson.MarvinServ2.length + 1}`, {type: "voice" ,parent: "843135489414660097",position: p, bitrate: 96000})
       .then(channel => {
        monJson.MarvinServ2.push([channel.id, true])
        fs.writeFileSync('./storage/settings.json', JSON.stringify(monJson, null , 4))
       })
    }
    if(monJson.MarvinServ.every(fullchannel)){
        let y = newMember.guild.channels.cache.find(element => element.id == monJson.MarvinServ[monJson.MarvinServ.length - 1][0])
        let p = y.position + 1
       newMember.guild.channels.create(`❌-Privé #${monJson.MarvinServ.length + 1}`, {type: "voice" ,parent: "843135489414660097",position: p, bitrate: 96000, userLimit: 1})
       .then(channel => {
        monJson.MarvinServ.push([channel.id, channel.name, true])
        fs.writeFileSync('./storage/settings.json', JSON.stringify(monJson, null , 4))
       })
    }
    if(monJson.MarvinServ.find(element => element[0] === newMember.channelID) !== undefined){
    Member = newMember.guild.members.cache.find(element => element.id === newMember.id)
    if(newMember.channel.members.size === 1 && monJson.MarvinServ.find(element => element[0] === newMember.channelID)){
        newMember.channel.updateOverwrite(Member.id, { MANAGE_CHANNELS: true, MUTE_MEMBERS: true, DEAFEN_MEMBERS: true, MOVE_MEMBERS: true, MANAGE_ROLES_OR_PERMISSIONS: true, MANAGE_ROLES: true});
    }}
})

bot.on("guildMemberAdd", member => {
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
    member.roles.add('285326610477875200').then(console.log(`[${h}:${m}:${s} | ${j}/${M}/${a}] ` + 'Role added at : ' + member.user.tag)).catch(console.error);
})

bot.on('message', message => {
    if(message.author.bot)return
    var messageA = message.content
    var messageArray = messageA.split(/\s+/g);
    var args = messageArray.slice(1);
    var command = messageArray[0].toLowerCase()
    var Commande = command.slice(prefix.length)
    if(!command.startsWith(prefix)) return;
    if (Commande === 'reload'){
        if (message.author.id !== monJson.luluinfo.owner[0]) return;
        if (message.deletable) message.delete();
        bot.commands = new Discord.Collection();
        bot.nom = new Discord.Collection();
        loadCmds()
        console.log("RELOAD TERMINER")
        return;
    }
    var mabite = bot.commands.find(element => element.help.name.includes(Commande))
    Command = bot.nom.get(mabite.help.name)
    ReloadRun(Command, bot , message, args)
})

bot.login(token);