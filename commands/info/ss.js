const { Message, MessageEmbed } = require("discord.js");
//const { Default_Prefix, Color } = require("../../config.js");
const Discord = require("discord.js");
//const db = require("wio.db");
const moment = require("moment");
const fetch = require("node-fetch");

const url = require("url");

module.exports = {
  name: "ss",
  aliases: ["screenshot"],
  category: "search",
  description: "Takes a screenshot of any webpage.",
  usage: "screenshot <URL>",
  run: async (client, message, args) => {
    if(!message.channel.nsfw) {
      return message.reply("Kênh này không hỗ trợ nội dung nsfw")
      
    } else {
    message.delete();
    const user = message.author.tag
    const urls = args[0];
    if (!urls)
      return message.channel
        .send(`\`\`\`\n${user},liên kết đâu -_\n\`\`\``)
        .then(m => m.delete({ timeout: 5000 }).catch(e => {}));
    if (urls.length < 8)
      return message
        .reply(
          "<a:failed:798526823976796161> https quá ngắn để tiếp cận - 8 limit"
        )
        .then(m => m.delete({ timeout: 9000 }).catch(e => {}));

    const site = /^(https?:\/\/)/i.test(urls) ? urls : `http://${urls}`;
    try {
      const { body } = await fetch(
        `https://image.thum.io/get/width/1920/crop/675/noanimate/${site}`
      );

      return message.channel.send(
        `\`\`\`\nĐây là ảnh chụp màn hình từ URL được yêu cầu\n\`\`\``,
        {
          files: [{ attachment: body, name: "Screenshot.png" }]
        }
      );
    } catch (err) {
      if (err.status === 404)
        return message.channel
          .send("Không thể tìm thấy bất kỳ kết quả nào. URL không hợp lệ?")
          .then(m => m.delete({ timeout: 14000 }).catch(e => {}));
      return message
        .reply(`Ồ không, đã xảy ra lỗi: \`${err.message}\`. Vui lòng thử lại sau!`)
        .then(m => m.delete({ timeout: 13000 }).catch(e => {}));
    }
  }}
};