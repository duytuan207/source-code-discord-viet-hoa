const db = require("quick.db")

module.exports = {
  name: "setmodlog",
  description: "set mod log cgannel",
  category: "moderation",

 run: async (bot, message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("**Bạn không có các quyền cần thiết! - [ADMINISTRATOR]**")
    if (!args[0]) {
      let b = await db.fetch(`modlog_${message.guild.id}`);
      let channelName = message.guild.channels.cache.get(b);
      if (message.guild.channels.cache.has(b)) {
        return message.channel.send(
          `**Kênh Modlog được đặt trong máy chủ này là \`${channelName.name}\`!**`
        );
      } else
        return message.channel.send(
          "**Vui lòng nhập tên kênh hoặc ID để đặt!**"
        );
    }
        let channel = message.mentions.channels.first() || bot.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) || message.guild.channels.cache.find(c => c.name.toLowerCase() === args.join(' ').toLocaleLowerCase());

        if (!channel || channel.type !== 'text') return message.channel.send("**Vui lòng nhập một kênh văn bản hợp lệ!**");

        try {
            let a = await db.fetch(`modlog_${message.guild.id}`)

            if (channel.id === a) {
                return message.channel.send("**Kênh này đã được đặt làm kênh Modlog!**")
            } else {
                bot.guilds.cache.get(message.guild.id).channels.cache.get(channel.id).send("**Bộ kênh Modlog đã được set!**")
                db.set(`modlog_${message.guild.id}`, channel.id)

                message.channel.send(`**Kênh Modlog đã được thiết lập thành công trong \`${channel.name}\`!**`)
            }
        } catch {
            return message.channel.send("**Lỗi - `Thiếu quyền hoặc kênh không phải là kênh văn bản!`**");
        }
    }
};