const discord_akairo_1 = require("discord-akairo");
const Discord = require('discord.js')
const db = require("quick.db")
module.exports = {
    name: 'hack',
    category: 'fun',
    
run: async (client, message, args) => {
    
       


       const user = await message.mentions.users.first()
        if(!user) return message.channel.send("Woaaah chậm lại, chúng ta đang hack ai vậy? Nó phải là một thành viên không phải là vai trò.")
        

        message.channel.send(`Hacking @${user.username} bây giờ...`)
        .then((msg) => {
            setTimeout(function() {
            msg.edit(`[▝]Tìm địa chỉ IP`);
          }, 1500)
            setTimeout(function() {
            msg.edit(`[▗] **ĐỊA CHỈ IP** : 127.0.0.1:2643`);
          }, 3000)
          setTimeout(function() {
            msg.edit(`[▖] Bán dữ liệu cho Khoadeptry...`);
          }, 4500)
          setTimeout(function() {
            msg.edit(`[▘] Báo cáo tài khoản bất hòa vì vi phạm TOS...`);
          }, 6000)
          setTimeout(function() {
            msg.edit(`[▝] Tìm địa chỉ email...`);
          }, 7500)
          setTimeout(function() {
            msg.edit(`[▗] **Địa chỉ email** : ${user.username}@gmail.com`);
          }, 9000)
          setTimeout(function() {
            msg.edit(`[▖] Lấy cắp tài khoản trò chơi sử thi...`);
          },  10500)
          setTimeout(function() {
            msg.edit(`[▘] Lấy cắp hồ sơ y tế...`);
          },  12000)
         setTimeout(function() {
            msg.edit(`Hack thành công @${user.username}`);
         }, 13500)
         setTimeout(function() {
            message.channel.send('The *totally* `real` and `dangerous` hack is complete')
         }, 15000)
         });

    }
   
}