module.exports = {
    name:"addSong",
    async execute(Client,Discord,Distube){
        Distube.on("addSong", (queue,song) => {
            queue.textChannel.send({
                embeds:[
                    new Discord.EmbedBuilder()
                    .setAuthor({name:`Added by ${song.user.username}`,iconURL:song.user.avatarURL()})
                    .setTitle(song.name)
                    .setThumbnail(song.thumbnail)
                    .setURL(song.url)
                    .addFields([
                        {
                            name: '**Likes | Views**',
                            value: `**${song.likes.toLocaleString()} | ${song.views.toLocaleString()}**`,
                            inline: true
                        },
                        {
                            name:"**Duration | Position**",
                            value:`**${song.formattedDuration} | ${queue.songs.length}**`,
                            inline: true
                        }
                    ])
                    .setColor("#FFFFFF")
                    // .setFooter({text:`Volume: ${queue.volume}% | Loop: ${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}`})
                ]
            })
        })
    }
}