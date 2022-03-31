const Discord = require ('discord.js')
const { MessageEmbed } = require('discord.js')

module.exports = {
name: "announce",
aliases: ["", "a"],
category: "moderation",
usage: "embed <text to say>",
description: "Returns provided text in Embed form.",
run: async(client, message, args) => {
  if(!message.member.hasPermission("ADMINISTRATION")) return message.channel.send(`Bạn không đủ quyền hạn để dùng lệnh =( dùng conđỉ mẹ mày!) `)
 await message.delete()
  let say = message.content.split(" ").slice(1).join(" ")
  if(!say) return message.channel.send(`❌ | `+"Tôi không thể lặp lại tin nhắn trống")
  let embed = new MessageEmbed()
.setAuthor(message.author.username, message.author.avatarURL())
  .setDescription(`${say}`)
  .setColor("RANDOM")
.setFooter(` ${message.guild}`)
.setTimestamp()
  message.channel.send(embed)
}
}