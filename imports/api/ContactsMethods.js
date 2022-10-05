import { Meteor } from "meteor/meteor";
import { ContactsCollection } from "./ContactsCollection";
import { check } from "meteor/check";

Meteor.methods({
  "insert.contact"({ name, email, url }) {
    if(!name){
      throw new Meteor.Error("Invalid Name");  //El throw detiene la ejecución por lo tanto no interta el contacto en la colection
    }
    return ContactsCollection.insert({ name, email, url, createdAt: new Date()});
  },
  "remove.contact"({contactID}){
    check(contactID, String);
    return ContactsCollection.remove(contactID);
  }
});
