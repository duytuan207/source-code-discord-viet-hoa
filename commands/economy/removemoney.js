const { MessageEmbed }= require("discord.js");
const db = require("quick.db");

module.exports = {
    
        name: "removemoney",
        aliases: ["rm"],
        category: "economy",
        description: "Removes money from a user",
        usage: "[ mention | ID]",
        accessableby: "Administrator, Owner"
    ,
    run: async (bot, message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR", "MANAGE_GUILD")) return message.channel.send("❌ Mày đéo đủ quyền để xóa tiền đâu thằng nhóc ? quyền lồn biên giới ?!");
        if (!args[0]) return message.channel.send("**Vui lòng nhập người dùng!**")

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args[0].toLocaleLowerCase());
        if (!user) return message.channel.send("**Nhập người dùng hợp lệ!**")

        if (!args[1]) return message.channel.send("**Vui Lòng Nhập Số Tiền!**")
        if (isNaN(args[1])) return message.channel.send("**Đây không phải một con số!**");
        let bal = await db.fetch(`money_${user.id}`)

        if (args[0] > bal) return message.channel.send("**Không thể loại bỏ nhiều tiền như vậy!**")
        db.subtract(`money_${user.id}`, args[1])
        let bal2 = await db.fetch(`money_${user.id}`)

        let moneyEmbed = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`✅ Đã xóa ${args[1]} xu\n\nSố tiền mới: ${bal2}`);
        message.channel.send(moneyEmbed)

    }
}