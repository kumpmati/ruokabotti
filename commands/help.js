const { prefix } = require('../config.json');

module.exports = {
    name: "help",
    args: false,
    cooldown: 2,
    description: "näytä kaikki botin komennot, tai näytä tietoa tietystä komennosta",
    usage: "<komento>",
    aliases: ["apua", "jeesiä", "help", "h"],
    execute(message, args) {
        const data = [];
        const { commands } = message.client;

        // if user wants all available commands
        if(!args.length) {
            // list all available commands
            data.push("**Tässä ovat kaikki komennot, joita on tarjolla**");
            data.push(commands.map(command => `\`!${command.name}\``).join("\n"));
            data.push(`\n Voit saada tietoa yksittäisistä komennoista kirjoittamalla \`${prefix}help <komento>\``);

            return message.author.send(data, {split: true})
                .then( () => {
                    if (message.channel.type === 'dm') return;
                    message.reply('Lähetin viestin kaikista komennoista yksityisviestillä :wink:');
                })
                .catch(error => {
                    console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
                    message.reply('Näyttää siltä etten pysty lähettämään sinulle yksityisviestiä. Tarkista että olet sallinut yksityisviestit.');
                });

        }
        else {
            // SINGLE COMMAND INFO

            // find command in command list
            const name = args[0].toLowerCase();
            const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

            // if command is not found, then send a reply
            if(!command) {
                return message.reply("en löydä tuota komentoa listasta.");
            }

            // get command info
            data.push(`**__Komennon nimi__**: ${command.name}`);

            if(command.aliases) data.push(`**Aliakset**: ${command.aliases.join(', ')}`);
            if(command.description) data.push(`**Kuvaus**: ${command.description}`);
            if(command.usage) data.push(`**Käyttö**: \`${prefix}${command.name} ${command.usage}\``);
            if(command.default) data.push(`**Oletus**: ${command.default}`);

            data.push(`**viilennysaika**: ${command.cooldown || 3} sekuntia`);

            message.author.send(data, {split: true});
        }
    }
}