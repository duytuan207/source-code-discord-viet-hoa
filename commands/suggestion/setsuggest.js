const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "setsuggest",
    category: "suggestion",
    usage: "setsuggest <#channel>",
    authorPermission: ["MANAGE_GUILD"],
    run: async (client, message, args) => {
if (!message.member.hasPermission("MANAGE_GUILD")) {
            return message.channel.send(`
Bạn không có quyền sử dụng lệnh này! Quản lý máy chủ`)
        }
        let Channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);

        if (!Channel) return message.channel.send(`Xin vui lòng đề cập đến một kênh!`);

        if (Channel.type === "voice") return message.channel.send(`Vui lòng đề cập đến một kênh văn bản!`);

        await db.set(`suggestion_${message.guild.id}`, Channel.id);

        let Embed = new MessageEmbed()
        .setColor("00FFFF")
        .setDescription(`Kênh đề xuất được đặt là <#${Channel.id}>`)

        return message.channel.send(Embed);

    }
};