const Discord = require('discord.js');
const backup = require('discord-backup');


module.exports = {
    name: 'info-backup',
    aliases: [],
    category: 'backup',
    

   run: async (client, message, args) => {
    // If the member doesn't have enough permissions
    if(!message.member.hasPermission('ADMINISTRATOR')){
        return message.reply(':x: Bạn cần có quyền quản trị viên để tạo bản sao lưu trong máy chủ này.');
    }

    const backupID = args.join(' ');

    if (!backupID)
        return message.channel.send(':x: Vui lòng chỉ định một ID dự phòng hợp lệ!');

    backup.fetch(backupID).then((backup) => {

        const date = new Date(backup.data.createdTimestamp);
        const yyyy = date.getFullYear().toString(), mm = (date.getMonth()+1).toString(), dd = date.getDate().toString();
        const formattedDate = `${yyyy}/${(mm[1]?mm:"0"+mm[0])}/${(dd[1]?dd:"0"+dd[0])}`;

        const embed = new Discord.MessageEmbed()
            .setAuthor(':information_source: Backup', backup.data.iconURL)
            .addField('Server name', backup.data.name)
            .addField('Size', backup.size + ' kb')
            .addField('Created at', formattedDate)
            .setFooter('Backup ID: '+backup.id);

        return message.channel.send(embed);

    }).catch((err) => {

        if (err === 'No backup found')
            return message.channel.send(':x: Không tìm thấy bản sao lưu ID '+backupID+'!');
        else
            return message.channel.send(':x: Đã xảy ra lỗi: '+(typeof err === 'string') ? err : JSON.stringify(err));

    });

  }
}
