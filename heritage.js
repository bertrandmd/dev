//héritage et extensions

//chargement de la closure compteur
var counter = require('./fun1')


var util = {}
util.uniq = function(a) {
    return a.sort().filter(function(item, pos, ary) {
        return !pos || item != ary[pos - 1];
    })
  }
util.describeObject = function(object){
  for (prop in object) {
    if(typeof object[prop] !== 'function'){
    var message = `${prop} : ${object[prop]}`
    object.hasOwnProperty(prop)?false:message+=" (prop héritée)";
    console.log(message);
    }
  }
}

var collectionLivre = []
collectionLivre.getListeAuteurs = function(){
  var liste = []
  for (var i = 0; i< collectionLivre.length ; i++){
    var livre = collectionLivre[i]
    liste.push(livre.author)
  }
  var liste2 = util.uniq(liste)
  return liste2.join(", ")
}
collectionLivre.getLivreParAuteur = function (auteur) {
  var reponse = ``
  for (ref in collectionLivre){
    var livre = collectionLivre[ref]
    if (livre.author === auteur){
      reponse+=`${livre.titre}\n`;
    }
  }
  if(reponse ==''){
    console.log(`Pas de livre de l'auteur ${auteur}`);
    console.log('essayez avec : ' + collectionLivre.getListeAuteurs() );
  }
  else { console.log(reponse.slice(0,-1));}
}

collectionLivre.getLivreParID = function (id) {
  for (var i = 0; i< collectionLivre.length ; i++){
    var livre = collectionLivre[i]
    if (livre.id === id){
      livre.describe()
    }
  }
}
collectionLivre.getIDListParAuteur = function (auteur) {
  var reponse = []
  for (ref in collectionLivre){
    var livre = collectionLivre[ref]
    if (livre.author === auteur){
      reponse.push(livre.id);
    }
  }
  if(reponse ==''){
    console.log(`Pas de livre de l'auteur ${auteur}`);
    console.log('essayez avec : ' + collectionLivre.getListeAuteurs() );
  }
  else {
    console.log(reponse.join(", "));
    return reponse
  }
}

collectionLivre.describeByIDList= function (element) {
    //console.log("a[" + index + "] = " + element);
    collectionLivre.getLivreParID(element)
}



var livre = {
  matiere : "papier",
  describe : function () {
    console.log("Ce livre, " + this.titre + ", a été écrit par " + this.author + " et est publié chez " + this.editor);
  },
  extend  : function (opt) {
    counter.increment()
    var id_num = counter.get()
    var nouveauLivre = Object.assign(Object.create(this),opt,{id : id_num} )
    collectionLivre.push(nouveauLivre)
    return nouveauLivre //si on veut recup la variable
  }
}


//creation d'un nouvel objet par héritage
var livreAncien = Object.assign(Object.create(livre),{age:'ancien'});
//méthodes propres à l'objet (surcharge la méthode de l'objet parent)
livreAncien.describe = function() {
  //console.log("Ce livre est "+ this.age + ", et a été écrit par " + this.author + " et est publié chez " + this.editor);
  console.log(`Ce livre, ${this.titre}, est un livre ${this.age}, et a été écrit par ${this.author} et est publié chez ${this.editor}`);
}

//creation d'un nouvel objet par héritage
var livreEnfant = Object.assign(Object.create(livre), {style : 'Pour les enfants'});

//creation d'un nouvel objet par héritage
var livreEnfantBD = Object.assign(Object.create(livreEnfant), {type : "BD"});

//data
var livreBMD = livre.extend({author:"bebs",editor:"leGaz", titre : "Ma vie, mon oeuvre"})
var marinChilien5 = livre.extend({author:"AMD",editor:"gallimard", titre : "un marin chilien"})
var bible2 = livreAncien.extend({author:"god",editor:"guttenberg",origin : "Allemagne", titre : "La Bible"})
var fables = livreAncien.extend({author:"La Fontaine",editor:"PUF", titre : "Les fables de la Fontaine"})
var these = livreAncien.extend({author:"AMD",editor:"Perso", titre : "Ma thèse"})
var agot = livre.extend({author:"GRR Martin",editor:"Tenebres", titre : "A Game of Thrones"})
var tchoupi = livreEnfant.extend({author:"Tchoupi's Father",editor:"Pom d'API", titre : "Tchoupi au cheval"})
var tchoupi2 = livreEnfant.extend({author:"Tchoupi's Father",editor:"Pom d'API", titre : "Tchoupi à la piscine"})
var tchoupi3 = livreEnfant.extend({author:"Tchoupi's Father",editor:"Pom d'API", titre : "Tchoupi fait la cuisine"})
var tintin = livreEnfantBD.extend({author:"Hergé",editor:"Dargaud", titre : "Tintin au Tibet"})


console.log(JSON.stringify(collectionLivre));


collectionLivre.getLivreParAuteur("AMD");
collectionLivre.getLivreParAuteur("VMD");
collectionLivre.getLivreParAuteur("GRR Martin");
collectionLivre.getLivreParAuteur("Tchoupi's Father");
collectionLivre.getIDListParAuteur("Tchoupi's Father").forEach(collectionLivre.describeByIDList);
collectionLivre.getLivreParID(6);

console.log(Object.keys(tchoupi3));
util.describeObject(tintin)
