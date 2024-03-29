const { CommandInteraction, Client, ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "loop",
  description: "Toggles loop mode.",
  userPrems: [],
  player: true,
  dj: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  options: [
    {
      name: "input",
      description: "Choose to loop a track or the queue.",
      type: ApplicationCommandOptionType.String,
      required: true,
      choices: [
        {
          name: "track",
          value: "track"
        },
        {
          name: "queue",
          value: "queue"
        }
      ]
    }
  ],
  /**
   * 
   * @param {Client} client 
   * @param {CommandInteraction} interaction 
   */

  run: async (client, interaction) => {
    if (!interaction.replied) await interaction.deferReply().catch(() => { });

    const input = interaction.options.getString("input");

    let player = client.manager.get(interaction.guildId);
    if (!player.queue.current) {
      let thing = new EmbedBuilder()
        .setColor(client.embedColor)
        .setAuthor({name:`| There Is No Music Playing`,iconURL: interaction.user.displayAvatarURL({dynamic:true})});
      return interaction.editReply({ embeds: [thing] });
    }
    const emojiloop = client.emoji.loop;

    if (input === "track") {
      if (player.trackRepeat) {
        player.setTrackRepeat(false);
        return await interaction.editReply({
          embeds: [new EmbedBuilder().setColor(client.embedColor).setAuthor({name:`| Loop Track Is Now Disabled`,iconURL: interaction.user.displayAvatarURL({dynamic:true})})]
        })
      } else {
        player.setTrackRepeat(true);
        return await interaction.editReply({
          embeds: [new EmbedBuilder().setColor(client.embedColor).setAuthor({name:`| Loop Track Is Now Enabled`,iconURL: interaction.user.displayAvatarURL({dynamic:true})})]
        })
      }
    } else if (input === "queue") {
      if (!player.queue.size) return await interaction.editReply({
        embeds: [new EmbedBuilder().setColor(client.embedColor).setAuthor({name:`| No More Songs Left To Loop`,iconURL: interaction.user.displayAvatarURL({dynamic:true})})]
      })
      if (player.queueRepeat) {
        player.setQueueRepeat(false);
        return await interaction.editReply({
          embeds: [new EmbedBuilder().setColor(client.embedColor).setAuthor({name:`| Loop Is Queue Is Now Disabled`,iconURL: interaction.user.displayAvatarURL({dynamic:true})})]
        })
      } else {
        player.setQueueRepeat(true);
        return await interaction.editReply({
          embeds: [new EmbedBuilder().setColor(client.embedColor).setAuthor({name:`| Loop Queue Is Now Enabled`,iconURL: interaction.user.displayAvatarURL({dynamic:true})})]
        })
      };
    }
  }
};
