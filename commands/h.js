const Discord = require('discord.js');
const db = require('quick.db');
const ms = require('ms');

module.exports = {
    name: "h",
    description: "The help command, what do you expect?",

    async run (client, message, args) {
     /* let user = message.author;
        let timeout = 600000;
        let author = await db.fetch(`worked_${message.guild.id}_${user.id}`);
        
        if(author !== null && timeout - (Date.now() - author) > 0){
            let time = ms(timeout - (Date.now() - author));
            return message.channel.send(`You cannot work again for ${time.minutes}m and ${time.seconds}s`)
        } else {*/
 let cooldown = await db.fetch(
 `1cooldown_active.${message.guild.id}.${message.author.id}`
 );
 let cooldowns = 1000 * 60 * 1;
 if (cooldown !== null && cooldowns - (Date.now() - cooldown) > 0) {
 let timeObj = ms(cooldowns - (Date.now() - cooldown), { long: true });
 console.log(timeObj);
 // return message.reply(`**אתה צריך לחכות ${timeObj} כדי להשתמש בפקודה שוב**`);
 return message.reply(`**You have to wait ${timeObj} to use this command again**`);
 }
           var reason = args.join(" ");
           let channel = message.member.voice.channel || "לא נמצא בחדר"
  if(!reason) reason = "No Reason Given";
        const embed = new Discord.MessageEmbed()
        .addField("**__User__**:\n",` ${message.author} | צריך עזרה`)
        .addField("**__Voice__**:", channel)
        .addField("**__Roles Staff__**:\n", `<@&837383599145615431>`)
        .addField("**__Reason__**:\n", reason)
        .setColor(`#ffff00`)
        .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
        .setFooter(message.author.username + "#" + message.author.discriminator, message.author.avatarURL)
.setTimestamp(new Date())
        message.channel.send(`<@&837383599145615431>`).then(x => x.delete({ timeout: 30 }))
        message.channel.send(embed)
        db.set(
 `1cooldown_active.${message.guild.id}.${message.author.id}`,
 Date.now()
 );
        }
    }