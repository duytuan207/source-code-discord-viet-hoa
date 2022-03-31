const Color = "RANDOM";
const Discord = require("discord.js");

module.exports = {
  name: "smartcat",
  aliases: ["laughingcat", "sc"],
  category: "Image",
  description: "Return A Smart Cat Image!",
  usage: "Smartcat <Mention Or ID>",
  run: async (client, message, args) => {
    
    const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!Member) return message.channel.send("Vui lòng đề cập hoặc cung cấp ID của một thành viên!")

    const Embed = new Discord.MessageEmbed()
    .setColor(Color)
    .setImage(encodeURI(`https://vacefron.nl/api/womanyellingatcat?woman=${Member.user.displayAvatarURL({ format: "png" })}&cat=${message.author.avatarURL({ format: "png" })}`))
    .setTimestamp();

    return message.channel.send(Embed);
  }
};
