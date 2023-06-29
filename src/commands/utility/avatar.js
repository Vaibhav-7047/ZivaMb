const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
  name: "avatar",
  category: "utility",
  aliases: ["av"],
  description: "Get the bot's invite link.",
  args: false,
  usage: "",
  userPerms: [],
  owner: false,
  execute: async (message, args, client, prefix) => {

    let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;

    const mainPage = new EmbedBuilder()
      .setAuthor({ name: `${user.tag}'s Avatar`, iconURL: user.displayAvatarURL()})
      .setTimestamp()
      .setColor(client.embedColor)
      .setDescription(`[\`PNG\`](${user.displayAvatarURL({
        format: "png",
        dynamic: false
      })}) | [\`JPG\`](${user.displayAvatarURL({
        format: "jpg",
        dynamic: false
      })}) | [\`GIF\`](${user.displayAvatarURL({
        format: "gif",
        dynamic: true
      })})`)
      .setImage(user.displayAvatarURL({dynamic:true, size:4096}))
      
    
    message.reply({ embeds: [mainPage] })
  }
}
