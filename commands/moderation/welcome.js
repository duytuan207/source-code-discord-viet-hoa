const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
  name: "setwelcome",
  category: "moderation",
  usage: "setwelcome <#channel>",
  description: "Set the welcome channel",
  run: (client, message, args) => {
     if (!message.member.hasPermission("ADMINISTRATION")) {
      return message.channel.send("xin lỗi bạn cần sự cho phép");
    }
    let channel = message.mentions.channels.first()
    
    if(!channel) {
      return message.channel.send("Hãy đề cập đến kênh đầu tiên")
    }
    
    //Now we gonna use quick.db
    
    db.set(`welchannel_${message.guild.id}`, channel.id)
    
    message.channel.send(`Kênh Chào mừng được đặt thành ${channel}`)
  }
}