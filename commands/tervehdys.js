module.exports = {
    name: "tervehdys",
    args: false,
    cooldown: 10,
    description: "tervehtii kysyjää",
    aliases: ["hei", "moikkelis", "terve", "tervehdys"],
    execute(message, args) {
        let tervehdykset = [
            "moro",
            "mitä vittuu sä herätit mut",
            "kuis haisee",
            "ui juma"
        ];
        let i = Math.floor(Math.random()*tervehdykset.length);
        return message.reply(tervehdykset[i]);
    }
}