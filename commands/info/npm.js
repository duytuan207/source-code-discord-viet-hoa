const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const moment = require("moment");
module.exports = {
  name: "npm",
  description: "Check for packages on npm!",
  category: "search",
  run: async (client, message, args) => {
    let query = args.join(' ');
    if (!query) query = await awaitMessages(message);
    if (!query) return;
    const res = await fetch(`https://registry.npmjs.com/${encodeURIComponent(query)}`).catch(err => console.log(err));
    if (res.status === 404) return message.channel.send('Không tìm thấy kết quả tìm kiếm nào, có thể thử tìm kiếm thứ gì đó tồn tại.');
    const body = await res.json();
    const embed = new MessageEmbed()
        .setColor(0xde2c2c)
        .setTitle(body.name)
        .setURL(`https://www.npmjs.com/package/${body.name}`)
        .setDescription(body.description || 'No description.')
        .addField('❯ Version', body['dist-tags'].latest, true)
        .addField('❯ License', body.license || 'None', true)
        .addField('❯ Author', body.author ? body.author.name : '???', true)
        .addField('❯ Creation Date', moment.utc(body.time.created).format('YYYY/MM/DD hh:mm:ss'), true)
        .addField('❯ Modification Date', body.time.modified ? moment.utc(body.time.modified).format('YYYY/MM/DD hh:mm:ss') : 'None', true)
        .addField('❯ Repository', body.repository ? `[View Here](${body.repository.url.split('+')[1]})` : 'None', true)
        .addField('❯ Maintainers', body.maintainers.map(user => user.name).join(', '))
    message.channel.send(embed);


   async function awaitMessages(message) {
    let responce;

    const filter = (user) => {
        return user.author.id === message.author.id;
    };

    message.channel.send('**Bạn muốn tìm kiếm cái gì?** \nKiểu `cancel` để hủy bỏ lệnh.');

    await message.channel.awaitMessages(filter, { max: 1, time: 120000, errors: ['time'] })
        .then((msg) => {
            const firstMsg = msg.first();
            if (firstMsg.content.toLowerCase() === 'hủy bỏ') return firstMsg.react('👍');
            responce = firstMsg.content;
        })
        .catch(() => {
            message.channel.send('Hoan hô .. bạn đã mất quá nhiều thời gian, đang hủy lệnh.');
        });

    return responce;
   }
  },
};