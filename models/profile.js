const mongoose = require("mongoose");

const profileSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: String,
    userTag: String,
    lastMsgMs: {
        type: String,
        default: "0"
    }
});

module.exports = mongoose.model('Profile', profileSchema);