import { Meteor } from 'meteor/meteor';
import "../imports/api/ContactsCollection.js"  //Para que se cree la colección en mongo solo se necesita importar la base de datos
import "../imports/api/ContactsMethods.js"
import "../imports/api/ContactsPublications.js"
import "../imports/api/TransactionsCollections.js"
import "../imports/api/WalletsCollection.js"

Meteor.startup(() => {
  // If the Links collection is empty, add some data.

});
