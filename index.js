#!/usr/bin/env node
const graph = require('fbgraph');
const program = require('commander');

const accessToken = "1200736180061414|dcf887f6234d91b2dc85056fe3902694";
graph.setVersion("2.8");
graph.setAccessToken(accessToken);
let channel = "BFMTV"

// Configuration des paramètres attendus
program
.version('1.0.0')
.option('-c, --channel [channel]', 'Choisis un chaîne spécifique')
.option('-n, --number [number]', 'Sélectionne un nombre d\'article entre 1 et 25. Par défaut 5');



program.parse(process.argv)
// Maintenant on peut les utiliser
if (program.channel) {

  // trouve la page correspondante à ce qui est tapé
  if (/business/i.test(program.channel)) {
    channel = "BFMBusiness"
  } else if (/paris/i.test(program.channel)) {
    channel = "BFMParis"
  } else if (/politique/i.test(program.channel)) {
    channel = "bfmpolitique"
  } else if (/people/i.test(program.channel)) {
    channel = "BFMTVPeople"
  } else if (/sport/i.test(program.channel)) {
    channel = "BFMSport"
  } else if (/tech/i.test(program.channel)) {
    channel = "BFMTech"
  } else if (/auto/i.test(program.channel)) {
    channel = "BFMauto"
  } else if (/acad[ée]mie/i.test(program.channel)) {
    channel = "bfmacademie"
  }

  // Get sur l'api
  graph.get(channel + '/feed?fields=message,attachments', function(err, res) {
    
  if (program.number) {
    // Affiche un certaine nombre de news
    for (i in res.data.slice(0,program.number)) {
      console.log(i + " : " + res.data[i].attachments.data[0].title);
      console.log("")

    }    
  } else {
    // Affiche le nombre de news par défaut (5)
    for (i in res.data.slice(0,5)) {
      console.log(i + " : " + res.data[i].attachments.data[0].title + "\n");
    }
  }
});
} else {
program.help()
}
