const { EmbedBuilder, version, Message } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const os = require("os");
const Presto = require("../../structures/Client");

module.exports = {
  name: "status",
  category: "Information",
  aliases: ['stats'],
  description: "Displays bot status.",
  args: false,
  usage: "",
  userPerms: [],
  owner: false,
  /**
   *
   * @param {Message} message
   * @param {string[]} args
   * @param {Presto} client
   * @param {string} prefix
   */
  execute: async (message, args, client, prefix) => {
      
    const duration1 = moment
      .duration(message.client.uptime)
      .format(" d [days], h [hrs], m [mins], s [secs]");
    const about = message.client.emoji.about;
      let guildsCounts = await client.guilds.cache;
   /* let guildsCounts = await client.guilds.fetch();*/
    let channelsCounts = await client.channels.cache;
    let userCounts = client.guilds.cache.reduce(
      (acc, guild) => acc + guild.memberCount,
      0
    );
    let userCounts2 = userCounts + userCounts + userCounts;

    const embed = new EmbedBuilder()
      .setColor(client.embedColor)
      .setAuthor({ name: `${client.user.username} Information`, iconURL: client.user.displayAvatarURL()})
      .setThumbnail(message.client.user.displayAvatarURL())
      .setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })})
      .setTimestamp()
      .setDescription(`**Name :** ${client.user.username}
**Servers :** ${guildsCounts.size}
**Channels :** ${channelsCounts.size}
**Users :** ${userCounts2}
**Discord.js :** v${version}
**Uptime :** ${duration1}
**Ping :** ${client.ws.ping}ms
            `)
            .addFields([
              { name: '<:fl_developer:1040971712268861450> Developer(s)', value: '[Respect Sir](https://discord.com/users/971661235693162506)', inline: true },
            { name: '<:Team:1070765953387868221> Team(s)', value: '[Anurag](https://discord.com/users/912952650906083329)', inline: false },
          ])
    message.reply({ embeds: [embed] });
  },
};
