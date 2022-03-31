const Discord = module.require("discord.js");

module.exports = {
   name: "unlock",
   description: "Unlocks a Channel",
    usage: "unlock <channel>",
  args: true,
  category: "moderation",
    permissions: "MANAGE_CHANNELS",
   run: async(client, message, args) => {
   if (!message.member.hasPermission('MANAGE_SERVER', 'MANAGE_CHANNELS')) {
   return message.channel.send("Bạn không có đủ quyền")
   }
   message.channel.overwritePermissions([
     {
        id: message.guild.id,
        null : ['SEND_MESSAGES'],
     },
    ],);
   const embed = new Discord.MessageEmbed()
   .setTitle("Channel Updates")
   .setDescription(`🔓 ${message.channel}  đã được mở khóa`)
   .setColor("RANDOM");
   await message.channel.send(embed);
   message.delete();
}
}