
const moment = require('moment') // npm i moment
moment.locale('ENG')

const { Discord, MessageEmbed, MessageActionRow, MessageButton, EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'userinfo',
  category: 'utility',
  aliases: ['ui'],
  description: 'gives userinfo',
  args: false,
  usage: '',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  owner: false,
  execute: async (message, args, client, prefix) => {
    const permissions = {
            "ADMINISTRATOR": "Administrator",
            "MANAGE_GUILD": "Manage Server",
            "MANAGE_ROLES": "Manage Roles",
            "MANAGE_CHANNELS": "Manage Channels",
            "KICK_MEMBERS": "Kick Members",
            "BAN_MEMBERS": "Ban Members",
            "MANAGE_NICKNAMES": "Manage Nicknames",
            "MANAGE_EMOJIS": "Manage Emojis",
            "MANAGE_WEBHOOKS": "Manage Webhooks",
            "MANAGE_MESSAGES": "Manage Messages",
            "MODERATE_MEMBERS": "Moderate Members"
        }
    
    let member = message.mentions.members.first() || client.users.cache.get(args[0]) || message.member
        // For Status Of User, We Will Use Emoji To Look Nice

        let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
    await user.fetch().then(user => {
    banner = user.bannerURL({
              dynamic: true,
              size: 4096,
            })
    })
        
    let rolesname;
let roles = member.roles.cache.sort((a, b) => b.position).map
(role => role.toString()).slice(0, -1);
const nick = member.nickname === null ? "None" : member.nickname;

    var bot = {
            "true": "Bot",
            "false": "Human"
        };
    const mention = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    const mentionPermissions = mention.permissions.toArray() === null ? "None" : mention.permissions.toArray();
        const finalPermissions = [];
        for (const permission in permissions) {
            if (mentionPermissions.includes(permission)) finalPermissions.push(`${permissions[permission]}`);
            else;
        }
    
rolesname = roles.join(" ")
if(member.roles.cache.size < 1) role = "No Roles"
if(!member.roles.cache.size || member.roles.cache.size - 1 < 1) roles = 
`\`None\``
    
    const embed = new EmbedBuilder()
        .setAuthor({name: `${member.user.username}'s Information`, iconURL: member.user.displayAvatarURL({ dynamic : true })})
        
        .addFields([{name: '__General Information__', value: `**Name: **${member.user.username}#${member.user.discriminator}
**ID: **${member.id}
**Nickname: **${nick}
**User Type: **${bot[member.user.bot]}
**Account Created: **<t:${moment.utc(member.user.createdAt).format('X')}:R>
**Server Joined: **<t:${moment.utc(member.joinedAt).format('X')}:R>`}, // We Use Emojis Also
      
        {name: '__Role Info__', value: `**Roles: **[${roles.length || '0' }]
${rolesname || 'None' }`}
    ])

    .setImage(banner)
    .setThumbnail(member.user.displayAvatarURL({ dynamic : true }))
    .setColor(client.embedColor)
    .setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })})
    .setTimestamp()

        
        
        await message.reply({ embeds: [embed] });
  },
};