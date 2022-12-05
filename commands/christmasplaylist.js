module.exports={
    data:{
        name:"christmasplaylist",
        description:"Play christmas playlist"
    },
    async execute(Client,i,Discord,Distube){
        if(!i.member.voice.channel)return i.reply({content:'Please join a voice channel',ephemeral:true})
        if(!i.guild.members.me.voice.channel == i.member.voice.channel)return i.reply({content:'We are not in the same voice channel',ephemeral:true})
        Distube.play(i.member.voice.channel, "https://open.spotify.com/playlist/4YB7o8mUdklcsgyOETM1U2?si=9185443365f44d9b", {member:i.member,textChannel:i.channel})
        i.reply({content:"Loading...",ephemeral:true})
    }
}