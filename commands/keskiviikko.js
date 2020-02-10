module.exports =
{
    name: "keskiviikko",
    args: false,
    cooldown: 60,
    description: "kertoo onko keskiviikko",
    aliases: ["wednesday", "ke"],
    execute(message, args)
    {
        var d = new Date();
        if(d.getDay() == 3)
        {
            return message.channel.send(message.author + " se on keskiviikko ukkelini");
        }
        else
        {
            return message.channel.send(message.author + " nyt ei ole keskiviikko");
        }
    }
}