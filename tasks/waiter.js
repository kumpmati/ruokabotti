const cheerio = require('cheerio');
const rp = require('request-promise');
const config = require('./waiter_config.json');
const fs = require('fs');

module.exports = {
    annaRuoat() {
        this.paivitaRuoat();
        const text = fs.readFileSync(`${config.tiedosto}`, "utf-8");
        return JSON.parse(text);
    },
    paivitaRuoat() {
        console.log('haetaan päivän ruokia...');
        let lista = [];
        for(let ravintola of config.ravintolat) {
            lista.push(getFood(ravintola));
        }
        Promise.all(lista).then(values => {
            fs.writeFileSync(config.tiedosto, JSON.stringify(values, null, "\t"));
            console.log('ruoat päivitetty');
        }).catch(err => {
            console.log('virhe tapahtui päivittäessä ruokia');
        });
    }
};

function getFood(nimi) {
    return new Promise((resolve, reject) => {
        const options = {
            uri: `https://www.unica.fi/fi/ravintolat/${nimi}/`,
            transform: function(body) {
                return cheerio.load(body);
            }
        };
        let ruoat = {
            ravintola: nimi,
            ruoat: []
        };
        rp(options)
        .then($ => {
            let dayOfWeek = new Date().getDay()-1;
            let foodsOfTheDay = $('.menu-list').find('.accord')[dayOfWeek];
            $(foodsOfTheDay).find("table tbody").children().each((i, elem) => {
                 //skippistä mikäli kohde ei ole ruoka
                let item = $(elem).find(".lunch").text();
                if(item !== "") ruoat.ruoat.push(item);
            });
            resolve(ruoat);
        }).catch(err => reject(err.message));
    });
}