const Discord = require("discord.js");
const BotInfo = require("../package.json");
const axios = require("axios");

module.exports.run = async (bot, message, args, settings, usersettings) => {

    let word = args[1];
    if (!word) return message.channel.send("**[ERR1]** Please provide a word for me to get the frequency of!");
    let msg = await message.channel.send("Searching...");

    async function getWordInfo(word) {
        axios({
            "method":"GET",
            "url":"https://twinword-word-graph-dictionary.p.rapidapi.com/difficulty/",
            "headers":{
            "content-type":"application/octet-stream",
            "x-rapidapi-host":"twinword-word-graph-dictionary.p.rapidapi.com",
            "x-rapidapi-key":"abcdefghijklmnopqrstuvwxyz0123456789",
            "useQueryString":true
            },"params":{
            "entry":word
            }
        })
        .then((response)=>{
            const data = response.data;
            if (!data)  {
                console.log(`${ctime} DIFFICULTY 27 - ${message.author} tried to get information about the word: ${word} and got rejected`);
                return msg.edit("**[ERR2]** There was an error gathering information about the word (or the word is invalid)! Please try again. If this problem persists, please join the support server!");
            }
            let wordDifficulty = data.ten_degree;
            if (!wordDifficulty) return msg.edit("**[ERR4]** There was an error gathering information about the word (or the word is invalid)! Please try again. If this problem persists, please join the support server!")

            setTimeout(sendEmbed, 250, wordDifficulty);
        })
        .catch((error)=>{
            console.log(`${ctime} DIFFICULTY 36 - ${message.author} tried to get information about the word: ${word} and got rejected: ${error}`);
            msg.edit("**[ERR3]** There was an error gathering information about the word (or the word is invalid)! Please try again. If this problem persists, please join the support server!");
        })
    }

    function sendEmbed(wordDifficulty) {

        let defEmbed = new Discord.MessageEmbed()
            .setColor("ACE7FF")
            .setAuthor(`Difficulty of the word: ${word}`)
            .setTimestamp()
            .setDescription(`On a scale of 1-10 (higher is more difficult), ${word} is a ${wordDifficulty}!`)
            .setFooter(`${bot.user.username} v${BotInfo.version}`, bot.user.displayAvatarURL);
        
            msg.delete();
            message.channel.send(defEmbed);
    }

    getWordInfo(word);
}


module.exports.config = {
    name: "difficulty",
    aliases: ["dif"]
}