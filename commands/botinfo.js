const Discord = require("discord.js");
const BotInfo = require("../package.json");

module.exports.run = async (bot, message, args, settings, usersettings) => {

    function duration(ms) {
        const sec = Math.floor((ms / 1000) % 60).toString();
        const min = Math.floor((ms / (1000 * 60)) % 60).toString();
        const hrs = Math.floor((ms / (1000 * 60 * 60)) % 24).toString();
        const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString();
        return `${days.padStart(1, '0')} day(s), ${hrs.padStart(1, '0')} hour(s), ${min.padStart(1, '0')} minute(s), and ${sec.padStart(1, '0')} second(s).`
    }

    async function sendBinfo() {
        let infoEmbed = new Discord.MessageEmbed()
            .setAuthor(`Dictionary Info!`, bot.user.displayAvatarURL)
            .addField("**Guilds:**", bot.guilds.cache.size, true)
            .addField("**Version:**", BotInfo.version, true)
            .addField("**Prefix:**", settings.prefix, true)
            .addField("**Uptime:**", duration(bot.uptime), false)
            .addField("**Dictionary Invite Link**", "[Click Here!](https://ratatatmatt.com/invdictionary)", false)
            .addField("**Support Server Invite Link**", "[Click Here!](https://discord.gg/KnkpV7z)", true)
            .setTimestamp()
            .setColor("B28DFF")
            .setFooter(`${bot.user.username} v${BotInfo.version}`);

        message.channel.send(infoEmbed);
    }

    sendBinfo();
}

module.exports.config = {
    name: "botinfo",
    aliases: [ 'binfo' ]
}