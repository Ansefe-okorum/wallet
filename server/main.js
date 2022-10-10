import { Meteor } from 'meteor/meteor';
import "../imports/api/Collections/ContactsCollection.js"  //Para que se cree la colección en mongo solo se necesita importar la base de datos
import "../imports/api/Methods/ContactsMethods.js"
import "../imports/api/Publications/ContactsPublications.js"
import "../imports/api/Collections/TransactionsCollection.js"
import "../imports/api/Collections/WalletsCollection.js"
import { WalletsCollection } from '../imports/api/Collections/WalletsCollection.js';
import "../imports/api/Publications/WalletsPublications.js"
import "../imports/api/Methods/TransactionsMethods.js"

Meteor.startup(() => {
  // If the wallet collections is empty, we create a new one.
  if(!WalletsCollection.find({}).count()){
    WalletsCollection.insert({
      balance: 0,
      currency: "USD",
      createdAt: new Date(),
    });
  }
});
