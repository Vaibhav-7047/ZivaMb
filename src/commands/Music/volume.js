const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "volume",
    aliases: ["v", "vol"],
    category: "Music",
    description: "Change the volume of the bot.",
    args: false,
    usage: "",
    userPerms: [],
	dj: true,
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
execute: async (message, args, client, prefix) => {
  
	const player = client.manager.get(message.guild.id);

        if (!player.queue.current) {
            let thing = new EmbedBuilder()
                .setColor(client.embedColor)
                .setAuthor({name: `There Is No Music Playing`, iconURL: message.member.displayAvatarURL({dynamic:true})});
            return message.reply({embeds: [thing]});
		}
		
		const volumeEmoji = client.emoji.volumehigh;

		if (!args.length) {
			let thing = new EmbedBuilder()
			.setColor(client.embedColor)
			.setTimestamp()
      .setAuthor({name: `| Volume Is Set To ${player.volume}%`, iconURL: message.member.displayAvatarURL({dynamic:true})})
			return message.reply({embeds: [thing]});
		}

		const volume = Number(args[0]);
		
		if (!volume || volume < 0 || volume > 500) { 
			let thing = new EmbedBuilder()
                .setColor(client.embedColor)
  				      .setAuthor({name: `| Usage: volume <0 - 500>`,iconURL: message.member.displayAvatarURL({dynamic:true})})
            return message.reply({embeds: [thing]});
		}

		player.setVolume(volume);

		if (volume > player.volume) {
			var emojivolume = client.emoji.volumehigh;
			let thing = new EmbedBuilder()
				.setColor(client.embedColor)
				.setTimestamp()
        .setAuthor({name: `| Volume Is Set To ${volume}%`, iconURL: message.member.displayAvatarURL({dynamic:true})})
		  return message.reply({embeds: [thing]});
		} else if (volume < player.volume) {
			var emojivolume = message.client.emoji.volumelow;
			let thing = new EmbedBuilder()
				.setColor(client.embedColor)
				.setTimestamp()
				.setAuthor({name: `| Volume Is Set To ${volume}%`, iconURL: message.member.displayAvatarURL({dynamic:true})})
		  return message.reply({embeds: [thing]});
		} else {
			let thing = new EmbedBuilder()
				.setColor(client.embedColor)
				.setTimestamp()
				.setAuthor({name: `| Volume Is Set To ${volume}%`, iconURL: message.member.displayAvatarURL({dynamic:true})})
			return message.reply({embeds: [thing]});
		}
		
 	}
};
