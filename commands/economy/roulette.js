const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const { default_prefix } = require('../../config');

module.exports = {
   
        name: "roulette",
        aliases: ["roul"],
        category: "economy",
        description: "Bet a colour to win or lose",
        usage: "[colour]<amount>",
        accessableby: "everyone"
    ,
    run: async (bot, message, args) => {
        let prefix = "q"
        let fetched = await db.fetch(`prefix_${message.guild.id}`);

        if (fetched === null) {
            fetched = prefix
        } else {
            prefix = fetched
        }
      
        let user = message.author;

        function isOdd(num) {
            if ((num % 2) == 0) return false;
            else if ((num % 2) == 1) return true;
        }

        let colour = args[0];
        let money = parseInt(args[1]);
        let moneydb = await db.fetch(`money_${user.id}`)

        let random = Math.floor((Math.random() * 10));

        let moneyhelp = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`❌ Chỉ định số tiền để đánh bạc | ${prefix}cò quay <color> <amount>`);

        let moneymore = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`❌ Bạn đang đặt cược nhiều hơn những gì bạn có`);

        let colorbad = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`❌ Chỉ định một màu | Đỏ [1.5x] (normal) Đen [2x] (hard) Xanh [15x](rare)`);

        if (!colour) return message.channel.send(colorbad);
        colour = colour.toLowerCase()
        if (!money) return message.channel.send(moneyhelp);
        if (money > moneydb) return message.channel.send(moneymore);

        if (colour == "b" || colour.includes("black")) colour = 0;
        else if (colour == "r" || colour.includes("red")) colour = 1;
        else if (colour == "g" || colour.includes("green")) colour = 2;
        else return message.channel.send(colorbad);

        if (random == 1 && colour == 2) { // Green
            money *= 15
            db.add(`money_${user.id}`, money)
            let moneyEmbed1 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ Bạn đã thắng ${money} xu\n\nHệ số nhân: 15x`);
            message.channel.send(moneyEmbed1)
        } else if (isOdd(random) && colour == 1) { // Red
            money = parseInt(money * 1.5)
            db.add(`money_${user.id}`, money)
            let moneyEmbed2 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`🔴 Bạn đã thắng ${money} xu\n\nHệ số nhân: 1.5x`);
            message.channel.send(moneyEmbed2)
        } else if (!isOdd(random) && colour == 0) { // Black
            money = parseInt(money * 2)
            db.add(`money_${user.id}`, money)
            let moneyEmbed3 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`⬛ Bạn đã thắng ${money} xu\n\nHệ số nhân: 2x`);
            message.channel.send(moneyEmbed3)
        } else { // Wrong
            db.subtract(`money_${user.id}`, money)
            let moneyEmbed4 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`❌ Bạn đã thua ${money} xu\n\nHệ số nhân: 0x`);
            message.channel.send(moneyEmbed4)
        }
          db.add(`games_${user.id}`, 1)
    }
}