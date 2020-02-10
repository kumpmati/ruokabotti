const twister = require('../node_modules/mersenne-twister');

module.exports = {
    name: "flip",
    args: "optional",
    default: "heittää kolikkoa kerran",
    description: "heittää virtuaalista kolikkoa annetun määrän kertoja (max 100)",
    usage: "<määrä>",
    aliases: ["coinflip", "moonflip", "kolikonheitto"],
    cooldown: 1,
    execute(message, args)
    {
        var data = [];
        var flips = 1;

        const generator = new twister(Date.now());
        
        // if amount of throws is provided and it is a number
        
        if(!isNaN(args[0])) flips = args[0];
        // in case user wants too many coinflips
        if(flips > 20) return message.reply("heittojen enimmäismäärä kerralla on 20");

        data.push(`heitin virtuaalista kolikkoa **${flips}** kertaa:`);

            // generate randomized results
            for(let i=0;i<Math.floor(flips);i++)
            {

                let result = generator.random_int();

                //console.log(`flip ${i+1}: ${result.toFixed(2)}`);

                // heads
                if(result % 2 == 0)
                {
                    data.push(`heitto ${i+1}: :new_moon_with_face:`);
                }
                else
                // tails
                {
                    data.push(`heitto ${i+1}: :sun_with_face:`);
                }
            }

        return message.reply(data, {split: true});
    }
};