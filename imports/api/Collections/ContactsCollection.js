import {Mongo} from "meteor/mongo";
import { WalletsCollection } from "./WalletsCollection";
import SimpleSchema from "simpl-schema";

export const ContactsCollection = new Mongo.Collection("Contacts"); //Aquí creamos una nueva colección llamada Contacts, pero se debe importar en la carpeta server

//antes de añadir el usuario a la lista de contactos, lo añade a la colección de wallets con los datos que ingresó en el formulario
ContactsCollection.before.insert(function(id, doc){
    WalletsCollection.insert({
        walletId: doc.walletId,
        balance: 0,
        currency: "USD",
        createdAt: new Date()
    });
});

const ContactSchema = new SimpleSchema({
    name:{
        type: String
    },
    email:{
        type: String
    },
    url:{
        type: String
    },
    walletId:{
      type: String
    },
    createdAt:{
        type: Date
    }
  });
  
  //aldee:collection2 permite utilizar attatchSchema para hacer "clean" y "validation" de la información automáticamente.
  
  ContactsCollection.attachSchema(ContactSchema);