const mongoose = require("mongoose");
const { Guild, Profile } = require("../models");

module.exports = bot => {
    bot.getGuild = async guild => {
        let data = await Guild.findOne({ guildID: guild.id });
        if (data) return data;
        else return;
    };

    bot.updateGuild = async (guild, settings) => {
        let data = await bot.getGuild(guild);

        if (typeof data !== 'object') data = {};
        for (const key in settings) {
            if (settings.hasOwnProperty(key)) {
                if (data[key] !== settings[key]) data[key] = settings[key];
                else return;
            }
        }

        console.log(`Guild ${data.guildName} (${data.guildID}) updated settings ${Object.keys(settings)}`);
        return await data.updateOne(settings);
    };

    bot.createGuild = async (guild, settings) => {
        let data = await bot.getGuild(guild);
        if (data) return;
        let merged = Object.assign({ _id: mongoose.Types.ObjectId() }, settings);

        const newGuild = await new Guild(merged);
        return newGuild.save()
            .then(g => {
                console.log(`Default settings saved for guild ${g.guildName} (${g.guildID})`);
            })
    };

    bot.createProfile = async (user, profile) => {
        let data = await bot.getProfile(user);
        if (data) return;
        let merged = Object.assign({ _id: mongoose.Types.ObjectId() }, profile);

        const newProfile = await new Profile(merged);
        return newProfile.save()
            .then(u => {
                console.log(`Default settings saved for user ${u.userTag} (${u.userID})`);
            })
    };

    bot.getProfile = async user => {
        let data = await Profile.findOne({ userID: user.id });
        if (data) return data;
        else return;
    };

    bot.updateProfile = async (user, data) => {
        let profile = await bot.getProfile(user);

        if (typeof profile !== 'object') profile = {};
        for (const key in data) {
            if (profile[key] !== data[key]) profile[key] = data[key];
            else return;
        }

        console.log(`User ${profile.userTag} (${profile.userID}) updated settings ${Object.keys(data)}`);
        return await profile.updateOne(profile);
    };
};