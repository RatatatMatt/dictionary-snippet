const Discord = require("discord.js");
const BotInfo = require("./package.json");
const fs = require("fs-extra");
require("dotenv-flow").config();
require("./util/eventHandler")(bot);

const config = {
    token: process.env.TOKEN,
    prefix: process.env.PREFIX
}

const bot = new Discord.Client({
    partials: ['MESSAGE', 'REACTION', 'CHANNEL']
});

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

bot.mongoose = require("./util/mongoose");
require('./util/functions')(bot);

//Mongoose configs & models
bot.guildconfig = require("./configs/guild");
bot.profileconfig = require("./configs/profile");
const { Guild, Profile } = require("./models");

fs.readdir("./commands", (err, files) => {
    if (err) return console.log(err);

    //Check for javascript files within commands folder
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if (jsfile.length <= 0) {
        return console.log(`Couldn't find any commands!`);
    }

    //Pull command names and aliases from each
    jsfile.forEach((f, i) => {
        let pull = require(`./commands/${f}`);
        bot.commands.set(pull.config.name, pull);
        pull.config.aliases.forEach(alias => {
            bot.aliases.set(alias, pull.config.name);
        });
    });
});

bot.on("message", async message => {
    if(message.author.bot|| message.channel.type === "dm") return;

    let args = message.content.split(" ");

    if (message.mentions.users.first() === bot.user && args.length == 1) {
        return message.channel.send(`My prefix in ${message.guild.name} is: \`${settings.prefix}\``);
    }

    if(!message.content.startsWith(settings.prefix)) return;

    let cmd = args[0].toLowerCase();
    let commandfile = bot.commands.get(cmd.slice(settings.prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(settings.prefix.length)));

    if(commandfile) commandfile.run(bot, message, args, settings, usersettings);
});

bot.on("guildCreate", async guild => {
    let joinEmbed = new Discord.MessageEmbed()
    .setColor("00FF00")
    .setAuthor(`New Server!`, guild.iconURL)
    .setThumbnail(bot.user.displayAvatarURL)
    .setTimestamp()
    .addField("**Guild Name:**", guild.name, false)
    .addField("**Guild ID:**", guild.id, false)
    .addField("**Guild Member Count:**", guild.memberCount, false)
    .addField("**Bot Guild Count:**", bot.guilds.cache.size)
    .setFooter(`${bot.user.username} v${BotInfo.version}`, bot.user.displayAvatarURL);
    bot.channels.cache.get("123456789123456789").send(joinEmbed);

    try {
        const newGuild = {
            guildID: guild.id,
            guildName: guild.name
        }

        await bot.createGuild(guild, newGuild);
    } catch (error) {
        console.log(error);
    }
});

bot.on("guildDelete", async guild => {
    let joinEmbed = new Discord.MessageEmbed()
    .setColor("FF0000")
    .setAuthor(`-1 Server!`, guild.iconURL)
    .setThumbnail(bot.user.displayAvatarURL)
    .setTimestamp()
    .addField("**Guild Name:**", guild.name, false)
    .addField("**Guild ID:**", guild.id, false)
    .addField("**Guild Member Count:**", guild.memberCount, false)
    .addField("**Bot Guild Count:**", bot.guilds.cache.size)
    .setFooter(`${bot.user.username} v${BotInfo.version}`, bot.user.displayAvatarURL);

    Guild.findOneAndDelete({ guildID: guild.id }, function (err) {
        if(err) {
            return console.log(err);
        } else {
            return console.log(`${guild.name} (${guild.id}) successfully deleted from Mongoose.`);
        }
    });

    bot.channels.cache.get("123456789123456789").send(joinEmbed);
});

bot.mongoose.init();
bot.login(config.token);