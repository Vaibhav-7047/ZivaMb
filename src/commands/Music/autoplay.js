const { EmbedBuilder,ActionRowBuilder,ButtonBuilder,ButtonStyle } = require("discord.js");

module.exports = {
  name: "autoplay",
  aliases: ["ap"],
  category: "Music",
  description: "Toggle music autoplay.",
  args: false,
  usage: "",
  userPerms: [],
  owner: false,
  player: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  execute: async (message, args, client, prefix) => {
      
    let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;

      const button = new ActionRowBuilder()
                .addComponents(
                new ButtonBuilder()
                .setLabel("Vote")
                .setStyle(ButtonStyle.Link)
                .setURL('https://top.gg/bot/1007298016165769347/vote'),
                  
                new ButtonBuilder()
                .setLabel(`Premium`)
                .setStyle(ButtonStyle.Link)
                .setURL('https://discord.gg/XTWGY94xgA')
                  );
      
    const player = client.manager.get(message.guild.id);

    const autoplay = player.get("autoplay");

    const emojireplay = client.emoji.autoplay;

    if (!player.queue.current)
      return message.reply({
        content: `Please Play A Song Before Using This Command.`,
      });
    
    const uri = player.queue.current.uri;
    if (!(uri.includes("youtube.") || uri.includes("youtu.be")))
    return message.reply({
      content: `Autoplay Feature Is Currently **Not Available** For This Source`
    });

    if (autoplay) {
      player.set("autoplay", false);
      let thing = new EmbedBuilder()
        .setColor(client.embedColor)
        .setTimestamp()
        .setAuthor({name:`| Autoplay Is Now Disabled`, iconURL: message.member.displayAvatarURL({dynamic:true})});
      return message.channel.send({ embeds: [thing] });
    } else {
      const identifier = player.queue.current.identifier;
      player.set("autoplay", true);
      player.set("requester", client.user);
      player.set("identifier", identifier);
      const search = `https://www.youtube.com/watch?v=${identifier}&list=RD${identifier}`;
      const res = await player.search(search, message.author);
      player.queue.add(
        res.tracks[Math.floor(Math.random() * res.tracks.length) ?? 1]
      );
      let thing = new EmbedBuilder()
        .setColor(client.embedColor)
        .setTimestamp()
        .setAuthor({name:`| Autoplay Is Now Enabled`, iconURL: message.member.displayAvatarURL({dynamic:true})})

      return message.channel.send({ embeds: [thing] });
    }
  },
};
