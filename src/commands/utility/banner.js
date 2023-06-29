const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const axios = require('axios');

module.exports = {
  name: "banner",
  category: "utility",
  aliases: [],
  description: "Get the bot's invite link.",
  args: false,
  usage: "",
  userPerms: [],
  owner: false,
  execute: async (message, args, client, prefix) => {

    let u = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;

    axios
    .get(`https://discord.com/api/users/${u.id}`, {
    headers: {
        Authorization: `Bot ${client.token}`,
    },
})
.then((res) => {
    const { banner } = res.data;

    if(banner) {
        const extension = banner.startsWith("a_") ? '.gif?size=4096' : '.png?size=4096'; 
        const url = `https://cdn.discordapp.com/banners/${u.id}/${banner}${extension}`;

        let embed = new EmbedBuilder()
        .setAuthor({name: `| Banner of ${u.tag}`, iconURL: u.displayAvatarURL({dynamic:true})})
        .setImage(`${url}`)
        .setColor(client.embedColor)
        .setTimestamp()
 
            message.reply({embeds: [embed]})
        }else {

            let embed2 = new EmbedBuilder()
            .setDescription(`**${u.username}** doesn't have a Banner`)
            .setColor(client.embedColor)

            message.reply({ embeds: [embed2] })
        }
      })

  }
}
