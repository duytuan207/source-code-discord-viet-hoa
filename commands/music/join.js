const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'join', // Optional
    aliases: [], // Optional
    category: 'Music',
    description: 'Join the voice channel!', 
        run: async (client, message, args) => {
            const voiceChannel = message.member.voice.channel;
            const embed = new MessageEmbed()
            .setColor('#FF5757')
            .setDescription(`Bạn cần phải ở trong vc để thực hiện lệnh này!`)
            if(!voiceChannel) return message.channel.send(embed)
            voiceChannel.join()
            message.react('🪐')
              
          }
}