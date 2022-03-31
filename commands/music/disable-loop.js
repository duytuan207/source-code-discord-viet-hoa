const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'disable-loop', // Optional
    aliases: [], // Optional
    category: 'Music',
    description: 'Stop looping the queue', 
    run: async (client, message, args) => {
            const voice_channel = message.member.voice.channel;
            const embed = new MessageEmbed()
            .setColor('#FF5757')
            .setDescription(`Bạn cần phải ở trong vc để thực hiện lệnh này!`)
            if (!voice_channel) return message.channel.send(embed);
            // Disable repeat mode
            let status = client.player.setQueueRepeatMode(message, false);

            const disloop = new MessageEmbed()
            .setColor('#85b0d2')
            .setDescription(`Hàng đợi sẽ không còn lặp lại vô thời hạn!`)
            if(status === null)
            return;
            message.channel.send(disloop);
    }
}