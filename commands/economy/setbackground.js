const db = require('quick.db');
const { MessageEmbed } = require('discord.js');
const { PREFIX } = require('../../config')

module.exports = {
    
        name: "setbackground",
        aliases: ['setbg'],
        category: "economy",
        description: 'Sets Profile Background',
        usage: "[upload Image]",
        accessableby: 'everyone'
    ,
    run: async (bot, message, args) => {

        let prefix;
        let fetched = await db.fetch(`prefix_${message.guild.id}`);

        if (fetched === null) {
            prefix = default_prefix
     } else {
            prefix = fetched
        }
        let user = message.author;
        let amount = 250;
        let bal = await db.fetch(`money_${user.id}`)

        let newBg = message.attachments.first()
        let fetchBg = await db.fetch(`bg_${user.id}`);
        if (!newBg) {
            if (fetchBg) {
                return message.channel.send(`**Nền hồ sơ đã được đặt làm - \`${fetchBg}\`**`)
            } else {
                return message.channel.send("**Bạn cần tải lên hình ảnh để đặt nền mới!**")
            }
        }

        if (bal < amount) return message.channel.send(`**Bạn không có đủ tiền!\nGiá để thay đổi nền - ${amount}**`)
        db.subtract(`money_${user.id}`, amount)
        db.set(`bg_${user.id}`, newBg.url)

        let embed = new MessageEmbed()
            .setColor("GREEN")
            .setAuthor(`Hình nền của bạn đã được đặt`, user.displayAvatarURL())
            .setDescription(`**\`${amount}\` Đã bị khấu trừ và nền hồ sơ đã được thiết lập\nLink - \`${newBg.url}\`!**`)
            .setFooter(`Để kiểm tra loại nền ${prefix}hồ sơ`)
        return message.channel.send(embed)
    }
}