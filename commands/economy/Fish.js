const fishes = require('../../JSON/fishes.json');
let db = require('quick.db');
const ms = require("parse-ms");
const { randomRange } = require('../../functions');
const { MessageEmbed } = require('discord.js');

module.exports = {
    
        name: 'fish',
        aliases: ['catchfish'],
        category: 'economy',
        description: 'Bắt cá từ đại dương rộng lớn',
        usage: '[list | rewards] (optional)',
        acessableby: 'everyone'
    ,
    run: async (bot, message, args) => {

        let user = message.author;

        let bal = db.fetch(`money_${user.id}`)
   
        let fish = await db.fetch(`fish_${user.id}`)
        if (!args[0]) {
            if (bal === null) bal = 0;

            if (fish == null) fish = 0;

            const fishID = Math.floor(Math.random() * 10) + 1;
            let rarity;
            if (fishID < 5) rarity = 'junk';
            else if (fishID < 8) rarity = 'common';
            else if (fishID < 9) rarity = 'uncommon';
            else if (fishID < 10) rarity = 'rare';
            else rarity = 'legendary';
            const fishh = fishes[rarity];
            const worth = randomRange(fishh.min, fishh.max);

            let timeout = 1800000;
            let fishtime = await db.fetch(`fishtime_${user.id}`);

            if (fishtime !== null && timeout - (Date.now() - fishtime) > 0) {
                let time = ms(timeout - (Date.now() - fishtime));

                let timeEmbed = new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(`❌ Gần đây bạn đã câu cá\n\nĐể câu cá, bạn cần quay lại đây sau: ${time.minutes}m ${time.seconds}s `);
                return message.channel.send(timeEmbed)
            }

            let embed = new MessageEmbed()
                .setColor('GREEN')
                .setDescription(`**🎣 Bạn bỏ ra đường của mình và bắt được A ${fishh.symbol}, Tôi cá là nó sẽ bán được khoảng ${worth}**!`)
            message.channel.send(embed);

            db.add(`money_${user.id}`, worth);
            db.add(`fish_${user.id}`, 1);
            db.set(`fishtime_${user.id}`, Date.now())
        }
        if (args[0] === 'list' || args[0] === 'rewards') {

            let lEmbed = new MessageEmbed()
                .setColor('GREEN')
                .setTitle(`List Of Fish Names And Rewards You Can Get`)
                .setDescription(`
\`\`\`🔧Junk      :: Max Reward: 5, Min Reward: 1
🐟Common    :: Phần thưởng tối đa: 25, Phần thưởng tối thiểu: 10
🐠Uncommon  :: Phần thưởng tối đa: 50, Phần thưởng tối thiểu: 18
🦑Rare      :: Phần thưởng tối đa: 75, Phần thưởng tối thiểu: 30
🐋Legendary :: Phần thưởng tối đa: 100, Phần thưởng tối thiểu: 50\`\`\`
**Tất cả phần thưởng là ngẫu nhiên từ tối đa / phút**
​
`)
                .setFooter(message.guild.name, message.guild.iconURL())
            return message.channel.send(lEmbed);
        }
    }
}