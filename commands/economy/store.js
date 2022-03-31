const { MessageEmbed } = require('discord.js');
const { PREFIX } = require('../../config');
const db = require('quick.db');


   module.exports = {
  name: "shop",
  description: "shop ",
  category: "economy",
 run: async (bot, message, args) => {
        let prefix;
        let fetched = await db.fetch(`prefix_${message.guild.id}`);

        if (fetched === null) {
            prefix = PREFIX
        } else {
            prefix = fetched
        }
      
        let embed = new MessageEmbed()
            .setDescription(`**Xếp hạng VIP**\n\nBronze: 200 xu [${prefix}mua/${prefix}bán bronze]\n\n**Lifestyle Items**\n\nFresh Nikes: 600 [${prefix}mua/${prefix}bán nikes]\nCar: 800 [${prefix}mua/${prefix}bán car]\nMansion: 1200 [${prefix}mua/${prefix}bán mansion]`)
            .setColor("GREEN")
        message.channel.send(embed)
    }
}