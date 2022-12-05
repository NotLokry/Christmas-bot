module.exports={
    data:{
        name:"play",
        description:"Play song",
        options:[
            {
            type:3,
            name:"query",
            description:"Song query",
            required:true
            }
        ]
    },
    async execute(Client,i,Discord,Distube){
        if(!i.member.voice.channel)return i.reply({content:'Please join a voice channel',ephemeral:true})
        if(!i.guild.members.me.voice.channel == i.member.voice.channel)return i.reply({content:'We are not in the same voice channel',ephemeral:true})
        const song = i.options.getString("query")
        Distube.play(i.member.voice.channel, song, {member:i.member,textChannel:i.channel})
        i.reply({content:"Loading...",ephemeral:true})
    }
}