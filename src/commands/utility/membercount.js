const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'membercount',
  category: 'utility',
  aliases: ['mc'],
  description: 'gives new alert',
  args: false,
  usage: '',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  owner: false,
  execute: async (message, args, client, prefix) => {
    var support = client.config.links.support;

    
    let embed = new EmbedBuilder()
        .setAuthor({name: `Members`, iconURL: message.guild.iconURL({dynamic:true})})
        .setDescription(`${message.guild.memberCount}`)
        .setColor(client.embedColor)
        .setTimestamp()
        message.channel.send({ embeds: [embed] })
  },
};
