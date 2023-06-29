const { EmbedBuilder } = require("discord.js");

module.exports = {
	name: "leave",
    aliases: ["dc"],
    category: "Music",
    description: "Disconnects the bot from your voice channel.",
    args: false,
    usage: "",
    userPerms: [],
    owner: false,
    dj: true,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
 execute: async (message, args, client, prefix) => {
       
        const player = message.client.manager.get(message.guild.id);

        const emojiLeave = message.client.emoji.leave;

        player.destroy();
        
        let thing = new EmbedBuilder()
            .setColor(client.embedColor)
            .setDescription(`${emojiLeave} **Left the voice channel.**\nThank you for using ${message.client.user.username}!`)
          return message.react(`<:call_disconnect:1056206550500376606>`)
          return message.reply({embeds: [thing]});
	
    }
};