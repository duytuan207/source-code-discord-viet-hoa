const backup = require('discord-backup');
module.exports = {
    name: "backup-create",
    aliases: ["bc"],
    category: "backup",
    usage: "qbackup-create",
    description: "Get the bot's ping!",
    run: async (client, message, args) => {
      if(!message.member.hasPermission('MANAGE_MESSAGES')){
        return message.channel.send(':x: Bạn cần có quyền quản lý thư để tạo bản sao lưu trong máy chủ này.');
    }

    backup.create(message.guild).then((backupData) => {

        return message.channel.send('Đã tạo bản sao lưu! Đây là ID của bạn: `'+backupData.id+'` Use `qload-backup '+backupData.id+'` để tải bản sao lưu trên một máy chủ khác!');

    }).catch(() => {

        return message.channel.send(':x: Đã xảy ra lỗi, vui lòng báo cáo cho máy chủ Hỗ trợ ');

    });

}
}