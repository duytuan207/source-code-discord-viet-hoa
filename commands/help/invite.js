const discord = require("discord.js");

module.exports = {
  name: "invite",
  category: "info",
  description: "INVITE Automodv12 beta BOT",
  run: async (client, message, args) => {
    
    let embed = new discord.MessageEmbed()
    .setTitle(`ĐÂY LÀ LINK MỜI BOT!`)
    .setDescription(`<:link:845315257430048788>  [NHẤN VÀO ĐÂY](https://discord.com/api/oauth2/authorize?client_id=900708170060693515&permissions=8&scope=bot) HOẶC [HỖ TRỢ SERVER ](https://discord.gg/N83U7xT7fs)`)
    .setColor("RANDOM")
    .setFooter(`made by NgDuyTuan :> `)
    .setTimestamp(message.timestamp = Date.now())
    
    message.channel .send(embed)
    
  
  }
}