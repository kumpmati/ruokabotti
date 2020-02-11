const ruokaJono = require('../tasks/waiter.js');

module.exports =
{
    name: "ruokaa",
    args: false,
    cooldown: 60,
    description: "näyttää päivän ruokalistan assarilta, galileista ja/tai bryggestä",
    aliases: ["ruoat", "ruoka","nälkä", "ruokaaaaaaaaaaa"],
    execute(message, args) {
        const l = ruokaJono.annaRuoat();
        
        let responseBody = "\n__**Päivän ruokalista:**__\n\n";
        for(let i of l) {
            responseBody += `\n*${i.ravintola}*\n`;
            responseBody += "```";
            for(let ruoka of i.ruoat) {
                responseBody += `${ruoka}\n`;
            }
            responseBody += "```";
        }

        return message.reply(responseBody);
    }
};