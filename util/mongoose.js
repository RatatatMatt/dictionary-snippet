const mongoose = require("mongoose");

module.exports = {
    init: () => {
        //My preferred database connection options
        const dbOptions = {
            useNewUrlParser: true,
            autoIndex: false,
            reconnectTries: Number.MAX_VALUE,
            reconnectInterval: 500,
            poolSize: 5,
            connectTimeoutMS: 10000,
            family: 4
        };

        mongoose.connect("mongodb://username:password@mydatabasevps:port/dictionary?authSource=admin", dbOptions);
        mongoose.set(`useFindAndModify`, false);
        mongoose.Promise = global.Promise;

        mongoose.connection.on(`connected`, () => {
            var d = new Date();
            var ctime = "[" + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + "]";
            console.log(`${ctime} Mongoose Connection Successful!`);
        });

        mongoose.connection.on(`err`, err => {
            var d = new Date();
            var ctime = "[" + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + "]";
            console.log(`${ctime} Mongoose Error: \n${err.stack}`);
        });

        mongoose.connection.on(`disconnected`, () => {
            var d = new Date();
            var ctime = "[" + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + "]";
            console.log(`${ctime} Mongoose Disconnected!`);
        });
    }
}