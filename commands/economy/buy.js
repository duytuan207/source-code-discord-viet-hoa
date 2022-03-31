const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
const { default_prefix } = require('../../config');

module.exports = {
    
        name: "buy",
        noalias: [""],
        category: "economy",
        description: "buys items",
        usage: "[item]",
        accessableby: "everyone"
    ,
    run: async (bot, message, args) => {
        let user = message.author;

        let prefix;
        let fetched = await db.fetch(`prefix_${message.guild.id}`);

        if (fetched === null) {
            prefix = default_prefix
        } else {
            prefix = fetched
        }
      
        let author = db.fetch(`money_${user.id}`)

        let Embed = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`❌ Bạn cần 200 xu để mua VIP đồng`);


        if (args.join(' ').toLocaleLowerCase() == 'bronze') {
            if (author < 200) return message.channel.send(Embed)

            await db.fetch(`bronze_${user.id}`);
            db.set(`bronze_${user.id}`, true)

            let Embed2 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ VIP đồng được mua với giá 200 xu`);

            db.subtract(`money_${user.id}`, 200)
            message.channel.send(Embed2)
        } else if (args.join(' ').toLocaleLowerCase() == 'nikes') {
            let Embed3 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`❌ Bạn cần 600 xu để mua một số Nikes`);

            if (author < 600) return message.channel.send(Embed3)

            await db.fetch(`nikes_${user.id}`)
            db.add(`nikes_${user.id}`, 1)

            let Embed4 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ Đã mua Nikes tươi với giá 600 xu`);

            db.subtract(`money_${user.id}`, 600)
            message.channel.send(Embed4)
        } else if (args.join(' ').toLocaleLowerCase() == 'car') {
            let Embed5 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`❌ Bạn cần 800 xu để mua một chiếc ô tô mớir`);

            if (author < 800) return message.channel.send(Embed5)

            await db.fetch(`car_${user.id}`)
            db.add(`car_${user.id}`, 1)

            let Embed6 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ Mua một chiếc ô tô mới với giá 800 xu`);

            db.subtract(`money_${message.guild.id}_${user.id}`, 800)
            message.channel.send(Embed6)
        } else if (args.join(' ').toLocaleLowerCase() == 'mansion') {
            let Embed7 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`❌ Bạn cần 1200 xu để mua một Dinh thự`);

            if (author < 1200) return message.channel.send(Embed7)

            await db.fetch(`house_${user.id}`)
            db.add(`house_${user.id}`, 1)

            let Embed8 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ Đã mua một dinh thự với giá 1200 xu`);

            db.subtract(`money_${user.id}`, 1200)
            message.channel.send(Embed8)
        } else {
            if (message.content.toLowerCase() === `${prefix}buy`) {
                let embed9 = new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(`❌ Nhập một mặt hàng để mua!\nKiểu ${prefix}cửa hàng để xem danh sách các mặt hàng!`)
                return message.channel.send(embed9)
            }
        }
    }
}