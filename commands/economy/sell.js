const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const { default_prefix } = require('../../config')

module.exports = {
   
        name: "sell",
        noalias: [""],
        category: "economy",
        description: "Sell to somebody",
        usage: "[mention | ID] <amount>",
        accessableby: "everyone"
    ,
    run: async (bot, message, args) => {
        let prefix;
        let fetched = await db.fetch(`prefix_${message.guild.id}`);

        if (fetched === null) {
            fetched = prefix
        } else {
            prefix = fetched
        }
        let user = message.author;

        if (args.join(' ').toLocaleLowerCase() == 'nikes') {
            let embed1 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`❌ Bạn không có Nikes để bán`);

            let nikees = await db.fetch(`nikes_${user.id}`)

            if (nikees < 1) return message.channel.send(embed1)

            db.fetch(`nikes_${user.id}`)
            db.subtract(`nikes_${user.id}`, 1)

            let embed2 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ Nikes tươi được bán với giá 600 xu`);

            db.add(`money_${user.id}`, 600)
            message.channel.send(embed2)
        } else if (args.join(' ').toLocaleLowerCase() == 'car') {
            let embed3 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`❌ Bạn không có xe để bán`);

            let cars = await db.fetch(`car_${user.id}`)

            if (cars < 1) return message.channel.send(embed3)

            db.fetch(`car_${user.id}`)
            db.subtract(`car_${user.id}`, 1)

            let embed4= new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ Bán một chiếc xe với giá 800 xu`);

            db.add(`money_${user.id}`, 800)
            message.channel.send(embed4)
        } else if (args.join(' ').toLocaleLowerCase() == 'mansion') {
            let sembed2 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`❌ Bạn không có biệt thự để bán`);

            let houses = await db.fetch(`house_${user.id}`)

            if (houses < 1) return message.channel.send(sembed2)

            db.fetch(`house_${user.id}`)
            db.subtract(`house_${user.id}`, 1)

            let sembed3 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ Bán một dinh thự với giá 1200 xu`);

            db.add(`money_${user.id}`, 1200)
            message.channel.send(sembed3)
        } else {
            if (message.content.toLowerCase() === `${prefix}sell`) {
                let embed9 = new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(`❌ Nhập một mặt hàng để bán. Kiểu ${prefix}cửa hàng để xem danh sách các mặt hàng`)
                return message.channel.send(embed9)
            } else {
              return message.channel.send("**Không phải là một mặt hàng hợp lệ!**")
            }
        }
    }
}