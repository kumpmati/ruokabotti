module.exports =
{
    name: "moi",
    args: false,
    cooldown: 2,
    description: "morjestaa takaisin",
    aliases: ["moro", "hei", "terve", "morjens", "wassup", "iltaa", "huomenta", "päivää", "aamuja", "iltoja"],
    execute(message, args)
    {
        let variations = [
            "MOIIIII! :yum:",
            "huomenta",
            "aamuja",
            "iltaa",
            "mitä ukkeli",
            "sup :sunglasses:",
            "terve vaan",
            "terve",
            "moro :raised_hand:",
            "hellurei",
            "new phone who dis",
            "juu sitä samaa :ok_hand:",
            "011011010110111101101001 :robot:",
            "olen robotti, en tarvitse sosiaalista vuorovaikutusta :robot:",
        ];

        let id = Math.round(Math.random() * Math.floor(variations.length-1));

        return message.reply(variations[id]);
    }
}