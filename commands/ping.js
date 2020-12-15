module.exports.run = async (bot, message, args, settings, usersettings) => {
    
    const msg = await message.channel.send(`Pinging...`);
    msg.edit(`Pong!\nBot Latency: ${Math.floor(msg.createdAt - message.createdAt)}ms\nAPI Latency: ${Math.round(bot.ws.ping)}ms`);

}

module.exports.config = {
    name: "ping",
    aliases: []
}