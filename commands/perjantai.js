module.exports =
{
    name: "perjantai",
    args: false,
    cooldown: 60,
    description: "kertoo onko perjantai",
    aliases: ["friday", "rilluntai", "pe"],
    execute(message, args)
    {
        var d = new Date();
        if(d.getDay() == 5)
        {
            return message.channel.send(message.author + " https://www.youtube.com/watch?v=76yIAQcmj9Y");
        }
        else
        {
            return message.channel.send(message.author + " nyt ei ole perjantai");
        }
    }
}