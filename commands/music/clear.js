const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'clear', // Optional
    aliases: ['clearqueue', 'clear-queue'], // Optional
    category: 'Music',
    description: 'Clears the queue', 
    run: async (client, message, args) => {
        const voice_channel = message.member.voice.channel;
        const embed = new MessageEmbed()
        .setColor('#FF5757')
        .setDescription(`Bạn cần phải ở trong voice để thực hiện lệnh này!`)
        const embed1 = new MessageEmbed()
        .setColor('#85b0d2')
        .setDescription('Hàng đợi đã được xóa!')
        if (!voice_channel) return message.channel.send(embed);
        let isDone = client.player.clearQueue(message);
        if(isDone)
            message.channel.send(embed1);
    }
}