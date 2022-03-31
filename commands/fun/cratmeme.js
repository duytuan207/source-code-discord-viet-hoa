const Discord = module.require("discord.js");



module.exports = {
    name: "creatememe",
    category: "fun",
    description: "Create Custom Memes",
    run: async(client, message, args) => {
        message.delete();
        const memetemplate = args[0];
        if (!memetemplate) {
            return message.channel.send("Bạn đã không đề cập đến mẫu !. Để xem các mẫu meme có sẵn, hãy nhập `qmemetemp`");
        }
        const memetext1 = args[1];
        if (!memetext1) {
            return message.channel.send("Nhập văn bản sẽ được đặt ở trên cùng!");
        }
        const memetext2 = args[2];
        if (!memetext2) {
            return message.channel.send("Nhập văn bản sẽ được đặt ở dưới cùng!");
        }
        message.channel.send({ files: [{ attachment: `https://api.memegen.link/images/${memetemplate}/${memetext1}/${memetext2}`, name: "custommeme.png"}]})
    }, catch (error) {
        const errorlogs = client.channels.cache.get("834058624111345675") //Put ur channel id To see error log
        message.channel.send("Có vẻ như đã xảy ra lỗi !. Vui lòng thử lại sau vài giờ!")
        errorlogs.send("Lỗi trên lệnh Creatememe! \n\Lỗi:\n\n"+error);
    }
}