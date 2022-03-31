const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
    
        name: "deposit",
        aliases: ["dep"],
        category: "economy",
        description: "Gửi tiền vào ngân hàng",
        usage: "<amount>",
        accessableby: "everyone"
    ,
    run: async (bot, message, args) => {

        let user = message.author;

        let member = db.fetch(`money_${user.id}`)

        if (args[0] == 'all') {
            let money = await db.fetch(`money_${user.id}`)

            let embedbank = new MessageEmbed()
                .setColor('GREEN')
                .setDescription("❌ Bạn không có tiền để gửi")

            if (!money) return message.channel.send(embedbank)

            db.subtract(`money_${user.id}`, money)
            db.add(`bank_${user.id}`, money)
            let sembed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ Bạn đã gửi tất cả số tiền của mình vào lệnh cấm của mình`);
            message.channel.send(sembed)

        } else {

            let embed2 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`❌ Chỉ định một số tiền để gửi`);

            if (!args[0]) {
                return message.channel.send(embed2)
                    .catch(err => message.channel.send(err.message))
            }
            let embed6 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`❌ Số tiền của bạn không phải là một con số!`)

            if(isNaN(args[0])) {
                return message.channel.send(embed6)
            
            }
            let embed3 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`❌ Bạn không thể gửi tiền âm`);

            if (message.content.includes('-')) {
                return message.channel.send(embed3)
            }
            let embed4 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`❌ Bạn không có nhiều tiền như vậy`);

            if (member < args[0]) {
                return message.channel.send(embed4)
            }

            let embed5 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ Bạn đã gửi tiền ${args[0]} tiền vào ngân hàng của bạn`);

            message.channel.send(embed5)
            db.subtract(`money_${user.id}`, args[0])
            db.add(`bank_${user.id}`, args[0])

        }
    }
}