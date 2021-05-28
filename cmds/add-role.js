const Discord = require("discord.js");
const fs = require('fs');
const monJson = JSON.parse(fs.readFileSync('./storage/settings.json', 'utf8'));


module.exports.run = async (bot, message, args) => {
if (message.author.id === (monJson.luluinfo.owner[0]) || message.author.id === (monJson.luluinfo.owner[1]) ) {
        message.delete()

        var msg = `${monJson.luluinfo.prefix}add-role`

        var RoleMsg = message.content.slice(msg.length + 1);
       
        var role = message.guild.roles.find(role => role.name === RoleMsg)
        if(role === null){
           let embed = new Discord.MessageEmbed()
           .setAuthor(`Le role "${RoleMsg}" n'éxiste pas`)
           message.channel.send(embed)
        }
      
        message.member.addRole(role)
        
        
}   else {
    let embed = new Discord.MessageEmbed()
    .setAuthor(`Tu n'as pas la permission de faire la commande "${message.content}"`)

    message.channel.send(embed)
}


}

module.exports.help = { name: ["add-role"]}