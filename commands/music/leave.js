const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'leave', // Optional
    aliases: [], // Optional
    category: 'Music',
    description: 'Leaves the voice channel!', 
        
        run: async (client, message, args) => {
            const voiceChannel = message.member.voice.channel;
            const embed = new MessageEmbed()
            .setColor('#FF5757')
            .setDescription(`Bạn cần phải ở trong vc để thực hiện lệnh này!`)
            if(!voiceChannel) return message.channel.send(embed)
            voiceChannel.leave()
            message.react('🪐')
              
          }
}