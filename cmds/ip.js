const Discord = require("discord.js");
const fs = require('fs');
const got = require('got');
var monJson = JSON.parse(fs.readFileSync('./storage/settings.json'));

module.exports.run = (bot, message, args) => {
    if (message.deletable) message.delete();
    const errserver = new Discord.MessageEmbed()
        .setTitle("Veuillez mettre une IP valide");
    got("https://api.iplocation.net/?ip="+args[0]).then(response =>{
    const ip = JSON.parse(response.body)
    if(ip.response_code === "400"){
        message.channel.send({ embeds: [errserver] })
        return}
    let embed = new Discord.MessageEmbed()
    .setAuthor(`Les informations de l'ip "${ip.ip.toString()}"`)
    .setDescription("L'ip demandé en entier long "+ip.ip_number.toString())
    .setColor(`${monJson.luluinfo.couleur}`)
    .setTitle("L'ip demandé est une IPv" + ip.ip_version.toString())
    .addField("Pays de l'ip "+ ip.country_name, "Code ISO 3166-1 alpha-2 du pays " + `" ${ip.country_code2} "`)
    .addField("Fournisseur d'accès à Internet de l'ip (FAI/ISP) "+ `" ${ip.isp} "`, "\u200b")
    .setTimestamp()
    .setFooter(`By Lurgrid φ`,`${bot.user.avatarURL()}`);
    message.channel.send({ embeds: [embed] })
    })}
module.exports.help = { name: "ip", help:["Info","Pour avoir les informations d'une IP demander"]}