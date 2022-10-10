import { Meteor} from "meteor/meteor";
import { WalletsCollection } from "./WalletsCollection.js";


Meteor.publish("wallets", function (){
    return WalletsCollection.find();
});