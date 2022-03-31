const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "sreply",
  category: "suggestion",
  run: async (client, message, args) => {
    
let channel = await db.fetch(`suggestion_${message.guild.id}`);
if (channel === null) return;
     
      if(!message.member.hasPermission('MANAGE_GUILD')) return;
      
    const rgx = /^(?:<@!?)?(\d+)>?$/;

    const messageID = args[0];
    const replyQuery = args.slice(1).join(' ');
      
    const number = new MessageEmbed()
      .setDescription(`<:bfdno:832931445991276584>    | Tôi không nghĩ đó là ID tin nhắn!`)
      .setColor("FF2052")
      
    const id = new MessageEmbed()
      .setDescription(`<:bfdno:832931445991276584>  |Bạn quên chỉ định ID tin nhắn!`)
      .setColor("FF2052")
      
    const query = new MessageEmbed()
      .setDescription(`<:bfdno:832931445991276584>   | Bạn quên chỉ định câu trả lời!`)
      .setColor("FF2052")
      
    const reply = new MessageEmbed()
      .setDescription(`<:bfdyes:832931453892558848>  | Đã trả lời thành công đề xuất.`)
      .setColor("00FFFF")
      
    const noChannel = new MessageEmbed()
      .setDescription(`<:bfdno:832931445991276584>   | Không tìm thấy kênh đề xuất!`)
      .setColor("FF2052")
      
    const noMessage = new MessageEmbed()
      .setDescription(`<:bfdno:832931445991276584>   | Không tìm thấy bất kỳ tin nhắn nào có ID đó!`)
      .setColor("FF2052")
    
      if(!messageID) return message.channel.send(id);
      
      if (!rgx.test(messageID)) return message.channel.send(number);
      
      if(!replyQuery) return message.channel.send(query)
      
      try{
      const suggestionChannel = message.guild.channels.cache.get(channel)
      
      if(!suggestionChannel) return message.channel.send(noChannel)
      
      const suggestedEmbed = await suggestionChannel.messages.fetch(messageID).catch(error => {
    const noMessage = new MessageEmbed()
      .setDescription(`<:bfdno:832931445991276584>   | Không tìm thấy bất kỳ tin nhắn nào có ID đó!`)
      .setColor("FF2052")
  return message.channel.send(noMessage);
  })
     
      const data = suggestedEmbed.embeds[0];
     
      const replyEmbed = new MessageEmbed()
      .setAuthor(`${data.author.name}`, data.author.iconURL)
      .setDescription(data.description)
      .setColor("BLUE")
      .addField(`Trả lời từ ${message.author.tag}`, replyQuery)
      .setFooter("Status: Replied")
      .setTimestamp();
      
     suggestedEmbed.edit(replyEmbed)
     
     message.channel.send(reply)
      
      const user = await client.users.cache.find((u) => u.tag === data.author.name)
      
    const embed = new MessageEmbed()
      .setDescription(`Bạn đã có một câu trả lời qua gợi ý của mìnhn <:bfdyes:832931453892558848> . **[Message Link](https://discord.com/channels/${message.guild.id}/${channel}/${messageID})**`)
      .setColor("BLUE")
      user.send(embed)
        
      } catch(err) {
        return;
    }
  }
}