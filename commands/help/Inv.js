
const discord = require('discord.js'); //Define the discord.js module
const client = new discord.Client(); //Creating discord.js client (constructor)
require('discord-buttons')(client);
module.exports = {
  name: "inv",
  description: "a cool invite bot Commnd ",
  category: "info",
 // users will need premium to execute this
  run: async (bot, message, args) => {

        
     message.buttons('Mời tôi', {
            buttons: [
                {
                    style: 'green',
                    label: 'Bấm để hoạt động!',
                    id: 'funfaction_error'
                },
                {
                    style: 'url',
                    label: 'Link mời bot, xin cảm ơn!',
                    url:'https://discord.com/api/oauth2/authorize?client_id=900708170060693515&permissions=8&scope=bot'
                }
            ]
        })
  }}