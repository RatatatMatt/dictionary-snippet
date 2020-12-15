const Discord = require("discord.js");
const BotInfo = require("../package.json");

module.exports.run = async (bot, message, args, settings, usersettings) => {

    let invEmbed = new Discord.MessageEmbed()
    .setColor("F6A6FF")
    .setAuthor(`Invite ${bot.user.username}`, message.guild.iconURL)
    .setThumbnail(bot.user.displayAvatarURL)
    .setTimestamp()
    .setDescription(`To invite the bot, please [click here](https://ratatatmatt.com/invdictionary)\nFor other help, please [click here](https://discord.gg/KnkpV7z) and join the support server`)
    .setFooter(`${bot.user.username} v${BotInfo.version}`, bot.user.displayAvatarURL);

    message.channel.send(invEmbed);
}


module.exports.config = {
    name: "invite",
    aliases: ["inv"]
}