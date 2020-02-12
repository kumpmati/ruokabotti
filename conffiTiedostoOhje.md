# config.json:
## kansio: /
```json
{
    "prefix": "!",            //komennon etuliite, jolla botti hyväksyy viestin komentona
    "name": "ruokabotti",     //botin nimi
    "channel": "bot-commands" //tekstikanavan nimi, josta botti kuuntelee komentoja
}
```

# token.json
## kansio: /
```json
{
    "token": "ABCDEFGHIJKLM" //tähän tulee botin oma token, jonka discordin sivuilta https://discordapp.com/developers/applications
}
```

# waiter_config.json:
## kansio: /tasks/
tarvitaan, jotta tasks/waiter.js toimii
```json
{
  "ravintolat": [
      "assarin-ullakko",  //tähän taulukkoon kaikki ravintolan nimet joista botti hakee menut.
      "galilei",          //nimen täytyy olla samassa muodossa, jossa se ilmenee unican sivuilla:
      "brygge"            //esim: https://www.unica.fi/fi/ravintolat/**assarin-ullakko**/
  ],
  "tiedosto": "C:/Users/esimerkki/ruokabotti/tasks/paivanRuoat.json"  //täysi polku tiedostoon,
                                                                      //johon päivän ruoat tallennetaan ja josta ne haetaan
}
```
