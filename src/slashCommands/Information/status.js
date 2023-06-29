const {
  version, EmbedBuilder
} = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const os = require("os");

module.exports = {
  name: "status",
  description: "Displays bot status.",
  run: async (client, interaction) => {
    await interaction.deferReply({
      ephemeral: false,
    });

    const duration1 = moment
      .duration(interaction.client.uptime)
      .format(" d [days], h [hrs], m [mins], s [secs]");
    const about = interaction.client.emoji.about;
    let guildsCounts = await client.guilds.fetch();
    let channelsCounts = await client.channels.cache;
    let userCounts = client.guilds.cache.reduce(
      (acc, guild) => acc + guild.memberCount,
      0
    );

    const embed = new EmbedBuilder()
      .setColor(client.embedColor)
      .setAuthor({ name: `${client.user.username} Information`, iconURL: client.user.displayAvatarURL()})
      .setThumbnail(client.user.displayAvatarURL())
      .setFooter({text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
      .setTimestamp()
      .setDescription(`**Name :** ${client.user.username}
**Servers :** ${guildsCounts.size}
**Channels :** ${channelsCounts.size}
**Users :** ${userCounts}
**Discord.js :** v${version}
**Uptime :** ${duration1}
**Ping :** ${client.ws.ping}ms
            `)
.addFields([
                { name: '<:fl_developer:1040971712268861450> Developer', value: '[- YuvaRaj..!!](https://discord.com/users/926757287119450133)', inline: true },
              { name: '<:Team:1070765953387868221> Team', value: '[Karma](https://discord.com/users/808148588105957387) , [Rexxy](https://discord.com/users/1031760350095347764) , [Ankush](https://discord.com/users/778581610261381120)', inline: false },
            ])
    interaction.followUp({ embeds: [embed] });
  },
};
