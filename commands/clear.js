module.exports = {
    name: "clear",
    description: "Clears messages",

    async run (client, message, args) {
  if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send("You don't have permission to run this command");
      
        const amount = args.join(" ");

        if(!amount) return message.reply('please provide an amount of messages for me to delete')

        if(amount > 100) return message.reply(`you cannot clear more than 100 messages at once`)

        if(amount < 1) return message.reply(`you need to delete at least one message`)
           await message.channel.bulkDelete(parseInt(args[0]), true)


    message.channel.send('Success!')

    }
}