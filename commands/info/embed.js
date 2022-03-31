const Discord = require("discord.js")
module.exports = {
    name: 'embedgen',
    aliases: ["emb"],
    description: 'embed Generator',
    category: "info",
       run: async (client, message, args) => {

       try {

            const filter = msg => msg.author.id == message.author.id;
            const options = {
                max: 1
            };
            //===============================================================================================
            // Getting Started
            const embed = new Discord.MessageEmbed();
            message.channel.send("Trả lời `skip` hoặc `no` cho câu hỏi tiếp theo, Trả lời `cancel` để dừng lệnh.");
            
    
            //===============================================================================================
            // Getting Title
            message.channel.send("Vì vậy, bạn có muốn bản nhúng của mình có bất kỳ tiêu đề nào không?");
            let title = await message.channel.awaitMessages(filter, options);
            if (title.first().content == 'cancel') return message.channel.send('Máy phát điện nhúng đã bị hủy.')
            if (title.first().content !== 'skip' && title.first().content !== 'hủy bỏ') embed.setTitle(title.first().content);
    
            //===============================================================================================
            // Getting Description
            message.channel.send("tuyệt vời, bây giờ bạn muốn nhúng của bạn có bất kỳ Mô tả nào?");
            let Description = await message.channel.awaitMessages(filter, options);
            if (Description.first().content == 'cancel') return message.channel.send('Máy phát điện nhúng đã bị hủy.')
            if (Description.first().content !== 'skip' && Description.first().content !== 'hủy bỏ') embed.setDescription(Description.first().content);
    
            //===============================================================================================
            // Getting Footer
            message.channel.send("Vì vậy, bạn có muốn nhúng của bạn có bất kỳ Chân trang nào không? hoặc hủy bỏ");
            let Footer = await message.channel.awaitMessages(filter, options);
            if (Footer.first().content == 'cancel') return message.channel.send('Máy phát điện nhúng đã bị hủy. ')
            if (Footer.first().content !== 'skip' && Footer.first().content !== 'hủy bỏ') embed.setFooter(Footer.first().content); 
    
            //===============================================================================================
            // Getting URL
            
    
            //===============================================================================================
            // Getting Color
            message.channel.send("Vì vậy, bạn có muốn nhúng của bạn có bất kỳ màu cụ thể nào không? Mặc định là màu đen");
            let Color = await message.channel.awaitMessages(filter, options);
            if (Color.first().content == 'cancel') return message.channel.send('Máy phát điện nhúng đã bị hủy.')
            if (Color.first().content !== 'skip' && Color.first().content !== 'hủy bỏ') embed.setColor(Color.first().content.toUpperCase() || "2f3136")
    
            //===============================================================================================
            // Getting Author Field
            message.channel.send("Vì vậy, bạn có muốn nhúng của mình có bất kỳ Trường tác giả nào không?");
            let Author = await message.channel.awaitMessages(filter, options);
            if (Author.first().content == 'cancel') return message.channel.send('Máy phát điện nhúng đã bị hủy.')
            if (Author.first().content !== 'skip' && Author.first().content !== 'hủy bỏ') embed.setAuthor(Author.first().content);
    
            //===============================================================================================
            // Getting TimeStamp
            message.channel.send("Vì vậy, bạn có muốn nhúng của mình có TimeStamp? trả lời `yes` hoặc `no`");
            let TimeStamp = await message.channel.awaitMessages(filter, options);
            if (TimeStamp.first().content == 'cancel') return message.channel.send('Máy phát điện nhúng đã bị hủy.')
            if (TimeStamp.first().content !== 'yes') embed.setTimestamp();
    
            message.channel.send(embed)
        } catch (error) {
            console.error(error);
        }
    }
}