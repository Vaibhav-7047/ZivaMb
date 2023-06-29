const { EmbedBuilder, ActionRowBuilder, ButtonStyle, ButtonBuilder, SelectMenuBuilder } = require("discord.js");

module.exports = {
    name: "help",
    category: "Information",
    aliases: [ "h" ],
    description: "Help with all commands, or one specific command.",
    args: false,
    usage: "",
    userPerms: [],
    owner: false,
 execute: async (message, args, client, prefix) => {

   var icon = client.config.links.icon;

  const embed = new EmbedBuilder()
    .setAuthor({ name: `${client.user.username}`, iconURL: client.user.displayAvatarURL()})
    .setDescription(`** Hello **<@${message.author.id}>\n**Welcome To The Help Menu Of** <@${client.user.id}>\n\n<:ping:1056434517952446525>** : \`${client.ws.ping}ms\`**`)
    .addFields([
                { name: '**Categories :**', value: '**<:fl_music:1040958817531346965> : Music**\n**<:filter:1075137019149291651> : Filters**\n**<:playlist:1095185849504764034> : Playlist**\n**<:info:1075137093631758356> : Information**\n**<:fl_settings:1040971219895320646> : Utility**\n**<:settings:1091754603038654464> : Setting**\n\n\`Choose From The Menu Below\`', inline: true }
      ])
    .setThumbnail(client.user.displayAvatarURL())
    .setColor(client.embedColor)
    .setFooter({
        text: `Made with 💖 by ${client.user.username} Development`,
        iconURL: client.user.displayAvatarURL({ dynamic: true }),
      });
                
   
    const row2 = new ActionRowBuilder()
      .addComponents(
    new SelectMenuBuilder()
        .setCustomId("help_pop")
        .setPlaceholder('Select Here')
        .addOptions([
          {
              label: 'Music',
              value: 'music',
              emoji: '1040958817531346965'
          },
          {
              label: 'Filters',
              value: 'filters',
              emoji: '1075137019149291651'
          },
          {
              label: 'Playlist',
              value: 'playlist',
              emoji: '1095185849504764034',
            },
            {
              label: 'Information',
              value: 'info',
              emoji: '1075137093631758356',
            },
            {
              label: 'Utility',
              value: 'utility',
              emoji: '1040971219895320646',
            },
            {
              label: 'Settings',
              value: 'config',
              emoji: '1091754603038654464',
            },
            {
              label: 'Home',
              value: 'home',
              emoji: '1040973742924382288',
            }
        ])
      )

     let _commands;
     let editEmbed = new EmbedBuilder();
     
    const m = await message.reply({ embeds: [embed], components: [row2]});

    const collector = m.createMessageComponentCollector({
      filter: (b) => {
      if(b.user.id === message.author.id) return true;
       else {
     b.reply({ 
       ephemeral: true, 
       content: `Only **${message.author.tag}** can use this button, run the command again to use the help menu.`}); 
         return false;
           };
      },
      time : 60000,
      idle: 60000/2
    });
    collector.on('collect', async (b) => {
       if(!b.deferred) await b.deferUpdate()
        if(b.customId === "home") {
           if(!m) return;
           return await m.edit({ embeds: [embed], components: [row2] })
        }
        if(b.customId === "music") {
         _commands = client.commands.filter((x) => x.category && x.category === "Music").map((x) => `\`${x.name}\``);
             editEmbed.setColor(client.embedColor).setDescription(_commands.join(", ")).setAuthor({name: `| Music Commands`, iconURL: message.member.displayAvatarURL({dynamic:true})}).setFooter({text: `Love From ${client.user.username} Fam <3`, iconURL: client.user.displayAvatarURL({dynamic:true})});
           if(!m) return;
           return await m.edit({ embeds: [editEmbed], components: [row2] })
        }
         if(b.customId == "info") {
         _commands = client.commands.filter((x) => x.category && x.category === "Information").map((x) => `\`${x.name}\``);
           editEmbed.setColor(client.embedColor).setDescription(_commands.join(", ")).setAuthor({name: `| Information Commands`, iconURL: message.member.displayAvatarURL({dynamic:true})}).setFooter({text: `Love From ${client.user.username} Fam <3`, iconURL: client.user.displayAvatarURL({dynamic:true})})
          return await m.edit({ embeds: [editEmbed], components: [row2] })
         }
         if(b.customId == "playlist") {
          _commands = client.commands.filter((x) => x.category && x.category === "Playlist").map((x) => `\`${x.name}\``);
              editEmbed.setColor(client.embedColor).setDescription(_commands.join(", ")).setAuthor({name: `| Playlist Commands`, iconURL: message.member.displayAvatarURL({dynamic:true})}).setFooter({text: `Love From ${client.user.username} Fam <3`, iconURL: client.user.displayAvatarURL({dynamic:true})})
           return await m.edit({ embeds: [editEmbed], components: [row2] })
          }
         if(b.customId == "config") {
         _commands = client.commands.filter((x) => x.category && x.category === "Config").map((x) => `\`${x.name}\``);
             editEmbed.setColor(client.embedColor).setDescription(_commands.join(", ")).setAuthor({name: `| Settings Commands`, iconURL: message.member.displayAvatarURL({dynamic:true})}).setFooter({text: `Love From ${client.user.username} Fam <3`, iconURL: client.user.displayAvatarURL({dynamic:true})})
          return await m.edit({ embeds: [editEmbed], components: [row2] })
         
        }
        if(b.values[0] === "music") {
          _commands = client.commands.filter((x) => x.category && x.category === "Music").map((x) => `\`${x.name}\``);
             editEmbed.setColor(client.embedColor).setDescription(_commands.join(", ")).setAuthor({name: `| Music Commands`, iconURL: message.member.displayAvatarURL({dynamic:true})}).setFooter({text: `Love From ${client.user.username} Fam <3`, iconURL: client.user.displayAvatarURL({dynamic:true})})
          return await m.edit({ embeds: [editEmbed], components: [row2]})
        }
        if(b.values[0] === "filters") {
          _commands = client.commands.filter((x) => x.category && x.category === "Filters").map((x) => `\`${x.name}\``);editEmbed.setColor(client.embedColor).setDescription(_commands.join(", ")).setAuthor({name: `| Filters Commands`, iconURL: message.member.displayAvatarURL({dynamic:true})}).setFooter({text: `Love From ${client.user.username} Fam <3`, iconURL: client.user.displayAvatarURL({dynamic:true})})
          return await m.edit({ embeds: [editEmbed], components: [row2]})
        }
        if(b.values[0] === "playlist") {
          _commands = client.commands.filter((x) => x.category && x.category === "Playlist").map((x) => `\`${x.name}\``);
              editEmbed.setColor(client.embedColor).setDescription(_commands.join(", ")).setAuthor({name: `| Playlist Commands`, iconURL: message.member.displayAvatarURL({dynamic:true})}).setFooter({text: `Love From ${client.user.username} Fam <3`, iconURL: client.user.displayAvatarURL({dynamic:true})})
           return await m.edit({ embeds: [editEmbed], components: [row2] })
        }
        if(b.values[0] === "info"){
         _commands = client.commands.filter((x) => x.category && x.category === "Information").map((x) => `\`${x.name}\``);
             editEmbed.setColor(client.embedColor).setDescription(_commands.join(", ")).setAuthor({name: `| Information Commands`, iconURL: message.member.displayAvatarURL({dynamic:true})}).setFooter({text: `Love From ${client.user.username} Fam <3`, iconURL: client.user.displayAvatarURL({dynamic:true})})
          return await m.edit({ embeds: [editEmbed], components: [row2] })
        }
        if(b.values[0] === "utility"){
          _commands = client.commands.filter((x) => x.category && x.category === "utility").map((x) => `\`${x.name}\``);
              editEmbed.setColor(client.embedColor).setDescription(_commands.join(", ")).setAuthor({name: `| Utility Commands`, iconURL: message.member.displayAvatarURL({dynamic:true})}).setFooter({text: `Love From ${client.user.username} Fam <3`, iconURL: client.user.displayAvatarURL({dynamic:true})})
           return await m.edit({ embeds: [editEmbed], components: [row2] })
         }
        if(b.values[0] === "config") {
         _commands = client.commands.filter((x) => x.category && x.category === "Config").map((x) => `\`${x.name}\``);
             editEmbed.setColor(client.embedColor).setDescription(_commands.join(", ")).setAuthor({name: `| Settings Commands`, iconURL: message.member.displayAvatarURL({dynamic:true})}).setFooter({text: `Love From ${client.user.username} Fam <3`, iconURL: client.user.displayAvatarURL({dynamic:true})})
          return await m.edit({ embeds: [editEmbed], components: [row2] })
         }
          if(b.values[0] === "home") {
           return await m.edit({ embeds: [embed], components: [row2] })
        }
     });
   }
 }