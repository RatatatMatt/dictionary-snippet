require ('dotenv-flow').config();

module.exports = {
    prefix: process.env.PREFIX,
    defaultSettings: {
        prefix: process.env.PREFIX,
        autowotd: "disabled",
        wotdChannelId: '',
        wotdTime: '0700'
    }
}