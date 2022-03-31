const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
   
        name: "addmoney",
        aliases: ["am"],
        category: "economy",
        description: "Adds Money to a user",
        usage: "[ mention | ID]",
        accessableby: "Administrator, Owner"
    ,
    run: async (bot, message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("❌ Mày đéo đủ quyền để add tiền đâu, cút mẹ mày đi! - [ADMINISTRATOR]");
        if (!args[0]) return message.channel.send("**Vui lòng nhập người dùng!**")

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args[0].toLocaleLowerCase());
        if (!user) return message.channel.send("**Nhập người dùng hợp lệ!**")
        if (!args[1]) return message.channel.send("**Vui lòng nhập số tiền cần thêm!**")
        if (isNaN(args[1])) return message.channel.send(`**❌ Số tiền của bạn không phải là một con số!**`);
        if (args[0] > 10000) return message.channel.send("**Không thể thêm số tiền nhiều như vậy!**")
        db.add(`money_${user.id}`, args[1])
        let bal = db.fetch(`money_${user.id}`)

        let moneyEmbed = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`✅ Đã thêm ${args[1]} Xu\n\nSố tiền mới: ${bal}`);
        message.channel.send(moneyEmbed)

    }
}