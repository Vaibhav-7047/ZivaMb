const { EmbedBuilder } = require("discord.js");
const db = require("../../schema/playlist");

module.exports = {
    name: "playlist-delete",
    aliases: ["pldelete"],
    category: "Playlist",
    description: "Delete your saved playlist.",
    args: true,
    usage: "Please Enter The Playlist Name To Delete",
    userPerms: [],
    owner: false,
    player: false,
    inVoiceChannel: false,
    sameVoiceChannel: false,
    execute: async (message, args, client, prefix) => {

        const Name = args[0].replace(/_/g, ' ');
        const data = await db.findOne({ UserId: message.author.id, PlaylistName: Name });
        if (!data) {
            return message.reply({ embeds: [new EmbedBuilder().setColor(client.embedColor).setDescription(`You Don't Have A Playlist Named **${Name}**.`)] });
        }
        if (data.length == 0) {
            return message.reply({ embeds: [new EmbedBuilder().setColor(client.embedColor).setDescription(`You Don't Have A Playlist Named **${Name}**.`)] });
        }
        await data.delete();
        const embed = new EmbedBuilder()
            .setColor(client.embedColor)
            .setDescription(`Successfully Deleted **${Name}** Playlist`);
        return message.channel.send({ embeds: [embed] })
    }
}
