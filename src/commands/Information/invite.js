const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
  name: "invite",
  category: "Information",
  aliases: ["addme"],
  description: "Get the bot's invite link.",
  args: false,
  usage: "",
  userPerms: [],
  owner: false,
  execute: async (message, args, client, prefix) => {
    var invite = client.config.links.invite;
    var support = client.config.links.support;

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setLabel("Invite")
          .setStyle(ButtonStyle.Link)
          .setURL(invite),
        new ButtonBuilder()
          .setLabel("Support")
          .setStyle(ButtonStyle.Link)
          .setURL(support)
      );

    const mainPage = new EmbedBuilder()
      .setAuthor({ name: `${client.user.username}`, iconURL: client.user.displayAvatarURL()})
      .setThumbnail(client.user.displayAvatarURL())
      .setFooter({text: `Made with 💖 by ${client.user.username}`,iconURL: client.user.displayAvatarURL()})
      .setColor(0x303236)
      .addFields([{ name: 'Invite Links', value: `[**${client.user.username}**](${invite})` },
      { name: 'Support Server', value: `[**Server link**](${support})`
                    }])
    
    message.reply({ embeds: [mainPage], components: [row] })
  }
}
