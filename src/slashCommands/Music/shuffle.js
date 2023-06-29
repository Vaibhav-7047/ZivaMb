const { EmbedBuilder, CommandInteraction, Client } = require("discord.js")

module.exports = {
  name: "shuffle",
  description: "Shuffle the queue.",
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
    if (!player.queue.current) {
      let thing = new EmbedBuilder()
        .setColor(client.embedColor)
        .setAuthor({name:`| There Is No Music Playing`,iconURL: interaction.user.displayAvatarURL({dynamic:true})});
      return interaction.editReply({ embeds: [thing] });
    }
    player.queue.shuffle();

    const emojishuffle = client.emoji.shuffle;

    let thing = new EmbedBuilder()
      .setAuthor({name: `| Successfully Shuffled The Queue`,iconURL: interaction.user.displayAvatarURL({dynamic:true})})
      .setColor(client.embedColor);
    return interaction.editReply({ embeds: [thing] });

  }
};
