const Discord = require("discord.js");
const fs = require('fs');

module.exports.run = async (bot, message, args) => {
  let monJson = JSON.parse(fs.readFileSync('./storage/settings.json', 'utf8'));
  if(!monJson.luluinfo.owner.includes(message.author.id)) return
  if (message.deletable) message.delete();
  if(args[0] == "set"){
    monJson.Message = args.slice(1).join(" ")
    fs.writeFileSync('./storage/settings.json', JSON.stringify(monJson, null , 4));
    return
  }
    message.channel.send('𝘾𝙝𝙖𝙧𝙜𝙚𝙢𝙚𝙣𝙩 𝙚𝙣 𝙘𝙤𝙪𝙧𝙨...')
      .then(message => {
        message.edit("▓▓░░░░░░░░░░░░░░░░░░░░░░ 10%");
        message.edit("▓▓▓▓░░░░░░░░░░░░░░░░░░░░ 20%");
        message.edit("▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░ 30%");
        message.edit("▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░ 40%");
        message.edit("▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░ 50%");
        message.edit("▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░ 60%");
        message.edit("▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░ 70%");
        message.edit("▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░ 80%");
        message.edit("▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░ 90%");
        message.edit("▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░ 93%");
        message.edit("▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░ 97%");
        message.edit("▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ 100%");
        message.edit(monJson.Message);
    });
}
module.exports.help = {name: "message msg", help:[".","."]}