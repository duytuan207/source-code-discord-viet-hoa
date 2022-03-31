const { MessageEmbed } = require('discord.js')
const ms = require('ms');
module.exports = {
    name: "start",
        description: "Creating giveaway",
        accessableby: "Administrator",
        category: "giveaway",
        aliases: ["giveaway-start"],
        usage: '<channel> <duration> <winners>, <prize>',
    run: async (bot, message, args) => {
       if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
        return message.channel.send(':x: Bạn cần có quyền quản lý tin nhắn để bắt đầu quà tặng.');
    }

    // Giveaway channel
    let giveawayChannel = message.mentions.channels.first();
    // If no channel is mentionned
    if(!giveawayChannel){
        return message.channel.send(':x: Bạn phải đề cập đến một kênh hợp lệ!');
    }

    // Giveaway duration
    let giveawayDuration = args[1];
    // If the duration isn't valid
    if(!giveawayDuration || isNaN(ms(giveawayDuration))){
        return message.channel.send(':x: Bạn phải chỉ định thời hạn hợp lệ!');
    }

    // Number of winners
    let giveawayNumberWinners = args[2];
    // If the specified number of winners is not a number
    if(isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)){
        return message.channel.send(':x: Bạn phải chỉ định một số lượng người chiến thắng hợp lệ!');
    }

    // Giveaway prize
    let giveawayPrize = args.slice(3).join(' ');
    // If no prize is specified
    if(!giveawayPrize){
        return message.channel.send(':x: Bạn phải chỉ định một giải thưởng hợp lệ!');
    }

    // Start the giveaway
    bot.giveawaysManager.start(giveawayChannel, {
        // The giveaway duration
        time: ms(giveawayDuration),
        // The giveaway prize
        prize: giveawayPrize,
        // The giveaway winner count
        winnerCount: giveawayNumberWinners,
        // Who hosts this giveaway
        hostedBy: message.author,
        // Messages
        messages: {
            giveaway: "🎉🎉 **GIVEAWAY** 🎉🎉",
            giveawayEnded: "🎉🎉 **GIVEAWAY KẾT THÚC** 🎉🎉",
            timeRemaining: "Thời gian còn lại: **{duration}**!",
            inviteToParticipate: "Phản ứng với 🎉 to participate!",
            winMessage: "Xin chúc mừng, {winners}! Bạn đã thắng **{prize}**!",
            embedFooter: "Giveaways",
            noWinner: "Giveaway bị hủy, không có người tham gia hợp lệ.",
            hostedBy: "Tổ chức bởi: {user}",
            winners: "winner(s)",
            endedAt: "Ended at",
            units: {
                seconds: "seconds",
                minutes: "minutes",
                hours: "hours",
                days: "days",
                pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
            }
        }
    });

    message.channel.send(`Giveaway bắt đầu vào ${giveawayChannel}!`);

    }
}