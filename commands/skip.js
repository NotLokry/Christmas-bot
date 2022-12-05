module.exports = {
    data:{name: 'skip',description:"Skip music"},
    async execute(Client,i,Discord,Distube){
        if(!i.member.voice.channel)return i.reply({content:'Please join a voice channel',ephemeral:true})
        if(!i.guild.members.me.voice.channel)return i.reply({content:'I am not in a voice channel',ephemeral:true})
        if(!i.guild.members.me.voice.channel == i.member.voice.channel)return i.reply({content:'We are not in the same voice channel',ephemeral:true})
        let queue = Distube.getQueue(i.guild.id);
        if(!queue)return i.reply({content:'There are no songs currently playing that i could skip',ephemeral:true})
        if(queue.songs.length > 1){ 
            Distube.skip(queue)
             i.reply({embeds:[
                 new Discord.EmbedBuilder()
                .setTitle(`**Song Skipped**`)
                .setDescription(`Song Skipped by ${i.user}`)
                .setColor("#FFFFFF")
            ]})
        }else if(!queue.autoplay || queue.songs.length <= 1){ 
            Distube.stop(queue)
            i.reply({embeds:[
                new Discord.EmbedBuilder()
                .setTitle(`**Song Skipped**`)
                .setDescription(`Song Skipped by ${i.user}`)
                .setColor("#FFFFFF")
            ]})
        }
    }
}
