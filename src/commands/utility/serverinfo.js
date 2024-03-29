const moment = require('moment') // npm i moment
moment.locale('ENG')
const verificationLevels = {
  NONE: "None",
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
  VERY_HIGH: "Very High"
}

const { Discord, MessageEmbed, MessageActionRow, MessageButton, EmbedBuilder ,ChannelType } = require('discord.js');

const disabled = '<:n_no:1050138701516243076><:n_yes2:1050138717454610523>'
const enabled = '<:n_no2:1050138731711049728><:n_yes:1050138748240806009>'

const booster = {
  NONE: '0',
  TIER_1: '1',
  TIER_2: '2',
  TIER_3: '3'
}

module.exports = {
  name: 'serverinfo',
  category: 'utility',
  aliases: ['si'],
  description: 'gives serverrinfo',
  args: false,
  usage: '',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  owner: false,
  execute: async (message, args, client, prefix, channels) => {

const server = message.guild;
const owner = await server.fetchOwner();
const member = server.memberCount;
const user = server.members.cache.filter(member => !member.user.bot).size;
const bots = server.members.cache.filter(member => member.user.bot).size;
const emojis = server.emojis.cache.size;
const roles = server.roles.cache
        .sort((a, b) => b.position - a.position)
        .map(role => role.toString())
        .slice(0, -1)
let rolesdisplay;
      if (roles.length < 15) {
        rolesdisplay = roles.join(' ')
        if (roles.length < 1) rolesdisplay = "None"
      } else {
        rolesdisplay = `Too many roles to show.`
      }
      if(rolesdisplay.length > 1024)
        rolesdisplay = `${roles.slice(4).join(" ")} more.`

      let baseVerification = message.guild.verificationLevel;

      if(baseVerification == 0) baseVerification = 'None'
      if(baseVerification == 1) baseVerification = 'Low'
      if(baseVerification == 2) baseVerification = 'Medium'
      if(baseVerification == 3) baseVerification = 'High'
      if(baseVerification == 4) baseVerification = 'Very High'

    const embed = new EmbedBuilder()
        .setAuthor({name: `${server.name}'s Information`, iconURL: server.iconURL({ dynamic : true })})
      
	  .addFields([
        { name: '__About__', value: `**Name: **${server}
**ID: **${server.id}
**Owner <a:fl_crown:1045359236588257350> : **${owner.user.tag} (${owner.user})
**Members: **${member}
**Created At: **<t:${moment(server.createdAt).format('X')}:R>`},
         { name: '__Server Information__', value: `**Verification Level:** ${baseVerification}\n**Inactive Channel: **${server.afkChannelId ? `<#${server.afkChannelId}>` : `${disabled}`}\n**Inactive Timeout: **${server.afkTimeout/60} mins\n**System Messages Channel: **${server.systemChannelId ? `<#${server.systemChannelId}>` : disabled}\n**Boost Bar Enabled: **${server.premiumProgressBarEnabled ? enabled : disabled}`},

        { name: '__Emojis__',value: `Total Emojis: ${emojis}`},

        { name: '__Boost Status__', value: `Count <a:fl_boost:1045359349289189417> : ${server.premiumSubscriptionCount}` },

        { name : `__Server Roles__ [${roles.length}]`, value: `${rolesdisplay}`}
        
    ])
    
    .setColor(client.embedColor)
    .setThumbnail(server.iconURL({ dynamic : true }))
    .setImage(server.bannerURL({ size: 4096, dynamic: true, format: "gif" }))
    .setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })})
    .setTimestamp()

  await message.reply({ embeds: [embed] });
  }
}