const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'skip', // Optional
    aliases: ['sk'], // Optional
    category: 'Music',
    description: 'Skip the song that its playing.', 
        run: async (client, message, args) => {
            const voice_channel = message.member.voice.channel;
            const embed = new MessageEmbed()
            .setColor('#FF5757')
            .setDescription(`Bạn cần phải ở trong vc để thực hiện lệnh này!`)
            if(!client.player.isPlaying(message)) {
			message.channel.send('Đài Unknow phải đang phát để bỏ qua bản nhạc');

			return;
		}

		await client.player.skip(message);

		message.channel.send('Đã bỏ qua');
	},
};