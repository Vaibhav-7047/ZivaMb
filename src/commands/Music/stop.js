const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "stop",
  category: "Music",
  description: "Stops the music.",
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
        .setAuthor({name: `| There Is No Music Playing`, iconURL:message.member.displayAvatarURL({dynamic:true})});
      return message.reply({ embeds: [thing] });
    }

    const autoplay = player.get("autoplay");
    if (autoplay) {
      player.set("autoplay", false);
    }

    if (!player.twentyFourSeven) {
        await player.destroy();
    } else {
        await player.stop();
    }

    return message.react(`<:musicstop:1066725998294483065>`);
  },
};
