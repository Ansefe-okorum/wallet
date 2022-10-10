import { Meteor } from "meteor/meteor";
import {ContactsCollection} from "../Collections/ContactsCollection";

Meteor.publish(
    'allContacts', function(){
        return ContactsCollection.find({}); //Esta es la forma en la que el servidor se comunica con el cliente, pero solo en lectura
    }
);