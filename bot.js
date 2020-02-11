const express = require("express");
const app = express();

const fs = require("fs");

const Discord = require("discord.js");
const client = new Discord.Client();
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();

// scan commands folder for all available commands
const commandFiles = fs
    .readdirSync("./commands")
    .filter(file => file.endsWith(".js"));

//iterate through found command files
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    // set a new item in the Collection
    // with the key as the command name and the value as the exported module
    client.commands.set(command.name, command);
}

//configs
const package = require("./package.json");
const { prefix, name, channel } = require("./config.json");
const { token } = require("./token.json");

console.log("bot loaded");

// triggered when bot:
//  -logs in
//  -reconnects after disconnecting
client.on("ready", () => {
    console.log(name + " is now logged in");
});

client.login(token);
app.listen(process.env.PORT);

// triggered when bot receives message
client.on("message", message => {
    //ignore messages on other channels
    if (message.channel.name !== channel) return;
    // ignore non-commands and own messages
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    console.log(`${message.author.username}:${message.content}`);

    // get arguments and command name from message
    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    // check for command name in commands list, including aliases
    const command =
        client.commands.get(commandName) ||
        client.commands.find(
            cmd => cmd.aliases && cmd.aliases.includes(commandName)
        );

    if (!command) return;

    // if command requires args but none are provided
    if (command.args == true && !args.length) {
        let reply = `Tämä komento vaatii argumentteja, ${message.author}`;
        if (command.usage) {
            reply += `\nKomennon oikea käyttö on: \`${prefix}${command.name} ${command.usage}\``;
        }
        return message.channel.send(reply);
    }

    // COOLDOWNS
    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    // get current time and cooldown amount
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    // check if collection has the cooldown for the message author
    if (!timestamps.has(message.author.id)) {
        timestamps.set(message.author.id, now);
        // delete cooldown
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    } else {
        // get the time when the author can use the command again
        const expirationTime =
            timestamps.get(message.author.id) + cooldownAmount;

        // check if there is still time left until cooldown is ended
        if (now < expirationTime) {
            // calculate the time left until cooldown is ended
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(
                `odota ${timeLeft.toFixed(
                    0
                )} sekuntia ennen kuin käytät komentoa \`${
                    command.name
                }\` uudelleen.`
            );
        }

        // add author id to timestamp list with the current time
        timestamps.set(message.author.id, now);
        // delete timestamp from list when cooldown has ended
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    }

    // try executing the command provided
    try {
        command.execute(message, args);
    } catch (error) {
        // catch errors when executing the command
        console.error(error);
        message.reply("jotain meni pieleen.");
    }
    console.log(message.author.username + ": " + message.content);
});
