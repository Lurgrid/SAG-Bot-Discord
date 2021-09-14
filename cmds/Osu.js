const Discord = require("discord.js");
const fs = require('fs');
const { connect } = require("http2");
const osu = require('node-osu');

var monJson = JSON.parse(fs.readFileSync('./storage/settings.json'));

module.exports.run = (bot, message, args) => {
    if (message.deletable) message.delete();
    bot.command = new Discord.Collection();
    bot.non = new Discord.Collection();
    var monOsu = JSON.parse(fs.readFileSync('./storage/Osu.json'));
    const osuApi = new osu.Api(monOsu.key, {
        notFoundAsError: true, // Throw an error on not found instead of returning nothing. (default: true)
        completeScores: true, // When fetching scores also fetch the beatmap they are for (Allows getting accuracy) (default: false)
        parseNumeric: false // Parse numeric values into numbers/floats, excluding ids
    });
function loading() {
    var files = fs.readdirSync("./cmds/Osu/", []);
        var jsFiles = files.filter(f => f.split(".").pop() === "js");
        if(jsFiles.length <= 0) {
            console.log("Aucune commande a chargé.")
            return;
        }
        console.log(`${jsFiles.length} commandes chargées.`);
        jsFiles.forEach((f, i) => {
            delete require.cache[require.resolve(`../cmds/Osu/${f}`)];
            var props = require(`../cmds/Osu/${f}`)
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
                var files = fs.readdirSync("./cmds/Osu/", []);
                var jsFiles = files.filter(x => x === `${Jsp}`);
                if(jsFiles.length === 0) {
                    console.log(`Aucune commande n'était trouvée. [${h}:${m}:${s}][Osu Commande]`)
                    let embedd = new Discord.MessageEmbed()
                    .setDescription("**Aucune commande de la catégorie Osu s'appelle comme ça**")
                    .setFooter(`By Lurgrid φ`,`${bot.user.avatarURL()}`);
                    message.channel.send({ embeds: [embedd] })

                }else{
                jsFiles.forEach((x) => {
                    delete require.cache[require.resolve(`../cmds/Osu/${x}`)];
                    var props = require(`../cmds/Osu/${x}`)
                    console.log(`${x} re-charger et excuter. [${h}:${m}:${s}][Osu Commande]`)
                    bot.command.set(props.help.name, props);
                    var cmd = bot.command.get(Nom2Commande)
                    cmd.run(bot, message, args, osuApi)
                })}};
    if (args[0] !== undefined) {
        Nom2Commande = args[0].toLowerCase()
        Jsp = bot.non.get(Nom2Commande)
        ReloadRun(Jsp, bot , message, args, Nom2Commande)
    }else{
        if(osuApi.apiKey !== undefined) {
           var connectt = "Le bot est bien connecter a l'API de Osu"
        }else{
            var connectt = "Le bot est pas connecter a l'API de Osu !"
        }

    let embed = new Discord.MessageEmbed()
    .setAuthor(`𝐎𝐬𝐮 : 𝐂𝐨𝐦𝐦𝐚𝐧𝐝𝐬 𝘽𝙮 𝙇𝙪𝙧𝙜𝙧𝙞𝙙`)
    .setColor(MessageEmbed.Color)
    .setDescription(MessageEmbed.Description)
    .addField(`${monJson.luluinfo.prefix}Osu info [OsuUser]`, `Donne les informations du compte de la personne`)
    .addField(`${monJson.luluinfo.prefix}Osu recent [OsuUser]`, `Donne les informations de la dernière game de la personne`)
    .addField(`${monJson.luluinfo.prefix}Osu best [OsuUser]`, `Donne les informations de la meilleur game de la personne`)
    .setImage('https://cdn.discordapp.com/attachments/600516263952777218/847901170503516170/steamuserimages-a.akamaihd.net.gif')
    .setTimestamp()
    .setFooter(`By Lurgrid φ | ` + connectt ,`${bot.user.avatarURL()}`);
    console.log(osuApi)

    message.channel.send({ embeds: [embed] })
}
}

module.exports.help = { name: "osu", help:["Jeux","Pour avoir les information d'un joueur"]}