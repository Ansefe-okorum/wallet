import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { TransactionsCollection } from "./TransactionsCollection.js";

Meteor.methods({
    'Transactions.insert'({sourceWalletId, destinationWalletId, amount}){
        check(sourceWalletId, String);
        check(destinationWalletId, String);
        check(amount, Number);
        if(!destinationWalletId){
            throw new Meteor.Error("Destination Wallet is Needed");
        }
        if(!sourceWalletId){
            throw new Meteor.Error("Source Wallet is Needed");
        }
        if(amount<=0 || !amount){
            throw new Meteor.Error("Amount can't be 0 or negative")
        }
        return TransactionsCollection.insert({
            sourceWalletId,
            destinationWalletId,
            amount,
            createdAt: new Date()
        }) 
    }

})