import { Meteor } from "meteor/meteor";
import { ContactsCollection } from "../Collections/ContactsCollection";
import { check } from "meteor/check";

//Los métodos permiten modificar una base de datos, estos se encuentran del lado del servidor y son llamados desde el cliente
Meteor.methods({
  "insert.contact"({ name, email, url, walletId}) {
    if(!name || !walletId || !email || !url){
      throw new Meteor.Error("The fields can't be empty");  //El throw detiene la ejecución por lo tanto no interta el contacto en la colection
    }
    return ContactsCollection.insert({ name, email, url, walletId, createdAt: new Date()});
  },
  
  "remove.contact"({contactID}){
    return ContactsCollection.remove(contactID);
  }
});


