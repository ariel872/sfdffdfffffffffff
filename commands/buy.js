const db = require('quick.db');
const Discord = require('discord.js');

module.exports = {
    name: "buy",
    description: "Buy an item from the store",

    async run (client, message, args) {
        let purchase = args[0];
        if(!purchase) return message.channel.send('Please provide an item to buy')
        let amount = await db.fetch(`money_${message.guild.id}_${message.author.id}`)

        if(purchase == '1'){
            if(amount < 500) return message.channel.send('You do not have enough money to buy this item. Please try another one');
            db.subtract(`money_${message.guild.id}_${message.author.id}`, 500);
               let role = message.guild.roles.cache.get("840249229459849216");
           message.member.roles.add(role);
            message.channel.send('Successfully bought the role ' + `${role}`)
        } 
      if(purchase == '2'){
            if(amount < 5000) return message.channel.send('You do not have enough money to buy this item. Please try another one');
            db.subtract(`money_${message.guild.id}_${message.author.id}`, 5000);
               let role = message.guild.roles.cache.get("840249331697057822");
           message.member.roles.add(role);
            message.channel.send('Successfully bought the role ' + `${role}`)
        }
        if(purchase == '3'){
            if(amount < 50000) return message.channel.send('You do not have enough money to buy this item. Please try another one');
            db.subtract(`money_${message.guild.id}_${message.author.id}`, 50000);
               let role = message.guild.roles.cache.get("840249432922128384");
           message.member.roles.add(role);
            message.channel.send('Successfully bought the role ' + `${role}`)
    }
      if(purchase == '4'){
            if(amount < 500001) return message.channel.send('You do not have enough money to buy this item. Please try another one');
            db.subtract(`money_${message.guild.id}_${message.author.id}`, 500001);
               let role = message.guild.roles.cache.get("840249526761553982");
           message.member.roles.add(role);
            message.channel.send('Successfully bought the role ' + `${role}`)
}
       if(purchase == '5'){
            if(amount < 500) return message.channel.send('You do not have enough money to buy this item. Please try another one');
            db.subtract(`money_${message.guild.id}_${message.author.id}`, 500);
               let role = message.guild.roles.cache.get("840249785394003988");
           message.member.roles.add(role);
            message.channel.send('Successfully bought the role ' + `${role}`)
 }
 }
   }