const { EmbedBuilder, Message, Client, PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { afk } = require("../../utils/afk");
const db = require("../../schema/prefix.js");
const db2 = require("../../schema/dj");
const db3 = require("../../schema/setup");
const moment = require("moment");

module.exports = {
    name: "messageCreate",
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @returns 
     */
    run: async (client, message) => {

        if (message.author.bot) return;
        
        const mentionedMember = message.mentions.members.first();
  if (mentionedMember) {
    const data = afk.get(mentionedMember.id);

    if (data) {
      const [timestamp, reason] = data;
      const timeAgo = moment(timestamp).fromNow();

      message.reply(
        `**${mentionedMember.user.tag}** is currently afk (${timeAgo}) - **${reason}**`
      );
    }
  }

  const getData = afk.get(message.author.id);
  if (getData) {
    afk.delete(message.author.id);
    message.reply(`Welcome Back **${message.author.user.tag}**, I have removed your AFK`);
  }

          let prefix = client.prefix;
    const channel = message?.channel;
    const ress = await db.findOne({ Guild: message.guildId });
    if (ress && ress.Prefix) prefix = ress.Prefix;

      const mentionRegex = RegExp(`^<@!?${client.user.id}>$`); 
              if (message.content.match(mentionRegex)) {

            var support = client.config.links.support;
          var invite = client.config.links.invite;

            const button = new ActionRowBuilder()
                .addComponents(
                new ButtonBuilder()
                .setLabel("Invite")
                .setStyle(ButtonStyle.Link)
                .setURL(invite),
                  
                new ButtonBuilder()
                .setLabel(`Support`)
                .setStyle(ButtonStyle.Link)
                .setURL(support)
                  );
              
            const embed = new EmbedBuilder()
                .setColor(client.embedColor)
            .setThumbnail(client.user.displayAvatarURL( {dynamic : true }))
            .setAuthor({ name: `${client.user.username}`, iconURL: client.user.displayAvatarURL()})
            .setFooter({text: 'Thanks For Choosing Me <3'})
            .setDescription(`Hey **${message.author.username}**, My Prefix For This Server Is \`${prefix}\`\nIf You Want More Info, Then Do \`${prefix}\`**help**`);
            message.channel.send({ embeds: [embed], components: [button] })
        };

  let noprefix = await client.db.get(`noprefix_${message.author.id}`);
      
if (noprefix &&
      !message.content.startsWith(prefix)) prefix = "";
   
    const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
    if (!prefixRegex.test(message.content)) return;
    const [matchedPrefix] = message.content.match(prefixRegex);
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) ||
        client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

/*let datab = ['1004304436845367367','607223178653335568','988790484493303838','713397054537334885','926776187584393237','866147016328347670','944559450616905758','971305184426864721','840661651900596255','976105609936138311','1018731974157942844','800036864852492309','981655069399351398'];

const mentionRegex = RegExp(`^<@!?${client.user.id}>$`); 
              if (message.content.match(mentionRegex)) {
            const embed = new EmbedBuilder()
                .setColor(client.embedColor)
            .setThumbnail(client.user.displayAvatarURL( {dynamic : true }))
            .setAuthor({ name: `${client.user.username}`, iconURL: client.user.displayAvatarURL()})
            .setFooter({text: 'Thanks For Choosing Me'})
            .setDescription(`Hey **${message.author.username}**, my prefix for this server is \`${prefix}\` Want more info? then do \`${prefix}\`**help**`);
            message.channel.send({ embeds: [embed] })
        };
const mentionRegexPrefix = RegExp(`^<@!?${client.user.id}>`)

const prefix1 = message.content.match(mentionRegexPrefix) ? message.content.match(mentionRegexPrefix)[0] : prefix;
    
 if(!datab.includes(message.author.id)){
                if (!message.content.startsWith(prefix1)) return;
            } 


    const args = datab.includes(message.author.id) == false ? message.content.slice(prefix1.length).trim().split(/ +/) :  message.content.startsWith(prefix1) == true ? message.content.slice(prefix1.length).trim().split(/ +/) : message.content.trim().split(/ +/);

    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) ||
        client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) return;*/
      
  /*      let prefix = client.prefix;
        const ress = await db.findOne({ Guild: message.guildId })
        if (ress && ress.Prefix) prefix = ress.Prefix;
        let data = await db3.findOne({ Guild: message.guildId });
        if (data && data.Channel && message.channelId === data.Channel) return client.emit("setupSystem", message);

        const mention = new RegExp(`^<@!?${client.user.id}>( |)$`);
        if (message.content.match(mention)) {
            const embed = new EmbedBuilder()
                .setColor(client.embedColor)
                .setDescription(`**› My prefix in this server is \`${prefix}\`**\n**› You can see my all commands type \`${prefix}\`help**`);
            message.channel.send({ embeds: [embed] })
        };

        const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

        const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
        if (!prefixRegex.test(message.content)) return;

        const [matchedPrefix] = message.content.match(prefixRegex);

        const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = client.commands.get(commandName) ||
            client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) return;*/

        if (!message.guild.members.me.permissions.has(PermissionsBitField.resolve('SendMessages'))) return await message.author.dmChannel.send({ content: `I don't have **\`SEND_MESSAGES\`** permission in <#${message.channelId}> to execute this **\`${command.name}\`** command.` }).catch(() => { });

        if (!message.guild.members.me.permissions.has(PermissionsBitField.resolve('ViewChannel'))) return;

        if (!message.guild.members.me.permissions.has(PermissionsBitField.resolve('EmbedLinks'))) return await message.channel.send({ content: `I don't have **\`EMBED_LINKS\`** permission in <#${message.channelId}> to execute this **\`${command.name}\`** command.` }).catch(() => { });

        const embed = new EmbedBuilder()
            .setColor(client.embedColor)

        if (command.args && !args.length) {
            //let reply = `You didn't provide any arguments, ${message.author}!`;

            if (command.usage) {
                reply = `${command.usage}`;
            }

            embed.setDescription(reply);
            return message.channel.send({ embeds: [embed] });
        }

        if (command.botPerms) {
            if (!message.guild.members.me.permissions.has(PermissionsBitField.resolve(command.botPerms || []))) {
                embed.setDescription(`I don't have **\`${command.botPerms}\`** permission in <#${message.channelId}> to execute this **\`${command.name}\`** command.`);
                return message.channel.send({ embeds: [embed] });
            }
        }
        if (command.userPerms) {
            if (!message.member.permissions.has(PermissionsBitField.resolve(command.userPerms || []))) {
                embed.setDescription(`You don't have **\`${command.userPerms}\`** permission in <#${message.channelId}> to execute this **\`${command.name}\`** command.`);
                return message.channel.send({ embeds: [embed] });
            }
        }

        /*if (command.owner && message.author.id !== `${client.owner}`) {
            embed.setDescription(`Only <@!988790484493303838> Can Use this Command`);
            return message.channel.send({ embeds: [embed] });
        }*/
        
        if (command.owner) {
      if (client.owner) {
        const devs = client.owner.find((x) => x === message.author.id);
        if (!devs)
          return message.channel.send({
            embeds: [embed.setDescription('Only <@!926757287119450133> Can Use this Command')],
          });
      }
    }

        const player = message.client.manager.get(message.guild.id);

        if (command.player && !player) {
            embed.setAuthor({name:`| There Is No Players In This Server`,iconURL: message.member.displayAvatarURL({dynamic:true})});
            return message.channel.send({ embeds: [embed] });
        }

        if (command.inVoiceChannel && !message.member.voice.channelId) {
            embed.setAuthor({name:`| You Must Be In The Voice Channel To Use This Command`,iconURL: message.member.displayAvatarURL({dynamic:true})});
            return message.channel.send({ embeds: [embed] });
        }

        if (command.sameVoiceChannel) {
            if (message.guild.members.me.voice.channel) {
                if (message.guild.members.me.voice.channelId !== message.member.voice.channelId) {
                    embed.setAuthor({name:`| You Must Be In The Same Channel As ${client.user.username}`,iconURL: client.user.displayAvatarURL({dynamic:true})});
                    return message.channel.send({ embeds: [embed] });
                }
            }
        }
        if (command.dj) {
            let data = await db2.findOne({ Guild: message.guild.id })
            let perm = 'MuteMembers';
            if (data) {
                if (data.Mode) {
                    let pass = false;
                    if (data.Roles.length > 0) {
                        message.member.roles.cache.forEach((x) => {
                            let role = data.Roles.find((r) => r === x.id);
                            if (role) pass = true;
                        });
                    };
                    if (!pass && !message.member.permissions.has(perm)) return message.channel.send({ embeds: [embed.setAuthor({name:`| You Don't Have Enough Permissions To Use This Command`,iconURL: message.member.displayAvatarURL({dynamic:true})})] })
                };
            };
        }

        try {
            command.execute(message, args, client, prefix);
        } catch (error) {
            console.log(error);
            embed.setDescription("There was an error executing that command.\nI have contacted the owner of the bot to fix it immediately.");
            return message.channel.send({ embeds: [embed] });
        }
    }
};
