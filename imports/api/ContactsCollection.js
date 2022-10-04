import {Mongo} from "meteor/mongo"

export const ContactsCollection = new Mongo.Collection("Contacts")  //Aquí creamos una nueva colección llamada Contacts, pero se debe importar en la carpeta server