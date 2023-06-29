const { Discord } = require("discord.js")
const { EmbedBuilder } = require("discord.js");
const yuvi = ["971661235693162506","1009475541793001545"]

module.exports = {
    name: "noprefixadd",
    aliases: ["npadd","anp"],
    category: "Owner",
    args: true,
    description: "",
    args: false,
    permission: [],
    owner: false,
    execute: async (message, args, client, prefix) => {
        
  if(!yuvi.includes(message.author.id)) return
  
  const embed = new EmbedBuilder()
  .setColor(client.embedColor)
  if(args[0]){
  try {
    await client.users.fetch(args[0])
  } catch (error) {
    return message.channel.send({embeds: [embed.setDescription(`Invalid User Id`)]});
  }
  const use = await client.db.get(`noprefix_${args[0]}`)
  if(use){
  return message.channel.send({embeds: [embed.setDescription(`<@${args[0]}> Is Already In My No Prefix List`)]})
  }
  client.db.set(`noprefix_${args[0]}`, `true`)
  return message.channel.send({embeds: [embed.setDescription(`<@${args[0]}> Has Been Added To My No Prefix List`)]})
  }
  else return message.channel.send({embeds: [embed.setDescription(`Please Give The User Id`)]}).catch(err => console.log(err));
    }
}