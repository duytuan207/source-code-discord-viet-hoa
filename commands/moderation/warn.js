const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "warn",
  category: "moderation",
  usage: "warn <@mention> <reason>",
  description: "Warn anyone who do not obey the rules",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send(
        "Bạn nên có quyền của quản trị viên để sử dụng lệnh này!"
      );
    }

    const user = message.mentions.members.first();

    if (!user) {
      return message.channel.send(
        "Hãy đề cập đến người mà bạn muốn cảnh báo - cảnh báo @mention <reaosn>"
      );
    }

    if (message.mentions.users.first().bot) {
      return message.channel.send("Bạn không thể cảnh báo bot");
    }

    if (message.author.id === user.id) {
      return message.channel.send("Bạn không thể cảnh báo chính mình");
    }

    if (user.id === message.guild.owner.id) {
      return message.channel.send(
        "Đồ ngu, làm sao bạn có thể cảnh báo chủ sở hữu máy chủ -_-"
      );
    }

    const reason = args.slice(1).join(" ");

    if (!reason) {
      return message.channel.send(
        "Vui lòng cung cấp lý do để cảnh báo - cảnh báo @mention <reason>"
      );
    }

    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`);

    if (warnings === null) {
      db.set(`warnings_${message.guild.id}_${user.id}`, 1);
      user.send(
        `Bạn đã được cảnh báo trong **${message.guild.name}** vì ${reason}`
      );
      await message.channel.send(
        `Bạn đã cảnh báo **${
          message.mentions.users.first().username
        }** vì ${reason}`
      );
    } else if(warnings !== null) {
      
      db.add(`warnings_${message.guild.id}_${user.id}`, 1);
      
      user.send(`Bạn đã được cảnh báo trong **${message.guild.name}** vì ${reason}`);
      
      await message.channel.send(`Bạn đã cảnh báo **${message.mentions.users.first().username}** vì ${reason}`);
      
      message.delete
      
    }
  }
};
