const { MessageEmbed } = require("discord.js");
const ytsr = require('ytsr');
module.exports = {
    name: 'play',
    aliases: ['p'], // Optional
    category: 'Music',
    description: 'Play a song in the vc', 
    run: async (client, message, args) => {
        const voice_channel = message.member.voice.channel;
        const embed = new MessageEmbed()
            .setColor('#FF5757')
            .setDescription(`Bạn cần phải ở trong vc để thực hiện lệnh này!`)
        if (!voice_channel) return message.channel.send(embed);

        if(client.player.isPlaying(message)) {
            let song = await client.player.addToQueue(message, args.join(' '));

            const added = new MessageEmbed()
            .setColor('#85b0d2')
            .setDescription(`Thêm **${song.name}** đến hàng đợi`)


            // If there were no errors the Player#songAdd event will fire and the song will not be null.
            if(song)
                message.channel.send(added);
            return;
        } else {
            let song = await client.player.play(message, args.join(' '));

            const started = new MessageEmbed()
            .setColor('#85b0d2')
            .setDescription(`Bắt đầu phát nhạc **${song.name}**`)

            // If there were no errors the Player#songAdd event will fire and the song will not be null.
            if(song)
                message.channel.send(started);
            return;
        }
    }
}