const pagination = require('discord.js-pagination');
const Discord = require('discord.js');

module.exports = {
    name: "help",
    description: "The help command, what do you expect?",

    async run (client, message, args){

        //Sort your commands into categories, and make seperate embeds for each category

        const moderation = new Discord.MessageEmbed()
        .setTitle('Moderation')
        .addField('`!kick`', 'Kicks a member from your server via mention or ID')
        .addField('`!ban`', 'Bans a member from your server via mention or ID')
        .addField('`!clear`', 'Purges messages')
         .addField('`!muted`', 'Server-mutes a user')
         .addField('`!vmute`', 'Server-vmute mutes a user')
         .addField('`!unmute`', 'Unmutes a user')
         .addField('`!unvmute`', 'unvmute a user')
         .addField('`!warn`', 'Warn a member')
        .addField('`!deletewarns`', 'Deletes a warning')
         .addField('`!unprison `', 'unprison a user')
        .addField('`!prison `', 'Server-prison  a user')
        .setTimestamp()

        const fun = new Discord.MessageEmbed()
        .setTitle('Fun')
        .addField('`!meme`', 'Generates a random meme')
        .addField('`!ascii`', 'Converts text into ascii')
         .addField('`!trigger`', 'Gave the image of the user')
        .setTimestamp()

        const utility = new Discord.MessageEmbed()
        .setTitle('Utlity')
        .addField('`!calculate`', 'undefined' )
        .addField('`!ping`', 'Get the bot\'s API ping')
        .addField('`!weather`', 'Checks weather forecast for provided location')
        .addField('`!covid`', 'Updates on the corona')
        .addField('`!h`', 'Mitzvah help')
          .addField('`!leaderboard`', 'Levels Leaderboard')
        .setTimestamp()
        
        const shop = new Discord.MessageEmbed()
        .setTitle('shop')
 .addField('`!buy`', 'To buy a roll from the store')
        .addField('`!daily`', 'Receive a daily gift every 24 hours')
         .addField('`!coins`', 'בשביל לראות כמה קויינס יש לכם')
        .addField('`!inventory `', 'What you have worn out')
          .setTimestamp()
        
         const giveaways= new Discord.MessageEmbed()
        .setTitle('giveaways')
         .addField('`!giveaway`', 'starts a giveaway (quick setup)')
          .addField('`!reroll`', ' re-rolls the specified or latest giveaway in the current channel')
         .setTimestamp()
        
             
         const Levels= new Discord.MessageEmbed()
        .setTitle('Levels')
         .addField('`!rank`')
          .addField('`!leaderboard`')
          .setTimestamp()
         
               const pages = [
                moderation,
                fun,
                utility,
                giveaways,
                shop,
               Levels,
        ]

        const emojiList = ["⏪", "⏩"];

        const timeout = '120000';

        pagination(message, pages, emojiList, timeout)
    }
}