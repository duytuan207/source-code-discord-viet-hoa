const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'loop', // Optional
    aliases: [], // Optional
    category: 'Music',
    description: 'Loop the queue', 
    run: async (client, message, args) => {
            const voice_channel = message.member.voice.channel;
            const embed = new MessageEmbed()
            .setColor('#FF5757')
            .setDescription(`Bạn cần phải ở trong vc để thực hiện lệnh này!`)
            if (!voice_channel) return message.channel.send(embed);
            // Enable repeat mode
            let status = client.player.setQueueRepeatMode(message, true);
            const loop = new MessageEmbed()
            .setColor('#85b0d2')
            .setDescription(`Hàng đợi sẽ được lặp lại vô thời hạn!`)
            if(status === null)
            return;
            message.channel.send(loop);
    }
}