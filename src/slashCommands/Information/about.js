const { EmbedBuilder, CommandInteraction, Client, ActionRowBuilder, ButtonBuilder, ButtonStyle, ApplicationCommandType } = require("discord.js")

module.exports = {
    name: "about",
    description: "See information about this project.",
    type: ApplicationCommandType.ChatInput,
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction, prefix) => {
        var support = client.config.links.support;
        var invite = client.config.links.invite;
      
        await interaction.deferReply({
            ephemeral: false
        });
        
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
            .setColor(client.embedColor)
            .setFooter({text: `Made with 💖 by YuvaRaj..!!#8888`})

            .addFields([
                { name: '<:fl_developer:1040971712268861450> Developer', value: '[- YuvaRaj..!!](https://discord.com/users/926757287119450133)', inline: true },
              { name: '<:Team:1070765953387868221> Team', value: '[Karma](https://discord.com/users/808148588105957387) , [Rexxy](https://discord.com/users/1031760350095347764) , [Ankush](https://discord.com/users/778581610261381120)', inline: false },
            ])
            .setDescription(`Hey, I am **${client.user.username}**, The Best Quality **Music Bot**. You can view all my commands by doing \`${prefix}help\``)
      
        await interaction.followUp({ embeds: [mainPage], components: [row] });
    }
}
