const { EmbedBuilder,ActionRowBuilder,ButtonBuilder,ButtonStyle } = require("discord.js");
const Model = require("../../schema/247");

module.exports = {
  name: "247",
  aliases: ["24h", "24/7"],
  category: "Config",
  description: "Sets 24/7 mode, bot stays in voice channel 24/7.",
  args: false,
  usage: "",
  userPerms: [],
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
                .setURL('https://top.gg/bot/977239244898730064/vote'),
                  
                new ButtonBuilder()
                .setLabel(`Premium`)
                .setStyle(ButtonStyle.Link)
                .setURL('https://discord.gg/XTWGY94xgA')
                  );
      
    const player = message.client.manager.players.get(message.guild.id);
    const data = await Model.findOne({ Guild: message.guild.id });
    if (player.twentyFourSeven) {
      player.twentyFourSeven = false;
      const embed = new EmbedBuilder()
        .setColor(client.embedColor)
        .setAuthor({name: `| 24/7 In VC Mode Disabled`, iconURL: message.member.displayAvatarURL({ dynamic : true })});
      message.reply({ embeds: [embed] });
    } else {
      player.twentyFourSeven = true;
      const embed = new EmbedBuilder()
        .setColor(client.embedColor)
        .setAuthor({name: `| 24/7 In VC Mode Enabled`, iconURL: message.member.displayAvatarURL({ dynamic : true })});

      message.reply({ embeds: [embed] });
    }

    if (!data)
      return await Model.create({
        Guild: player.guild,
        247: player.twentyFourSeven,
        VoiceChannel: message.guild.members.me.voice?.channelId,
        TextChannel: message.channelId,
      });

    await data.updateOne({
      Guild: player.guild,
      247: player.twentyFourSeven,
      VoiceChannel: message.guild.members.me.voice?.channelId,
      TextChannel: message.channelId,
    });
  },
};
