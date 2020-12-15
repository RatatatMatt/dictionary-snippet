const mongoose = require("mongoose");
const { defaultSettings: defaults } = require("../configs/guild");

const settingsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildID: String,
    guildName: String,
    prefix: {
        type: String,
        default: defaults.prefix
    },
    autowotd: {
        type: String,
        default: defaults.autowotd
    },
    wotdChannelId: {
        type: String,
        default: defaults.wotdChannelId
    },
    wotdTime: {
        type: String,
        default: defaults.wotdTime
    }
});

module.exports = mongoose.model('Settings', settingsSchema);