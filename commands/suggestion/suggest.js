const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
 
module.exports = {
  name: "suggest",
  category:"suggestion",
  
  run: async (client, message, args) => {
   
  let channel = await db.fetch(`suggestion_${message.guild.id}`);
    if (channel === null) return;
  
  const suggestionQuery = args.join(" ");
  if(!suggestionQuery) return message.reply("Vui lòng đề xuất điều gì đó.");
    
  const embed = new MessageEmbed()
         
       .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
       .setDescription(`${suggestionQuery}`)
       .setColor("00FFFF")
       .setFooter("Status: Chờ")
       .setTimestamp();
       
    const done = new MessageEmbed()
       .setDescription(`<:bfdyes:832931453892558848>  | Đề xuất của bạn được gửi ở đây, <#${channel}>\n\nLưu ý: Bạn đã đồng ý nhận DM khi trả lời cho Đề xuất của bạn!`)
       .setColor("00FFFF")
       
    message.channel.send(done)
    
    let msgEmbed = await message.guild.channels.cache.get(channel).send(embed)
    
    await msgEmbed.react('<:upvote:832931955556745236>')
    await msgEmbed.react('<:downvote:832931677294428161> ')
  }
}