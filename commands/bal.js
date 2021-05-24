const db = require('quick.db');
const Discord = require('discord.js');

module.exports = {
    name: "coins",
    description: "coins",

    async run (client, message, args) {

        let user = message.mentions.users.first() || message.author;

        let bal = await db.fetch(`money_${message.guild.id}_${user.id}`);
        if(bal === null) bal = 0;

      message.channel.send(new Discord.MessageEmbed().setTitle("coins").setDescription(`${user} currently has ${bal} coins` ).setColor("00ff00"))
    }
}
