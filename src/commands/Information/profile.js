const { EmbedBuilder, version, ActionRowBuilder, ButtonBuilder } = require("discord.js");

module.exports = {
    name: "profile",
    category: "Information",
    description: "Show the user's profile",
    args: false,
    aliases: ["badges","pr"],
    usage: "",
    permission: [],
    caching: true,
    owner: false,
    execute: async (message, args, client, prefix) => {
      
      var support = client.config.links.support;
      
      let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
      
      const Respect = user.id === "971661235693162506" ? true : false;
        
      const guildd = await client.guilds.fetch("1086342935282462831"); 
      const sus = await guildd.members.fetch(user.id).catch((e) => {});
        
      let badges = "";

      
      if(Respect === true) badges = badges + `\n<:yuvaraj:1075655058655555594> **Respect Sir**`;
      
      const own = sus.roles.cache.has("1090317149534441482");
      if(own === true) badges = badges+`\n<a:emoji_21:1093599705809821756> **Owner**`;  
        
      const dev = sus.roles.cache.has("1086342935282462840");
      if(dev === true) badges = badges+`\n<a:emoji_19:1093599621273620561> **Developer**`;
    
      const mod = sus.roles.cache.has("1086342935282462839");
      if(mod === true) badges = badges+`\n<a:staff:1094468825170317372> **Moderator**`;
	  
	  const staff = sus.roles.cache.has("1086342935282462836");
      if(staff === true) badges = badges+`\n<a:emoji_22:1093602143136653372> **Official**`;
        
      const botuser = sus.roles.cache.has("1086342935282462832");
      if(botuser === true) badges = badges+`\n<a:emoji_20:1093599658330296361> **Bot User**`;


      const embed = new EmbedBuilder()
      .setAuthor({ name: `${user.tag}`, iconURL: user.displayAvatarURL({dynamic: true})})
      .setThumbnail(user.displayAvatarURL({dynamic: true}))
      .setColor(client.config.embedColor)
      .setTimestamp()
      .addFields([{ name: `**__Badges__**`, value: `${badges ? badges : `Oops! Looks Like You Don't Have Any Type Of Badge To Be Displayed! You Can Get One By Joining Our [Support Server](${support})`}`}])
 .setTimestamp();

      
      message.channel.send({embeds: [embed]})
    }
}