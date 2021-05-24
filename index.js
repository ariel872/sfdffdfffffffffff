const Discord = require('discord.js');

const client = new Discord.Client();

const { token, default_prefix } = require('./config.json');

const { readdirSync } = require('fs');

const { join } = require('path');

const config = require('./config.json');
const welcome = require('./commands/Mod/welcome');
client.config = config;

const db = require('quick.db');



const { GiveawaysManager } = require('discord-giveaways');

client.giveawaysManager = new GiveawaysManager(client, {
    storage: "./giveaways.json",
    updateCountdownEvery: 5000,
    default: {
        botsCanWin: false,
        exemptPermissions: [],
        embedColor: "#FF0000",
        reaction: "🎉"
    }
});
// פרטי
client.commands = new Discord.Collection();
//You can change the prefix if you like. It doesn't have to be ! or ;
const commandFiles = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(join(__dirname, "commands", `${file}`));
    client.commands.set(command.name, command);
}


client.on("error", console.error);

client.on('ready', () => {
    console.log(`${client.user.username} ✅`)
    client.user.setActivity(` ${client.users.cache.size} users`);
});



let stats = {
    serverID: '<ID>',
    total: "<ID>",
    member: "<ID>",
    bots: "<ID>"
}



client.on('guildMemberAdd', member => {
    if (member.guild.id !== stats.serverID) return;
    client.channels.cache.get(stats.total).setName(`Total Users: ${member.guild.memberCount}`);
    client.channels.cache.get(stats.member).setName(`Members: ${member.guild.members.cache.filter(m => !m.user.bot).size}`);
    client.channels.cache.get(stats.bots).setName(`Bots: ${member.guild.members.cache.filter(m => m.user.bot).size}`);
})

client.on('guildMemberRemove', member => {
    if (member.guild.id !== stats.serverID) return;
    client.channels.cache.get(stats.total).setName(`Total Users: ${member.guild.memberCount}`);
    client.channels.cache.get(stats.member).setName(`Members: ${member.guild.members.cache.filter(m => !m.user.bot).size}`);
    client.channels.cache.get(stats.bots).setName(`Bots: ${member.guild.members.cache.filter(m => m.user.bot).size}`);


})

client.on("message", async message => {

    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;

    let prefix = await db.get(`prefix_${message.guild.id}`);
    if (prefix === null) prefix = default_prefix;

    const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);

    if(!prefixRegex.test(message.content)) return;

    const [, matchedPrefix] = message.content.match(prefixRegex);

    xp(message);
        const args = message.content.slice(matchedPrefix.length).trim().split(/ +/g);

        const command = args.shift().toLowerCase();

        if (!client.commands.has(command)) return;


        try {
            client.commands.get(command).run(client, message, args);

        } catch (error) {
            console.error(error);
        }
  
       
 function xp(message) {
//    if (!client.cooldown.has(`${message.author.id}`) || !(Date.now() - client.cooldown.get(`${message.author.id}`) > 15000)) {
        let xp = db.add(`xp_${message.author.id}`, 1);
        let level = Math.floor(0.3 * Math.sqrt(xp));
        let lvl = db.get(`level_${message.author.id}`) || db.set(`level_${message.author.id}`,1);;
        if (level > lvl) {
            let newLevel = db.set(`level_${message.author.id}`,level);
            message.channel.send(`GG ${message.author.toString()}, you just advanced to level **${newLevel}**!`);
        }
    //    client.cooldown.set(`${message.author.id}`, Date.now());
    }
}

)
client.on("message", async message => {
  if (message.content === "!welcome") {
    client.emit("guildMemberAdd", message.member);
  }
});
const { createCanvas, loadImage, registerFont } = require("canvas");

