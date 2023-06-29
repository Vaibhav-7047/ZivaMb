const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "skip",
  aliases: ["s"],
  category: "Music",
  description: "Skip the song currently playing.",
  args: false,
  usage: "",
  userPerms: [],
  dj: true,
  owner: false,
  player: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  execute: async (message, args, client, prefix) => {
    const player = message.client.manager.get(message.guild.id);

    if (!player.queue.current) {
      let thing = new EmbedBuilder()
        .setColor(client.embedColor)
        .setAuthor({name: `There Is No Music Playing`, iconURL: message.member.displayAvatarURL({dynamic:true})})
      return message.reply({ embeds: [thing] });
    }
    const song = player.queue.current;

    player.stop();

    await message.react(`<:skip:1075129722071163012>`)
  },
};
