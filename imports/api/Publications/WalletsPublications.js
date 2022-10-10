import { Meteor} from "meteor/meteor";
import { WalletsCollection } from "../Collections/WalletsCollection.js";


Meteor.publish("wallets", function (){
    return WalletsCollection.find();
});