"use strict";
import { readFileSync, createWriteStream, unlinkSync } from 'fs'
import { MessageEmbed } from 'discord.js'
import got from 'got'

export default class {
    constructor(client){
        this.client = client
    }
    name = "playlist pl"
    async execute(message, args, config, file) {
        if (message.deletable) message.delete();
        const google = JSON.parse(readFileSync('./config/google.json'));

        let embed = new MessageEmbed()
            .setAuthor("Veuillez patientez génération en cours...")
        const msg = await message.channel.send({ embeds: [embed]})
        const A = Date.now()
        async function fetchvid(Id){
            let listvid = []
            let npt = 0
            let params = {
                playlistId: Id,
                key: google.youtube,
                part: "snippet, contentDetails",
                maxResults: 50,
                pageToken: null
            }
            while(npt != undefined){
                let x = await got("https://www.googleapis.com/youtube/v3/playlistItems", {searchParams: params}).json()
                if(x.nextPageToken != undefined){
                    params.pageToken = x.nextPageToken
                }
                npt = x.nextPageToken
                x.items.forEach(element => {
            if( args[1] != undefined && args[1].toLowerCase() == "lien" ) {
            listvid.push(element.snippet.title + " https://www.youtube.com/watch?v=" + element.contentDetails.videoId )
            }else{
            listvid.push(element.snippet.title)
            }
                });
            }
            return listvid
        }
        async function createfile(Id){
        let listvid = await fetchvid(Id)
        const writeStream = createWriteStream(A+'.txt');
        listvid.forEach(element => {
            writeStream.write(listvid.indexOf(element)+1 + " " + element+"\n")
        })
        await writeStream.on('finish', () => {
        });
        await writeStream.end();

        return A+'.txt'
        }
        if(args[0] == undefined){
            let embed = new MessageEmbed()
                .setAuthor("Merci de bien vouloir mettre une playlist correcte.")
            msg.edit({embeds: [embed]})
            return
        }
        let idvid = args[0].split("https://www.youtube.com/playlist?list=")[args[0].split("https://www.youtube.com/playlist?list=").length-1]
        if(idvid == args[0]){
            idvid = args[0].split("https://youtube.com/playlist?list=")[args[0].split("https://youtube.com/playlist?list=").length-1]
        }
        console.log(idvid)
        async function verif(id){
            const x = await got("https://www.googleapis.com/youtube/v3/playlists?id="+id+"&key="+google.youtube).json()
            if(x.pageInfo.totalResults == 0){
                return true
            }else{
                return false
            }
        }
        if(verif(idvid) == true){
            let embed = new MessageEmbed()
                .setAuthor("Merci de bien vouloir mettre une playliste correcte.")
            msg.edit({embeds: [embed]})
            return
        }
        let filetruc = await createfile(idvid)
        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        await sleep(50)
        msg.edit({embeds: [], files: [filetruc]})
        .then(x =>{
            unlinkSync(filetruc)
        })

    }
}