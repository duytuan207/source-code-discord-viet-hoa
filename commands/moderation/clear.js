const Discord = require("discord.js");
const bot = new Discord.Client();
module.exports = {
  name: "purge",
  category: "moderation",
  aliases: ['clear', 'delete', 'prune'],

  async run(bot, message, args) {
// UPDATE ^ ACCORDING TO YOUR HANDLER
let prefix = "q"
 try { 
 
   if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Bạn không có **MANAGE_MESSAGES** tiền đề để sử dụng lệnh này.");
  if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.reply("Tôi không có **MANAGE_MESSAGES** quyền sử dụng lệnh này.");

const commands = [
`bots\` - Delete messages sent by bots. (Ignore humans)`, 
`humans\` - Delete messages sent by humans. (Ignore bots)`, 
`embeds\` - Delete messages containing rich embeds.`, 
`files\` - Delete messages containing files/images/attachments.`, 
`mentions\` - Delete messages containing member/user/channel/role mentions.`, 
`pins\` - Delete messages which are pinned.`, 
`text\` - Delete messages containing only text. (Ignores files/images/attachments, embeds)`, 
`match\` <text> - Delete messages containing text.` , 
`not\` <text> - Delete messages not containing text.`, 
`startswith\` <text> - Delete messages starts with text.`, 
`endswith\` <text> - Delete messages ends with text.`
]

const embd = new Discord.MessageEmbed() 
.setColor("BLUE") 
.setTitle("Purge | Clear | Delete | Prune") 
.setDescription(`Xóa một số tin nhắn khỏi một kênh. (Bỏ qua các tin nhắn đã ghim và giới hạn là 100)`) 
.addField("Usage", `\`${prefix}purge <amount>\` - Xóa một số tin nhắn.\n\`${prefix}purge <amount> --${commands.join(`\n\`${prefix}purge <amount> --`)}`) 
.setFooter(`${prefix}purge, ${prefix}clear, ${prefix}delete, ${prefix}prune`) 




if(!args[0] || !args.length) return message.channel.send(embd);
let amount = Number(args[0],10) || parseInt(args[0]);
if(isNaN(amount) || !Number.isInteger(amount)) return message.channel.send("Vui lòng nhập một số tin nhắn để xóa.");
if(!amount || amount < 2 || amount > 100) return message.channel.send("Vui lòng nhập một số tin nhắn từ 2 đến 100.")
if(!args[1]) {

try {
  await message.delete()
await message.channel.bulkDelete(amount).then(async (m) => { 
  
   let embed = new Discord.MessageEmbed()
  .setColor('0x#00ffff')
  .setDescription(`✅  Đã xóa **${m.size}**/**${amount}** tin nhắn!`);

   message.channel.send(embed).then(msg => msg.delete({timeout:4000})); 
})

   } catch (e) { 
     console.log(e) 
     message.channel.send(`Bạn chỉ có thể xóa các tin nhắn không quá 14 ngày.`)
     

   }

} else if(args[1]) {
  let msg;
  let data;
  let embed;
  switch(args[1]) {
    case "--bots":
     msg = await message.channel.messages.fetch({limit: amount})
    data = []
    msg.map(m => m).forEach(ms => {
      if(ms.author.bot && !ms.pinned) data.push(ms)
    })
   
   try {
     await message.delete()
     await message.channel.bulkDelete(data.length ? data : 1, true).then(async (m) => {
      
      embed = new Discord.MessageEmbed()
  .setColor('0x#00ffff')
  .setDescription(`✅  Đã xóa **${m.size}**/**${amount}** tin nhắn!`);

   message.channel.send(embed).then(msg => msg.delete({timeout:50000})); 
      })
      
   } catch (e) { 
     console.log(e)
   message.channel.send(`Bạn chỉ có thể xóa các tin nhắn không quá 14 ngày.`) 
   }

      break;
     case "--humans":
     msg = await message.channel.messages.fetch({limit: amount})
     data = []
    msg.map(m => m).forEach(ms => {
      if(!ms.author.bot && !ms.pinned) data.push(ms)
    })
    
   try {
     
     await message.channel.bulkDelete(data.length ? data : 1, true).then(async (m) => {
      
      embed = new Discord.MessageEmbed()
  .setColor('0x#00ffff')
  .setDescription(`✅  Đã xóa **${m.size}**/**${amount}** tin nhắn!`);

   message.channel.send(embed).then(msg => msg.delete({timeout:50000})); 
      })
      
   } catch (e) { 
     console.log(e)
   message.channel.send(`Bạn chỉ có thể xóa các tin nhắn không quá 14 ngày.`) 
   }

      break;
case "--embeds":
     msg = await message.channel.messages.fetch({limit: amount})
     data = []
    msg.map(m => m).forEach(ms => {
      if(ms.embeds.length && !ms.pinned) data.push(ms)
    })
    
   try {
     
      await message.channel.bulkDelete(data.length ? data : 1, true).then(async (m) => {
      
       embed = new Discord.MessageEmbed()
  .setColor('0x#00ffff')
  .setDescription(`✅  Đã xóa **${m.size}**/**${amount}** tin nhắn!`);

   message.channel.send(embed).then(msg => msg.delete({timeout:50000})); 
      })
      
   } catch (e) { 
     console.log(e)
   message.channel.send(`Bạn chỉ có thể xóa các tin nhắn không quá 14 ngày.`) 
   }

      break;
case "--files":
     msg = await message.channel.messages.fetch({limit: amount})
     data = []
    msg.map(m => m).forEach(ms => {
      if(ms.attachments.first() && !ms.pinned) data.push(ms)
    })
    
   try {
  
     await message.channel.bulkDelete(data.length ? data : 1, true).then(async (m) => {
      
       embed = new Discord.MessageEmbed()
  .setColor('0x#00ffff')
  .setDescription(`✅  Đã xóa **${m.size}**/**${amount}** Tin nhắn!`);

   message.channel.send(embed).then(msg => msg.delete({timeout:50000})); 
      })
      
   } catch (e) { 
     console.log(e)
   message.channel.send(`Bạn chỉ có thể xóa các tin nhắn không quá 14 ngày.`) 
   }

      break;case "--text":
    msg = await message.channel.messages.fetch({limit: amount})
    data = []
    msg.map(m => m).forEach(ms => {
      if(!ms.attachments.first() && !ms.embeds.length && !ms.pinned) data.push(ms)
    })
    
   try {
     
     await message.channel.bulkDelete(data.length ? data : 1, true).then(async (m) => {
      
       embed = new Discord.MessageEmbed()
  .setColor('0x#00ffff')
  .setDescription(`✅  Đã xóa **${m.size}**/**${amount}** tin nhắn!`);

   message.channel.send(embed).then(msg => msg.delete({timeout:50000})); 
      })
      
   } catch (e) { 
     console.log(e)
   message.channel.send(`Bạn chỉ có thể xóa các tin nhắn không quá 14 ngày.`) 
   }

      break;
  case "--mentions":
     msg = await message.channel.messages.fetch({limit: amount})
  data = []
    msg.map(m => m).forEach(ms => {
      if((ms.mentions.users.first() || ms.mentions.members.first() || ms.mentions.channels.first() || ms.mentions.roles.first())&& !ms.pinned) data.push(ms)
    })
    
   try {
 
       await message.channel.bulkDelete(data.length ? data : 1, true).then(async (m) => {
      
       embed = new Discord.MessageEmbed()
  .setColor('0x#00ffff')
  .setDescription(`✅  Đã xóa **${m.size}**/**${amount}** tin nhắn!`);

   message.channel.send(embed).then(msg => msg.delete({timeout:50000})); 
      })
      
   } catch (e) { 
     console.log(e)
   message.channel.send(`Bạn chỉ có thể xóa các tin nhắn không quá 14 ngày.`) 
   }

      break;
case "--pins":
    msg = await message.channel.messages.fetch({limit: amount})
     data = []
    msg.map(m => m).forEach(ms => {
      if(ms.pinned) data.push(ms)
    })
    
   try {
     
     await message.channel.bulkDelete(data.length ? data : 1, true).then(async (m) => {
      
      embed = new Discord.MessageEmbed()
  .setColor('0x#00ffff')
  .setDescription(`✅  Đã xóa **${m.size}**/**${amount}** tin nhắn!`);

   message.channel.send(embed).then(msg => msg.delete({timeout:50000})); 
      })
      
   } catch (e) { 
     console.log(e)
   message.channel.send(`Bạn chỉ có thể xóa các tin nhắn không quá 14 ngày.`) 
   }

      break;
case "--match":
     msg = await message.channel.messages.fetch({limit: amount})
    data = []
    msg.map(m => m).forEach(ms => {
if(!args[2]) return message.channel.send(embd);
      if(ms.content.includes(args.slice(2).join(" ")) && !ms.pinned) data.push(ms)
    })
    
   try {
    
     
     await message.channel.bulkDelete(data.length ? data : 1, true).then(async (m) => {
      
       embed = new Discord.MessageEmbed()
  .setColor('0x#00ffff')
  .setDescription(`✅  Đã xóa **${m.size}**/**${amount}** tin nhắn!`);

   message.channel.send(embed).then(msg => msg.delete({timeout:50000})); 
      })
      
   } catch (e) { 
     console.log(e)
   message.channel.send(`Bạn chỉ có thể xóa các tin nhắn không quá 14 ngày.`) 
   }

      break;
case "--not":
    msg = await message.channel.messages.fetch({limit: amount})
     data = []
    msg.map(m => m).forEach(ms => {
if(!args[2]) return message.channel.send(embd);
      if(!ms.content.includes(args.slice(2).join(" ")) && !ms.pinned) data.push(ms)
    })
    
   try {
     
     await message.channel.bulkDelete(data.length ? data : 1, true).then(async (m) => {
      
       embed = new Discord.MessageEmbed()
  .setColor('0x#00ffff')
  .setDescription(`✅  Đã xóa **${m.size}**/**${amount}** tin nhắn!`);

   message.channel.send(embed).then(msg => msg.delete({timeout:50000})); 
      })
      
   } catch (e) { 
     console.log(e)
   message.channel.send(`Bạn chỉ có thể xóa các tin nhắn không quá 14 ngày.`) 
   }

      break;
case "--startswith":
     msg = await message.channel.messages.fetch({limit: amount})
     data = []
    msg.map(m => m).forEach(ms => {
if(!args[2]) return message.channel.send(embd);
      if(ms.content.startsWith(args.slice(2).join(" ")) && !ms.pinned) data.push(ms)
    })
    
   try {
     
     await message.channel.bulkDelete(data.length ? data : 1, true).then(async (m) => {
      
       embed = new Discord.MessageEmbed()
  .setColor('0x#00ffff')
  .setDescription(`✅  Đã xóa **${m.size}**/**${amount}** tin nhắn!`);

   message.channel.send(embed).then(msg => msg.delete({timeout:50000})); 
      })
      
   } catch (e) { 
     console.log(e)
   message.channel.send(`Bạn chỉ có thể xóa các tin nhắn không quá 14 ngày.`) 
   }

      break;
case "--endswith":
     msg = await message.channel.messages.fetch({limit: amount})
     data = []
    msg.map(m => m).forEach(ms => {
if(!args[2]) return message.channel.send(embd);
      if(ms.content.endsWith(args.slice(2).join(" ")) && !ms.pinned) data.push(ms)
    })
    
   try {
     
     await message.channel.bulkDelete(data.length ? data : 1, true).then(async (m) => {
      
       embed = new Discord.MessageEmbed()
  .setColor('0x#00ffff')
  .setDescription(`✅  Đã xóa **${m.size}**/**${amount}** tin nhắn!`);

   message.channel.send(embed).then(msg => msg.delete({timeout:50000})); 
      })
      
   } catch (e) { 
     console.log(e)
   message.channel.send(`Bạn chỉ có thể xóa các tin nhắn không quá 14 ngày.`) 
   }

      break;
default:
return message.channel.send(embd) 
break;
}

} else {
 return message.channel.send(`Đã xảy ra lỗi.`)
}
} catch (error) {
  console.log(error)
  message.channel.send(`Đã xảy ra lỗi: \`${error}\``)
}


}
}