client.on("guildMemberAdd", async member => {
  let image = db.get(`bluebot_welcomeImage_${member.guild.id}`);

  if (!image) {
    let channel_id = db.get(`bluebot_welcomeChannel_${member.guild.id}`);
    let channel = member.guild.channels.cache.get(channel_id);
    if (channel === null || !channel) return;
    let tex = db.get(`bluebot_welcomeText_${member.guild.id}`);
    if (!tex)
      tex = `**Welcome To \`${member.guild.name}\`\nYou are \`${member.guild.memberCount}th\` member**`;
    let text = tex
      .replace("{server.name}", member.guild.name)
      .replace("{server.member.count}", member.guild.memberCount)
      .replace("{server.id}", member.guild.id)
      .replace(
        "{server.human.count}",
        member.guild.members.cache.filter(m => !m.user.bot).size
      )
      .replace(
        "{server.bot.count}",
        member.guild.members.cache.filter(m => m.user.bot).size
      )
      .replace("{member.name}", member.user.username)
      .replace("{member.mention}", member)
      .replace("{member.tag}", member.user.tag)
      .replace("{member.id}", member.user.id)
      .replace("{member.discriminstor}", member.user.discriminator);
    channel.send(text);
    }
   
  if (image) {
    let user_name =
      member.user.username.length > 9
        ? `${member.user.username.substring(0, 9)}...`
        : member.user.username;
    let guild_name =
      member.guild.name.length > 11
        ? `${member.guild.name.substring(0, 11)}...`
        : member.guild.name;
    let canvas = createCanvas(1024, 450);
    let ctx = canvas.getContext("2d");
    let background = await loadImage(
      "https://media.discordapp.net/attachments/740842537043886140/743030040991891476/welcome-image-blank.png?width=400&height=176"
    );
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.font = "65px abraham demo";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`Hello ${user_name}#${member.user.discriminator}!`, 350, 115);
    ctx.fillText(`Welcome to ${guild_name}`, 350, 245);
    ctx.fillText(`You are ${member.guild.memberCount}'th member`, 350, 370);

    ctx.font = "30px abraham demo";
    ctx.fillStyle = "#ccccff";
    ctx.fillText(` `, 157, 420);

    ctx.arc(180, 227, 135, 0, Math.PI * 2, true);
    ctx.lineWidth = 7;
    ctx.strokeStyle = "#3498db";
    ctx.stroke();
    ctx.closePath();
    ctx.clip();

    let avatar = await loadImage(
      member.user.displayAvatarURL({ format: "png" })
    );
    ctx.drawImage(avatar, 45, 93, 270, 270);
    let img = new Discord.MessageAttachment(canvas.toBuffer(), "welcome.png");

    let channel_id = db.get(`bluebot_welcomeChannel_${member.guild.id}`);
    let channel = member.guild.channels.cache.get(channel_id);
    if (channel === null || !channel) return;
    let tex = db.get(`bluebot_welcomeText_${member.guild.id}`);
    if (!tex)
      tex = `**Welcome To \`${member.guild.name}\`\nYou are \`${member.guild.memberCount}th\` member**`;
    let text = tex
      .replace("{server.name}", member.guild.name)
      .replace("{server.member.count}", member.guild.memberCount)
      .replace("{server.id}", member.guild.id)
      .replace(
        "{server.human.count}",
        member.guild.members.cache.filter(m => !m.user.bot).size
      )
      .replace(
        "{server.bot.count}",
        member.guild.members.cache.filter(m => m.user.bot).size
      )
      .replace("{member.name}", member.user.username)
      .replace("{member.mention}", member)
      .replace("{member.tag}", member.user.tag)
      .replace("{member.id}", member.user.id)
      .replace("{member.discriminstor}", member.user.discriminator);
    channel.send(text, img);
  }
const { Player } = require('discord-player');

client.player = new Player(client);
client.config = require('./config/bot');
client.emotes = client.config.emojis;
client.filters = client.config.filters;
client.commands = new discord.Collection();

fs.readdirSync('./commands').forEach(dirs => {
    const commands = fs.readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));

    for (const file of commands) {
        const command = require(`./commands/${dirs}/${file}`);
        console.log(`Loading command ${file}`);
        client.commands.set(command.name.toLowerCase(), command);
    };
});

const events = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
const player = fs.readdirSync('./player').filter(file => file.endsWith('.js'));

for (const file of events) {
    console.log(`Loading discord.js event ${file}`);
    const event = require(`./events/${file}`);
    client.on(file.split(".")[0], event.bind(null, client));
};

for (const file of player) {
    console.log(`Loading discord-player event ${file}`);
    const event = require(`./player/${file}`);
    client.player.on(file.split(".")[0], event.bind(null, client));
};
if (message.content.startsWith("https://")) {   ////חוסם קישורים
        if (message.member.hasPermission("ADMINISTRATOR")) return;
        message.delete().then(async msg => {
            msg.reply("לא לפרסם קישורים")
            if (!isInvite) {
            }
        })
    }
});
client.login(token);