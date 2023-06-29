const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  SelectMenuBuilder,
  WebhookClient
} = require("discord.js");
const { convertTime } = require("../../utils/convert.js");
const { trackStartEventHandler } = require("../../utils/functions");
const { Webhooks: {player_create} } = require('../../config.js');
const db = require("../../schema/setup");
module.exports = async (client, player, track, payload) => {

  const web1 = new WebhookClient({ url: player_create }); 

    const server = client.guilds.cache.get(player.guild);
    const embed2 = new EmbedBuilder()
    .setColor(client.embedColor)
    .setAuthor({name: `Player Started` , iconURL: client.user.displayAvatarURL()})
    .setDescription(`**Server Id:** ${player.guild}\n**Server Name:** ${server.name}`)

    web1.send({embeds: [embed2]})
  
  let guild = client.guilds.cache.get(player.guild);
  if (!guild) return;
  let channel = guild.channels.cache.get(player.textChannel);
  if (!channel) return;
  let data = await db.findOne({ Guild: guild.id });
  if (data) {
    if (!data.Channel) data.Channel = channel.id;

    let textChannel = guild.channels.cache.get(data.Channel);
    console.log(data.Channel + "" + textChannel);
    if (!textChannel) {
      try {
        textChannel = await guild.channels.fetch(data.Channel);
      } catch {
        channel.send("Please run /setup as I am unable to find the channel");
        textChannel = channel;
      }
    }

    const id = data.Message;
    if (channel.id === textChannel.id) {
      return await trackStartEventHandler(
        id,
        textChannel,
        player,
        track,
        client
      );
    } else {
      await trackStartEventHandler(id, textChannel, player, track, client);
    }
  }

  const queue = player.get("dcQ");
  const thing = new EmbedBuilder()
    .setAuthor({ name: ` | Now Playing`, iconURL: client.user.displayAvatarURL({ dynamic : true }), })
    .setDescription(`[${track?.title ?? queue.title}](https://discord.gg/coderealmhq)`)
    .addFields([{name:`Duration`,value:`${convertTime(track?.duration ?? queue.duration)}`},
				        {name:`Requester`,value:`${track.requester.username}`}])
    .setThumbnail(client.user.displayAvatarURL( {dynamic : true }))
    .setColor(client.embedColor)
  const notherposeidon1 = new ButtonBuilder()
    .setCustomId("previous")
    .setEmoji('1123583072013664266')
    .setStyle(ButtonStyle.Secondary);
  const notherposeidon2 = new ButtonBuilder()
    .setCustomId("pause")
    .setEmoji('1123583308673073192')
    .setStyle(ButtonStyle.Secondary);
  const notherposeidon3 = new ButtonBuilder()
    .setCustomId("skip")
    .setEmoji('1123583149348237372')
    .setStyle(ButtonStyle.Secondary);
  const notherposeidon4 = new ButtonBuilder()
    .setCustomId("loop")
    .setEmoji('1123583216482271304')
    .setStyle(ButtonStyle.Success);
  const notherposeidon5 = new ButtonBuilder()
    .setCustomId("stop")
    .setEmoji('1123583416709947453')
    .setStyle(ButtonStyle.Danger);
  const notherposeidon6 = new ButtonBuilder()
    .setCustomId("previous")
    .setEmoji('1123583072013664266')
    .setStyle(ButtonStyle.Secondary);
  const notherposeidon7 = new ButtonBuilder()
    .setCustomId("resume")
    .setEmoji('1123583259687792711')
    .setStyle(ButtonStyle.Success);
    const notherposeidon8 = new ButtonBuilder()
    .setCustomId("skip")
    .setEmoji('1123583149348237372')
    .setStyle(ButtonStyle.Secondary);
  const notherposeidon9 = new ButtonBuilder()
    .setCustomId("loop")
    .setEmoji('1123583216482271304')
    .setStyle(ButtonStyle.Success);
  const notherposeidon10 = new ButtonBuilder()
    .setCustomId("stop")
    .setEmoji('1123583416709947453')
    .setStyle(ButtonStyle.Danger);
  
    const notherposeidonfilter = new ActionRowBuilder()
      .addComponents(
    new SelectMenuBuilder()
    .setCustomId("filter_pop")
    .setPlaceholder('Select Filter')
    .addOptions([
            {
              label: 'Reset Filters',
              value: 'clear_but'
            },
            {
              label: 'BassBoost',
              value: 'bass_but'
            },
            {
              label: '8D',
              value: '8d_but'
            },
            {
              label: 'NightCore',
              value: 'night_but'
            },
            {
              label: 'Pitch',
              value: 'pitch_but'
            },
            {
              label: 'Distort',
              value: 'distort_but'
            },
            {
              label: 'Speed',
              value: 'speed_but'
            },
            {
              label: 'Vaporwave',
              value: 'vapo_but'
            }
        ])
      )
    
  const notherposeidonrow = new ActionRowBuilder().addComponents( notherposeidon1, notherposeidon2, notherposeidon3, notherposeidon4, notherposeidon5 );
  const notherposeidonrow2 = new ActionRowBuilder().addComponents( notherposeidon6, notherposeidon7, notherposeidon8, notherposeidon9, notherposeidon10 );
  
  const notherposeidon0 = await channel.send({ embeds: [thing], components: [notherposeidonfilter,notherposeidonrow] });
  await player.setNowplayingMessage(notherposeidon0);
  const embed = new EmbedBuilder().setColor(client.embedColor).setTimestamp();
  const collector = notherposeidon0.createMessageComponentCollector({
    filter: (b) => {
      if ( b.guild.members.me.voice.channel && b.guild.members.me.voice.channelId === b.member.voice.channelId ) return true;
      else { b.reply({ content: `You are not connected to <#${b.guild.members.me.voice?.channelId ?? 'None'}> to use this buttons.`, ephemeral: true, }); return false;
      }
    },
    time: track?.duration ?? queue.duration,
  });
  collector.on("collect", async (i) => {
    await i.deferReply({
      ephemeral: true,
    });
    
    if (i.customId === "vdown") {
      if (!player) {
        return collector.stop();
      }
      let amount = Number(player.volume) - 10;
      await player.setVolume(amount);
      i.editReply({
        embeds: [
          embed
            .setAuthor({
              name: `| The Current Volume Is Set To ${amount}`,
              iconURL: i.member.user.displayAvatarURL(),
            })
        ], 
      });
      
    } else if (i.customId === "stop") {
      if (!player) {
        return collector.stop();
      }
      await player.stop();
      await player.queue.clear();
      i.editReply({
        embeds: [
          embed
            .setAuthor({
              name: `| Stopped the Music`,
              iconURL: i.member.user.displayAvatarURL(),
            })
        ],
      });
      return collector.stop();
    } else if (i.customId === "pause") {
      if (!player) {
        return collector.stop();
      }
      player.pause(!player.paused);
      const Text = player.paused
        ? `Paused`
        : `Resumed`;
      i.editReply({
        embeds: [
          embed
            .setAuthor({
              name: `Player ${Text}`,
              iconURL: i.member.user.displayAvatarURL(),
            })
        ],
      });
    } else if (i.customId === "skip") {
      if (!player) {
        return collector.stop();
      }

      await player.stop();
      i.editReply({
        embeds: [
          embed
            .setAuthor({
              name: `Skipped To The Next Track`,
              iconURL: i.member.user.displayAvatarURL(),
            })
        ],
      });
      if (player.queue.length === 1) {
        return collector.stop();
      }
    } else if (i.customId === "vup") {
      if (!player) {
        return collector.stop();
      }
      let amount = Number(player.volume) + 10;
      if (amount >= 150)
        return i
          .editReply({
            embeds: [
              embed
                .setAuthor({
                  name: i.member.user.tag,
                  iconURL: i.member.user.displayAvatarURL(),
                })
                .setDescription(
                  `Cannot Higher The Player Volume Further More.`
                ),
            ],
          });
      
      await player.setVolume(amount);
      i.editReply({
        embeds: [
          embed
            .setAuthor({
              name: `The Current Volume Is Set To ${amount}`,
              iconURL: i.member.user.displayAvatarURL(),
            })
        ],
      });
      return;
    }

    if(i.values[0] === "clear_but") {
      await player.clearEffects();
      await i.editReply({ ephemeral: true , content: `Succesfully Cleared All **FILTERS**`});
    } 
    if(i.values[0] === "bass_but") {
     await player.setBassboost(true);
     await i.editReply({ ephemeral: true, content:`BassBoost mode **ENABLED**` });
  }
    if(i.values[0] === "8d_but") {
      await player.set8D(true);
      await i.editReply({ ephemeral: false , content: `8D Mode **ENABLED**`, ephemeral: true });
    }
    if(i.values[0] === "night_but") {
      await player.setNightcore(true);
      await i.editReply({ ephemeral: true, content: `NightCore Mode **ENABLED**`, ephemeral: true });
    }
    if(i.values[0] === "pitch_but") {
      await player.setPitch(2);
      await i.editReply({ ephemeral: true, content: `Pitch Mode **ENABLED**`, ephemeral: true });
    }
    if(i.values[0] === "distort_but") {
      await player.setDistortion(true);
      await i.editReply({ ephemeral: true, content: `Distort Mode **ENABLED**` });
    }
    if(i.values[0] === "speed_but") {
      await player.setSpeed(2);
      await i.editReply({ ephemeral: true, content: `Speed Mode **ENABLED**`, ephemeral: true });
    }
    if(i.values[0] === "vapo_but") {
      await player.setVaporwave(true);
      await i.editReply({ ephemeral: true, content: `VaporWave Mode **ENABLED**`, ephemeral: true });
    }
  });
};
