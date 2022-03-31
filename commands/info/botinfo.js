const db = require("quick.db");
const Discord = require ("discord.js")
const { version } = require('../../package.json');
const ms = require('pretty-ms');
const { version: discordjsVersion } = require('discord.js');
module.exports = {

  name: "botinfo",

  category: "info",
    aliases: ['binfo', 'botstats', 'stats'],
    description: 'Check\'s bot\'s status',
  run: async (client, message, args, del, member) => {
   message.delete();
      message.channel.send(new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`Bot tự động hóa ${version}`)
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            .addField('				**❯ Thời gian hoạt động:**', `${ms(client.uptime)}`, true)
            .addField('				**❯ WebSocket Ping:**', `${client.ws.ping}ms`, true)
            .addField('				**❯ Dung lượng:**', `${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB RSS\n${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB Heap`, true)
            .addField('				**❯ Số lượng group:**', `${client.guilds.cache.size} group`, true)
            .addField(`				**❯ Số lượng người dùng:**`, `${client.users.cache.size} người dùng`, true)
            .addField('				**❯ Lệnh:**', `${client.commands.size} cmds`,true)
            .addField('				**❯ Node:**', `${process.version} on ${process.platform} ${process.arch}`, true)
            .addField('				**❯ Dữ liệu được lưu trong bộ nhớ đệm:**', `${client.users.cache.size} người dùng\n${client.emojis.cache.size} emojis`, true)
            .addField('				**❯ Discord.js:**', `${discordjsVersion}`, true)
            .setTimestamp()
        );
    }
}
