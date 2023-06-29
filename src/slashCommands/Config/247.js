const { EmbedBuilder, CommandInteraction } = require("discord.js");
const Presto = require("../../structures/Client");
const { Player } = require("erela.js");
const Model = require("../../schema/247");

module.exports = {
  name: "247",
  description: "Sets 24/7 mode, bot stays in voice channel 24/7.",
  owner: false,
  player: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,

  /**
   *
   * @param {Presto} client
   * @param {CommandInteraction} interaction
   */

  run: async (client, interaction) => {
    await interaction.deferReply({
      ephemeral: false,
    });
    /**
     * @type {Player}
     */
    let player = interaction.client.manager.get(interaction.guildId);
    const data = await Model.findOne({ Guild: interaction.guildId });
    if (player.twentyFourSeven) {
      player.twentyFourSeven = false;
      const embed = new EmbedBuilder()
        .setAuthor({name: `| 24/7 In VC Mode Disabled`, iconURL: interaction.member.displayAvatarURL({ dynamic : true })})
        .setColor(client.embedColor);
      await interaction
        .editReply({ embeds: [embed] })
        .catch((err) => console.error("Promise Rejected At", err));
    } else {
      player.twentyFourSeven = true;
      const embed = new EmbedBuilder()
        .setAuthor({name: `| 24/7 In VC Mode Enabled`, iconURL: interaction.member.displayAvatarURL({ dynamic : true })})
        .setColor(client.embedColor);
      await interaction
        .editReply({ embeds: [embed] })
        .catch((err) => console.error("Promise Rejected At", err));
    }

    if (!data)
      return await Model.create({
        Guild: player.guild,
        247: player.twentyFourSeven,
        VoiceChannel: interaction.guild.members.me.voice?.channelId,
        TextChannel: interaction.channelId,
      });

    await data.updateOne({
      Guild: player.guild,
      247: player.twentyFourSeven,
      VoiceChannel: interaction.guild.members.me.voice?.channelId,
      TextChannel: interaction.channelId,
    });
    return;
  },
};
