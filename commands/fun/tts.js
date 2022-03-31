const request = require("node-superfetch");

module.exports = {
  name: "tts",
        aliases: [''],
        category: "moderation",
        description: "Sets Custom Prefix",
        usage: "[prefix] tts",
        run: async (bot, message, args, ops) => {
    if (!args[0])
      return message.channel.send(
        "**Vui lòng nhập một cái gì đó để chuyển đổi thành giọng nói!**"
      );
    let text = args.join(" ");
    
    if (text.length > 1024)
      return message.channel.send(
        "**Vui lòng nhập văn bản từ 0 đến 1024 ký tự!**"
      );
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel)
      return message.channel.send("**Hãy tham gia một kênh Voice trước!**");
    if (
      !voiceChannel
        .permissionsFor(message.client.user)
        .has(["CONNECT", "SPEAK"])
    ) {
      return message.channel.send(
        "**Thiếu quyền đối với kênh Voice! - [CONNECT, SPEAK]**"
      );
    }
    
    if (bot.voice.connections.has(voiceChannel.guild.id))
      return message.channel.send("**Tôi đã chuyển đổi TTS!**");
    try {
      const connection = await voiceChannel.join();
      const { url } = await request
        .get("http://tts.cyzon.us/tts")
        .query({ text });
      const dispatcher = connection.play(url);
      await message.react("🔉");
      dispatcher.once("finish", () => voiceChannel.leave());
      dispatcher.once("error", () => voiceChannel.leave());
      return null;
    } catch (err) {
      voiceChannel.leave();
      console.log(err)
      return message.channel.send(
        `**Ồ không, đã xảy ra lỗi: Hãy thử lại sau!**`
      );
    }
  }
};