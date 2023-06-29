const { EmbedBuilder, CommandInteraction, Client } = require("discord.js")

module.exports = {
  name: "resume",
  description: "Resume playing music.",
  userPrems: [],
  player: true,
  dj: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,

  /**
   * 
   * @param {Client} client 
   * @param {CommandInteraction} interaction 
   */

  run: async (client, interaction) => {
    await interaction.deferReply({
      ephemeral: false
    });

    const player = interaction.client.manager.get(interaction.guildId);
    const song = player.queue.current;

    if (!player.queue.current) {
      let thing = new EmbedBuilder()
        .setColor(client.embedColor).setAuthor({name:`| There Is No Music Playing`,iconURL: interaction.user.displayAvatarURL({dynamic:true})});
      return interaction.editReply({ embeds: [thing] });
    }

    const emojiresume = client.emoji.resume;

    if (!player.paused) {
      let thing = new EmbedBuilder()
        .setColor(client.embedColor)
        .setAuthor({name:`| The Player Is Already Resumed`,iconURL: interaction.user.displayAvatarURL({dynamic:true})});
      return interaction.editReply({ embeds: [thing] });
    }

    player.pause(false);

    let thing = new EmbedBuilder()
      .setColor(client.embedColor)
      .setAuthor({name:`| Player Resumed`,iconURL: interaction.user.displayAvatarURL({dynamic:true})});
    return interaction.editReply({ embeds: [thing] });

  }
};
