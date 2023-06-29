const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    name: "about",
    category: "Information",
    aliases: ["botinfo", "info","bi"],
    description: "See information about this project.",
    args: false,
    usage: "",
    userPerms: [],
    owner: false,
    execute: async (message, args, client, prefix) => {
          var support = client.config.links.support;
          var invite = client.config.links.invite;
          var icon = client.config.links.icon;
     
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
            )

      const mainPage = new EmbedBuilder()
        
            .setAuthor({ name: `${client.user.username}`, iconURL: client.user.displayAvatarURL()})
             .setThumbnail(client.user.displayAvatarURL())
            .setColor(client.embedColor)
            .setFooter({text: `Made with 💖 ${client.user.username} Development`,iconURL: client.user.displayAvatarURL()})

            .addFields([
                { name: '<:fl_developer:1040971712268861450> Developer(s)', value: '[Respect Sir](https://discord.com/users/971661235693162506)', inline: true },
              { name: '<:Team:1070765953387868221> Team(s)', value: '[Anurag](https://discord.com/users/912952650906083329)', inline: false },
            ])
            .setDescription(`Hey, I am **${client.user.username}**, The Best Quality **Music** and **Multipurpose** Bot With Pretty Much Features. You Can View All My Commands By Doing \`${prefix}help\``)


        return message.reply({embeds: [mainPage], components: [row]});
    }
}