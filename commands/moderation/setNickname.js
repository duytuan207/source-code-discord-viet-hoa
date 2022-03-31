const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
module.exports = {
  name: "setnick",
        aliases: ["sn", 'nick'],
        category: "moderation",
        description: "Sets Or Changes Nickname Of An User",
        usage: "[mention | name | nickname | ID] <nickname>",
  run: async (bot, message, args) => {
        if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("**Bạn không có quyền thay đổi biệt hiệu! - [MANAGE_GUILD]**");

        if (!message.guild.me.hasPermission("CHANGE_NICKNAME")) return message.channel.send("**Tôi không có quyền thay đổi biệt hiệu! - [CHANGE_NICKNAME]**");
      
        if (!args[0]) return message.channel.send("**Vui lòng nhập người dùng!**")
      
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase()) || message.member;
        if (!member) return message.channel.send("**Vui lòng nhập tên người dùng!**");

        if (member.roles.highest.comparePositionTo(message.guild.me.roles.highest) >= 0) return message.channel.send('**Không thể đặt hoặc thay đổi biệt hiệu của người dùng này!**')

        if (!args[1]) return message.channel.send("**Hãy nhập một nickname**");

        let nick = args.slice(1).join(' ');

        try {
        member.setNickname(nick)
        const embed = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`**Đã thay đổi biệt hiệu của ${member.displayName} đến ${nick}**`)
        message.channel.send(embed)
        } catch {
            return message.channel.send("**Thiếu quyền - [CHANGE_NICKNAME]")
        }

        let channel = db.fetch(`modlog_${message.guild.id}`)
        if (!channel) return;

        const sembed = new MessageEmbed()
            .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
            .setColor("#ff0000")
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setFooter(message.guild.name, message.guild.iconURL())
            .addField("**Moderation**", "setnick")
            .addField("**Nick Changed Of**", member.user.username)
            .addField("**Nick Changed By**", message.author.username)
            .addField("**Nick Changed To**", args[1])
            .addField("**Date**", message.createdAt.toLocaleString())
            .setTimestamp();

            var sChannel = message.guild.channels.cache.get(channel)
            if (!sChannel) return;
            sChannel.send(sembed)
    }
}