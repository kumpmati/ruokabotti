module.exports =
{
    name: "roast",
    args: "optional",
    cooldown: 2,
    description: "roastaa pyydetyn henkilön",
    usage: "<henkilö>",
    aliases: ["bbq", "burn", "dissaa"],
    execute(message, args)
    {
        const variations = [
            "on iha vitu manne",
            "tykkää syödä hiekkaa",
            "ei oo kiva ihminen",
            "pelaa angry birdsiä",
            "käyttää ajohanskoja priuksessa",
            "käyttää ventriloa"
        ];

        let user;
        //ota uusi variaatio joka kerta
        let roast_variation = variations[Math.floor(Math.random() * Math.floor(variations.length-1))];

        if(!args.length)
        {
            // roast person who requested
            user = message.author;
        }
        else
        {
            if(args[0] == "matsku-bot" || args[0] == "me")
            {
                user = message.author;
            }
            else
            {
                // roast the requested user
                user = args[0];
            }
        }
        return message.channel.send(user + " " + roast_variation);
    },
    
};