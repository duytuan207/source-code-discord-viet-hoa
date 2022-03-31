const db = require("quick.db");

module.exports = {
  name: "resetwarns",
  aliases: ["rwarns", "rsetwarns"],
  category: "moderation",
  usage: "rwarns <@user>",
  description: "Reset warnings of mentioned person",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send(
        "Yopu phải có quyền quản trị để sử dụng lệnh này"
      );
    }

    const user = message.mentions.members.first();

    if (!user) {
      return message.channel.send("Vui lòng đề cập đến người có cảnh báo mà bạn muốn đặt lại");
    }

    if (message.mentions.users.first().bot) {
      return message.channel.send("Bot không được phép có cảnh báo");
    }

    if (message.author.id === user.id) {
      return message.channel.send("Bạn không được phép đặt lại cảnh báo của mình");
    }

    let warnings = db.get(`cảnh báo_${message.guild.id}_${user.id}`);

    if (warnings === null) {
      return message.channel.send(`${message.mentions.users.first().username} không có bất kỳ cảnh báo nào`);
    }

    db.delete(`cảnh báo ${message.guild.id}_${user.id}`);
    user.send(
      `Tất cả các cảnh báo của bạn được đặt lại bởi ${message.author.username} vì ${message.guild.name}`
    );
    await message.channel.send(
      `Đã xóa tất cả các cảnh báo về ${message.mentions.users.first().username}`
    );
  }
};
