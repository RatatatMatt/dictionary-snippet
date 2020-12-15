module.exports = bot => {
    var d = new Date();
    var ctime = "[" + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + "]";
    bot.users.fetch("323504127449759746").then(matt => { 
        matt.send(`${bot.user.username} is online!`);
    });
    console.log(`${ctime} ${bot.user.username} is online!`);
    bot.user.setActivity("with words!", {type: "PLAYING"});
}