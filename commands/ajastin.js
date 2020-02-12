module.exports =
{
    name: "ajastin",
    args: "optional",
    default: "asettaa ajastimen 30 sekunniksi",
    cooldown: 10,
    usage: '<aika> <s, m>',
    description: "asettaa ajastimen käyttäen joko sekunteja tai minuutteja, maksimiaika 60 min",
    aliases: ["timer", "aj"],
    execute(message, args) {

        let time = 30;
        let mult = 1;

        // jos käyttäjä antaa argumentteja
        if (args.length > 0) {
            // aika on käyttäjän antama aika oletuksella sekunteina
            time = args[0];

            if (time < 10 && args.length == 1) {
                message.reply("minimiaika on 10 sekuntia");
                return;
            }

            // jos käyttäjä antaa sekä ajan että ajan muodon
            if (args.length == 2) {
                // minutes
                if (args[1] == "min" || args[1] == "m") {
                    if (args[0] <= 60) mult = 60;
                }

                // seconds
                else if (args[1] == "sek" || args[1] == "s") mult = 1;
            }
        }

        if (mult == 1) {
            message.reply(`ajastin ${Math.round(time * mult)} sekunnille alkaa nyt!`);
        }
        else {
            message.reply(`ajastin ${time} minuutille alkaa nyt!`);
        }

        time = Math.round(time *= mult);

        setTimeout(() => {
            return message.reply("ding ding ding", { tts: true });
        }, time * 1000);
    }
};