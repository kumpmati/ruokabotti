const ruokaJono = require("../tasks/waiter.js");
const d = new Date();

module.exports = {
    name: "ruokaa",
    args: false,
    cooldown: 60,
    description:
        "näyttää päivän ruokalistan assarilta, galileista ja/tai bryggestä",
    aliases: ["ruoat", "ruoka", "nälkä", "ruokaaaaaaaaaaa"],
    execute(message, args) {
        const lista = ruokaJono.annaRuoat();

        if (
            lista[0].pvm !==
            `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`
        ) {
            ruokaJono.paivitaRuoat();
        }

        let responseBody = `\n__**Päivän ruokalista:**__ (${lista[0].pvm})\n`;
        for (let paikka of lista) {
            responseBody += `\n**${paikka.ravintola}**\n`;
            paikka.ruoat = paikka.ruoat.filter(value => value !== ""); //tyhjennä tyhjät
            for (let i = 0; i < paikka.ruoat.length; i++) {
                responseBody += `> ${i + 1}. ${paikka.ruoat[i]}\n`;
            }
            responseBody += "\n";
        }

        return message.reply(responseBody);
    }
};
