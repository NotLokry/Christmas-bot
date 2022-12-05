module.exports={
    data:{
        name:"ski",
        description:"Go skiing"
    },
    async execute(Client,i,Discord){
        function CreatePlayer(places){
			/**
			 * @param {Array} places
			*/
			let player = places.filter(place => place.active === false && place.name.startsWith("b"))[Math.floor(Math.random() * places.filter(place => place.active === false && place.name.startsWith("b")).length)]
			player.emoji = "⛷️"
			player.active = true
		}
        function CreateLog(places){
			/**
			 * @param {Array} places
			*/
            var amount = Math.floor(Math.random() * 4)+1
            for(let i = 0;i<amount;i++){
                var logplace = places.filter(place => place.log === false && place.name.startsWith("h"))[Math.floor(Math.random() * places.filter(place => place.log === false &&place.name.startsWith("h")).length)]
                logplace.emoji = ":wood:"
			    logplace.log = true
            }
		}
		/**
		* @param {Number} amount
		*/
		let amount = 8
		let abc = ['a','b','c','d','e','f','g','h']
		let abcs = []
        var tillNextSpawn = 4
        var gameover = false
		for(let i = 0; i < amount ; i++){
			abcs.push(abc[i])
		}
		let places = []
		amount++
		abcs.forEach(letter => {
			for(let i = 1; i < amount ; i++){
				places.push({emoji:"⬜",name:`${letter}${i}`,active:false,log:false})
			}
		})
		let description = ''
		CreatePlayer(places)
        CreateLog(places)
		places.forEach(place => {
			if(parseInt(place.name.slice(-1)) === amount - 1){description += `${place.emoji}\n`}else{description += place.emoji}
		})
		const reply = await i.reply({
			embeds:[
				new Discord.EmbedBuilder()
                .setTitle("Go skiing")
				.setDescription(`${description}`)
                .setColor("#FFFFFF")
			],
			fetchReply:true,
			components:[
				new Discord.ActionRowBuilder().addComponents([
					new Discord.ButtonBuilder()
					.setCustomId("left")
					.setLabel("◀")
					.setStyle(Discord.ButtonStyle.Primary),
					new Discord.ButtonBuilder()
					.setCustomId("right")
					.setLabel("▶")
					.setStyle(Discord.ButtonStyle.Primary)
				])
			]
		})
        function Updater(){
            if(gameover == true)return
			setTimeout(() => {
				let description = ''
				function Checker(places,oldPositions,newPositions){
                    oldPositions.forEach(pos=>{
                        pos.log = false
                    })
					places.filter(place => place.active === false).forEach(place => {
                        if(place.log == true)return
						place.emoji = "⬜"
					})
                    newPositions.forEach(pos =>{
                        if(pos.name.startsWith("a"))return
                        pos.log = true
                        pos.emoji = ":wood:"
                    })
                    tillNextSpawn -= 1
                    if(tillNextSpawn == 0){
                        CreateLog(places)
                        tillNextSpawn = 4
                    }


					places.forEach(place => {
						if(parseInt(place.name.slice(-1)) === amount - 1){description += `${place.emoji}\n`}else{description += place.emoji}
					})
                    if(places.filter(place=>place.active == true && place.log == true).length >=1 ){
                        reply.edit({
                            embeds:[
                                new Discord.EmbedBuilder()
                                .setTitle("Gameover")
                                .setDescription(`${description}`)
                                .setColor("#FFFFFF")
                            ],
                            components:[

                            ]
                        })
                        return gameover = true
                    }
					reply.edit({
						embeds:[
							new Discord.EmbedBuilder()
                            .setTitle("Go skiing")
							.setDescription(`${description}`)
                            .setColor("#FFFFFF")
						]
					})
					Updater()
				}
				function DecideMovement(places,oldPositions,moveablePlaces){
					const newPositions = moveablePlaces
					Checker(places,oldPositions,newPositions)
				}
				function GetMoveablePlaces(places,positions){
					let moveablePlaces = []
                    positions.forEach(position => {
                        if(position.name.slice(0,1) != "a"){
                            if(position.name.slice(0,1) === "b"){
                                moveablePlaces.push(places.filter(place => place.name === `a${Number(position.name.slice(-1))}`)[0])
                            }
                            if(position.name.slice(0,1) === "c"){
                                moveablePlaces.push(places.filter(place => place.name === `b${Number(position.name.slice(-1))}`)[0])
                            }
                            if(position.name.slice(0,1) === "d"){
                                moveablePlaces.push(places.filter(place => place.name === `c${Number(position.name.slice(-1))}`)[0])
                            }
                            if(position.name.slice(0,1) === "e"){
                                moveablePlaces.push(places.filter(place => place.name === `d${Number(position.name.slice(-1))}`)[0])
                            }
                            if(position.name.slice(0,1) === "f"){
                                moveablePlaces.push(places.filter(place => place.name === `e${Number(position.name.slice(-1))}`)[0])
                            }
                            if(position.name.slice(0,1) === "g"){
                                moveablePlaces.push(places.filter(place => place.name === `f${Number(position.name.slice(-1))}`)[0])
                            }
                            if(position.name.slice(0,1) === "h"){
                                moveablePlaces.push(places.filter(place => place.name === `g${Number(position.name.slice(-1))}`)[0])
                            }
                        }
                    })
					if(moveablePlaces.length <= 0)return
					DecideMovement(places,positions,moveablePlaces)
				}
				function getPosition(places){
					const positions = places.filter(place => place.log === true)
					GetMoveablePlaces(places,positions)
				}
				getPosition(places)
			},2500)
		}
		Updater()
		const filter = inter => inter.user.id === i.user.id
		const collector = reply.createMessageComponentCollector({filter})
		collector.on("collect", c => {
			let description = ''
			function Checker(places,oldPosition,newPosition){
				oldPosition.active = false
				places.filter(place => place.active === false).forEach(place => {
                    if(place.log == true)return
                    place.emoji = "⬜"
                })
				newPosition.active = true
				newPosition.emoji = "⛷️"
				places.forEach(place => {
					if(parseInt(place.name.slice(-1)) === amount - 1){description += `${place.emoji}\n`}else{description += place.emoji}
				})
                if(places.filter(place=>place.active == true && place.log == true).length >=1 ){
                    reply.edit({
                        embeds:[
                            new Discord.EmbedBuilder()
                            .setTitle("Gameover")
                            .setDescription(`${description}`)
                            .setColor("#FFFFFF")
                        ],
                        components:[

                        ]
                    })
                    return gameover = true
                }
				c.update({
					embeds:[
						new Discord.EmbedBuilder()
                        .setTitle("Go skiing")
						.setDescription(`${description}`)
                        .setColor("#FFFFFF")
					]
				})
			}
			function DecideMovement(places,oldPosition,moveablePlaces){
				const picked = moveablePlaces[Math.floor(Math.random() * moveablePlaces.length)]
				const newPosition = places.filter(place => place === picked[0])[0]
				Checker(places,oldPosition,newPosition,)
			}
			function GetMoveablePlaces(places,position,iName){
				let moveablePlaces = []
				moved = ' '
				if(Number(position.name.slice(-1)) != 1 && iName === "left"){
					moveablePlaces.push(places.filter(place => place.name === `${position.name.slice(0,1)}${Number(position.name.slice(-1)) - 1}`))
				}
				if(position.name.slice(-1) < Number(amount) - 1 && iName === "right"){
					moveablePlaces.push(places.filter(place => place.name === `${position.name.slice(0,1)}${Number(position.name.slice(-1)) + 1}`))
				}
				if(moveablePlaces.length <= 0)return
				DecideMovement(places,position,moveablePlaces)
			}
			function getPosition(places,iName){
				const position = places.filter(place => place.active === true)[0]
				GetMoveablePlaces(places,position,iName)
			}
			getPosition(places,c.customId)
		})
    }
}