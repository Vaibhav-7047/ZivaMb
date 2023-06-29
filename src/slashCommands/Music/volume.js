const { CommandInteraction, Client, EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  name: "volume",
  description: "Change the volume of the bot.",
  userPrems: [],
  player: true,
  dj: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  options: [
    {
      name: "number",
      description: "Volume between 0 and 100",
      required: true,
      type: ApplicationCommandOptionType.Number,
    }
  ],

  /**
   * 
   * @param {Client} client 
   * @param {CommandInteraction} interaction 
   * @param {String} color 
   */

  run: async (client, interaction) => {
    await interaction.deferReply({
      ephemeral: false
    });

    const emojivolume = client.emoji.volumehigh;

    const vol = interaction.options.getNumber("number");

    const player = client.manager.get(interaction.guildId);
    if (!player) return await interaction.editReply({
      embeds: [new EmbedBuilder().setColor(client.embedColor).setAuthor({name:`| There Is No Music Playing`,iconURL: interaction.user.displayAvatarURL({dynamic:true})})]
    }).catch(() => { });
    if (!player.queue.current) return await interaction.editReply({
      embeds: [new EmbedBuilder().setColor(client.embedColor).setAuthor({name:`| There Is No Music Playing`,iconURL: interaction.user.displayAvatarURL({dynamic:true})})]
    }).catch(() => { });
    const volume = Number(vol);
    if (!volume || volume < 0 || volume > 100) return await interaction.editReply({
      embeds: [new EmbedBuilder().setColor(client.embedColor)
              .setAuthor({name:`| Number Of Volume Should Be Between 0 - 500`,iconURL: interaction.user.displayAvatarURL({dynamic:true})})]
    }).catch(() => { });

    player.setVolume(volume);
    if (volume > player.volume) return await interaction.editReply({
      embeds: [new EmbedBuilder()
              .setColor(client.embedColor)
              .setAuthor({name:`| Volume Set To: ${volume}%`,iconURL: interaction.user.displayAvatarURL({dynamic:true})})]
    }).catch(() => { });
    else if (volume < player.volume) return await interaction.editReply({
      embeds: [new EmbedBuilder()
              .setColor(client.embedColor)
              .setAuthor({name:`| Volume Set To: ${volume}%`,iconURL: interaction.user.displayAvatarURL({dynamic:true})})]
    }).catch(() => { });
    else
      await interaction.editReply({
        embeds: [new EmbedBuilder()
              .setColor(client.embedColor)
              .setAuthor({name:`| Volume Set To: ${volume}%`,iconURL: interaction.user.displayAvatarURL({dynamic:true})})]
      }).catch(() => { });
  }
}
