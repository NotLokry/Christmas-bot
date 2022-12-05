module.exports={
    data:{
        name:"snowman",
        description:"Build a Snowman"
    },
    async execute(Client,i,Discord,Distube){
        const file = new Discord.AttachmentBuilder('../../Icon/Snowman.gif');
        i.reply({
            embeds:[
                new Discord.EmbedBuilder()
                .setTitle(`${i.user.username} built an amazing snowman`)
                .setImage("attachment://Snowman.gif")
                .setColor("#FFFFFF")
            ], 
            files: [file]
        })
    }
}