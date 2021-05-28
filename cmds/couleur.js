const Discord = require("discord.js");
const fs = require('fs');
var monJson = JSON.parse(fs.readFileSync('./storage/settings.json', 'utf8'));


module.exports.run = async (bot, message, args) => {
   
    if (message.author.id === (monJson.luluinfo.owner[0]) ||message.author.id === (monJson.luluinfo.owner[1]) ) {
        message.delete()

    var msg = `${monJson.luluinfo.prefix}couleur`
    var messageSlice = message.content.slice(msg.length + 1 );

    if (messageSlice.length <= 0 ){

        let embed1 = new Discord.MessageEmbed()
        .setAuthor(`Erreur la valeur couleur est vide vous devez mettre une couleur `)
        .setFooter(`By Lurgrid φ`,`${bot.user.avatarURL()}`);+
        
        message.channel.send(embed1)
    } else {

        monJson.luluinfo.couleur = messageSlice

        fs.writeFileSync('./storage/settings.json', JSON.stringify(monJson, null , 4));

        let embed = new Discord.MessageEmbed()
        .setAuthor(`Le nouveau préfixe est "${messageSlice}" `)
        .setDescription(`Pour que la couleur vous devez mettre une couleur qui utilise le code hexadécimal (ex: #000000)`)
        .setFooter(`By Lurgrid φ`,`${bot.user.avatarURL()}`);+
        
        message.channel.send(embed)

        console.log(`nouveau valeur de la value number "${messageSlice}"`)

        message.delete()
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
                    delete require.cache[require.resolve(`../cmds/${f}`)];
                    var props = require(`../cmds/${f}`)
                    console.log(`${i +1}: ${f} charger`)
                    bot.commands.set(props.help.name, props);
                    nombre = (i +1)
                    if (nombre === jsFiles.length)
                    {
                        console.log('RELOAD TERMINER')
                    }
                })
            })
        };
        
        loadCmds();

    }

    


}   else {
    let embed = new Discord.MessageEmbed()
    .setAuthor(`Tu n'as pas la permission de faire la commande "${message.content}"`)

    message.channel.send(embed)
}

}

module.exports.help = { name: ["couleur"]}