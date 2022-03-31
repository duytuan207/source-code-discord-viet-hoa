const backup = require('discord-backup');
module.exports = {
    name: "backup-load",
    aliases: ["bload"],
    category: "backup",
    usage: "qbackup-load",
    description: "load a server backup",
    run: async (client, message, args) => {
      if(!message.member.hasPermission('ADMINISTRATOR')){
        return message.channel.send(':x: You need to have the manage messages permissions to create a backup in this server.');
    }

    const backupID = args.join(' ');

    backup.fetch(backupID).then(() => {

        message.channel.send(':cảnh báo: Tất cả các kênh, vai trò và cài đặt của máy chủ sẽ bị xóa. Bạn có muốn tiếp tục? Gửi `-confirm` hoặc `cancel`!');

        const collector = message.channel.createMessageCollector((m) => m.author.id === message.author.id && ['-confirm', 'cancel'].includes(m.content), {
            time: 60000,
            max: 1
        });
        collector.on('collect', (m) => {
            const confirm = m.content === '-confirm';
            collector.stop();
            if (confirm) {

                backup.load(backupID, message.guild).then(() => {

                    return message.author.send('Đã tải thành công bản sao lưu!');
            
                }).catch((err) => {
            
                    if (err === 'Không tìm thấy bản sao lưu')
                        return message.channel.send(':x: Không tìm thấy bản sao lưu cho ID '+backupID+'!');
                    else
                        return message.author.send(':x: Đã xảy ra lỗi: '+(typeof err === 'string') ? err : JSON.stringify(err));
            
                });

            } else {
                return message.channel.send(':x: Hủy Bỏ.');
            }
        })

        collector.on('end', (collected, reason) => {
            if (reason === 'time')
                return message.channel.send(':x: Lệnh đã hết thời gian chờ! Xin hãy thử lại.');
        })

    }).catch(() => {
        return message.channel.send(':x: Không tìm thấy bản sao lưu cho ID '+backupID+'!');
    });

}
}