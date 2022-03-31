const ownerid = "682981714523586606";

module.exports = {
        name: "getinvite",
        aliases: ['getinv', 'gi'],
        category: "owner",
        description: "Generates an invitation to  server in question.",
        usage: "[ID | name]",
      
    run: async(bot, message, args) => {
        if (message.author.id === ownerid) {
        let guild = null;

        if (!args[0]) return message.channel.send("Nhập Tên Bang hội hoặc ID Bang hội của nơi bạn muốn Liên kết Mời.")

        if(args[0]){
            let fetched = bot.guilds.cache.find(g => g.name === args.join(" "));
            let found = bot.guilds.cache.get(args[0]);
            if(!found) {
                if(fetched) {
                    guild = fetched;
                }
            } else {
                guild = found
            }
        } else {
            return message.channel.send("Đó là tên Bang hội không hợp lệ");
        }
        if(guild){
            let tChannel = guild.channels.cache.find(ch => ch.type == "text" && ch.permissionsFor(ch.guild.me).has("CREATE_INSTANT_INVITE"));
            if(!tChannel) {
                return message.channel.send("Xin lỗi, tôi không có quyền CREATE_INSTANT_INVITE ở đó!"); 
            }
            let invite = await tChannel.createInvite({ temporary: false, maxAge: 0 }).catch(err => {
                return message.channel.send(`${err} đã xảy ra!`);
            });
            message.channel.send(invite.url);
        } else {
            return message.channel.send(`\`${args.join(' ')}\` - Tôi không ở trong Máy chủ đó.`);
        }
    } else {
        return;
    }
    }

}