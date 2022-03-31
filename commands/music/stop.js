const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'stop', // Optional
    category: 'Music',
    description: 'Clears the queue and leave the vc', 
    aliases: ['st'], // Optional
    run: async (client, message, args) => {
            const voice_channel = message.member.voice.channel;
            const embed = new MessageEmbed()
            .setColor('#FF5757')
            .setDescription(`Bạn cần phải ở trong vc để thực hiện lệnh này!`)
            if (!voice_channel) return message.channel.send(embed);
            let isDone = client.player.stop(message);
            const stop = new MessageEmbed()
            .setColor('#85b0d2')
            .setDescription('Nhạc đã dừng và hàng đợi đã bị xóa!')
            if(isDone)
            message.channel.send(stop);
    }
}