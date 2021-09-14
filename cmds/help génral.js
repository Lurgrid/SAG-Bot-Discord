const Discord = require("discord.js");
const fs = require('fs');
var monJson = JSON.parse(fs.readFileSync('./storage/settings.json'));

module.exports.run = async (bot, message, args) => {
    if (message.deletable) message.delete();
    const { MessageActionRow, MessageButton } = require('discord.js');
    const MessageEmbed = {
      "Author": "𝐇𝐞𝐥𝐩 : 𝐂𝐨𝐦𝐦𝐚𝐧𝐝𝐬 𝘽𝙮 𝙇𝙪𝙧𝙜𝙧𝙞𝙙",
      "Color": "#000000",
      "Description": "𝘛𝘰𝘶𝘵𝘦 𝘭𝘦𝘴 𝘤𝘰𝘮𝘮𝘢𝘯𝘥𝘦𝘴",
      "Image": "https://media.giphy.com/media/xUNda7dFmFjGmOpVv2/giphy.gif",
      "Field": "Pour avoir toutes les commandes de la catégorie"
    }
    const Nemoji = [":one:",":two:",":three:",":four:"]
    let LCategory = new Set()
    bot.commands.forEach(x => {
      let y = x.props.help.help
      if(y === undefined){
        x.props.help.help = ["Others","Pas de définition"]
      }
      LCategory.add(x.props.help.help[0])
    })
    let LCommand = new Map();
    LCategory.forEach(x => {
      LCommand.set(x, [])
    })
    bot.commands.forEach(x => {
      if(LCommand.get(x.props.help.help[0]) !== [x.props.help.name, x.props.help.help[1]]){
      LCommand.get(x.props.help.help[0]).push([x.props.help.name , x.props.help.help[1]])
      }
    })
    LCommand.delete(".")
    LCategory.delete(".")
    let LCategoryEmbed = []
    let Nfield = 0
    let CategoryEmbed = new Discord.MessageEmbed()
    .setAuthor(MessageEmbed.Author)
    .setColor(MessageEmbed.Color)
    .setDescription(MessageEmbed.Description)
    .setImage(MessageEmbed.Image)
    .setFooter(`By Lurgrid φ`,`${bot.user.avatarURL()}`);
    let CategoryEmbedBoutton = new MessageActionRow()
    LCategory.forEach(x => {
      if(Array.from(LCategory).indexOf(x)+1 === Array.from(LCategory).length){
        CategoryEmbed.addField(Nemoji[Nfield]+` ${monJson.luluinfo.prefix}Help `+x, MessageEmbed.Field+" "+x)
        CategoryEmbedBoutton.addComponents(
				new MessageButton()
					.setCustomId(x)
					.setLabel((Nfield+1).toString())
					.setStyle('SECONDARY')
          )
        LCategoryEmbed.push([CategoryEmbed,CategoryEmbedBoutton])
        Nfield = 0
      }
      if(Nfield === 3 && LCategoryEmbed.length > 0 ){
        CategoryEmbed.addField(Nemoji[Nfield]+` ${monJson.luluinfo.prefix}Help `+x, MessageEmbed.Field+" "+x)
        CategoryEmbedBoutton.addComponents(
				new MessageButton()
					.setCustomId(x)
					.setLabel((Nfield+1).toString())
					.setStyle('SECONDARY')
          )
        CategoryEmbedBoutton.addComponents(
          new MessageButton()
            .setCustomId("Pagež" + (LCategoryEmbed.length + 2).toString())
            .setLabel("Next")
            .setStyle('SUCCESS')
        )
        LCategoryEmbed.push([CategoryEmbed,CategoryEmbedBoutton])
        CategoryEmbed = new Discord.MessageEmbed()
        .setAuthor(MessageEmbed.Author)
        .setColor(MessageEmbed.Color)
        .setDescription(MessageEmbed.Description)
        .setImage('https://media.giphy.com/media/xUNda7dFmFjGmOpVv2/giphy.giDf')
        .setFooter(`By Lurgrid φ`,`${bot.user.avatarURL()}`);
        CategoryEmbedBoutton = new MessageActionRow()
        Nfield = 0
      }
      if(Nfield === 4){
        CategoryEmbedBoutton.addComponents(
          new MessageButton()
            .setCustomId("Pagež2")
            .setLabel("Next")
            .setStyle('SUCCESS')
        )
        LCategoryEmbed.push([CategoryEmbed,CategoryEmbedBoutton])
        CategoryEmbed = new Discord.MessageEmbed()
        .setAuthor(MessageEmbed.Author)
        .setColor(MessageEmbed.Color)
        .setDescription(MessageEmbed.Description)
        .setImage(MessageEmbed.Image)
        .setFooter(`By Lurgrid φ`,`${bot.user.avatarURL()}`);
        CategoryEmbedBoutton = new MessageActionRow()
        Nfield = 0
      }
      if(Nfield === 0 && LCategoryEmbed.length > 0 && Array.from(LCategory).indexOf(x)+1 !== Array.from(LCategory).length){
        CategoryEmbedBoutton.addComponents(
          new MessageButton()
            .setCustomId("Pagež" + LCategoryEmbed.length.toString()+"ŸPrevious")
            .setLabel("Previous")
            .setStyle('DANGER')
        )
      }
      if(Array.from(LCategory).indexOf(x)+1 !== Array.from(LCategory).length){
      CategoryEmbed.addField(Nemoji[Nfield]+` ${monJson.luluinfo.prefix}Help `+x, MessageEmbed.Field+" "+x)
      CategoryEmbedBoutton.addComponents(
				new MessageButton()
					.setCustomId(x)
					.setLabel((Nfield+1).toString())
					.setStyle('SECONDARY')
			)
      Nfield = Nfield + 1
      }
    })
    const MessageCommandEmbed = {
      "Author": ": 𝐂𝐨𝐦𝐦𝐚𝐧𝐝𝐬 𝘽𝙮 𝙇𝙪𝙧𝙜𝙧𝙞𝙙",
      "Color": "#000000",
      "Description": "𝘛𝘰𝘶𝘵𝘦 𝘭𝘦𝘴 𝘤𝘰𝘮𝘮𝘢𝘯𝘥𝘦𝘴 𝘥𝘦 ",
      "Image": "https://media.giphy.com/media/wkW0maGDN1eSc/giphy.gif"
    }
    let ALLCommandeEmbed = new Map()
    let LCommandeEmbed = []
    let MCField = 0
    LCommand.forEach(x => {
      function getByValue(map, searchValue) {
        for (let [key, value] of map.entries()) {
          if (value === searchValue)
            return key;
        }
      }
    let CommandEmbedBoutton = new MessageActionRow()
    let CommandEmbed = new Discord.MessageEmbed()
    .setAuthor("Help "+getByValue(LCommand, x)+MessageCommandEmbed.Author)
    .setColor(MessageCommandEmbed.Color)
    .setDescription(MessageCommandEmbed.Description+getByValue(LCommand, x))
    .setImage(MessageCommandEmbed.Image)
    .setFooter(`By Lurgrid φ`,`${bot.user.avatarURL()}`);
    LCommandeEmbed = []
    MCField = 0
      x.forEach(y => {
        if((MCField === 0) && (LCommandeEmbed.length > 0)){
          CommandEmbedBoutton.addComponents(
            new MessageButton()
              .setCustomId(getByValue(LCommand, x)+"ž" + LCommandeEmbed.length.toString()+"ŸPrevious")
              .setLabel("Previous")
              .setStyle('DANGER')
          )
        }
        CommandEmbed.addField(monJson.luluinfo.prefix+y[0].split(/\s+/g).join(" - "), y[1])
        MCField = MCField + 1
        if((MCField === 5) && (x.indexOf(y)+1 !== x.length)){
          CommandEmbedBoutton.addComponents(
            new MessageButton()
              .setCustomId(getByValue(LCommand, x)+"ž"+(LCommandeEmbed.length+2).toString())
              .setLabel("Next")
              .setStyle('SUCCESS')
          )
          LCommandeEmbed.push([CommandEmbed,CommandEmbedBoutton])
          
          CommandEmbed = new Discord.MessageEmbed()
          .setAuthor("Help "+getByValue(LCommand, x)+MessageCommandEmbed.Author)
          .setColor(MessageCommandEmbed.Color)
          .setDescription(MessageCommandEmbed.Description+getByValue(LCommand, x))
          .setImage(MessageCommandEmbed.Image)
          .setFooter(`By Lurgrid φ`,`${bot.user.avatarURL()}`);
          CommandEmbedBoutton = new MessageActionRow()
          MCField = 0
        }
      if(x.indexOf(y)+1 === x.length){
          LCommandeEmbed.push([CommandEmbed,CommandEmbedBoutton])
          MCField = 0
        }
      })
      ALLCommandeEmbed.set(getByValue(LCommand, x), LCommandeEmbed)
    })
    let m
    let argscmd
    if(args[0] === undefined){
      argscmd = ""
    }else{
      argscmd = args[0].toLowerCase().charAt(0).toUpperCase()+args[0].substr(1)
    }
    if(LCategory.has(argscmd)){
      if(ALLCommandeEmbed.get(argscmd)[0][1]["components"].length === 0){
        m = await message.channel.send({ embeds: [ALLCommandeEmbed.get(argscmd)[0][0]]})
      }else{
        m = await message.channel.send({ embeds: [ALLCommandeEmbed.get(argscmd)[0][0]], components: [ALLCommandeEmbed.get(argscmd)[0][1]] })
      }
    }else{
    if(Array.from(LCategoryEmbed)[0][1]["components"].length === 0){
      m = await message.channel.send({ embeds: [LCategoryEmbed[0][0]]})
    }else{
      m = await message.channel.send({ embeds: [LCategoryEmbed[0][0]], components: [LCategoryEmbed[0][1]] })
    }
  }
    const filter = i => i.user.id === message.author.id && i.message.id === m.id
    const collector = message.channel.createMessageComponentCollector({ filter, time: 60000 });
    collector.on('collect', async i => {
      let IdArgs = i.customId.split("Ÿ")
      let IdNPage = IdArgs[0].split("ž")
      if(IdNPage[0] ==='Page'){
        i.update({ embeds: [LCategoryEmbed[(IdNPage[1]-1)][0]], components: [LCategoryEmbed[(IdNPage[1]-1)][1]] });
      }
      if(LCategory.has(i.customId)){
        if(ALLCommandeEmbed.get(i.customId)[0][1]["components"].length === 0){
          i.update({ embeds: [ALLCommandeEmbed.get(i.customId)[0][0]], components:[]});
        }else{
        i.update({ embeds: [ALLCommandeEmbed.get(i.customId)[0][0]], components: [ALLCommandeEmbed.get(i.customId)[0][1]] });
        }
      }
      if(LCategory.has(IdNPage[0]) && isNaN(IdNPage[1]) === false && IdNPage[1] !== undefined){
        i.update({ embeds: [ALLCommandeEmbed.get(IdNPage[0])[IdNPage[1]-1][0]], components: [ALLCommandeEmbed.get(IdNPage[0])[IdNPage[1]-1][1]] });
      }
      });
    collector.on('end', collected => {
      m.delete()
    });
}
module.exports.help = {name: "help", help: [".","."]}