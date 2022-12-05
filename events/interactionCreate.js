module.exports = {
    name:"interactionCreate",
    async execute(Client,Discord,Distube){
        Client.on("interactionCreate",async (i)=>{
            if(!i.isCommand() || i.user.bot)return
            if(i.commandName){
                Client.commands.get(i.commandName).execute(Client,i,Discord,Distube)
            }
        })
    }
}