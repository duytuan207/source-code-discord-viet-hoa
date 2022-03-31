const db = require("quick.db");

module.exports = {
  name: "unmute",
  category: "moderation",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_ROLES")) {
      return message.channel.send(
        "Xin lỗi nhưng bạn không có quyền bật tiếng bất kỳ ai"
      );
    }

    if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
      return message.channel.send("Tôi không có quyền quản lý các vai trò.");
    }

    const user = message.mentions.members.first();

    if (!user) {
      return message.channel.send("Vui lòng đề cập đến thành viên mà bạn muốn bật tiếng");
    }

    let muterole = message.guild.roles.cache.find(x => x.name === "Muted");

    if (user.roles.cache.has(muterole)) {
      return message.channel.send("Đã cho Người dùng không có vai trò tắt tiếng, vì vậy những gì tôi cho là đảm nhận");
    }

    user.roles.remove(muterole)

    await message.channel.send(`**${message.mentions.users.first().username}** bây giờ được bật tiếng`);

    user.send(`Bạn hiện đã được hiển thị từ **${message.guild.name}**`);
    
    message.delete()
  }
};
