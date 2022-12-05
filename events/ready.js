const fs = require("fs")
var data = []
module.exports = {
    name:"ready",
    async execute(Client,Discord){
        Client.on("ready",()=>{
            console.log("Christmas bot is ready\nMade by Lokry#5606")
            // Commands
            Client.commands.forEach(cmd => data.push(cmd.data))
            console.log(data)
            Client.application.commands.set(data)
        })
    }
}