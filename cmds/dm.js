const Discord = require("discord.js");
const fs = require('fs');

module.exports.run = async (bot, message, args) => {
  let monJson = JSON.parse(fs.readFileSync('./storage/settings.json', 'utf8'));
  if(message.author.id !== monJson.luluinfo.owner[0]) return
  if (message.deletable) message.delete();
  if(isNaN(args[0]) === true )return
  if(args[0] === undefined) return
  let msg = args.slice(1).join(" ")
  let liste = []
  if(message.attachments !== undefined){
    message.attachments.forEach(element => {
      liste.push(element.proxyURL)
    })
    msg = args.slice(1).join(" ")+" "+liste.join(" ")
  }
  bot.users.fetch(args[0], false).then(x => {
    x.send({ content: msg.toString()})
  })
}
module.exports.help = {name: "dm", help:[".","."]}