#!/usr/bin/env node
const graph = require('fbgraph');
const program = require('commander');
const fs = require('fs')
const db = require('./db/db')
const News = require('./models/news')

const accessToken = "222796451636036|ec96e17b691244d34ac2d2164e87c05b";
graph.setVersion("2.8");
graph.setAccessToken(accessToken);
let channel = "BFMTV"

// Configuration des paramètres attendus
program
.version('1.0.0')
.option('-c, --channel [channel]', 'Choisis un chaîne spécifique')
.option('-n, --number [number]', 'Sélectionne un nombre d\'article entre 1 et 25. Par défaut 5')
.option('-w, --watch', 'Montre la liste des chaînes disponibles')
.option('-d --date', 'Affiche la date de l\'article')
.option('-a --add', 'Ajoute à la base de donnée')
.option('-cl --clean', 'Vide la base de donnée');



program.parse(process.argv)
// Maintenant on peut les utiliser
if (program.channel) {

  // Trouve la page correspondante à ce qui est tapé
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
  graph.get(channel + '/feed?fields=created_time,message,attachments', function(err, res) {
    
  if (program.number) {
    // Affiche un certaine nombre de news
    for (i in res.data.slice(0,program.number)) {
      if (program.date) {
        order = res.data[i].created_time;
      } else {
        order = i
      }
      console.log(order + " : " + res.data[i].attachments.data[0].title + "\n");
      if (program.add) {
    News.create( {
      id: order,
      title: res.data[i].attachments.data[0].title
    })
  }
    }    
  } else {
    // Affiche le nombre de news par défaut (5)
    for (i in res.data.slice(0,5)) {
      if (program.date) {
        order = res.data[i].created_time;
      } else {
        order = i
      }
      console.log(order + " : " + res.data[i].attachments.data[0].title + "\n");
      if (program.add) {
    News.create( {
      id: order,
      title: res.data[i].attachments.data[0].title
    })
  }
    }
  }


});
} else if (program.watch) {
  var list = JSON.parse(fs.readFileSync('./channels.json'))
  for (i in list.slice(0,9)) {
    console.log(i + ' : ' + list[i].channel)
  }
} else if (program.clear) {
  db.query('DROP TABLE news')
} else {
program.help();
}