const Discord = require("discord.js");
const BotInfo = require("../package.json");

module.exports.run = async (bot, message, args, settings, usersettings) => {

    //Permission check
    if (!message.member.hasPermission('MANAGE_GUILD') && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You need to have the `MANAGE_GUILD` or `ADMINISTRATOR` permission to use this command!");

    //What setting they would like to change
    const setting = args[1];

    switch (setting) {
        case 'prefix': {
            const newSetting = args.slice(2).join(' ');
            if (!newSetting) {
                //If the new prefix is the bots tag, it gets formatted differently when telling the user the tag
                if (newSetting === `<@!${bot.user.id}>`) {
                    return message.channel.send(`The current prefix in ${message.guild.name} is: ${settings.prefix}`)
                } else {
                    return message.channel.send(`The current prefix in ${message.guild.name} is: \`${settings.prefix}\``)
                }
            }
            try {
                //Again, split up for formatting
                if (newSetting === `<@!${bot.user.id}>`) {
                    await bot.updateGuild(message.guild, { prefix: newSetting });
                    message.channel.send(`The prefix has successfully been updated to: ${newSetting}`);
                } else {
                    await bot.updateGuild(message.guild, { prefix: newSetting });
                    message.channel.send(`The prefix has successfully been updated to: \`${newSetting}\``);
                }
            } catch (error) {
                message.channel.send("**[ERR6]** An error occured when attempting to update the prefix");
                console.log(`CONFIG 34 - ${error}`);
            }
            break;
        }
        case 'autowotd': {
            //If no new setting is provided, the bot tells them the current setting
            if (!args[2]) return message.channel.send(`Autowotd is currently \`${settings.autowotd}\` in ${message.guild.name}`)
            const wotdSetting = args[2].toLowerCase();
            //Just changes enable to enabled and disable to disabled
            const wotdNewSetting = `${wotdSetting}d`
        
            switch (wotdSetting) {
                case 'enable': {
                    try {
                        await bot.updateGuild(message.guild, { autowotd: wotdNewSetting });
                        message.channel.send(`Autowotd has been \`${wotdNewSetting}\` for ${message.guild.name}`);
                    } catch (error) {
                        message.channel.send("**[ERR6]** An error occured when attempting to update the autowotd setting");
                        console.log(`CONFIG 52 - ${error}`);
                    }
                    break;
                }
                case 'disable': {
                    try {
                        await bot.updateGuild(message.guild, { autowotd: wotdNewSetting });
                        message.channel.send(`Autowotd has been \`${wotdNewSetting}\` for ${message.guild.name}`);
                    } catch (error) {
                        message.channel.send("**[ERR6]** An error occured when attempting to update the autowotd setting");
                        console.log(`CONFIG 62 - ${error}`);
                    }
                    break;
                }
                default: {
                    message.channel.send("**[ERR8]** Invalid edit!");
                    break;
                }
            }
            break;
        }
        case 'wotdchannel': {
            if (!args[2]) {
                if (settings.wotdChannelId === '') {
                    return message.channel.send(`There is no autowotd channel currently set for ${message.guild.name}`);
                } else {
                    return message.channel.send(`The current autowotd channel in ${message.guild.name} is: \`${bot.channels.cache.get(settings.wotdChannelId)}\``)
                }
            }
            try {
                let channelTag = message.mentions.channels.first();
                let channelId = channelTag.id;
                await bot.updateGuild(message.guild, { wotdChannelId: channelId });
                message.channel.send(`The autowotd channel has successfully been updated to: ${channelTag}`);
            } catch (error) {
                message.channel.send("**[ERR6]** An error occured when attempting to update the autowotd channel");
                console.log(`CONFIG 88 - ${error}`);
            }
            break;
        }
        case 'wotdtime': {
            if (!args[2]) {
                let dbTime = settings.wotdTime;
                var guildTime = [dbTime.slice(0, 2), ":", dbTime.slice(2)].join('');
                return message.channel.send(`The current autowotd time in ${message.guild.name} is: \`${guildTime}\` EST/EDT`)
            }
            try {
                let userTime = args[2];
                let timeCheck = userTime.replace(":", " ");
                let timeCheck2 = timeCheck[3] += timeCheck[4];
                let timeCheck3 = timeCheck[0] += timeCheck[1];
                let dbFormat = userTime.replace(":", "");
                //This limits the user's automatic word of the day time to being an interval of 15 minutes
                if (timeCheck2 === "00" || timeCheck2 === "15" || timeCheck2 === "30" || timeCheck2 === "45") {
                    //Makes sure it is a valid hour in 24 hour time
                    if (timeCheck3 >= 0 && timeCheck3 <= 23) {
                        await bot.updateGuild(message.guild, { wotdTime: dbFormat });
                        return message.channel.send(`The autowotd time has successfully been updated to: ${userTime}`);
                    } else {
                        return message.channel.send("**[ERROR]** You are either using an incorrect format (HH:mm) or the hour value is not between 0 and 23.");
                    }
                } else {
                    return message.channel.send("**[ERROR]** You are either using an incorrect format (HH:mm) or the minute value is not equal to 00, 15, 30, or 45.");
                }
            } catch (error) {
                message.channel.send("**[ERR6]** An error occured when attempting to update the autowotd time");
                console.log(`CONFIG 118 - ${error}`);
            }
            break;
        }
        default: {
            let configEmbed = new Discord.MessageEmbed()
            .setColor("F6A6FF")
            .setAuthor(`Config Help`, message.guild.iconURL)
            .setThumbnail(bot.user.displayAvatarURL)
            .setTimestamp()
            .setDescription("`config autowotd (enable/disable)` - Enables or disables automatic word of the day in your server\n`config prefix (new prefix)` - Sets a new prefix for your server\n`config wotdchannel (tag a channel)` - Sets the channel for automatic word of the day to show up in\n`config wotdtime (HH:mm)` - Sets a new autowotd time for your server (The minutes must be 00, 15, 30, or 45 and please note it is based off of U.S. Eastern time.")
            .setFooter(`${bot.user.username} v${BotInfo.version}`, bot.user.displayAvatarURL);
            message.channel.send(configEmbed)
            break;
        }
    }
}

module.exports.config = {
    name: "config",
    aliases: []
}