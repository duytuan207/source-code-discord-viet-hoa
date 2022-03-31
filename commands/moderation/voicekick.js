module.exports = {
  name: "voicekick",
  category: "moderation",
  run: async (client, message, args) => {
    if (!message.guild.me.hasPermission(["ADMINISTRATOR"]))
      return message.channel.send(
        "Tôi không có quyền thích hợp để sử dụng lệnh này!"
      );

    if (!message.mentions.members.first())
      return message.channel.send(
        `Vui lòng đề cập đến người dùng mà bạn muốn bắt đầu từ kênh thoại!`
      );

    let { channel } = message.mentions.members.first().voice;

    if (!channel)
      return message.channel.send(`Người dùng không ở bất kỳ kênh thoại nào!`);

    message.mentions.members.first().voice.kick();
    
    message.channel.send(`Người dùng đã bị loại khỏi kênh thoại!`)
  }
};