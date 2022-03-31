const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports = {
    
        name: "daily",
        aliases: ["coins-system"],
        category: "economy",
        description: "Cung cấp cho bạn 200 mỗi ngày",
        usage: " ",
        accessableby: "everyone"
    ,
    run: async (bot, message, args) => {
        let user = message.author;

        let timeout = 86400000;
        let amount = 200;

        let daily = await db.fetch(`daily_${user.id}`);

        if (daily !== null && timeout - (Date.now() - daily) > 0) {
            let time = ms(timeout - (Date.now() - daily));

            let timeEmbed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`❌ Bạn đã nhận được phần thưởng hàng ngày của mình\n\nMai hãy quay lại đây và nhận phần thưởng ${time.hours}h ${time.minutes}m ${time.seconds}s `);
            message.channel.send(timeEmbed)
        } else {
            let moneyEmbed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ Bạn đã nhận được phần thưởng hàng ngày của mình là ${amount} xu`);
            message.channel.send(moneyEmbed)
            db.add(`money_${user.id}`, amount)
            db.set(`daily_${user.id}`, Date.now())


        }
    }
}