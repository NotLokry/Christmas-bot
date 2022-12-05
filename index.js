// Utils
const Discord = require("discord.js")
const Client = new Discord.Client({intents:["Guilds","GuildMembers","GuildVoiceStates"]})
Client.commands = new Discord.Collection()
const fs = require("fs")
const distube = require("distube")
const { SpotifyPlugin } = require("@distube/spotify");
const Distube = new distube.DisTube(Client, {
    emitNewSongOnly: false,
    searchSongs: 0,
    plugins:[new SpotifyPlugin()],
    youtubeCookie:"YSC=xYpuvaysx5s; CONSENT=YES+srp.gws-20220217-0-RC1.lt+FX+717; GPS=1; VISITOR_INFO1_LIVE=JMOZcKCh5B0; CONSISTENCY=AGDxDeOwL2vMrr3_X_VtSIKABojz-b_kjls1hx3lWT1_MuPZD3e-9gB672SJSMLGteJXwtBet1EAWTIKXq4wwYcINnwEaNseoTjlvL9ewGEvyDiVkc0tUnap4uppE8pmH5oeg2sabtTIV5-dfft87NY; SID=HQgTphR8unkGEcNDJJ1_WQyKt5vdX8Pwq2lpbxEz5MHn2qmICzxSiVAawzhvVEOEPk4jYg.; __Secure-1PSID=HQgTphR8unkGEcNDJJ1_WQyKt5vdX8Pwq2lpbxEz5MHn2qmIUtBaV2gB_Fl0aLpgo3ChIA.; __Secure-3PSID=HQgTphR8unkGEcNDJJ1_WQyKt5vdX8Pwq2lpbxEz5MHn2qmINeuhRoHhlbbdQAt1fLKpqA.; HSID=A51dg_Gldg4kKAnmQ; SSID=AnvGopr2GiOZRyfQL; APISID=SJmi7b0vmijzKHPx/AWJilVb3k_yhOKhUv; SAPISID=WnDZ8LVD116egwhf/AvPWa7F0Yab4oAZ1u; __Secure-1PAPISID=WnDZ8LVD116egwhf/AvPWa7F0Yab4oAZ1u; __Secure-3PAPISID=WnDZ8LVD116egwhf/AvPWa7F0Yab4oAZ1u; LOGIN_INFO=AFmmF2swRQIhAORuySstSkJ-3lz5EE8CI0xHgudYgHkkCsEhsdQDT-e-AiBM0-GoyBYyMIkc19aJuzft4jCZrS98v_tY4gUwyxrmeA:QUQ3MjNmeHNsMDlCRVJ1a3pIbk5XS3hCbWZkcmgzZ0l1RXRic1dWVU94Z0RiNS14X3h4TEFwcWFGNl90b2QtbktZWVVTWloxVVYza3ZIejc2UGtNMmU3cTd3bUUwRm9aRlBIemdVdnh1T2RTd1BFb1N0VlJZT09iYXNqeEh5VFBxTEJMMk1JblkxU0xDeDhMU01fLUdzbjlienpaRERydnZn; PREF=tz=Europe.Kiev&f6=40000000; SIDCC=AJi4QfGsGZBKPwTWkVActwaxlIvQVsCE2PthkQW6NdanrtKMTTa8t2OJx7XcQYZUv3AoiyKxcA; __Secure-3PSIDCC=AJi4QfHGnrcOSsrQJ5iVXBogny_n5mkXlX1Yg2odzoQEvp4FFqla9MdalCbug5nvbXJleq_p"
})
// Commands
fs.readdir("./commands", (err,files)=>{
    if(err)throw err
    const jsFiles = files.filter(file => file.endsWith(".js"))
    jsFiles.forEach(file => {
        var fileGet = require(`./commands/${file}`)
        if(fileGet.data == undefined)return
        console.log(`${file} Loaded`)
        Client.commands.set(fileGet.data.name, fileGet)
    })
})
// Events
fs.readdir("./events",(err,file)=>{
    if (err) throw err;
    const jsFiles = file.filter(files => files.split('.').pop() === 'js')
    jsFiles.forEach(file => {
        require(`./events/${file}`).execute(Client,Discord,Distube)
        console.log(`Event file ${file} Loaded`)
    })
})
// Login
Client.login(require('./config.json').TOKEN)