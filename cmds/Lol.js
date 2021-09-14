const Discord = require("discord.js");
const fs = require('fs');
const got = require('got');

var monJson = JSON.parse(fs.readFileSync('./storage/settings.json'));

module.exports.run = (bot, message, args) => {
    if (message.deletable) message.delete();
    bot.command = new Discord.Collection();
    bot.non = new Discord.Collection();
    var monLol = JSON.parse(fs.readFileSync('./storage/Lol.json'));
function loading() {
    var files = fs.readdirSync("./cmds/Lol/", []);
        var jsFiles = files.filter(f => f.split(".").pop() === "js");
        if(jsFiles.length <= 0) {
            console.log("Aucune commande a chargé.")
            return;
        }
        console.log(`${jsFiles.length} commandes chargées.`);
        jsFiles.forEach((f, i) => {
            delete require.cache[require.resolve(`../cmds/Lol/${f}`)];
            var props = require(`../cmds/Lol/${f}`)
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
                var files = fs.readdirSync("./cmds/Lol/", []);
                var jsFiles = files.filter(x => x === `${Jsp}`);
                if(jsFiles.length === 0) {
                    console.log(`Aucune commande n'était trouvée. [${h}:${m}:${s}][Lol Commande]`)
                    let embedd = new Discord.MessageEmbed()
                    .setDescription("**Aucune commande de la catégorie Lol s'appelle comme ça**")
                    .setFooter(`By Lurgrid φ`,`${bot.user.avatarURL()}`);
                    message.channel.send({ embeds: [embedd] })

                }else{
                jsFiles.forEach((x) => {
                    delete require.cache[require.resolve(`../cmds/Lol/${x}`)];
                    var props = require(`../cmds/Lol/${x}`)
                    console.log(`${x} re-charger et excuter. [${h}:${m}:${s}][Lol Commande]`)
                    bot.command.set(props.help.name, props);
                    var cmd = bot.command.get(Nom2Commande)
                    cmd.run(bot, message, args)
                })}};
    if (args[0] !== undefined) {
        Nom2Commande = args[0].toLowerCase()
        Jsp = bot.non.get(Nom2Commande)
        ReloadRun(Jsp, bot , message, args, Nom2Commande)
    }else{
        (async () => {
            let connect = "Connecté a l'API de Riot"
            const response = await got("https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/Ϋuumi?api_key="+monLol.key)
            .catch(err => {
                connect = "Non connecté a l'API de Riot"
            })
            //var json = JSON.parse(response.body)
            //console.log(json)
            let embed = new Discord.MessageEmbed()
            .setAuthor(`𝐋𝐞𝐚𝐠𝐮𝐞 𝐨𝐟 𝐋𝐞𝐠𝐞𝐧𝐝 : 𝐂𝐨𝐦𝐦𝐚𝐧𝐝𝐬 𝘽𝙮 𝙇𝙪𝙧𝙜𝙧𝙞𝙙`)
            .setColor(MessageEmbed.Color)
            .setDescription(MessageEmbed.Description)
            .addField(`${monJson.luluinfo.prefix}Lol info [User Name]`, `Donne les informations de l'utilisateur demandé`)
            .addField(`${monJson.luluinfo.prefix}Lol Last [User Name]`, `Donne les informations de la dernière partie de l'utilisateur demandé`)
            .setImage('https://cdn.discordapp.com/attachments/600516263952777218/857316479551406120/0a11d63744c4d5bb47dac71d37e1829f77bc8ca8r1-500-213_hq.gif')
            .setTimestamp()
            .setFooter(`By Lurgrid φ | ` + connect ,`${bot.user.avatarURL()}`);
            message.channel.send({ embeds: [embed] })
        }) ();

}
}

module.exports.help = { name: "lol", help:["Jeux","Pour avoir les informations d'un compte league of legend"]}