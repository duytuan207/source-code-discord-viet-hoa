const Discord = module.require("discord.js");

module.exports = {
   name: "lock",
   description: "Locks a Channel",
   usage: "lock <channel>",
  args: true,
 category: "moderation",
   run: async(client, message, args) => {
   if (!message.member.hasPermission('MANAGE_SERVER', 'MANAGE_CHANNELS')) {
   return message.channel.send("Bạn không có đủ quyền, cút hộ bố mày cái địt con mẹ mày nít ranh ra chỗ khác chơi")
   }
   message.channel.overwritePermissions([
     {
        id: message.guild.id,
        deny : ['SEND_MESSAGES'],
     },
    ],);
   const embed = new Discord.MessageEmbed()
   .setTitle("Channel Updates")
   .setDescription(`🔒 ${message.channel} đã bị khóa`)
   .setColor("RANDOM");
   await message.channel.send(embed);
   message.delete();
}
}