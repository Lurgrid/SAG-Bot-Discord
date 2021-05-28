const Discord = require("discord.js");
const fs = require('fs');
var monJson = JSON.parse(fs.readFileSync('./storage/settings.json', 'utf8'));

module.exports.run = async (bot, message, args) => {

    if (message.deletable) message.delete();
    number = 100000
    var random = Math.floor (Math.random() * (number)) +1;
    var tof = Math.floor (Math.random() * (2)) +1;
    if(tof === 1){
        link = `https://loremflickr.com/1920/1920?random=${random}`
        site = 'loremflickr.com'
    }else{
        link = `https://picsum.photos/1920/1920?random=${random}`
        site = 'picsum.photos'
    }
    let Embed = new Discord.MessageEmbed()
      .setColor(`${monJson.luluinfo.couleur}`)
      .setDescription(site)
      .setTitle("Image Random")
      .setImage(link)
      .setFooter(`By Lurgrid φ`,`${bot.user.avatarURL()}`)
      .setTimestamp()
      message.channel.send(Embed).catch(err =>  console.log(err));  
    
}
module.exports.help = { name: ["ir"]}