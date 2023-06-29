const { EmbedBuilder } = require("discord.js");

module.exports = {
	name: "resume",
    aliases: ["r"],
    category: "Music",
    description: "Resume playing music.",
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
        const song = player.queue.current;

        if (!player.queue.current) {
            let thing = new EmbedBuilder()
                .setColor(client.embedColor)
                .setAuthor({name: `| There Is No Music Playing`, iconURL: message.member.displayAvatarURL({ dynamic : true })})
            return message.reply({embeds: [thing]});
        }

        const emojiresume = client.emoji.resume;

        if (!player.paused) {
            let thing = new EmbedBuilder()
                .setColor(client.embedColor)
                .setAuthor({name: `| The Player Is Already Resumed`, iconURL:message.member.displayAvatarURL({ dynamic : true })})
                .setTimestamp()
          return message.reply({embeds: [thing]});
        }

        player.pause(false);

        return message.react(`<:play:1076472776732446751>`);
	
    }
};
