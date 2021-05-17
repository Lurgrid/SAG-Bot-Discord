const Discord = require("discord.js");
const fs = require('fs');
var monJson = JSON.parse(fs.readFileSync('./Storage/Settings.json', 'utf8'));
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
    fs.writeFileSync('./Storage/Settings.json', JSON.stringify(monJson, null , 4));
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

function ReloadRun(Jsp, bot , message , args, prefix, command) {
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
            bot.commands.set(props.help.name, props);
            var cmd = bot.commands.get(command.slice(prefix.length))
            cmd.run(bot, message, args,)
        })}
    })
};

bot.on("voiceStateUpdate",(oldMember, newMember) => {
    var monJson = JSON.parse(fs.readFileSync('./Storage/Settings.json', 'utf8'));
    console.log("maaaaa biqsdfqfdazgteeee")
    console.log((monJson.MarvinServ.find(element => element[0] === oldMember.channelID)))
    if(monJson.MarvinServ.find(element => element[0] === oldMember.channelID) !== undefined){
        if(newMember.channel.members.size === 1 && monJson.MarvinServ.find(element => element[0] === newMember.channelID)){
            newMember.channel.updateOverwrite(newMember.guild.members.cache.find(element => element.id === newMember.id).id, { MANAGE_CHANNELS: true, MUTE_MEMBERS: true, DEAFEN_MEMBERS: true, MOVE_MEMBERS: true, MANAGE_ROLES_OR_PERMISSIONS: true, MANAGE_ROLES: true});
        }
        Member2 = newMember.guild.members.cache.find(element => element.id === oldMember.id)
        if(oldMember.channel.permissionOverwrites.find(element => element.id === Member2.id) === undefined)return
        oldMember.channel.permissionOverwrites.find(element => element.id === Member2.id).delete()
        console.log("ma biteeee")
        if(oldMember.channel.members.size === 0){
            console.log("ma bite")
            console.log(monJson.MarvinServ.find(element => element[0] === oldMember.channelID))
        //monJson.MarvinServ.find(element => element[0] === oldMember.channelID).shift()
        //fs.writeFileSync('./Storage/Settings.json', JSON.stringify(monJson, null , 4))
        //oldMember.channel.edit({name: bonnom[1], bitrate: 96000, userLimit: 0})
        }
        return
    }
    console.log("maaaaa biteeee")
    Member = newMember.guild.members.cache.find(element => element.id === newMember.id)
    if(newMember.channel.members.size === 1 && monJson.MarvinServ.find(element => element[0] === newMember.channelID)){
        newMember.channel.updateOverwrite(Member.id, { MANAGE_CHANNELS: true, MUTE_MEMBERS: true, DEAFEN_MEMBERS: true, MOVE_MEMBERS: true, MANAGE_ROLES_OR_PERMISSIONS: true, MANAGE_ROLES: true});
    }
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
    Command = bot.nom.get(Commande)
    ReloadRun(Command, bot , message, args, prefix, command)
})

bot.login(token);