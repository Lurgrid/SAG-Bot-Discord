const Discord = require("discord.js");
const fs = require('fs');

var monJson = JSON.parse(fs.readFileSync('./storage/settings.json'));

module.exports.run = (bot, message, args) => {
message.delete()
bot.command = new Discord.Collection();
bot.non = new Discord.Collection();
function loading() {
    var files = fs.readdirSync("./cmds/Helps/", []);
        var jsFiles = files.filter(f => f.split(".").pop() === "js");
        if(jsFiles.length <= 0) {
            console.log("Aucune commande a chargé.")
            return;
        }
        console.log(`${jsFiles.length} commandes chargées.`);
        jsFiles.forEach((f, i) => {
            delete require.cache[require.resolve(`../cmds/Helps/${f}`)];
            var props = require(`../cmds/Helps/${f}`)
            console.log(`${i +1}: ${f} charger`)
            bot.command.set(props.help.name, props)
            bot.non.set(props.help.name, f)
        })};
loading()
        function ReloadRun(Jsp, bot , message , args, Nom2Commande) {
            var ladate=new Date()
                var h=ladate.getHours();
                if (h<10) {h = "0" + h}
                var m=ladate.getMinutes();
                if (m<10) {m = "0" + m}
                var s=ladate.getSeconds();
                if (s<10) {s = "0" + s}
                var files = fs.readdirSync("./cmds/Helps/", []);
                var jsFiles = files.filter(x => x === `${Jsp}`);
                if(jsFiles.length === 0) {
                    if ((message.channel.type === "dm") || (message.channel.type === "group")){
                    console.log(`Aucune commande n'était trouvée. [${h}:${m}:${s}][Help Commande]`)
                    }else{
                    console.log(`Aucune commande n'était trouvée. [${h}:${m}:${s}][Help Commande]`)
                    }
                }else{
                jsFiles.forEach((x) => {
                    delete require.cache[require.resolve(`../cmds/Helps/${x}`)];
                    var props = require(`../cmds/Helps/${x}`)
                    if ((message.channel.type === "dm") || (message.channel.type === "group")){
                    console.log(`${x} re-charger et excuter. [${h}:${m}:${s}][Help Commande]`)
                    }else{
                    console.log(`${x} re-charger et excuter. [${h}:${m}:${s}][Help Commande]`)
                    }
                    bot.commands.set(props.help.name, props);
                    var cmd = bot.commands.get(Nom2Commande)
                    cmd.run(bot, message, args)
                })}};
    if (args[0] !== undefined) {
        Nom2Commande = args[0].toLowerCase()
        Jsp = bot.non.get(Nom2Commande )
        ReloadRun(Jsp, bot , message, args, Nom2Commande)
    }else{

    let embed = new Discord.MessageEmbed()
    .setAuthor(`𝐇𝐞𝐥𝐩 : 𝐂𝐨𝐦𝐦𝐚𝐧𝐝𝐬 𝘽𝙮 𝙇𝙪𝙧𝙜𝙧𝙞𝙙`)
    .setColor(`#000000`)
    .setDescription(`𝘛𝘰𝘶𝘵𝘦 𝘭𝘦𝘴 𝘤𝘰𝘮𝘮𝘢𝘯𝘥𝘦𝘴`)
    .addField(`${monJson.luluinfo.prefix}Help Test`, `:one:  La commande helps test vas te donner tout les commandes pour tester le bot`)
    .addField(`${monJson.luluinfo.prefix}Help Gif`, `:two: La commande helps gif vas te donner tout les gif qu'il y a`)
    .addField(`${monJson.luluinfo.prefix}Help Bot`, `:three: La commande helps bot vas te donner toutes les commandes de gestion du bot`)
    .addField(`${monJson.luluinfo.prefix}Help Serv`, `:four: La commande helps serv vas te donner toutes les commandes de gestion de serveur discord`)
    .addField(`${monJson.luluinfo.prefix}Help Others`, `:five: La commande helps others vas te donner toutes les autre commandes`)
    .setImage('https://media.giphy.com/media/xUNda7dFmFjGmOpVv2/giphy.gif')  //.attachFiles(['./image/1.2.pngmob.gif'])
                                                                             //.setImage('attachment://mob.gif')
    .attachFiles(['./image/1.2.png'])
    .setThumbnail('attachment://1.2.png')
    .setFooter(`By Lurgrid φ`,`${bot.user.avatarURL()}`);

    message.channel.send(embed)
    .then(function (message) {
    message.react("1️⃣")
    message.react("2️⃣")
    message.react("3️⃣")
    message.react("4️⃣")
    message.react("5️⃣")
    const filter = (reaction, user) => {
        return ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣'].includes(reaction.emoji.name) && user.id !== message.author.id;
    };
    
    message.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
        .then(collected => {
            const reaction = collected.first();
            if (reaction.emoji.name === '1️⃣') {
                message.delete()
                Nom2Commande = "test"
                Jsp = bot.non.get(Nom2Commande )
                ReloadRun(Jsp, bot , message, args, Nom2Commande)
            }else if (reaction.emoji.name === '2️⃣') {
                message.delete()
                Nom2Commande = "gif"
                Jsp = bot.non.get(Nom2Commande )
                ReloadRun(Jsp, bot , message, args, Nom2Commande)
            }else if (reaction.emoji.name === '3️⃣') {
                message.delete()
                Nom2Commande = "bot"
                Jsp = bot.non.get(Nom2Commande )
                ReloadRun(Jsp, bot , message, args, Nom2Commande)
            }else if (reaction.emoji.name === '4️⃣') {
                message.delete()
                Nom2Commande = "serv"
                Jsp = bot.non.get(Nom2Commande )
                ReloadRun(Jsp, bot , message, args, Nom2Commande)
            }else if (reaction.emoji.name === '5️⃣') {
                message.delete()
                Nom2Commande = "other"
                Jsp = bot.non.get(Nom2Commande )
                ReloadRun(Jsp, bot , message, args, Nom2Commande)
            }
        })
        .catch(collected => {
            console.log("[Aucune commande Helps excuter | ERROR : Time ]")
        });
})
}
}

module.exports.help = { name: ["help"]}