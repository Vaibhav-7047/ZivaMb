const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, SelectMenuBuilder } = require("discord.js");

module.exports = {
    name: "filters",
    category: "Filters",
    aliases: ["eq", "equalizer"],
    description: "Sets the bot's sound filter.",
    args: false,
    usage: "",
    userPerms: [],
    dj: true,
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    execute: async (message, args, client, prefix) => {
        
        let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;

      const button = new ActionRowBuilder()
                .addComponents(
                new ButtonBuilder()
                .setLabel("Vote")
                .setStyle(ButtonStyle.Link)
                .setURL('https://top.gg/bot/1007298016165769347/vote'),
                  
                new ButtonBuilder()
                .setLabel(`Premium`)
                .setStyle(ButtonStyle.Link)
                .setURL('https://discord.gg/XTWGY94xgA')
                  );

        const player = message.client.manager.get(message.guild.id);
        if (!player.queue.current) {
            let thing = new EmbedBuilder()
                .setColor(client.embedColor)
                .setAuthor({name: `| There Is No Music Playing`, iconURL: message.member.displayAvatarURL({dynamic:true})});
            return message.reply({ embeds: [thing] });
        }
        const emojiequalizer = message.client.emoji.filter;
        const embed = new EmbedBuilder()
            .setColor(client.embedColor)
            .setAuthor({name: `| Filters`, iconURL: message.member.displayAvatarURL({dynamic:true})})
            .setFooter({text:`Love From Presto Fam <3`, iconURL: client.user.displayAvatarURL({dynamic:true})})
            .setDescription(`1. \`BassBoost\` 
2. \`8D\` 
3. \`NightCore\`
4. \`Pitch\`
5. \`Distort\`
6. \`Speed\`
7. \`Vaporwave\`

\`Choose From The Menu Below\``)

        const row4 = new ActionRowBuilder()
      .addComponents(
        new SelectMenuBuilder()
          .setCustomId('disable_h')
          .setPlaceholder(`Select Filters`)
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

        const embed1 = new EmbedBuilder().setColor(client.embedColor);

      const m = await message.channel.send({ embeds: [embed], components: [row4] });
      
        const collector = m.createMessageComponentCollector({
            filter: (f) => f.user.id === message.author.id ? true : false && f.deferUpdate().catch(() => { }),
            time: 600000,
            idle: 600000 / 2
        });
      
        collector.on("collect", async (i) => {
           await i.deferReply({ ephemeral: true });
            if(i.values[0] === "clear_but") {
      await player.clearEffects();
      await i.editReply({ ephemeral: true , content: `Succesfully Cleared All **FILTERS**`});
    } 
    if(i.values[0] === "bass_but") {
     await player.setBassboost(true);
     await i.editReply({ ephemeral: true, content:`BassBoost mode **ENABLED**` }).then((msg) => {
        setTimeout(() => {
          msg.delete();
        }, 10000);
      });
  }
    if(i.values[0] === "8d_but") {
      await player.set8D(true);
      await i.editReply({ ephemeral: false , content: `8D Mode **ENABLED**`, ephemeral: true }).then((msg) => {
        setTimeout(() => {
          msg.delete();
        }, 10000);
      });
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
    }
};
