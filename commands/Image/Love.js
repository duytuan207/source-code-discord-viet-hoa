const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "love",
  aliases: [],
  category: "Image",
  description: "Return A Random Pat!",
  usage: "qlove user1 user2 | q love id1 id2",
    run: async (bot, message, args) => {
        
        let user =  await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(m => m.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(mp => mp.displayName.toLowerCase() === args[0].toLocaleLowerCase());
        let user2 =  await message.mentions.members.array()[1] || message.guild.members.cache.get(args[1]) || message.guild.members.cache.find(m => m.user.username.toLowerCase() === args[1].toLocaleLowerCase()) || message.guild.members.cache.find(mp => mp.displayName.toLowerCase() === args[1].toLocaleLowerCase());
        if(!args[0]) return message.channel.send("**Nhập tên người yêu!**")
        if(!args[1]) return message.channel.send("**Nhập tên của một người yêu khác!**")
        
        if (!user) return message.channel.send("**Vui lòng nhập người dùng hợp lệ!**")
        if (!user2) return message.channel.send("**Vui lòng nhập người dùng hợp lệ!**")

        let m = await message.channel.send("**Vui lòng chờ...**");
        try {
            let res = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=ship&user1=${user.user.displayAvatarURL({ format: "png", size: 512 })}&user2=${user2.user.displayAvatarURL({ format: "png", size: 512 })}`));
            let json = await res.json();
            let attachment = new Discord.MessageAttachment(json.message, "love.png");
            message.channel.send(attachment);
            m.delete({ timeout: 5000 });
        } catch(e){
            m.edit("Lỗi. Vui lòng thử lại! Đề cập đến một người nào đó");
        }
    }
};