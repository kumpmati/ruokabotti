const ruokaJono = require("../tasks/waiter.js");
const d = new Date();

module.exports = {
    name: "ruokalista",
    args: false,
    cooldown: 20,
    description:
        "näyttää päivän ruokalistan assarilta, galileista ja/tai bryggestä",
    aliases: ["rl", "ruokalista", "ruokalistat", "ruoat", "ruoka", "nälkä", "ruokaaaaaaaaaaa"],
    execute(message, args) {
        const data = ruokaJono.annaRuoat();
        let currentDate = `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;
        if (lista[0].pvm !== currentDate) {
            ruokaJono.paivitaRuoat();
        }

        let responseBody = `\n__**Päivän ruokalista:**__ (${lista[0].pvm})\n`;
        for (let item of data) {
            responseBody += `\n**${item.ravintola}**\n`;
            item.ruoat = item.ruoat.filter(value => value !== ""); //tyhjennä tyhjät
            for (let i = 0; i < item.ruoat.length; i++) {
                responseBody += `> ${i + 1}. ${item.ruoat[i]}\n`;
            }
            responseBody += "\n";
        }
        return message.reply(responseBody);
    }
};