module.exports = {
    data:{name: 'pause',description:"Pause the music"},
    async execute(Client,i,Discord,Distube){
        if(!i.guild.members.me.voice.channel)i.reply({content:'Im currently not in a voice channel',ephemeral:true})
        if(!i.member.voice.channel)i.reply({content:'Please join the voice channel',ephemeral:true})
        if(!i.guild.members.me.voice.channel == i.member.voice.channel)i.reply({content:'We are not in the same voice channel',ephemeral:true})
        let queue = Distube.getQueue(i.guild.id);
        Distube.pause(queue)
        i.reply({content:'Paused',ephemeral:true})
    }
}