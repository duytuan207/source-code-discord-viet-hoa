const discord = require("discord.js");

module.exports = {
  name: "ban",
  category: "moderation",
  description: "Ban anyone with one shot whithout knowing anyone xD",
  usage: "ban <@user> <reason>",
  run: async (client, message, args) => {
    
    const target = message.mentions.members.first()
    
    const reason = args.slice(1).join(" ")
    
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply(`Quyền lồn biên giới ? sài cái con cặc thằng thấp kém !`)
    
    if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.reply(`Tôi không có quyền cấm ai đó`)
    
    if(!args[0]) return message.reply(`Hãy đề cập đến một người nào đó để cấm`)
    
    if(!target) return message.reply(`Tôi không thể tìm thấy thành viên đó`)
    
    if(target.roles.highest.position >= message.member.roles.highest.position || message.author.id !== message.guild.owner.id) {
      return message.reply(`Họ có nhiều quyền lực hơn bạn`)
    }
    
    if(target.id === message.author.id) return message.reply(`Tôi không thể cấm bạn vì bạn là ông chủ`)
    
    if(target.bannable) {
      let embed = new discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription(`Bị cấm \`${target}\` vì \`${reason || "Không cung cấp lý do"}\``)
      
      message.channel.send(embed)
      
      target.ban()
      
      message.delete()
      
    } else {
      return message.reply(`Tôi không thể cấm họ, hãy đảm bảo rằng vai trò của tôi cao hơn vai trò của họ`)
    }
    return undefined
  }
};