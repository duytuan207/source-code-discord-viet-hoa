const discord = require("discord.js");
module.exports = {
  name: "bug",
  category: "moderation",
  args: true,
  description:
    "Vui lòng chỉ định lỗi. Ví dụ: \n`punch không hoạt động. Nó không đề cập đến người dùng mà tôi đang cố đấm`",
  usage:
    "Vui lòng chỉ định lỗi. Ví dụ: \n`punch không hoạt động. Nó không đề cập đến người dùng mà tôi đang cố đấm`",
  run: async (client, message, args) => {
    // again make this fit your command handler style 😀
    args = args.join(" ");
    const channels = message.channel;
    let check;
    if (args[0] === "temp") {
      check = "true";
    } else if (args[1] === "temp") {
      check = "true";
    } else {
      check = "false";
    }
    let check2;
    if (args[0] === "temp") {
      check2 = "86400";
    } else if (args[1] === "temp") {
      check2 = "86400";
    } else {
      check2 = "0";
    }
    message.reply(
      "Cảm ơn bạn đã gửi lỗi ! chúng tôi sẽ kiểm tra báo cáo của bạn\nchúng tôi sẽ gửi tin nhắn trực tiếp cho bạn khi lỗi này được giải quyết\nvui lòng kích hoạt tất cả các quyền DM"
    );
    channels
      .createInvite({
        temporary: `${check}`,
        maxAge: `${check2}`,
        maxUses: 0,
        reason: `Requested By : ${message.author.username}`
      })
      .then(InviteCode =>
        client.channels.cache.get("834825028444618773").send(
          new discord.MessageEmbed()
            .setTitle("New Report Bug")
            .addField(
              "User Name",
              `**${message.author.username}#${message.author.discriminator}**`
            )
            .addField("ID User", message.author.id)
            .addField("Reported", args)
            .addField("Server Name", `**${message.guild.name}**`)
            .addField("ID Server", `**${message.guild.id}**`)
            .addField("USER SEARCH", `**[Click Here](https://discordapp.com/users/${message.guild.id}/)**`)
            .addField(`Link Server`, `https://discord.gg/${InviteCode.code}`)
            .setColor("RANDOM")
        )
      );
  }
};