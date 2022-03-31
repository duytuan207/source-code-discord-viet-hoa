const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'volume', // Optional
    category: 'Music',
    description: 'Set the volume of the bot in the vc', 
    aliases: ['setvolume'], // Optional
    run: async (client, message, args) => {
            const voice_channel = message.member.voice.channel;
            const embed = new MessageEmbed()
            .setColor('#FF5757')
            .setDescription(`Bạn cần phải ở trong vc để thực hiện lệnh này!`)
            if (!voice_channel) return message.channel.send(embed);
            let isDone = client.player.setVolume(message, parseInt(args[0]));
            const volume = new MessageEmbed()
            .setColor('#85b0d2')
            .setDescription(`Âm lượng được đặt thành ${args[0]}%!`)
            if(isDone)
            message.channel.send(volume);
    }
}