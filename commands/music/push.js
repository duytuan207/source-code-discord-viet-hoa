const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'pause', // Optional
    aliases: ['paus'], // Optional
    category: 'Music',
    description: 'Pause the queue', 
    run: async (client, message, args) => {
            const voice_channel = message.member.voice.channel;
            const embed = new MessageEmbed()
            .setColor('#FF5757')
            .setDescription(`Bạn cần phải ở trong vc để thực hiện lệnh này!`)
            if (!voice_channel) return message.channel.send(embed);
            let song = client.player.pause(message);
            const pause = new MessageEmbed()
            .setColor('#85b0d2')
            .setDescription(`**${song.name}** đã bị tạm dừng!`)
            if(song) 
            
            message.channel.send(pause);
    }
}