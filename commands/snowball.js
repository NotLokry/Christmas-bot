module.exports={
    data:{
        name:"snowball",
        description:"Throw a snowball at somebody",
        options:[
            {
                type:6,
                name:"user",
                description:"Throw a snowball at who ???",
                required:true
            }
        ]
    },
    async execute(Client,i,Discord){
        const member = i.options.getMember("user")
        let embed
        const rng = Math.floor(Math.random()*5)+1
        if(rng >=3){
            embed = new Discord.EmbedBuilder()
            .setTitle(`${i.member.user.username} threw a snowball at ${member.user.username}`)
            .setImage("https://condaluna.com/assets/gifs/snowball-snowman.gif")
            .setColor("#FFFFFF")
        }
        else{
            embed = new Discord.EmbedBuilder()
            .setTitle(`${i.member.user.username} missed while throwing a snowball at ${member.user.username}`)
            .setImage("http://forgifs.com/gallery/d/211598-2/Snowball-dodge-headshot.gif")
            .setColor("#FFFFFF")
        }
        if(i.member.user.id == member.user.id){
            embed = new Discord.EmbedBuilder()
            .setTitle(`${i.member.user.username} accidently threw a snowball at himself`)
            .setImage("https://media.tenor.com/kMS-JKXlCOQAAAAM/dinosaurs-snowball-fight.gif")
            .setColor("#FFFFFF")
        }
        i.reply({
            embeds:[
                embed
            ]
        })
    }
}