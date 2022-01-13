import { unlinkSync, writeFileSync, readFileSync } from 'fs'
import got from 'got'
import { MessageEmbed } from 'discord.js'
import pkg from 'canvas';
const { createCanvas } = pkg;

export default class {
  constructor(client){
      this.client = client;
  }
  name = "edt"
  async execute(message, args, config, file) {
    if(message.deletable) message.delete()
    let embedatt = new MessageEmbed()
      .setAuthor("CHARGEMENT EN COURS ...")
    const msg = await message.channel.send({ embeds: [embedatt]})
    const date = Date.now()
    async function EDT(day2){
      var NEW_LINE = /\r\n|\n|\r/;
      var COLON = ":";
      var SPACE = " ";
      
      function convert(source) {
        var currentKey = "",
          currentValue = "",
          parentObj = {},
          splitAt;
      
        var output = {};
        var lines = source.split(NEW_LINE);
      
        var currentObj = output;
        var parents = [];
      
        for (var i = 0; i < lines.length; i++) {
          var line = lines[i];
          if (line.charAt(0) === SPACE) {
            currentObj[currentKey] += line.substr(1);
          } else {
            splitAt = line.indexOf(COLON);
      
            if (splitAt < 0) {
              continue;
            }
      
            currentKey = line.substr(0, splitAt);
            currentValue = line.substr(splitAt + 1);
      
            switch (currentKey) {
              case "BEGIN":
                parents.push(parentObj);
                parentObj = currentObj;
                if (parentObj[currentValue] == null) {
                  parentObj[currentValue] = [];
                }
                currentObj = {};
                parentObj[currentValue].push(currentObj);
                break;
              case "END":
                currentObj = parentObj;
                parentObj = parents.pop();
                break;
              default:
                if (currentObj[currentKey]) {
                  if (!Array.isArray(currentObj[currentKey])) {
                    currentObj[currentKey] = [currentObj[currentKey]];
                  }
                  currentObj[currentKey].push(currentValue);
                } else {
                  currentObj[currentKey] = currentValue;
                }
            }
          }
        }
        return output;
      }
      function awaitWithTimeout(timeout, ...args) {
        function timeOut() {
          return new Promise((res, rej) => setTimeout(rej, timeout, new Error(`Timed out after ${timeout}ms`)));
        }
        return Promise.race([...args, timeOut()]);
      }
      (async () => {
        let x
        try{
          x = await awaitWithTimeout(2000, got("https://adecampus.univ-rouen.fr/jsp/custom/modules/plannings/anonymous_cal.jsp?resources=39526&projectId=0&calType=ical&nbWeeks=1&displayConfigId=8"))
        }catch (error){
          x = "error time"
        }
        if(x === "error time"){
          return
        }else{
        const cal = convert(x.body)
        cal.VCALENDAR[0].VEVENT.forEach(element => {
          element.DTSTART = element.DTSTART.slice(0,-1).split("T")
          element.DTEND = element.DTEND.slice(0,-1).split("T")
          delete element.DTSTAMP
          delete element.UID
          delete element.CREATED
          delete element.SEQUENCE
          delete element["LAST-MODIFIED"]
          element.DTSTART[3] = parseInt(element.DTSTART[1])+20000
          element.DTEND[3] = parseInt(element.DTEND[1])+20000
          element.DESCRIPTION = element.DESCRIPTION.split(/\\n/)
          element.DESCRIPTION = element.DESCRIPTION[element.DESCRIPTION.length-3]
        });
        let Allcal = new Map()
        cal.VCALENDAR[0].VEVENT.forEach(element => {
          if(!Allcal.has(element.DTSTART[0])){
            Allcal.set(element.DTSTART[0], [element])
          }else{
            let list = []
            Allcal.get(element.DTSTART[0]).forEach(x => {
              list.push(x)
            })
            list.push(element)
            Allcal.set(element.DTSTART[0], list)
          }
          Allcal.forEach(x => {
            x.sort(function (a, b){
              return a.DTSTART[1] - b.DTSTART[1]
            })
          })
        });
        Allcal = Array.from(Allcal);
        Allcal.sort(function(a,b){
          return a[0] - b[0]
        })
      
        
        let width = Allcal.length*400+200
        if(day2 == true && Allcal.length > 1){
          width = 1000
        }else if (day2 == true && Allcal.length > 1){
          width = 600
        }else if(day2 == true){
          width = 1
        }
        const height = 1300
        const canvas = createCanvas(width, height)
        const context = canvas.getContext('2d')
        context.fillStyle = 'white'
        context.fillRect(0, 0, width, height)
        context.strokeStyle = "black";
        context.lineWidth = 5
        context.strokeRect(100, 100, (width-200), (height-200));
        context.font = 'bold 21pt Arial'
        context.textAlign = 'left'
        context.fillStyle = 'black'
        context.fillText("Generate by SAG (Lurgrid)", 20, height-20)
      
        for(let i = 1; i<=12; i++ ){
          context.font = 'bold 19pt Arial'
          context.textAlign = 'center'
          context.fillStyle = 'black'
          context.fillText(i+7+"h00", 50, 100*i)
        }
      
        function courses2(context, x, y, colorcours){
          let x1 = y*400+100
          let y1 = (x.DTSTART[3]/100)-800
          let x2 = 400
          let y2 = ((x.DTEND[3]/100)-800)-((x.DTSTART[3]/100)-800)
      
          function getRandomColor() {
            var letters = '56789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
              color += letters[Math.floor(Math.random() * letters.length)];
            }
            return color;
          }
      
          let color
          if(colorcours.has(x.SUMMARY)){
            color = colorcours.get(x.SUMMARY)
          }else{
            color = getRandomColor()
            colorcours.set(x.SUMMARY, color)
          }
      
          context.fillStyle = color
          context.fillRect(x1, y1, x2, y2)
      
          context.strokeStyle = "black";
          context.lineWidth = 5
          context.strokeRect(x1, y1, x2, y2)
      
          context.font = 'bold 11pt Arial'
          context.textAlign = 'center'
          context.fillStyle = 'black'
          context.fillText(x.SUMMARY, (x1+(x2/2)), (y1+(y2/4)))
          context.fillText(x.LOCATION, (x1+(x2/2)), (y1+(3*y2/5)))
          context.fillText(x.DESCRIPTION, (x1+(x2/2)), (y1+(2*y2/5)))
          context.font = 'bold 17pt Arial'
          let heure = (parseInt(x.DTSTART[1].slice(0,2), 10)+1).toString()+":"+x.DTSTART[1].slice(2,4)+' / '+(parseInt(x.DTEND[1].slice(0,2), 10)+1).toString()+":"+x.DTEND[1].slice(2,4)
          context.fillText(heure, (x1+(x2/2)), (y1+(7*y2/8)))
        }
        let colorcours = new Map()

        let nb_tour = 0
        Allcal.forEach(x => {
          if(day2 == true && nb_tour == 2){

          }else{
          let y = Allcal.indexOf(x)
          context.font = 'bold 20pt Arial'
          context.textAlign = 'center'
          context.fillStyle = 'black'
          let v = new Date(Date.UTC(x[0].slice(0,4), x[0].slice(4,6)-1, x[0].slice(6,8))).toDateString()
          context.fillText(v, (y*400+300), 50)
          
          x[1].forEach(course => {
            courses2(context, course, y ,colorcours)
          })
          nb_tour++
          }
        })
      
        const buffer = canvas.toBuffer("image/png");
        
        await writeFileSync(`./image/${date}.png`, buffer)
      
      }
      }) ();
      return `./image/${date}.png`
      }
      let day2 = false
      if(args[0] == undefined){
        args[0] = "A"
      }
      if(args[0].toLowerCase() == "day"){
        day2 = true
      }
      let Image = await EDT(day2)
      function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      await sleep(500)
      let embed = new MessageEmbed()
      .setAuthor("𝙀𝙢𝙥𝙡𝙤𝙞 𝙙𝙪 𝙩𝙚𝙢𝙥𝙨 𝙙𝙚 𝙇𝙪𝙧𝙜𝙧𝙞𝙙")
      .setColor("#000000")
      .setDescription("Emploi du temps de Lurgrid.. ")
      .setImage(`attachment://${date}.png`)
      .setTimestamp()
      .setFooter(`By Lurgrid φ`,`${this.client.user.avatarURL()}`);
    msg.edit({ embeds: [embed], files: [Image]}).then(x => {
      unlinkSync(Image);
    })
  }
}