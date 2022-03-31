const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
    
        name: "withdraw",
        aliases: ["wd"],
        category: "economy",
        description: "Withdraws Money From Bank",
        usage: "<amount>",
    
    run: async (bot, message, args) => {
        let user = message.author;

        let member2 = db.fetch(`bank_${user.id}`)

        if (args.join(' ').toLocaleLowerCase() == 'all') {
            let money = await db.fetch(`bank_${user.id}`)
            let embed = new MessageEmbed()
              .setColor("GREEN")
              .setDescription(`❌**You Do Not Have Any Money To Withdraw!**`)
            if (!money) return message.channel.send(embed)
            db.subtract(`bank_${user.id}`, money)
            db.add(`money_${user.id}`, money)
            let embed5 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ Bạn đã rút tất cả số tiền từ ngân hàng của mình`); 
            message.channel.send(embed5)

        } else {

            let embed2 = new MessageEmbed() 
                .setColor("GREEN")
                .setDescription(`❌ Chỉ định số tiền để rút!`);

            if (!args[0]) {
                return message.channel.send(embed2)
            }
            let embed6 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`❌ Số tiền của bạn không phải là một con số!`)

            if(isNaN(args[0])) {
                return message.channel.send(embed6)
            }
            let embed3 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`❌ Bạn không thể rút tiền âm!`);

            if (message.content.includes('-')) {
                return message.channel.send(embed3)
            }
            let embed4 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`❌ Bạn không có nhiều tiền trong ngân hàng!`);

            if (member2 < args[0]) {
                return message.channel.send(embed4)
            }

            let embed5 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ Bạn đã rút tiền ${args[0]} xu từ ngân hàng của bạn!`);

            message.channel.send(embed5)
            db.subtract(`bank_${user.id}`, args[0])
            db.add(`money_${user.id}`, args[0])
        }
    }
}