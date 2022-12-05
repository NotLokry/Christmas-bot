module.exports = {
    name:"addList",
    async execute(Client,Discord,Distube){
        Distube.on("addList", (queue,list) => {
            queue.textChannel.send({
                embeds:[
                    new Discord.EmbedBuilder()
                    .setAuthor({name:`Added by ${list.user.username}`,iconURL:list.user.avatarURL()})
                    .setTitle(list.name)
                    .setThumbnail(list.thumbnail)
                    .setURL(list.url)
                    // .setDescription(`**Duration**\n**${list.formattedDuration}**`)
                    .setColor("#FFFFFF")
                    // .setFooter({text:`Volume: ${queue.volume}% | Loop: ${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}`})
                ]
            })
        })
    }
}