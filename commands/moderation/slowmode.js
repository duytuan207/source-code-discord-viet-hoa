module.exports = {
  name: "slowmode",
  category: "moderation",
  description: "Lets you set slowmode on the channel.",
  args: true,
  usage: "<time>",
  run: (client, message, args) => {
    const amount = parseInt(args[0]);
    if (message.member.hasPermission("MANAGE_CHANNEL"))
      if (isNaN(amount))
        return message.channel.send("<a:crossWrong:Nó có vẻ không phải là số hợp lệ");
    if (args[0] === amount + "s") {
      message.channel.setRateLimitPerUser(amount);
      if (amount > 1) {
        message.channel.send("chế độ chậm bây giờ là " + amount + " giây");
        return;
      } else {
        message.channel.send("chế độ chậm bây giờ là " + amount + " giây");
        return;
      }
    }
    if (args[0] === amount + "min") {
      message.channel.setRateLimitPerUser(amount * 60);
      if (amount > 1) {
        message.channel.send("chế độ chậm bây giờ là " + amount + " phút");
        return;
      } else {
        message.channel.send("chế độ chậm bây giờ là " + amount + " phút");

        return;
      }
    }
    if (args[0] === amount + "h") {
      message.channel.setRateLimitPerUser(amount * 60 * 60);
      if (amount > 1) {
        message.channel.send("chế độ chậm bây giờ là " + amount + " tiếng");
        return;
      } else {
        message.channel.send("chế độ chậm bây giờ là " + amount + " tiếng");
        return;
      }
    } else {
      message.channel.send(
        "Bạn chỉ có thể đặt seconds(s), minutes(min) and hours(h)"
      );
    }
  }
};
