module.exports={
    data:{
        name:"tillchristmas",
        description:"How long till christmas"
    },
    async execute(Client,i,Discord){
        var christmas = new Date(`12/24/${new Date().getFullYear()}`)
        const current = new Date()
        const timestamp = christmas.getTime();-current.getTime();
        if(timestamp <= -1)christmas = new Date(`12/24/${new Date().setFullYear(new Date().getFullYear()+1).getFullYear()}`)
        i.reply({
            embeds:[
                new Discord.EmbedBuilder()
                .setTitle("Till Christmas")
                .setDescription(`Christmas is <t:${timestamp/1000}:R>`)
                .setColor("#FFFFFF")
            ]
        })
    }
}