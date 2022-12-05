module.exports = {
    data:{name: 'song',description:"Get current song"},
    async execute(Client,i,Discord,Distube) {
        if(!i.member.voice.channel)return i.reply({content:'Please join a voice channel',ephemeral:true})
        if(!i.guild.members.me.voice.channel)return i.reply({content:'Im currently not in a voice channel',ephemeral:true})
        if(!i.guild.members.me.voice.channel == i.member.voice.channel)return i.reply({content:'We are not in the same voice channel',ephemeral:true})
        let queue = Distube.getQueue(i.guild.id);
        if(!queue)return i.reply({content:"There aren't any songs currently playing",ephemeral:true})
        i.reply({embeds: [new Discord.EmbedBuilder()
                .setThumbnail(queue.songs[0].thumbnail)
                .setTitle(`**Currently Playing: ${queue.songs[0].name}**`)
                .setURL(queue.songs[0].url)
                .addFields([
                    {
                        name: '**Likes | Views**',
                        value: `**${queue.songs[0].likes.toLocaleString()} | ${queue.songs[0].views.toLocaleString()}**`,
                        inline: true
                    },
                    {
                        name:"**Duration | Position**",
                        value:`**${queue.songs[0].formattedDuration} | 1**`,
                        inline: true
                    }
                ])
                .setColor("#FFFFFF")
        ]})
    }
}