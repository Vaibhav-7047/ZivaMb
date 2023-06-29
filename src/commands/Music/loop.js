const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "loop",
    aliases: ['l'],
    category: "Music",
    description: "Toggles loop mode.",
    args: false,
    usage: "",
    userPerms: [],
    dj: true,
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    execute: async (message, args, client, prefix) => {

        const player = message.client.manager.get(message.guild.id);

        if (!player.queue.current) {
            let thing = new EmbedBuilder()
                .setColor(client.embedColor)
                .setAuthor({name:`| There Is No Music Playing`, iconURL: message.member.displayAvatarURL({ dynamic : true })});
            return message.reply({ embeds: [thing] });
        }
        const emojiloop = message.client.emoji.loop;

        if (args.length && /queue/i.test(args[0])) {
            player.setQueueRepeat(!player.queueRepeat);
            const queueRepeat = player.queueRepeat ? "Enabled" : "Disabled";
            let thing = new EmbedBuilder()
                .setColor(message.client.embedColor)
                .setTimestamp()
                .setAuthor({name: `| Loop Queue Is Now ${queueRepeat}`, iconURL: message.member.displayAvatarURL({dynamic:true})})
            return message.reply({ embeds: [thing] });
        }

        player.setTrackRepeat(!player.trackRepeat);
        const trackRepeat = player.trackRepeat ? "Enabled" : "Disabled";
        let thing = new EmbedBuilder()
            .setColor(message.client.embedColor)
            .setTimestamp()
            .setAuthor({ name: `| Loop Track Is Now ${trackRepeat}`, iconURL: message.member.displayAvatarURL({dynamic:true})})
        return message.reply({ embeds: [thing] });
    }
};
