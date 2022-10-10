import { Meteor } from 'meteor/meteor';
import "../imports/api/ContactsCollection.js"  //Para que se cree la colección en mongo solo se necesita importar la base de datos
import "../imports/api/ContactsMethods.js"
import "../imports/api/ContactsPublications.js"
import "../imports/api/TransactionsCollection.js"
import "../imports/api/WalletsCollection.js"
import { WalletsCollection } from '../imports/api/WalletsCollection.js';
import "../imports/api/WalletsPublications.js"
import "../imports/api/TransactionsMethods.js"

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
