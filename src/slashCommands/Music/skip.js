const { CommandInteraction, Client, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "skip",
  description: "Skip the song currently playing.",
  userPrems: [],
  player: true,
  dj: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,

  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String} color
   */

  run: async (client, interaction) => {
    const player = interaction.client.manager.get(interaction.guild.id);

    if (!player.queue.current) {
      let thing = new EmbedBuilder()
        .setColor(client.embedColor)
        .setAuthor({name: `| There Is No Music Playing`,iconURL: interaction.user.displayAvatarURL({dynamic:true})});
      return interaction.reply({ embeds: [thing] });
    }
    const song = player.queue.current;

    player.stop();

    const emojiskip = interaction.client.emoji.skip;

    let thing = new EmbedBuilder()
      .setAuthor({name:`| Skipped`,iconURL: interaction.user.displayAvatarURL({dynamic:true})})
      .setColor(client.embedColor);
    return interaction.reply({ embeds: [thing], fetchReply: true }).then((msg) => {
      setTimeout(() => {
        msg.delete();
      }, 3000);
    });
  },
};
