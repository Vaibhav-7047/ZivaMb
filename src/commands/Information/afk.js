const { Discord, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const { afk } = require("../../utils/afk");
module.exports = {
  name: 'afk',
  category: 'utility',
  aliases: ['busy'],
  description: 'Set Afk Of The User',
  args: false,
  usage: '',
  userPrams: [''],
  botPrams: [''],
  owner: false,


 /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  execute: async (message, args, client, prefix) => {
    const reason = args.join(" ") || "None";

    afk.set(message.author.id, [Date.now(), reason]);

    message.channel.send(`**${message.member.user.tag},** Your AFK is set to - **${reason}**`)
  },
};
