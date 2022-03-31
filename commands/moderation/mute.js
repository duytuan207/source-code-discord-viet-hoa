const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "mute",
  aliases: ["mutes", "muted"],
  category: "moderation",
  description: "mute @user",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_ROLES")) {
      return message.channel.send("xin lỗi bạn cần sự cho phép để tắt tiếng ai đó");
    }
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
      return message.channel.send("Tôi không có quyền tắt tiếng");
    }

    const user = message.mentions.members.first();

    if (!user) {
      return message.channel.send("\```vui lòng đề cập đến các thành viên để tắt tiếng\```");
    }
    if (user.id === message.author.id) {
      return message.channel.send("Tôi không thể tắt tiếng bạn vì bạn là tác giả tin nhắn");
    }
    let reason = args.slice(1).join("");

    if (!reason) {
      return message.channel.send(" \``` xin vui lòng cho biết một số lý do để tắt tiếng\``` ");
    }

    const vrole = user.roles.cache

    let muterole = message.guild.roles.cache.find(x => x.name === "muted");

    if (!muterole) {
      return message.channel.send("\```vui lòng tạo tên vai trò với tắt tiếng \``` ");
    }
    
    await user.roles.remove(vrole);
    await user.roles.add(muterole);

    await message.channel.send(
      `bạn đã tắt tiếng ${message.mentions.users.first().username} vì ${reason}`
    );

    user.send(`Bạn bị tắt tiếng trong ${message.guild} vì ${reason}`
    );
  }
};
