const Discord = require('discord.js')
const { parse } = require("twemoji-parser");
const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "add-these",
    category: "moderation",
    run: async (client, message, args) => {
        if (!message.member.hasPermission("MANAGE_EMOJIS")) {
return message.channel.send(`:x: | **Quyền lồn biên giới?!**`)
}
        const emojis = args.join(" ").match(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/gi)
        if (!emojis) return message.channel.send(`:x: | **Cung cấp các biểu tượng cảm xúc để thêm**`);
        emojis.forEach(emote => {
        let emoji = Discord.Util.parseEmoji(emote);
        if (emoji.id) {
      const Link = `https://cdn.discordapp.com/emojis/${emoji.id}.${
       emoji.animated ? "gif" : "png"
}`
            message.guild.emojis.create(
                `${Link}`,
                `${`${emoji.name}`}`
            ).then(em => message.channel.send(em.toString() + " added:>!")).catch(error => {
              message.channel.send(":x: | một lỗi xảy ra")
                console.log(error)
})
          
        }
        })
}
}