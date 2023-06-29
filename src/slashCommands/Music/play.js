const {
  CommandInteraction,
  EmbedBuilder,
  PermissionsBitField,
  ApplicationCommandOptionType,
} = require("discord.js");
const Presto = require("../../structures/Client");
const { convertTime } = require("../../utils/convert.js");
module.exports = {
  name: "play",
  description: "Plays audio from any supported source.",
  player: false,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  options: [
    {
      name: "input",
      description: "Song name or URL to play.",
      required: true,
      type: ApplicationCommandOptionType.String,
      autocomplete: true,
    },
  ],

  /**
   * @param {Presto} client
   * @param {CommandInteraction} interaction
   */

  run: async (client, interaction) => {
    await interaction.deferReply({
      ephemeral: false,
    });

    const youtube = new EmbedBuilder()
        .setColor(client.embedColor)
        .setAuthor({name:`| We Don't Support This Platform`,iconURL: interaction.member.displayAvatarURL({dynamic:true})})
    let input = interaction.options.getString("input");
    if(input.includes(`youtu.be`))
      return interaction.editReply({embeds: [youtube] })
     if(input.includes(`youtube.com`))
      return interaction.editReply({embeds: [youtube] })
     else if(input.includes(`y2u.be`)) 
      return interaction.editReply({embeds: [youtube]}) 
    
    if (
      !interaction.guild.members.me.permissions.has(
        PermissionsBitField.resolve(["Speak", "Connect"])
      )
    )
      return interaction.editReply({
        embeds: [
          new EmbedBuilder()
            .setColor(client.embedColor)
            .setDescription(
              `I don't have enough permissions to execute this command! Please give me permission to \`CONNECT\` or \`SPEAK\`.`
            ),
        ],
      });
    const { channel } = interaction.member.voice;
    if (
      !interaction.guild.members.cache
        .get(client.user.id)
        .permissionsIn(channel)
        .has(PermissionsBitField.resolve(["Speak", "Connect"]))
    )
      return interaction.editReply({
        embeds: [
          new EmbedBuilder()
            .setColor(client.embedColor)
            .setDescription(
              `I don't have enough permissions connect your VC! Please give me permission to \`CONNECT\` or \`SPEAK\`.`
            ),
        ],
      });

    const { playlist } = client.emoji;
    let search = interaction.options.getString("input");
    let res;
    const rejEmbed = new EmbedBuilder()
      .setAuthor({ name: `| Resuming Paused Queue`,iconURL: interaction.user.displayAvatarURL({dynamic:true})})
      .setColor(client.embedColor);

    /**
     * @type {Player}
     */
    let player = client.manager.get(interaction.guild.id);

    if (!player)
      player = client.manager.create({
        guild: interaction.guild.id,
        voiceChannel: interaction.member.voice.channel.id,
        textChannel: interaction.channel.id,
        selfDeafen: true,
        volume: 80,
      });

    if (player.state != "CONNECTED") await player.connect();

    try {
      res = await player.search(search, interaction.member.user);
      if (res.loadType === "LOAD_FAILED") {
        if (!player.queue.current) player.destroy();
        return await interaction.editReply({
          embeds: [
            new EmbedBuilder()
              .setColor(client.embedColor)
              .setDescription(`There was an error while searching.`),
          ],
        });
      }
    } catch (err) {
      console.log(err);
    }
    switch (res.loadType) {
      case "NO_MATCHES":
        if (!player.queue.current) player.destroy();
        return await interaction.editReply({
          embeds: [
            new EmbedBuilder()
              .setColor(client.embedColor)
              .setTimestamp()
              .setDescription(`**No Results Found**`),
          ],
        });
      case "TRACK_LOADED":
        player.queue.add(res.tracks[0]);
        if (!player.playing && !player.paused && !player.queue.length)
          player.play();
        const trackload = new EmbedBuilder()
          .setColor(client.embedColor)
          .setAuthor({name: `| Track Queued`,iconURL: interaction.member.displayAvatarURL({dynamic:true})})
          .setTimestamp()
          .setDescription(
            `[${res.tracks[0].title}](https://discord.gg/presto) - [${convertTime(res.tracks[0].duration)}]`
          );
        return await interaction.editReply({ embeds: [trackload] });
      case "PLAYLIST_LOADED":
        player.queue.add(res.tracks);
        const playlistloadds = new EmbedBuilder()
          .setColor(client.embedColor)
          .setTimestamp()
          .setAuthor({name: `| Playlist Queued`,iconURL: interaction.member.displayAvatarURL({dynamic:true})})
          .setDescription(`[${res.playlist.name}](https://discord.gg/presto) - [${convertTime(res.playlist.duration)}]`
          );

        if (
          !player.playing &&
          !player.paused &&
          player.queue.totalSize === res.tracks.length
        )
          await player.play();

        return await interaction.editReply({ embeds: [playlistloadds] });
      case "SEARCH_RESULT":
        const track = res.tracks[0];
        player.queue.add(track);
        if (!player.playing && !player.paused && !player.queue.length) {
          const searchresult = new EmbedBuilder()
            .setColor(client.embedColor)
            .setTimestamp()
            .setAuthor({name: `| Track Queued`,iconURL: interaction.member.displayAvatarURL({dynamic:true})})
            .setDescription(
              `[${track.title}](https://discord.gg/presto) - [${convertTime(track.duration)}]`
            );

          player.play();
          return await interaction.editReply({ embeds: [searchresult] });
        } else {
          const thing = new EmbedBuilder()
            .setColor(client.embedColor)
            .setTimestamp()
            .setAuthor({name: `| Track Queued`,iconURL: interaction.member.displayAvatarURL({dynamic:true})})
            .setDescription(
              `[${track.title}](https://discord.gg/presto) - [${convertTime(track.duration)}]`
            );

          return await interaction.editReply({ embeds: [thing] });
        }
    }
  },
};
