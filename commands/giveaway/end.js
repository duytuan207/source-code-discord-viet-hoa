const { MessageEmbed } = require('discord.js')
const ms = require('ms');
module.exports = {
        name: "end",
        description: "Ending giveaway",
        accessableby: "Administrator",
        category: "giveaway",
        aliases: ["giveaway-end"],
        usage: '<giveawaymessageid>',
    run: async (bot, message, args) => {
      if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
        return message.channel.send(':x: Bạn cần có quyền quản lý tin nhắn để cuộn lại quà tặng.');
    }

    // If no message ID or giveaway name is specified
    if(!args[0]){
        return message.channel.send(':x: Bạn phải chỉ định một ID tin nhắn hợp lệ!');
    }

    // try to found the giveaway with prize then with ID
    let giveaway = 
    // Search with giveaway prize
    bot.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
    // Search with giveaway ID
    bot.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

    // If no giveaway was found
    if(!giveaway){
        return message.channel.send('Không thể tìm thấy quà tặng cho `'+ args.join(' ') + '`.');
    }

    // Edit the giveaway
    bot.giveawaysManager.edit(giveaway.messageID, {
        setEndTimestamp: Date.now()
    })
    // Success message
    .then(() => {
        // Success message
        message.channel.send('Giveaway sẽ kết thúc sau ít phút '+(bot.giveawaysManager.options.updateCountdownEvery/1000)+' seconds...');
    })
    .catch((e) => {
        if(e.startsWith(`Tặng phẩm có ID tin nhắn ${giveaway.messageID} đã kết thúc.`)){
            message.channel.send('Quà tặng này đã kết thúc!');
        } else {
            console.error(e);
            message.channel.send('Đã xảy ra lỗi...');
        }
    });
    }
}